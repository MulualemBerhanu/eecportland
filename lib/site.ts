export const siteConfig = {
  name: "Ebenezer Ethiopian Church",
  shortName: "Ebenezer Church",
  tagline: "Faith. Community. Purpose.",
  description:
    "A welcoming Ethiopian evangelical church growing in Christ, rooted in Scripture, and serving our community in love.",
  url: "https://ebenezerchurch.example.org",
  address: {
    street: "16575 SE Webster RD",
    city: "Milwaukie",
    state: "OR",
    zip: "97267",
    full: "16575 SE Webster RD, Milwaukie, OR 97267",
  },
  contact: {
    phone: "+1 971 476 7179",
    phoneTel: "+19714767179",
    email: "info@eecportland.org",
  },
  hours: {
    office: "Tuesday–Friday, 9:00 AM – 3:00 PM",
    sunday: "Sunday worship, 12:30 PM – 2:30 PM",
  },
  /** Primary line for hero, footer, and compact UI */
  serviceTime: "Sunday worship 12:30 PM – 2:30 PM",
  /** Friday evening programs (prayer and kids activity) */
  fridayGathering: "Friday 6 PM – 8 PM · Prayer and kids activity",
  /** Full schedule rows (contact page, etc.) */
  serviceScheduleLines: [
    "Sunday worship: 12:30 PM – 2:30 PM",
    "Friday: 6 PM – 8 PM · Prayer",
    "Friday: 6 PM – 8 PM · Kids activity",
  ] as const,
  givingUrl: "https://give.tithe.ly/?formId=74b2dfcc-bc13-4dc5-b581-36babf494011",
  buildingFundUrl: "https://tithe.ly/event-registration/#/8146657",
  social: {
    facebook: "https://www.facebook.com/EECPortland.org",
    youtube: "https://www.youtube.com/@eecportland/videos",
    instagram: "https://instagram.com",
  },
  /** Used to load video titles/descriptions from the public channel RSS feed. */
  youtubeChannelId: "UC-Hj7Y93PKojtLpYGO2jf_A",
} as const;
