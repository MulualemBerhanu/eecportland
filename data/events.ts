export type ChurchEvent = {
  id: string;
  title: string;
  summary: string;
  date: string;
  time: string;
  location: string;
  category: "worship" | "community" | "family" | "serve";
  featured?: boolean;
};

export const events: ChurchEvent[] = [
  {
    id: "e1",
    title: "Resurrection Sunday Celebration",
    summary:
      "Join us for worship, baptism, and fellowship as we celebrate Christ’s victory, with hospitality for guests and families.",
    date: "2026-04-05",
    time: "12:30 PM – 2:30 PM",
    location: "Main Sanctuary",
    category: "worship",
    featured: true,
  },
  {
    id: "e2",
    title: "Community Meal & Prayer Night",
    summary:
      "Share a meal, pray together, and hear updates on local outreach. All are welcome, and RSVP is appreciated.",
    date: "2026-04-12",
    time: "6 PM",
    location: "Fellowship Hall",
    category: "community",
  },
  {
    id: "e3",
    title: "Youth Worship Night",
    summary:
      "An evening of music, testimony, and small groups for students grades 6–12.",
    date: "2026-04-18",
    time: "7:00 PM",
    location: "Youth Room",
    category: "family",
  },
  {
    id: "e4",
    title: "Serve Saturday: Neighborhood Cleanup",
    summary:
      "Serve alongside neighbors. Tools and lunch provided. Bring gloves and a willing heart.",
    date: "2026-04-25",
    time: "9:00 AM",
    location: "Church Parking Lot",
    category: "serve",
  },
];

export function formatEventDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate + "T12:00:00"));
}
