import path from "node:path";
import { existsSync } from "node:fs";
import PDFDocument from "pdfkit";
import type { MembershipFormState } from "@/lib/membership/types";
import { membershipSections } from "@/lib/membership/fields";
import type { MembershipFieldDef, MembershipSectionDef } from "@/lib/membership/fields";
import { siteConfig } from "@/lib/site";

const ETHIOPIC_TTF = path.join(
  process.cwd(),
  "public/fonts/NotoSansEthiopic-Regular.ttf",
);
const LOGO_PATH = path.join(process.cwd(), "public/logo.png");

const LATIN_FONT = "Helvetica";
const LATIN_FONT_BOLD = "Helvetica-Bold";

const MARGIN = 48;
const HEADER_H = 92;
const FOOTER_H = 36;
const CONTENT_TOP = HEADER_H + 22;

const brand = {
  navy: "#0b1c2c",
  navySoft: "#1c2e45",
  gold: "#d4af37",
  goldLight: "#f1d27a",
  cream: "#faf8f5",
  creamCard: "#f7f5f2",
  border: "#e4dcd2",
  text: "#1a2a3a",
  textMuted: "#5c6570",
  white: "#ffffff",
} as const;

type PdfDoc = InstanceType<typeof PDFDocument>;

function amharicFont() {
  return existsSync(ETHIOPIC_TTF) ? ETHIOPIC_TTF : LATIN_FONT;
}

function contentWidth(doc: PdfDoc) {
  return doc.page.width - MARGIN * 2;
}

function contentBottom(doc: PdfDoc) {
  return doc.page.height - FOOTER_H - 16;
}

function collectPdfBuffer(doc: PdfDoc): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
}

/** Manual vertical cursor — never trust doc.y after text/image calls. */
type Layout = { y: number };

function measureText(
  doc: PdfDoc,
  font: string,
  size: number,
  text: string,
  width: number,
) {
  doc.save();
  doc.font(font).fontSize(size);
  const h = doc.heightOfString(text, { width, lineGap: 0 });
  doc.restore();
  return h;
}

function drawTextBlock(
  doc: PdfDoc,
  font: string,
  size: number,
  color: string,
  text: string,
  x: number,
  y: number,
  width: number,
) {
  doc.font(font).fontSize(size).fillColor(color);
  doc.text(text, x, y, { width, lineGap: 0 });
}

function drawPageHeader(doc: PdfDoc) {
  const pageW = doc.page.width;

  doc.save();
  doc.rect(0, 0, pageW, HEADER_H).fill(brand.navy);
  doc.rect(0, HEADER_H - 4, pageW, 4).fill(brand.gold);
  doc.restore();

  const logoSize = 56;
  const logoX = MARGIN;
  const logoY = 18;
  if (existsSync(LOGO_PATH)) {
    doc.save();
    doc.image(LOGO_PATH, logoX, logoY, {
      fit: [logoSize, logoSize],
      align: "center",
      valign: "center",
    });
    doc.restore();
  }

  const textX = logoX + logoSize + 16;
  const textW = pageW - textX - MARGIN;

  drawTextBlock(doc, LATIN_FONT_BOLD, 15, brand.white, siteConfig.name, textX, 22, textW);
  drawTextBlock(
    doc,
    LATIN_FONT,
    10,
    brand.goldLight,
    "Membership application",
    textX,
    42,
    textW,
  );
  drawTextBlock(doc, amharicFont(), 10, brand.cream, "የአባልነት ማመልከቻ", textX, 56, textW);
}

function drawAllPageFooters(doc: PdfDoc) {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const pageW = doc.page.width;
    const footerY = doc.page.height - FOOTER_H;

    doc.save();
    doc.moveTo(MARGIN, footerY - 8)
      .lineTo(pageW - MARGIN, footerY - 8)
      .strokeColor(brand.border)
      .lineWidth(0.75)
      .stroke();
    drawTextBlock(
      doc,
      LATIN_FONT,
      8,
      brand.textMuted,
      `${siteConfig.address.full}  ·  ${siteConfig.contact.email}  ·  ${siteConfig.contact.phone}`,
      MARGIN,
      footerY,
      contentWidth(doc),
    );
    doc.restore();
  }
}

function ensureSpace(doc: PdfDoc, layout: Layout, needed: number) {
  if (layout.y + needed > contentBottom(doc)) {
    doc.addPage();
    drawPageHeader(doc);
    layout.y = CONTENT_TOP;
  }
}

function drawApplicantSummary(
  doc: PdfDoc,
  layout: Layout,
  data: MembershipFormState,
  submittedAt: string,
) {
  const w = contentWidth(doc);
  const x = MARGIN;
  const h = 78;

  ensureSpace(doc, layout, h + 18);
  const y = layout.y;

  doc.save();
  doc.roundedRect(x, y, w, h, 10).fillAndStroke(brand.creamCard, brand.border);
  doc.rect(x, y, 5, h).fill(brand.gold);
  doc.restore();

  const innerX = x + 18;
  const innerW = w - 36;
  drawTextBlock(
    doc,
    LATIN_FONT_BOLD,
    13,
    brand.navy,
    `${data.firstName} ${data.lastName}`.trim(),
    innerX,
    y + 14,
    innerW,
  );
  drawTextBlock(
    doc,
    LATIN_FONT,
    9.5,
    brand.textMuted,
    `Email: ${data.email}   ·   Phone: ${data.phone}`,
    innerX,
    y + 32,
    innerW,
  );
  drawTextBlock(
    doc,
    LATIN_FONT,
    9,
    brand.textMuted,
    `Submitted: ${submittedAt}`,
    innerX,
    y + 46,
    innerW,
  );

  layout.y = y + h + 14;
}

