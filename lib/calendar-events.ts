import { siteConfig } from "@/lib/site";
import { normalizeGoogleDriveImageUrl } from "@/lib/utils/normalizeDriveUrl";

export type CalendarEvent = {
  id: string;
  title: string;
  summary: string;
  description?: string;
  dateLabel: string;
  timeLabel: string;
  location?: string;
  startDateISO: string;
  flyerImage?: string;
  detailsUrl?: string;
  isFeatured?: boolean;
  isAllDay?: boolean;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_CALENDAR_CID =
  "OTlkZDUxYTRmYWJlMDBhYmZmOTVhYTkzMDAxMzkyMWM2OWRjMGQ3Y2NlOWJjNDVmNDhhOTFiYjc4YjllNzI1ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t";

function decodeCalendarId(cid: string) {
  try {
    return Buffer.from(cid, "base64").toString("utf8");
  } catch {
    return cid;
  }
}

function toIcalUrl(calendarId: string) {
  return `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
}

function unfoldIcs(ics: string) {
  return ics.replace(/\r?\n[ \t]/g, "");
}

function parseIcsDate(raw: string) {
  if (/^\d{8}$/.test(raw)) {
    const y = Number(raw.slice(0, 4));
    const m = Number(raw.slice(4, 6)) - 1;
    const d = Number(raw.slice(6, 8));
    return { date: new Date(Date.UTC(y, m, d, 12, 0, 0)), allDay: true };
  }

  if (/^\d{8}T\d{6}Z$/.test(raw)) {
    const y = Number(raw.slice(0, 4));
    const m = Number(raw.slice(4, 6)) - 1;
    const d = Number(raw.slice(6, 8));
    const h = Number(raw.slice(9, 11));
    const min = Number(raw.slice(11, 13));
    const s = Number(raw.slice(13, 15));
    return { date: new Date(Date.UTC(y, m, d, h, min, s)), allDay: false };
  }

  if (/^\d{8}T\d{6}$/.test(raw)) {
    const y = Number(raw.slice(0, 4));
    const m = Number(raw.slice(4, 6)) - 1;
    const d = Number(raw.slice(6, 8));
    const h = Number(raw.slice(9, 11));
    const min = Number(raw.slice(11, 13));
    const s = Number(raw.slice(13, 15));
    return { date: new Date(y, m, d, h, min, s), allDay: false };
  }

  return { date: new Date(raw), allDay: false };
}

function parseLine(line: string) {
  const idx = line.indexOf(":");
  if (idx === -1) return null;
  const left = line.slice(0, idx);
  const value = line.slice(idx + 1);
  const [key, ...paramParts] = left.split(";");
  const params: Record<string, string> = {};
  for (const part of paramParts) {
    const [k, v] = part.split("=");
    if (k && v) params[k] = v;
  }
  return { key, params, value };
}

function decodeText(v: string) {
  return v
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

/**
 * Google Calendar often exports descriptions as HTML (`<br>`, `<a href="…">`).
 * We normalize to plain text so flyer lines match `^Flyer:` and summaries stay readable.
 */
function calendarDescriptionToPlainText(text: string): string {
  if (!text) return "";
  let t = text;
  t = t.replace(/<\s*br\s*\/?>/gi, "\n");
  t = t.replace(/<\/\s*(p|div|li|h[1-6])\s*>/gi, "\n");
  t = t.replace(
    /<a\s+[^>]*\bhref=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?<\/a>/gi,
    "$1 ",
  );
  t = t.replace(/<[^>]+>/g, " ");
  t = t
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"');
  t = t.replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n");
  t = t.replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ");
  return t.trim();
}

function cleanExtractedUrl(raw: string): string {
  return raw.replace(/^[('"`<]+|[)'"`.>\]]+$/g, "").trim();
}

