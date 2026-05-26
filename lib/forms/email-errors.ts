import { CHURCH_EMAIL_NOT_CONFIGURED } from "@/lib/email/smtp";

export function emailNotConfiguredResponse() {
  return {
    status: 503 as const,
    body: {
      error:
        "Online submission is not configured yet. Please call the church office or email us directly.",
    },
  };
}

export function handleFormEmailError(err: unknown) {
  const message = err instanceof Error ? err.message : "Unknown error";
  if (message === CHURCH_EMAIL_NOT_CONFIGURED) {
    return emailNotConfiguredResponse();
  }
  return null;
}
