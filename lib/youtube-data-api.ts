import type { Sermon } from "@/data/sermons";
import { siteConfig } from "@/lib/site";

type ChannelsResponse = {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: { uploads?: string };
    };
  }>;
};

type PlaylistItemsResponse = {
  nextPageToken?: string;
  items?: Array<{
    snippet?: PlaylistSnippet;
  }>;
};

type PlaylistSnippet = {
  title?: string;
  description?: string;
  publishedAt?: string;
  channelTitle?: string;
  resourceId?: { videoId?: string };
  thumbnails?: {
    maxres?: { url?: string };
    high?: { url?: string };
    medium?: { url?: string };
    default?: { url?: string };
  };
};

function pickThumb(snippet: PlaylistSnippet | undefined) {
  const t = snippet?.thumbnails;
  if (!t) return "";
  return (
    t.maxres?.url ||
    t.high?.url ||
    t.medium?.url ||
    t.default?.url ||
    ""
  );
}

function normalizeThumb(url: string, videoId: string) {
  if (!url) return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  try {
    const u = new URL(url);
    if (/^i\d*\.ytimg\.com$/.test(u.hostname)) u.hostname = "i.ytimg.com";
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Lists every video in the channel uploads playlist (newest first).
 * Requires a YouTube Data API v3 key with YouTube Data API v3 enabled.
 * Set `YOUTUBE_API_KEY` in the environment.
 */
export async function fetchAllUploadsAsSermons(
  channelId: string,
  apiKey: string,
): Promise<Sermon[] | null> {
  const base = "https://www.googleapis.com/youtube/v3";
  const headers = { "User-Agent": `${siteConfig.shortName} sermon catalog` };

  try {
    const chUrl = new URL(`${base}/channels`);
    chUrl.searchParams.set("part", "contentDetails");
    chUrl.searchParams.set("id", channelId);
    chUrl.searchParams.set("key", apiKey);

    const chRes = await fetch(chUrl.toString(), {
      next: { revalidate: 3600 },
      headers,
    });
    if (!chRes.ok) return null;

    const chJson = (await chRes.json()) as ChannelsResponse;
    const uploadsId = chJson.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsId) return null;

    const sermons: Sermon[] = [];
    let pageToken: string | undefined;

    for (let page = 0; page < 60; page++) {
      const plUrl = new URL(`${base}/playlistItems`);
      plUrl.searchParams.set("part", "snippet");
      plUrl.searchParams.set("playlistId", uploadsId);
      plUrl.searchParams.set("maxResults", "50");
      plUrl.searchParams.set("key", apiKey);
      if (pageToken) plUrl.searchParams.set("pageToken", pageToken);

      const plRes = await fetch(plUrl.toString(), {
        next: { revalidate: 3600 },
        headers,
      });
      if (!plRes.ok) break;

      const plJson = (await plRes.json()) as PlaylistItemsResponse;
      const items = plJson.items ?? [];

      for (const row of items) {
        const sn = row.snippet;
        const videoId = sn?.resourceId?.videoId;
        if (!videoId || !sn?.title) continue;

        const datePart = sn.publishedAt ? sn.publishedAt.slice(0, 10) : undefined;
        const thumb = normalizeThumb(pickThumb(sn), videoId);

        sermons.push({
          id: `yt-${videoId}`,
          title: sn.title,
          description: sn.description?.trim() || undefined,
          speaker: sn.channelTitle?.trim() || siteConfig.name,
          ...(datePart ? { date: datePart } : {}),
          scripture: "Message",
          thumbnailUrl: thumb,
          youtubeId: videoId,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          featured: false,
        });
      }

      pageToken = plJson.nextPageToken;
      if (!pageToken) break;
    }

    return sermons.length > 0 ? sermons : null;
  } catch {
    return null;
  }
}
