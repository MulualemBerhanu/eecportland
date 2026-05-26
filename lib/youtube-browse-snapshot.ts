import type { Sermon } from "@/data/sermons";

/**
 * Optional extra channel videos via InnerTube (previously `youtubei`).
 * Disabled: that dependency pulled in `node-fetch` + deprecated Node `punycode`,
 * which surfaced as a dev console error on the home page.
 *
 * Sermons still load from the public RSS feed, oEmbed, and the Data API when configured.
 */
export async function fetchChannelVideosBrowseSnapshot(
  _channelId: string,
): Promise<Sermon[]> {
  return [];
}
