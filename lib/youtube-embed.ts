import type { Sermon } from "@/data/sermons";

export function youtubeVideoIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (
      u.hostname === "www.youtube.com" ||
      u.hostname === "youtube.com" ||
      u.hostname === "m.youtube.com"
    ) {
      if (u.pathname.startsWith("/watch")) return u.searchParams.get("v");
      const embed = u.pathname.match(/^\/embed\/([^/?]+)/);
      if (embed?.[1]) return embed[1];
      const shorts = u.pathname.match(/^\/shorts\/([^/?]+)/);
      if (shorts?.[1]) return shorts[1];
    }
  } catch {
    return null;
  }
  return null;
}

/** Resolved id for an embedded iframe: explicit `youtubeId`, else parsed `videoUrl`. */
export function youtubeEmbedId(sermon: Pick<Sermon, "youtubeId" | "videoUrl">): string | null {
  const direct = sermon.youtubeId?.trim();
  if (direct) return direct;
  if (sermon.videoUrl) return youtubeVideoIdFromUrl(sermon.videoUrl);
  return null;
}