function drawSectionHeader(doc: PdfDoc, layout: Layout, section: MembershipSectionDef) {
  const w = contentWidth(doc);
  const x = MARGIN;
  const h = 36;

  ensureSpace(doc, layout, h + 10);
  const y = layout.y;

  doc.save();
  doc.roundedRect(x, y, w, h, 8).fill(brand.navySoft);
  doc.rect(x, y, 4, h).fill(brand.gold);
  doc.restore();

  drawTextBlock(doc, amharicFont(), 11, brand.cream, section.titleAm, x + 14, y + 9, w - 24);
  drawTextBlock(doc, LATIN_FONT_BOLD, 9.5, brand.goldLight, section.titleEn, x + 14, y + 22, w - 24);

  layout.y = y + h + 8;
}

function drawFieldCard(
  doc: PdfDoc,
  layout: Layout,
  field: MembershipFieldDef,
  value: string,
) {
  const w = contentWidth(doc);
  const x = MARGIN;
  const padX = 14;
  const padY = 8;
  const innerW = w - padX * 2;
  const labelGap = 3;
  const dividerGap = 5;

  const amhH = measureText(doc, amharicFont(), 9.5, field.labelAm, innerW);
  const enH = measureText(doc, LATIN_FONT, 9, field.labelEn, innerW);
  const valH = measureText(doc, LATIN_FONT, 10, value, innerW);
  const cardH = Math.ceil(padY + amhH + labelGap + enH + dividerGap + valH + padY);

  ensureSpace(doc, layout, cardH + 6);
  const y = layout.y;

  doc.save();
  doc.roundedRect(x, y, w, cardH, 6).fillAndStroke(brand.white, brand.border);
  doc.restore();

  let cy = y + padY;
  drawTextBlock(doc, amharicFont(), 9.5, brand.navySoft, field.labelAm, x + padX, cy, innerW);
  cy += amhH + labelGap;

  drawTextBlock(doc, LATIN_FONT, 9, brand.textMuted, field.labelEn, x + padX, cy, innerW);
  cy += enH + dividerGap;

  doc.moveTo(x + padX, cy - 3)
    .lineTo(x + w - padX, cy - 3)
    .strokeColor(brand.border)
    .lineWidth(0.5)
    .stroke();

  drawTextBlock(doc, LATIN_FONT, 10, brand.text, value, x + padX, cy, innerW);

  layout.y = y + cardH + 6;
}

function drawBylawsNote(doc: PdfDoc, layout: Layout) {
  const w = contentWidth(doc);
  const x = MARGIN;
  const h = 52;

  ensureSpace(doc, layout, h + 8);
  const y = layout.y;

  doc.save();
  doc.roundedRect(x, y, w, h, 8).fillAndStroke("#eef6f0", "#b8d4c4");
  doc.restore();

  drawTextBlock(doc, amharicFont(), 9.5, "#1e4d32", "ባይሎ ተቀብሏል", x + 14, y + 12, w - 28);
  drawTextBlock(
    doc,
    LATIN_FONT,
    9.5,
    "#1e4d32",
    "Bylaws accepted before submit: Yes",
    x + 14,
    y + 28,
    w - 28,
  );

  layout.y = y + h + 8;
}

export async function buildMembershipPdf(
  data: MembershipFormState,
  submittedAt: string,
): Promise<Uint8Array> {
  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    bufferPages: true,
  });

  const done = collectPdfBuffer(doc);

  if (!existsSync(ETHIOPIC_TTF)) {
    console.warn("[membership-pdf] Missing NotoSansEthiopic-Regular.ttf — Amharic may not render.");
  }

  const layout: Layout = { y: CONTENT_TOP };

  drawPageHeader(doc);
  drawApplicantSummary(doc, layout, data, submittedAt);

  for (const section of membershipSections) {
    const visibleFields = section.fields.filter((field) => {
      if (field.when && !field.when(data)) return false;
      return String(data[field.key] ?? "").trim().length > 0;
    });
    if (visibleFields.length === 0) continue;

    drawSectionHeader(doc, layout, section);
    for (const field of visibleFields) {
      const value = String(data[field.key] ?? "").trim();
      drawFieldCard(doc, layout, field, value);
    }
  }

  drawBylawsNote(doc, layout);
  drawAllPageFooters(doc);

  doc.end();
  const buffer = await done;
  return new Uint8Array(buffer);
}

export function membershipPdfFilename(data: MembershipFormState) {
  const safe = (s: string) =>
    s
      .trim()
      .replace(/[^\w.-]+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40) || "applicant";
  const stamp = new Date().toISOString().slice(0, 10);
  return `membership-${safe(data.lastName)}-${safe(data.firstName)}-${stamp}.pdf`;
}
