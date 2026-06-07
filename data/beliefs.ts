export const beliefs = [
  {
    title: "The Triune God",
    body: "We worship one God, Father, Son, and Holy Spirit, eternally existent, perfect in holiness, love, and power.",
  },
  {
    title: "Scripture",
    body: "The Bible is God’s inspired Word, true and trustworthy in all it affirms, and the final authority for belief and conduct.",
  },
  {
    title: "Humanity & Sin",
    body: "All people are made in God’s image, and all have sinned, so we need salvation that only God can provide.",
  },
  {
    title: "Jesus Christ",
    body: "Jesus is fully God and fully man. He lived a sinless life, died for our sins, rose bodily, ascended, and will return in glory.",
  },
  {
    title: "Salvation by Grace",
    body: "We are saved by grace through faith in Christ alone, not by works, unto good works as the Spirit renews us.",
  },
  {
    title: "The Church",
    body: "The church is the body of Christ, called to worship, witness, discipleship, mercy, and unity across every nation and tongue.",
  },
];

/** Set to `true` when every board member has a real portrait in `public/leadership/`. */
export const showLeadershipPhotos = false;

export type LeadershipMember = {
  name: string;
  role: string;
  bio: string;
  /** Local file under `public/` (e.g. `/leadership/demisse-tadess.jpg`) or remote URL. */
  image: string;
};

/** Board roster. Portraits hidden until `showLeadershipPhotos` is enabled. */
export const leadership: LeadershipMember[] = [
  {
    name: "Pastor Demess Tadesse",
    role: "Board Director",
    bio: "Serves on the church board with pastoral care and steady leadership for our congregation.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Amare Woldemariam",
    role: "Secretary",
    bio: "Supports the church through clear communication, records, and faithful administration.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Amanuel Roba",
    role: "Treasurer",
    bio: "Oversees the stewardship of our resources with transparency and integrity.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Dilnesahu Temesgen",
    role: "Board member",
    bio: "Serves on the church board, supporting faithful governance and the spiritual health of our congregation.",
    image: "/dile.jpg",
  },
  {
    name: "Alexander Assefa",
    role: "Board member",
    bio: "Serves on the church board, supporting faithful governance and the spiritual health of our congregation.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop",
  },
];
