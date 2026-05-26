export type FAQ = {
  question: string;
  answer: string;
};

export const contactFaqs: FAQ[] = [
  {
    question: "How do I get connected after my first visit?",
    answer:
      "Stop by the welcome desk, fill out a connect card, or email us, and we’ll help you find a small group, serving opportunity, or next step that fits your season.",
  },
  {
    question: "Do you offer counseling or pastoral care?",
    answer:
      "Our pastors provide spiritual care and can refer you to trusted Christian counselors when needed. For urgent crises, please also contact local emergency services.",
  },
  {
    question: "Is the church accessible?",
    answer:
      "Yes. Our main entrance, sanctuary, and restrooms are accessible. Let us know ahead of your visit if you need reserved seating or additional assistance.",
  },
];

export const giveFaqs: FAQ[] = [
  {
    question: "Is online giving secure?",
    answer:
      "When you connect a giving platform, gifts are processed through PCI-compliant providers. We never store full card numbers on our website.",
  },
  {
    question: "Can I give to a specific ministry?",
    answer:
      "Yes. Most platforms allow designations (general fund, missions, benevolence). You can also note preferences when giving by check.",
  },
  {
    question: "Will I receive a giving statement?",
    answer:
      "Annual contribution statements are mailed or emailed for tax purposes. Contact the office if you need a duplicate.",
  },
];
