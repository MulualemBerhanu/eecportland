import type { LucideIcon } from "lucide-react";
import {
  Baby,
  HeartHandshake,
  Megaphone,
  Music,
  Sparkles,
  Users,
} from "lucide-react";

export type MinistryDetailBlock = {
  heading?: string;
  paragraphs: string[];
};

export type Ministry = {
  id: string;
  title: string;
  /** Short copy for cards and previews */
  description: string;
  icon: LucideIcon;
  accent: "gold" | "burgundy" | "forest";
  /** Long-form sections for the ministries page */
  sections: MinistryDetailBlock[];
};

/** Intro shown in PageHero and repeated above the detailed list */
export const ministriesIntro =
  "Ebenezer Ethiopian Church Portland has a comprehensive Ministerial Program for ministers-in-training to deepen in their relationship with the Holy Spirit and to participate in the extension of Christ’s teachings throughout the world. Contact the church office to learn how to enroll in this ministerial program.";

export const ministries: Ministry[] = [
  {
    id: "worship",
    title: "Worship team & choirs",
    description:
      "Our choir and worship team lead the congregation in powerful, heartfelt worship, inviting God’s presence through music rooted in biblical truth.",
    icon: Music,
    accent: "burgundy",
    sections: [
      {
        paragraphs: [
          "Our choir and worship team are integral parts of our ministry, dedicated to leading the congregation in powerful and heartfelt worship. We believe that music is a gift from God and that it serves as a profound way to connect with Him, express our praise, and invite His presence into our lives and services.",
        ],
      },
      {
        heading: "Choir",
        paragraphs: [
          "The choir is a vibrant group of singers who work together to create an atmosphere of worship through song. Our choir is focused on using their voices to glorify God and inspire the congregation. The choir plays a key role in uplifting hearts and guiding the worship experience.",
        ],
      },
      {
        heading: "Worship team",
        paragraphs: [
          "Our worship team consists of musicians and singers who lead in various worship styles, ensuring that each service reflects the diversity of our congregation and connects with people in a meaningful way. Based on biblical and New Testament truth, the team works together to create a spirit-filled environment where worshippers can encounter God through music, whether in lively praise or intimate moments of reflection and prayer.",
        ],
      },
      {
        paragraphs: [
          "Both the choir and worship team are committed to excellence, serving with humility and passion to help our church family draw closer to God. We believe worship is not just about music. It’s a lifestyle, and through every note sung and every instrument played, we seek to honor God and lead others into His presence.",
          "If you are passionate about music and worship, we invite you to join our team, whether as a singer, musician, or volunteer. Together, we can lift up His name and experience the beauty of worshiping in spirit and truth.",
        ],
      },
    ],
  },
  {
    id: "youth-young-adult",
    title: "Youth & young adult",
    description:
      "A vibrant community for young adults to grow in Christ, build friendships, and live out faith with purpose, on Fridays at 6 PM to 8 PM.",
    icon: Sparkles,
    accent: "forest",
    sections: [
      {
        heading: "Young adults ministry",
        paragraphs: [
          "Welcome to the Young Adults Ministry! Our mission is to create a vibrant and supportive community where young adults can grow in their relationship with Jesus Christ, build lasting friendships, and live out their faith with purpose. Whether you’re in college, starting your career, or navigating the various seasons of adulthood, we are here to walk alongside you in your spiritual journey.",
          "We believe that young adulthood is a time of discovering who you are in Christ and embracing God’s calling for your life. Our ministry provides opportunities for Bible studies, worship, social events, and service projects that help you grow deeper in your faith and make a positive impact in the world around you.",
          "Join us Friday evenings from 6 PM – 8 PM as we explore what it means to live as faithful disciples of Jesus in today’s world. We are excited to build a community where we can encourage, challenge, and support each other as we seek to love God, love people, and live out the gospel.",
          "We would love to have you be a part of this dynamic group. Come and experience the joy of being part of a community that’s focused on Christ-centered relationships and growth. Let’s grow together!",
        ],
      },
    ],
  },
  {
    id: "children",
    title: "Children’s ministry",
    description:
      "A safe, engaging place where children discover Jesus’ love, learn Scripture, and grow in faith and character.",
    icon: Baby,
    accent: "gold",
    sections: [
      {
        heading: "Children’s ministry",
        paragraphs: [
          "We believe that every child is a beloved creation of God, designed with purpose and potential. We are committed to guiding children in their spiritual journey, helping them discover the love of Jesus Christ, and teaching them to live out their faith with joy and compassion. Our mission is to nurture a safe, inclusive, and engaging environment where children can grow in knowledge, character, and faith.",
          "We seek to instill biblical truths, cultivate a love for prayer, and empower children to reflect Christ’s love to the world around them. Through intentional teaching, worship, and relationships, we aim to foster a deep understanding of God’s Word, His grace, and His plan for their lives.",
        ],
      },
    ],
  },
  {
    id: "evangelism",
    title: "Evangelism & holistic ministry",
    description:
      "Sharing the good news in word and deed, addressing body, mind, and spirit through evangelism, service, and compassion.",
    icon: Megaphone,
    accent: "burgundy",
    sections: [
      {
        paragraphs: [
          "At the heart of our mission is a commitment to spreading the good news of Jesus Christ while addressing the whole person: body, mind, and spirit. Evangelism is not just about sharing the gospel message but also living it out through acts of love, service, and compassion in our communities. Our goal is to help others experience the transformative power of Jesus in every aspect of their lives.",
        ],
      },
      {
        heading: "Evangelism",
        paragraphs: [
          "We believe that the message of Jesus is one of hope, redemption, and new life for everyone. Evangelism is about sharing this message in both word and action. Our ministry empowers individuals to engage with others in a way that invites them into a relationship with Christ. Whether through personal relationships, outreach programs, or global missions, we are committed to taking the gospel to all people, regardless of background, culture, or circumstance.",
        ],
      },
      {
        heading: "Holistic ministry",
        paragraphs: [
          "Holistic ministry reflects the example set by Jesus, who not only preached the gospel but also healed the sick, fed the hungry, and cared for the marginalized. We believe that true ministry involves addressing the physical, emotional, social, and spiritual needs of individuals. Through service projects, counseling, healthcare initiatives, and community outreach, we aim to bring wholeness and healing to those we serve.",
        ],
      },
    ],
  },
  {
    id: "brothers",
    title: "Brother’s fellowship",
    description:
      "Men growing in faith, accountability, and service, meeting regularly for Bible study, prayer, and outreach.",
    icon: Users,
    accent: "forest",
    sections: [
      {
        paragraphs: [
          "The Brother’s Fellowship of Ebenezer Ethiopian Church is a dynamic and supportive community of men committed to growing in faith, building strong relationships, and serving God together. We believe that as men of God, we are called to be spiritual leaders in our homes, communities, and church, and our fellowship provides a space for us to grow in accountability, encouragement, and brotherhood.",
          "Through regular meetings every other month, Bible studies, prayer groups, and social events, the Brother’s Fellowship fosters an environment where men can connect, share their struggles, celebrate victories, and strengthen each other in their walk with Christ. We focus on developing godly character, cultivating integrity, and being a positive influence in every aspect of life.",
          "Our fellowship also includes opportunities for service, outreach, and ministry, where we can work together to impact the lives of others, showing the love of Christ in practical ways. Whether through community service projects, mentoring, or simply spending time together, we are committed to supporting each other in our faith journeys.",
          "We invite all men to join us in building a strong, vibrant fellowship where we can challenge and encourage each other to live out our faith boldly and with purpose. Together, we can grow in the likeness of Christ and make a lasting difference in our families, church, and beyond.",
        ],
      },
    ],
  },
  {
    id: "womens",
    title: "Women’s fellowship",
    description:
      "Women growing together through Bible study, prayer, friendship, and service, supporting one another in every season.",
    icon: HeartHandshake,
    accent: "gold",
    sections: [
      {
        paragraphs: [
          "Ebenezer Ethiopian Church Women’s Fellowship is a vibrant and empowering community of women who come together to grow in faith, build meaningful relationships, and support one another in every season of life. We believe that women are called to live out their faith with passion and purpose, and our fellowship provides a safe, nurturing space to strengthen our spiritual journeys, share experiences, and encourage each other in Christ.",
          "Through Bible studies, prayer groups, social events, and service opportunities, the Women’s Fellowship creates an environment where women can grow in their understanding of God’s Word, deepen their relationship with Jesus, and be equipped to live out their faith in the world. We are committed to walking alongside each other in times of joy and struggle, fostering friendships that uplift, inspire, and hold one another accountable.",
          "Our fellowship also focuses on serving others, as we believe that faith in action is a powerful way to reflect God’s love. From community outreach to supporting women in need, we come together to make a difference and bring hope to those around us.",
          "We invite all women to be part of this wonderful sisterhood, where we can laugh, learn, serve, and grow together as we seek to honor God in every area of our lives. Together, we can encourage one another to live out God’s calling with strength, grace, and love.",
        ],
      },
    ],
  },
];
