"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { HoneypotField } from "@/components/shared/HoneypotField";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  request: string;
  isPrivate: boolean;
};

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  request: "",
  isPrivate: false,
};

function validate(values: FormState): Partial<Record<keyof FormState, string>> {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (!values.fullName.trim()) e.fullName = "Please enter your name.";
  if (!values.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = "Enter a valid email address.";
  if (!values.request.trim()) e.request = "Please share your prayer request.";
  else if (values.request.trim().length < 10)
    e.request = "A few more words will help us pray specifically.";
  return e;
}

export function PrayerRequestForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, companyWebsite: honeypot }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Partial<Record<keyof FormState, string>>;
      };

      if (!res.ok) {
        if (payload.errors) setErrors(payload.errors);
        setStatus("error");
        setErrorMessage(
          payload.error ??
            "We could not send your request. Please try again or email us directly.",
        );
        return;
      }

      setStatus("success");
      setValues(initial);
      setHoneypot("");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again, or email us directly.",
      );
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-charcoal-800 shadow-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25";

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-cream-200 bg-white p-8 shadow-sm sm:p-10"
      noValidate
    >
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-sage-500/25 bg-sage-500/[0.06] px-6 py-8 text-center"
            role="status"
          >
            <p className="font-heading text-xl text-navy-950">
              Thank you. We’re praying for you
            </p>
            <p className="mt-3 text-charcoal-700">
              Your request was received. If you asked for follow-up, a pastor or
              care team member will be in touch.
            </p>
            <button
              type="button"
              className="mt-8 text-sm font-semibold text-gold-700 underline-offset-4 hover:underline"
              onClick={() => setStatus("idle")}
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="prayer-name" className="text-sm font-medium text-navy-950">
                  Full name
                </label>
                <input
                  id="prayer-name"
                  name="fullName"
                  autoComplete="name"
                  value={values.fullName}
                  onChange={(ev) =>
                    setValues((v) => ({ ...v, fullName: ev.target.value }))
                  }
                  className={cn(fieldClass, errors.fullName && "border-red-400/80")}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "err-name" : undefined}
                />
                {errors.fullName ? (
                  <p id="err-name" className="mt-1 text-sm text-red-700">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="prayer-email" className="text-sm font-medium text-navy-950">
                  Email
                </label>
                <input
                  id="prayer-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(ev) =>
                    setValues((v) => ({ ...v, email: ev.target.value }))
                  }
                  className={cn(fieldClass, errors.email && "border-red-400/80")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
                {errors.email ? (
                  <p id="err-email" className="mt-1 text-sm text-red-700">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="prayer-phone" className="text-sm font-medium text-navy-950">
                Phone <span className="font-normal text-charcoal-700">(optional)</span>
              </label>
              <input
                id="prayer-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(ev) =>
                  setValues((v) => ({ ...v, phone: ev.target.value }))
                }
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="prayer-body" className="text-sm font-medium text-navy-950">
                Prayer request
              </label>
              <textarea
                id="prayer-body"
                name="request"
                rows={5}
                value={values.request}
                onChange={(ev) =>
                  setValues((v) => ({ ...v, request: ev.target.value }))
                }
                className={cn(
                  fieldClass,
                  "resize-y min-h-[140px]",
                  errors.request && "border-red-400/80",
                )}
                aria-invalid={!!errors.request}
                aria-describedby={errors.request ? "err-req" : undefined}
              />
              {errors.request ? (
                <p id="err-req" className="mt-1 text-sm text-red-700">
                  {errors.request}
                </p>
              ) : null}
            </div>
            <div className="flex items-start gap-3">
              <input
                id="prayer-private"
                name="isPrivate"
                type="checkbox"
                checked={values.isPrivate}
                onChange={(ev) =>
                  setValues((v) => ({ ...v, isPrivate: ev.target.checked }))
                }
                className="mt-1 size-4 rounded border-cream-300 text-navy-900 focus:ring-gold-500"
              />
              <label htmlFor="prayer-private" className="text-sm text-charcoal-700">
                Keep this confidential, and share only with pastors and the prayer team
                (not public prayer list).
              </label>
            </div>
            {status === "error" ? (
              <p className="text-sm text-red-700" role="alert">
                {errorMessage}
              </p>
            ) : null}
            <CTAButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "loading"}
              className="w-full sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                "Submit request"
              )}
            </CTAButton>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
