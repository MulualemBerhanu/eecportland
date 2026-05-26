import { NextResponse } from "next/server";
import { buildMembershipPdf } from "@/lib/membership/pdf";
import { sendMembershipApplicationEmail } from "@/lib/membership/email";
import {
  hasMembershipErrors,
  validateMembershipApplication,
} from "@/lib/membership/validate";
import type { MembershipFormState } from "@/lib/membership/types";
import { membershipFormKeys } from "@/lib/membership/types";

export const runtime = "nodejs";

type SubmitBody = {
  data?: Partial<MembershipFormState>;
  finalBylawAccepted?: boolean;
  /** Honeypot — must be empty */
  companyWebsite?: string;
};

function pickFormData(raw: Partial<MembershipFormState> | undefined): MembershipFormState {
  const data = {} as MembershipFormState;
  for (const key of membershipFormKeys) {
    data[key] = String(raw?.[key] ?? "").trim();
  }
  return data;
}

export async function POST(request: Request) {
  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.companyWebsite?.trim()) {
    return NextResponse.json({ error: "Unable to submit." }, { status: 400 });
  }

  const data = pickFormData(body.data);
  const finalBylawAccepted = Boolean(body.finalBylawAccepted);
  const errors = validateMembershipApplication(data, { finalBylawAccepted });

  if (hasMembershipErrors(errors)) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    const pdfBytes = await buildMembershipPdf(data, submittedAt);
    await sendMembershipApplicationEmail(data, pdfBytes, submittedAt);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message === "MEMBERSHIP_EMAIL_NOT_CONFIGURED" || message === "CHURCH_EMAIL_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          error:
            "Online submission is not configured yet. Please call the church office or email us directly.",
        },
        { status: 503 },
      );
    }
    console.error("[membership] submit failed:", err);
    return NextResponse.json(
      { error: "We could not send your application. Please try again or contact the church office." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
