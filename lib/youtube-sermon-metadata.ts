import type { Sermon } from "@/data/sermons";
import {
  featuredYoutubeVideoId,
  sermons as staticSermons,
} from "@/data/sermons";
import { siteConfig } from "@/lib/site";
import { fetchAllUploadsAsSermons } from "@/lib/youtube-data-api";
import { fetchChannelVideosBrowseSnapshot } from "@/lib/youtube-browse-snapshot";
import { youtubeEmbedId, youtubeVideoIdFromUrl } from "@/lib/youtube-embed";

type ChannelSnippet = {
  videoId: string;
  title: string;
  description: string;
  published: string;
  thumbnailUrl: string;
  channelTitle: string;
};

const ENTRY_REGEX = /<entry>([\s\S]*?)<\/entry>/g;

function decodeXml(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(text: string) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unwrapCdata(raw: string) {
  const t = raw.trim();
  if (t.startsWith("<![CDATA[")) {
    return t.slice(9).replace(/\]\]>\s*$/, "").trim();
  }
  return t;
}

function matchTag(block: string, tag: string) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<${escaped}>([\\s\\S]*?)<\\/${escaped}>`);
  return block.match(re)?.[1]?.trim();
}

function matchMediaThumbnail(block: string) {
  const m = block.match(/<media:thumbnail[^>]*url="([^"]+)"/);
  return m?.[1]?.trim();
}

function extractMediaDescription(entry: string) {
  const m = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);
  if (!m?.[1]) return "";
  const inner = unwrapCdata(m[1].trim());
  return stripHtml(decodeXml(inner));
}

function normalizeYtThumbnail(url: string) {
  try {
    const u = new URL(url);
    if (/^i\d*\.ytimg\.com$/.test(u.hostname)) {
      u.hostname = "i.ytimg.com";
    }
    return u.toString();
  } catch {
    return url;
  }
}

function entryToSnippet(entry: string): ChannelSnippet | null {
  const videoId = matchTag(entry, "yt:videoId");
  if (!videoId) return null;
  const titleRaw = matchTag(entry, "title");
  const title = titleRaw ? stripHtml(decodeXml(titleRaw)) : "";
  const publishedRaw = matchTag(entry, "published");
  const published = publishedRaw ? publishedRaw.slice(0, 10) : "";
  const nameMatch = entry.match(/<name>([^<]*)<\/name>/);
  const channelTitle = nameMatch?.[1]?.trim() ?? siteConfig.name;
  const description = extractMediaDescription(entry);
  const thumbRaw = matchMediaThumbnail(entry);
  const thumbnailUrl = thumbRaw
    ? normalizeYtThumbnail(thumbRaw)
    : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return {
    videoId,
    title,
    description,
    published,
    thumbnailUrl,
    channelTitle,
  };
}

function parseFeedToOrderedSnippets(xml: string): ChannelSnippet[] {
  const out: ChannelSnippet[] = [];
  for (const match of xml.matchAll(ENTRY_REGEX)) {
    const entry = match[1];
    if (!entry) continue;
    const sn = entryToSnippet(entry);
    if (sn) out.push(sn);
  }
  return out;
}

function parseFeedToMap(xml: string): Map<string, ChannelSnippet> {
  const map = new Map<string, ChannelSnippet>();
  for (const sn of parseFeedToOrderedSnippets(xml)) {
    map.set(sn.videoId, sn);
  }
  return map;
}

async function fetchFeedXml(channelId: string): Promise<string | null> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 900 },
      headers: { "User-Agent": `${siteConfig.shortName} sermon metadata` },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchChannelSnippetMap(channelId: string) {
  const xml = await fetchFeedXml(channelId);
  if (!xml) return new Map<string, ChannelSnippet>();
  return parseFeedToMap(xml);
}

type OEmbedPayload = {
  title?: string;
  author_name?: string;
  thumbnail_url?: string;
};

async function fetchOEmbedSnippet(videoId: string): Promise<ChannelSnippet | null> {
  const oembedUrl = new URL("https://www.youtube.com/oembed");
  oembedUrl.searchParams.set("url", `https://www.youtube.com/watch?v=${videoId}`);
  oembedUrl.searchParams.set("format", "json");
  try {
    const res = await fetch(oembedUrl.toString(), {
      next: { revalidate: 900 },
      headers: { "User-Agent": `${siteConfig.shortName} sermon oembed` },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as OEmbedPayload;
    if (!data.title) return null;
    return {
      videoId,
      title: data.title,
      description: "",
      published: "",
      thumbnailUrl: data.thumbnail_url
        ? normalizeYtThumbnail(data.thumbnail_url)
        : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      channelTitle: data.author_name?.trim() || siteConfig.name,
    };
  } catch {
    return null;
  }
}

function resolveVideoId(sermon: Sermon): string | null {
  if (sermon.youtubeId?.trim()) return sermon.youtubeId.trim();
  if (sermon.videoUrl) return youtubeVideoIdFromUrl(sermon.videoUrl);
  return null;
}

function snippetToSermon(meta: ChannelSnippet): Sermon {
  const desc = meta.description.trim();
  return {
    id: `yt-${meta.videoId}`,
    title: meta.title,
    description: desc || undefined,
    speaker: meta.channelTitle,
    ...(meta.published ? { date: meta.published } : {}),
    scripture: "Message",
    thumbnailUrl: meta.thumbnailUrl,
    youtubeId: meta.videoId,
    videoUrl: `https://www.youtube.com/watch?v=${meta.videoId}`,
    featured: false,
  };
}

/**
 * No Google API key: public RSS feed (~15 recent uploads, with descriptions).
 * Set `YOUTUBE_API_KEY` for the full uploads playlist. Very old items may be missing without it.
 */
async function mergeRssAndBrowseSnapshot(channelId: string): Promise<Sermon[]> {
  const xml = await fetchFeedXml(channelId);
  const rssSermons = xml
    ? parseFeedToOrderedSnippets(xml).map(snippetToSermon)
    : [];

  const browseSermons = await fetchChannelVideosBrowseSnapshot(channelId);

  const seen = new Set<string>();
  const out: Sermon[] = [];

  const pushDedup = (s: Sermon) => {
    const vid = youtubeEmbedId(s);
    if (!vid || seen.has(vid)) return;
    seen.add(vid);
    out.push(s);
  };

  for (const s of rssSermons) pushDedup(s);
  for (const s of browseSermons) pushDedup(s);

  return out;
}

function resolveFeaturedPin(): string | undefined {
  const envPin = process.env.YOUTUBE_FEATURED_VIDEO_ID?.trim();
  if (envPin) return envPin;
  if (featuredYoutubeVideoId?.trim()) return featuredYoutubeVideoId.trim();
  const staticFeatured = staticSermons.find((s) => s.featured);
  if (staticFeatured) return resolveVideoId(staticFeatured) ?? undefined;
  return undefined;
}

function applyFeaturedPin(list: Sermon[]): Sermon[] {
  if (list.length === 0) return list;
  const pin = resolveFeaturedPin();
  const next = list.map((s) => ({ ...s, featured: false }));
  if (pin) {
    const idx = next.findIndex((s) => youtubeEmbedId(s) === pin);
    if (idx >= 0) {
      next[idx] = { ...next[idx], featured: true };
      return next;
    }
  }
  next[0] = { ...next[0], featured: true };
  return next;
}

/** Enrich hand-written `data/sermons.ts` rows with titles/descriptions from YouTube when possible. */
async function enrichStaticList(base: Sermon[]): Promise<Sermon[]> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID || siteConfig.youtubeChannelId;
  const feedMap = await fetchChannelSnippetMap(channelId);
  const enriched: Sermon[] = [];

  for (const sermon of base) {
    const videoId = resolveVideoId(sermon);
    if (!videoId) {
      enriched.push(sermon);
      continue;
    }

    let meta: ChannelSnippet | null = feedMap.get(videoId) ?? null;
    if (!meta) {
      meta = await fetchOEmbedSnippet(videoId);
    }
    if (!meta) {
      enriched.push(sermon);
      continue;
    }

    const mergedDescription =
      (meta.description && meta.description.trim()) || sermon.description;

    const mergedDate = meta.published || sermon.date;

    enriched.push({
      ...sermon,
      title: meta.title || sermon.title,
      ...(mergedDescription ? { description: mergedDescription } : {}),
      speaker: meta.channelTitle || sermon.speaker,
      ...(mergedDate ? { date: mergedDate } : {}),
      thumbnailUrl: meta.thumbnailUrl || sermon.thumbnailUrl,
      videoUrl: sermon.videoUrl ?? `https://www.youtube.com/watch?v=${videoId}`,
    });
  }

  return applyFeaturedPin(enriched);
}

/**
 * Resolves sermons for the site:
 * 1. `YOUTUBE_API_KEY` set: full uploads list via Data API v3.
 * 2. Else: merge public RSS + InnerTube browse snapshot (no key; ~30–40 recent items typical).
 * 3. Else: curated `data/sermons.ts` enriched from RSS/oEmbed per row.
 */
export async function getSermonsWithYouTubeMeta(
  base: Sermon[] = staticSermons,
): Promise<Sermon[]> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID || siteConfig.youtubeChannelId;
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();

  if (apiKey) {
    const apiList = await fetchAllUploadsAsSermons(channelId, apiKey);
    if (apiList && apiList.length > 0) {
      return applyFeaturedPin(apiList);
    }
  }

  const merged = await mergeRssAndBrowseSnapshot(channelId);
  if (merged.length > 0) {
    return applyFeaturedPin(merged);
  }

  return enrichStaticList(base);
}
