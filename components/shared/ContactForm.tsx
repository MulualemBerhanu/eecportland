"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { HoneypotField } from "@/components/shared/HoneypotField";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values: FormState): Partial<Record<keyof FormState, string>> {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (!values.name.trim()) e.name = "Please enter your name.";
  if (!values.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = "Enter a valid email address.";
  if (!values.subject.trim()) e.subject = "Add a short subject.";
  if (!values.message.trim()) e.message = "How can we help?";
  else if (values.message.trim().length < 15)
    e.message = "A bit more detail will help us respond well.";
  return e;
}

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
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
            "We could not send your message. Please try again or call the church office.",
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
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate>
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-sage-500/25 bg-sage-500/[0.06] px-6 py-6"
            role="status"
          >
            <p className="font-heading text-lg text-navy-950">Message sent</p>
            <p className="mt-2 text-sm text-charcoal-700">
              Thank you! We typically reply within two business days.
            </p>
            <button
              type="button"
              className="mt-4 text-sm font-semibold text-gold-700 underline-offset-4 hover:underline"
              onClick={() => setStatus("idle")}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div key="fields" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-navy-950">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(ev) =>
                    setValues((v) => ({ ...v, name: ev.target.value }))
                  }
                  className={cn(fieldClass, errors.name && "border-red-400/80")}
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-red-700">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-navy-950">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(ev) =>
                    setValues((v) => ({ ...v, email: ev.target.value }))
                  }
                  className={cn(fieldClass, errors.email && "border-red-400/80")}
                />
                {errors.email ? (
                  <p className="mt-1 text-sm text-red-700">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="text-sm font-medium text-navy-950">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                value={values.subject}
                onChange={(ev) =>
                  setValues((v) => ({ ...v, subject: ev.target.value }))
                }
                className={cn(fieldClass, errors.subject && "border-red-400/80")}
              />
              {errors.subject ? (
                <p className="mt-1 text-sm text-red-700">{errors.subject}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="contact-message" className="text-sm font-medium text-navy-950">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(ev) =>
                  setValues((v) => ({ ...v, message: ev.target.value }))
                }
                className={cn(
                  fieldClass,
                  "min-h-[140px] resize-y",
                  errors.message && "border-red-400/80",
                )}
              />
              {errors.message ? (
                <p className="mt-1 text-sm text-red-700">{errors.message}</p>
              ) : null}
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
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                "Send message"
              )}
            </CTAButton>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
