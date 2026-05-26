import { NextResponse } from "next/server";
import { sendChurchEmail } from "@/lib/email/send-church-email";
import { formNotificationHtml, formNotificationText } from "@/lib/email/form-html";
import { handleFormEmailError } from "@/lib/forms/email-errors";
import { isHoneypotFilled } from "@/lib/forms/honeypot";
import { formSubmittedAtPacific } from "@/lib/forms/submitted-at";

export const runtime = "nodejs";

type PrayerBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  request?: string;
  isPrivate?: boolean;
  companyWebsite?: string;
};

function validatePrayer(body: PrayerBody) {
  const errors: Partial<Record<"fullName" | "email" | "request", string>> = {};
  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const request = body.request?.trim() ?? "";

  if (!fullName) errors.fullName = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!request) errors.request = "Please share your prayer request.";
  else if (request.length < 10) errors.request = "A few more words will help us pray specifically.";

  return { errors, fullName, email, phone, request, isPrivate: Boolean(body.isPrivate) };
}

export async function POST(request: Request) {
  let body: PrayerBody;
  try {
    body = (await request.json()) as PrayerBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isHoneypotFilled(body.companyWebsite)) {
    return NextResponse.json({ error: "Unable to submit." }, { status: 400 });
  }

  const { errors, fullName, email, phone, request: prayerRequest, isPrivate } =
    validatePrayer(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const submittedAt = formSubmittedAtPacific();

  try {
    const fields = [
      { label: "Name", value: fullName },
      { label: "Email", value: email },
      { label: "Phone", value: phone || "—" },
      { label: "Confidential", value: isPrivate ? "Yes — pastors/prayer team only" : "No" },
      { label: "Prayer request", value: prayerRequest },
    ];
    const title = "New prayer request";

    await sendChurchEmail({
      subject: `Prayer request — ${fullName}`,
      html: formNotificationHtml(title, fields, submittedAt),
      text: formNotificationText(title, fields, submittedAt),
      replyTo: email,
    });
  } catch (err) {
    const handled = handleFormEmailError(err);
    if (handled) {
      return NextResponse.json(handled.body, { status: handled.status });
    }
    console.error("[prayer] submit failed:", err);
    return NextResponse.json(
      { error: "We could not send your request. Please try again or email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
