export type SermonSeries = {
  id: string;
  title: string;
  description: string;
  artworkUrl: string;
};

export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  /** ISO YYYY-MM-DD when known (RSS/Data API); omit when only YouTube-relative time exists. */
  date?: string;
  /** e.g. “1 year ago” from InnerTube snapshots when calendar date isn't available */
  publishedTimeLabel?: string;
  scripture: string;
  /** Filled at request time from YouTube (channel RSS); optional fallback in this file. */
  description?: string;
  seriesId?: string;
  duration?: string;
  thumbnailUrl: string;
  /** Prefer this for embeds; use `videoUrl` alone if you only have a watch URL. */
  youtubeId?: string;
  videoUrl?: string;
  featured?: boolean;
};

export const sermonSeries: SermonSeries[] = [
  {
    id: "s1",
    title: "Rooted & Rising",
    description:
      "A journey through Colossians: Christ above all, and our life hidden in Him.",
    artworkUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
  },
  {
    id: "s2",
    title: "Faith at Home",
    description:
      "Building households of prayer, forgiveness, and joyful witness in everyday rhythms.",
    artworkUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
  },
  {
    id: "s3",
    title: "The Generous Life",
    description:
      "Stewardship, gratitude, and open-handed living in response to God’s grace.",
    artworkUrl:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
  },
];

/**
 * When the site loads videos from YouTube (API or RSS), this picks which one is “Featured”.
 * Leave unset to use the newest upload. Override with any video id (from the watch URL).
 */
export const featuredYoutubeVideoId: string | undefined = undefined;

/** Fallback list if RSS/API are unavailable: normally unused when API key or RSS works. */
export const sermons: Sermon[] = [
  {
    id: "yt-W_ry6oFO_yE",
    title: "Wisdom...World vs Holy Spirit",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-12-14",
    scripture: "Sunday message",
    youtubeId: "W_ry6oFO_yE",
    videoUrl: "https://www.youtube.com/watch?v=W_ry6oFO_yE",
    thumbnailUrl: "https://i.ytimg.com/vi/W_ry6oFO_yE/hqdefault.jpg",
    featured: true,
  },
  {
    id: "yt-KpBe5AI53Tc",
    title: "EEC Sunday Service",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-03-31",
    scripture: "Sunday worship",
    youtubeId: "KpBe5AI53Tc",
    videoUrl: "https://www.youtube.com/watch?v=KpBe5AI53Tc",
    thumbnailUrl: "https://i.ytimg.com/vi/KpBe5AI53Tc/hqdefault.jpg",
  },
  {
    id: "yt-eFu9KQwlkXM",
    title: "EEC Sunday Service",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-03-30",
    scripture: "Sunday worship",
    youtubeId: "eFu9KQwlkXM",
    videoUrl: "https://www.youtube.com/watch?v=eFu9KQwlkXM",
    thumbnailUrl: "https://i.ytimg.com/vi/eFu9KQwlkXM/hqdefault.jpg",
  },
  {
    id: "yt-UTlFPkN65oU",
    title: "EEC Sunday Service",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-03-24",
    scripture: "Sunday worship",
    youtubeId: "UTlFPkN65oU",
    videoUrl: "https://www.youtube.com/watch?v=UTlFPkN65oU",
    thumbnailUrl: "https://i.ytimg.com/vi/UTlFPkN65oU/hqdefault.jpg",
  },
  {
    id: "yt-B0pkjgLhg2A",
    title: "EEC Sunday Service",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-03-17",
    scripture: "Sunday worship",
    youtubeId: "B0pkjgLhg2A",
    videoUrl: "https://www.youtube.com/watch?v=B0pkjgLhg2A",
    thumbnailUrl: "https://i.ytimg.com/vi/B0pkjgLhg2A/hqdefault.jpg",
  },
  {
    id: "yt-klfJHADQB04",
    title: "EEC Sunday Service",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-03-16",
    scripture: "Sunday worship",
    youtubeId: "klfJHADQB04",
    videoUrl: "https://www.youtube.com/watch?v=klfJHADQB04",
    thumbnailUrl: "https://i.ytimg.com/vi/klfJHADQB04/hqdefault.jpg",
  },
  {
    id: "yt-1bxRd-FgCFw",
    title: "EEC Sunday Service",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-03-10",
    scripture: "Sunday worship",
    youtubeId: "1bxRd-FgCFw",
    videoUrl: "https://www.youtube.com/watch?v=1bxRd-FgCFw",
    thumbnailUrl: "https://i.ytimg.com/vi/1bxRd-FgCFw/hqdefault.jpg",
  },
  {
    id: "yt-2wCspMXmrWs",
    title: "EEC Sunday Service",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-03-03",
    scripture: "Sunday worship",
    youtubeId: "2wCspMXmrWs",
    videoUrl: "https://www.youtube.com/watch?v=2wCspMXmrWs",
    thumbnailUrl: "https://i.ytimg.com/vi/2wCspMXmrWs/hqdefault.jpg",
  },
  {
    id: "yt-EZPJ_9k7Ds4",
    title: "EEC Sunday Service",
    speaker: "Ebenezer Ethiopian Church Portland",
    date: "2025-02-24",
    scripture: "Sunday worship",
    youtubeId: "EZPJ_9k7Ds4",
    videoUrl: "https://www.youtube.com/watch?v=EZPJ_9k7Ds4",
    thumbnailUrl: "https://i.ytimg.com/vi/EZPJ_9k7Ds4/hqdefault.jpg",
  },
];
