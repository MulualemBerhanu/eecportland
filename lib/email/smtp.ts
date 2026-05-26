import { siteConfig } from "@/lib/site";

export const CHURCH_EMAIL_NOT_CONFIGURED = "CHURCH_EMAIL_NOT_CONFIGURED";

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  notify: string[];
};

/** Inboxes that receive contact, prayer, membership, and other form submissions. */
export function getNotifyEmails(): string[] {
  const raw =
    process.env.FORM_NOTIFY_EMAIL?.trim() ||
    process.env.MEMBERSHIP_NOTIFY_EMAIL?.trim() ||
    process.env.PASTOR_EMAIL?.trim() ||
    siteConfig.contact.email;

  return raw
    .split(/[,;]/)
    .map((e) => e.trim())
    .filter(Boolean);
}

export function getFromEmail(): string {
  return (
    process.env.FORM_FROM_EMAIL?.trim() ||
    process.env.MEMBERSHIP_FROM_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    siteConfig.contact.email
  );
}

export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = getFromEmail();
  const notify = getNotifyEmails();

  if (!host || !user || !pass || !from || notify.length === 0) return null;

  const port = Number(process.env.SMTP_PORT || "587");
  const secure =
    process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1" || port === 465;

  return { host, port, secure, user, pass, from, notify };
}