function extractFlyerImage(text?: string) {
  if (!text) return undefined;
  const hrefDrive = text.match(
    /\bhref=["'](https?:\/\/drive\.google\.com\/[^"']+)["']/i,
  )?.[1];
  const flyerLine = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => /^flyer\s*[:=-]\s*/i.test(line));

  let candidate: string | undefined =
    flyerLine?.match(/(https?:\/\/[^\s<>"']+)/i)?.[1] ?? hrefDrive;
  if (!candidate) {
    candidate = text.match(/(https?:\/\/drive\.google\.com\/[^\s<>"']+)/i)?.[1];
  }

  const raw = candidate ? cleanExtractedUrl(candidate) : undefined;
  if (!raw) return undefined;
  const normalized = normalizeGoogleDriveImageUrl(raw);
  // Only keep valid URLs so broken values do not impact UI rendering.
  if (!normalized) return undefined;
  try {
    const parsed = new URL(normalized);
    return parsed.toString();
  } catch {
    return undefined;
  }
}

function hasFeaturedFlag(text?: string) {
  if (!text) return false;
  return /featured:\s*true/i.test(text);
}

function stripControlLines(text?: string) {
  if (!text) return "";
  return text
    .split(/\r?\n/)
    .filter((line) => {
      const normalized = line.trim();
      return (
        !/^flyer\s*[:=-]/i.test(normalized) && !/^featured:\s*/i.test(normalized)
      );
    })
    .join("\n")
    .trim();
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(date: Date, allDay: boolean) {
  if (allDay) return "All day";
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function parseEventsFromIcs(ics: string): CalendarEvent[] {
  const lines = unfoldIcs(ics).split(/\r?\n/);
  const events: CalendarEvent[] = [];
  let inEvent = false;
  let bag: Record<string, string> = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      bag = {};
      continue;
    }

    if (line === "END:VEVENT") {
      inEvent = false;
      const uid = bag.UID || `${bag.SUMMARY}-${bag.DTSTART}`;
      const title = decodeText(bag.SUMMARY || "Church Event");
      const rawDesc = calendarDescriptionToPlainText(decodeText(bag.DESCRIPTION || ""));
      const detailsUrl = bag.URL ? decodeText(bag.URL) : undefined;
      const flyerImage = extractFlyerImage(rawDesc);
      const isFeatured = hasFeaturedFlag(rawDesc);
      const description = stripControlLines(rawDesc);
      const summary =
        description
          .split("\n")
          .map((line) => line.trim())
          .find(Boolean) || "More event details will be shared soon.";
      const startRaw = bag.DTSTART;
      if (!startRaw) continue;
      const { date, allDay } = parseIcsDate(startRaw);
      if (Number.isNaN(date.getTime())) continue;

      events.push({
        id: uid,
        title,
        summary,
        description: description || undefined,
        dateLabel: formatDate(date),
        timeLabel: formatTime(date, allDay),
        location: bag.LOCATION ? decodeText(bag.LOCATION) : undefined,
        startDateISO: date.toISOString(),
        flyerImage,
        detailsUrl,
        isFeatured,
        isAllDay: allDay,
      });
      bag = {};
      continue;
    }

    if (!inEvent) continue;
    const parsed = parseLine(line);
    if (!parsed) continue;
    const key = parsed.key;
    if (key in bag) {
      bag[key] = `${bag[key]}\n${parsed.value}`;
    } else {
      bag[key] = parsed.value;
    }
  }

  const now = Date.now() - DAY_MS;
  return events
    .filter((event) => new Date(event.startDateISO).getTime() >= now)
    .sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;

      const aDate = new Date(a.startDateISO).getTime();
      const bDate = new Date(b.startDateISO).getTime();
      if (aDate !== bDate) return aDate - bDate;

      // For same timestamp/day ties, prefer timed events over all-day blocks.
      if (!!a.isAllDay !== !!b.isAllDay) return a.isAllDay ? 1 : -1;

      return a.title.localeCompare(b.title);
    });
}

export async function getCalendarEvents(
  limit = 8,
  options?: { noStore?: boolean },
): Promise<CalendarEvent[]> {
  const configuredId =
    process.env.GOOGLE_CALENDAR_ID ||
    decodeCalendarId(process.env.GOOGLE_CALENDAR_CID || DEFAULT_CALENDAR_CID);
  const icalUrl = process.env.GOOGLE_CALENDAR_ICAL_URL || toIcalUrl(configuredId);

  try {
    const res = await fetch(icalUrl, {
      ...(options?.noStore ? { cache: "no-store" as const } : { next: { revalidate: 300 } }),
      headers: { "User-Agent": `${siteConfig.shortName} events fetcher` },
    });
    if (!res.ok) return [];
    const text = await res.text();
    const parsed = parseEventsFromIcs(text);
    return parsed.slice(0, limit);
  } catch {
    return [];
  }
}
