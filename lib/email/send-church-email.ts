import nodemailer from "nodemailer";
import {
  CHURCH_EMAIL_NOT_CONFIGURED,
  getSmtpConfig,
  type SmtpConfig,
} from "@/lib/email/smtp";

export type ChurchEmailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export type SendChurchEmailOptions = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: ChurchEmailAttachment[];
};

function createTransporter(smtp: SmtpConfig) {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });
}

export async function sendChurchEmail(options: SendChurchEmailOptions) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error(CHURCH_EMAIL_NOT_CONFIGURED);
  }

  const transporter = createTransporter(smtp);

  await transporter.sendMail({
    from: smtp.from,
    to: smtp.notify,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments,
  });
}
