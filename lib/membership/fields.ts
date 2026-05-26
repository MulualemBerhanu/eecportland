import type { MembershipFormState } from "@/lib/membership/types";

export type MembershipFieldDef = {
  key: keyof MembershipFormState;
  labelAm: string;
  labelEn: string;
  when?: (d: MembershipFormState) => boolean;
};

export type MembershipSectionDef = {
  titleAm: string;
  titleEn: string;
  fields: MembershipFieldDef[];
};

/** Shared labels for PDF, email, and form (keep in sync with the membership UI). */
export const membershipSections: MembershipSectionDef[] = [
  {
    titleAm: "እምን እና መገለጫ",
    titleEn: "Faith & profile",
    fields: [
      {
        key: "bornAgain",
        labelAm: "ጌታን እንደግል አዳኝ አድርገው ተቀብለዋል?",
        labelEn: "Are you born again christian?",
      },
      { key: "firstName", labelAm: "የመጀመሪያ ስም", labelEn: "First Name" },
      { key: "lastName", labelAm: "የአያት ስም", labelEn: "Last Name" },
      { key: "gender", labelAm: "ጾታ", labelEn: "Gender" },
      { key: "dateOfBirth", labelAm: "የትውልድ ቀን", labelEn: "Date of Birth" },
    ],
  },
  {
    titleAm: "አድራሻ እና የቤተክርስቲያን ታሪክ",
    titleEn: "Contact & church history",
    fields: [
      { key: "email", labelAm: "ኢሜል", labelEn: "Email" },
      { key: "phone", labelAm: "ስልክ", labelEn: "Phone Number" },
      { key: "street1", labelAm: "የመንገድ አድራሻ", labelEn: "Street Address" },
      { key: "street2", labelAm: "የመንገድ አድራሻ መስመር 2", labelEn: "Street Address Line 2" },
      { key: "city", labelAm: "ከተማ", labelEn: "City" },
      { key: "state", labelAm: "ክልል / ክፍለ ሀገር", labelEn: "State / Province" },
      { key: "zip", labelAm: "ፖስታል / ዚፕ ኮድ", labelEn: "Postal / Zip Code" },
      {
        key: "previousChurch",
        labelAm: "ቀድመው ያመልኩበት የነበረ ቤተክርስቲያን?",
        labelEn: "What church did you attend before?",
      },
      { key: "pastorFirstName", labelAm: "የመጋቢው ስም (መጀመሪያ)", labelEn: "Pastor Name, First Name" },
      { key: "pastorLastName", labelAm: "የመጋቢው ስም (አያት)", labelEn: "Pastor Name, Last Name" },
    ],
  },
  {
    titleAm: "ቤተሰብ",
    titleEn: "Family",
    fields: [
      { key: "married", labelAm: "አግብተዋል?", labelEn: "Are you married?" },
      {
        key: "spouseFirstName",
        labelAm: "የባለቤትዎ የመጀመሪያ ስም",
        labelEn: "Spouse First Name",
        when: (d) => d.married === "Yes",
      },
      {
        key: "spouseLastName",
        labelAm: "የባለቤትዎ የአያት ስም",
        labelEn: "Spouse Last Name",
        when: (d) => d.married === "Yes",
      },
      { key: "hasKids", labelAm: "ልጆች አልዎት?", labelEn: "Do you have kids?" },
      {
        key: "kidsCount",
        labelAm: "ስንት ልጆች አልዎት?",
        labelEn: "How many kids do you have?",
        when: (d) => d.hasKids === "Yes",
      },
    ],
  },
  {
    titleAm: "አባልነት እና ጥምቀት",
    titleEn: "Membership & baptism",
    fields: [
      {
        key: "acceptedBylaw",
        labelAm: "የአቤኔዘር ኢትዮጵያን ቤ/ክ ባይሎ አንብበው ተቀብለዋል?",
        labelEn: "Do you read and accept the church bylaws?",
      },
      {
        key: "membershipDate",
        labelAm: "የአባልነት ማመልከቻ ቀን",
        labelEn: "Membership request date",
      },
      { key: "baptized", labelAm: "የውሃ ጥምቀት ወስደዋል?", labelEn: "Are you baptized?" },
      {
        key: "baptismDate",
        labelAm: "የጥምቀት ቀን",
        labelEn: "Baptism date",
        when: (d) => d.baptized === "Yes",
      },
    ],
  },
  {
    titleAm: "ምስክርነት እና ጸጋ",
    titleEn: "Testimony & gifts",
    fields: [
      {
        key: "testimony",
        labelAm: "ጌታን እንዴት እንዳገኙ — ምስክርነት",
        labelEn: "Salvation testimony",
      },
      {
        key: "gifts",
        labelAm: "ያልዎት ጸጋ ወይም ችሎታ",
        labelEn: "Talents and giftings",
      },
      {
        key: "previousRole",
        labelAm: "ቀድሞ ቤተክርስቲያን ላይ ያለዎት ሚና",
        labelEn: "Role in your past church",
      },
    ],
  },
];

export function fieldLabelBilingual(field: MembershipFieldDef) {
  return `${field.labelAm} / ${field.labelEn}`;
}

export function sectionTitleBilingual(section: MembershipSectionDef) {
  return `${section.titleAm} — ${section.titleEn}`;
}

export function membershipSummaryHtml(data: MembershipFormState, submittedAt: string) {
  const name = `${data.firstName} ${data.lastName}`.trim();
  let html = `<p><strong>New membership application</strong></p>`;
  html += `<p><strong>Name:</strong> ${escapeHtml(name)}<br/>`;
  html += `<strong>Email:</strong> ${escapeHtml(data.email)}<br/>`;
  html += `<strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`;
  html += `<p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>`;
  html += `<hr/>`;

  for (const section of membershipSections) {
    html += `<h3 style="margin:16px 0 8px;font-size:15px;">${escapeHtml(sectionTitleBilingual(section))}</h3><ul style="padding-left:18px;">`;
    for (const field of section.fields) {
      if (field.when && !field.when(data)) continue;
      const value = String(data[field.key] ?? "").trim();
      if (!value) continue;
      html += `<li style="margin-bottom:8px;"><strong>${escapeHtml(field.labelAm)}</strong><br/><span style="color:#444">${escapeHtml(field.labelEn)}</span><br/>${escapeHtml(value).replace(/\n/g, "<br/>")}</li>`;
    }
    html += `</ul>`;
  }

  html += `<p style="margin-top:12px;font-size:13px;">Final bylaws acceptance on submit: <strong>Yes</strong></p>`;
  return html;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
