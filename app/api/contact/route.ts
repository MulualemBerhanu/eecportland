import { NextResponse } from "next/server";
import { sendChurchEmail } from "@/lib/email/send-church-email";
import { formNotificationHtml, formNotificationText } from "@/lib/email/form-html";
import { handleFormEmailError } from "@/lib/forms/email-errors";
import { isHoneypotFilled } from "@/lib/forms/honeypot";
import { formSubmittedAtPacific } from "@/lib/forms/submitted-at";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  companyWebsite?: string;
};

function validateContact(body: ContactBody) {
  const errors: Partial<Record<"name" | "email" | "subject" | "message", string>> = {};
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!subject) errors.subject = "Add a short subject.";
  if (!message) errors.message = "How can we help?";
  else if (message.length < 15) errors.message = "A bit more detail will help us respond well.";

  return { errors, name, email, subject, message };
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isHoneypotFilled(body.companyWebsite)) {
    return NextResponse.json({ error: "Unable to submit." }, { status: 400 });
  }

  const { errors, name, email, subject, message } = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const submittedAt = formSubmittedAtPacific();

  try {
    const fields = [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Subject", value: subject },
      { label: "Message", value: message },
    ];
    const title = "New contact form message";

    await sendChurchEmail({
      subject: `Contact form — ${subject}`,
      html: formNotificationHtml(title, fields, submittedAt),
      text: formNotificationText(title, fields, submittedAt),
      replyTo: email,
    });
  } catch (err) {
    const handled = handleFormEmailError(err);
    if (handled) {
      return NextResponse.json(handled.body, { status: handled.status });
    }
    console.error("[contact] submit failed:", err);
    return NextResponse.json(
      { error: "We could not send your message. Please try again or call the church office." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
