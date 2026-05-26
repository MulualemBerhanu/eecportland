import type { MembershipFormState } from "@/lib/membership/types";
import { membershipPdfFilename } from "@/lib/membership/pdf";
import { membershipSummaryHtml } from "@/lib/membership/fields";
import { escapeHtml } from "@/lib/email/escape-html";
import { sendChurchEmail } from "@/lib/email/send-church-email";
import { getFromEmail, getSmtpConfig } from "@/lib/email/smtp";
import { siteConfig } from "@/lib/site";
import nodemailer from "nodemailer";

export { CHURCH_EMAIL_NOT_CONFIGURED as MEMBERSHIP_EMAIL_NOT_CONFIGURED } from "@/lib/email/smtp";

export async function sendMembershipApplicationEmail(
  data: MembershipFormState,
  pdfBytes: Uint8Array,
  submittedAt: string,
) {
  const name = `${data.firstName} ${data.lastName}`.trim();
  const filename = membershipPdfFilename(data);

  await sendChurchEmail({
    subject: `New membership application — ${name}`,
    html: membershipSummaryHtml(data, submittedAt),
    text: `New membership application from ${name} (${data.email}). See attached PDF.`,
    replyTo: data.email,
    attachments: [
      {
        filename,
        content: Buffer.from(pdfBytes),
        contentType: "application/pdf",
      },
    ],
  });

  const sendConfirmation = process.env.MEMBERSHIP_SEND_APPLICANT_CONFIRMATION === "true";
  const smtp = getSmtpConfig();
  if (!sendConfirmation || !data.email || !smtp) return;

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  await transporter.sendMail({
    from: getFromEmail(),
    to: data.email,
    subject: `We received your membership application — ${siteConfig.shortName}`,
    html: `<p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for submitting your membership application to ${escapeHtml(siteConfig.name)}. Our team will review it and contact you soon.</p>
      <p>Blessings,<br/>${escapeHtml(siteConfig.name)}</p>`,
    text: `Thank you for submitting your membership application. Our team will contact you soon.`,
  });
}
