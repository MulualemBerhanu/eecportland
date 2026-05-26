import { Compass, Heart, Shield, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ValueItem = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const missionStatement = {
  title: "Our Mission",
  body: `"Then Jesus came to them and said, "All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit"" - Matthew 28:18-19.

Our mission is to flock people into the life of faith in Jesus Christ by spreading the gospel and calling all to salvation. We are committed to bringing spiritual influence to the wider community through holistic service that addresses the spiritual, intellectual, social, and economic needs of individuals.

We seek to help our members grow in the grace that the Lord has given them, nurturing their faith and empowering them to live out the teachings of Jesus. As a church, we are dedicated to arming and awakening the next generation with the word of God, equipping them to witness the gospel, make disciples, and serve others. Through spiritual gatherings, meetings, Bible studies, and outreach training, we will inspire and empower individuals to live out their faith.

Under the guidance of the Holy Spirit, and within the capacity of the church, we are committed to carrying out missionary services in various places, with a focus on church planting and spreading the gospel to the ends of the earth. We aim to be a beacon of light, drawing people into the kingdom of God, and transforming lives for eternity.

Our mission includes establishing a connection between displaced persons from various countries and their resettlement in the United States. This mission is pursued through the provision of assistance with transitional processes, cultural orientation, and integration into life in the United States, including, but not limited to, job placement and language services.`,
};

export const visionStatement = {
  title: "Our Vision",
  body: "Our vision is to worship God in spirit and truth, continuously seeking to magnify His name. We aim to expand the love of Christ across generations, creating a legacy of faith that endures in this and the generations to come. As shepherds of God's people, we are dedicated to guiding individuals in their spiritual journeys, helping them grow in their relationship with Christ, and preparing them to inherit eternal life. We envision a community rooted in worship, empowered by the Holy Spirit, and equipped to spread the gospel of Jesus Christ in both word and deed.",
};

export const commitmentPoints = [
  "Influencing generations by the power of our vision and by modeling the way.",
  "Being accountable for our every word and action.",
  "Treating each other with dignity and respect.",
  "Encouraging personal growth by developing and empowering our people.",
  "Leaving a legacy of hope and promise to future generations.",
];

export const focusPoints = [
  "To spread the Gospel of Jesus Christ to all mankind.",
  "Equip and train leaders for the Kingdom of God that can carry the torch for generations.",
  "Support our partners and members to achieve their potential.",
  "Provide the best servant leadership programs.",
  "Increase communication and information.",
];

export const values: ValueItem[] = [
  {
    title: "Biblical Fidelity",
    body: "We submit to Scripture as our authority for faith and life, teaching clearly, living honestly, and growing together.",
    icon: Shield,
  },
  {
    title: "Spiritual Vitality",
    body: "We pursue God in worship, prayer, and obedience, expecting His Spirit to transform us day by day.",
    icon: Sun,
  },
  {
    title: "Authentic Community",
    body: "We share life across cultures and generations, bearing burdens, celebrating joy, and practicing hospitality.",
    icon: Heart,
  },
  {
    title: "Missional Compassion",
    body: "We serve our city and world with humility, proclaiming Christ through mercy, generosity, and presence.",
    icon: Compass,
  },
];
