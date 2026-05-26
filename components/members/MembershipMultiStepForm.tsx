"use client";

import { NavLink } from "@/components/layout/NavLink";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { CTALink } from "@/components/shared/CTAButton";
import type { MembershipFormState } from "@/lib/membership/types";
import {
  hasMembershipErrors,
  validateMembershipApplication,
} from "@/lib/membership/validate";
import {
  clearMembershipDraftStorage,
  consumeBylawsReturnFlag,
  isReturningFromBylaws,
  loadMembershipDraft,
  markLeavingMembersForBylaws,
  saveMembershipDraft,
} from "@/lib/membership-draft-storage";
import { siteConfig } from "@/lib/site";
import { cn, isDateNotInFuture, isValidUsPhone, todayDateInputMax } from "@/lib/utils";

const steps = [
  { id: "faith", label: "Faith & profile" },
  { id: "contact", label: "Contact & church history" },
  { id: "family", label: "Family" },
  { id: "membership", label: "Membership & baptism" },
  { id: "testimony", label: "Testimony & gifts" },
] as const;

export type FormState = MembershipFormState;

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  bornAgain: "",
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
  previousChurch: "",
  pastorFirstName: "",
  pastorLastName: "",
  married: "",
  spouseFirstName: "",
  spouseLastName: "",
  hasKids: "",
  kidsCount: "",
  acceptedBylaw: "",
  membershipDate: "",
  baptized: "",
  baptismDate: "",
  testimony: "",
  gifts: "",
  previousRole: "",
};

const stepFieldKeys: (keyof FormState)[][] = [
  ["bornAgain", "firstName", "lastName", "gender", "dateOfBirth"],
  [
    "email",
    "phone",
    "street1",
    "city",
    "state",
    "zip",
    "previousChurch",
    "pastorFirstName",
    "pastorLastName",
  ],
  ["married", "spouseFirstName", "spouseLastName", "hasKids", "kidsCount"],
  ["acceptedBylaw", "membershipDate", "baptized", "baptismDate"],
  ["testimony", "gifts", "previousRole"],
];

export function MembershipMultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [finalBylawAccepted, setFinalBylawAccepted] = useState(false);
  const [bornAgainBlockedOpen, setBornAgainBlockedOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (submitStatus !== "success") return;
    const target =
      document.getElementById("membership-form") ?? successRef.current;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitStatus]);

  useLayoutEffect(() => {
    if (isReturningFromBylaws()) {
      consumeBylawsReturnFlag();
      const draft = loadMembershipDraft();
      if (draft) {
        setStep(draft.step);
        setData({ ...initialState, ...draft.data });
        setFinalBylawAccepted(draft.finalBylawAccepted);
      }
      return;
    }
    clearMembershipDraftStorage();
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      saveMembershipDraft({ step, data, finalBylawAccepted });
    }, 200);
    return () => window.clearTimeout(t);
  }, [step, data, finalBylawAccepted]);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateHasKids = (value: string) => {
    setData((prev) => ({
      ...prev,
      hasKids: value,
      ...(value === "Yes" ? {} : { kidsCount: "" }),
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.hasKids;
      if (value !== "Yes") delete next.kidsCount;
      return next;
    });
  };

  const updateMarried = (value: string) => {
    setData((prev) => ({
      ...prev,
      married: value,
      ...(value === "Yes"
        ? {}
        : { spouseFirstName: "", spouseLastName: "" }),
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.married;
      if (value !== "Yes") {
        delete next.spouseFirstName;
        delete next.spouseLastName;
      }
      return next;
    });
  };

  const requireField = (
    nextErrors: FormErrors,
    key: keyof FormState,
    label: string,
    condition = true,
  ) => {
    if (!condition) return;
    if (!String(data[key] ?? "").trim()) {
      nextErrors[key] = `${label} is required.`;
    }
  };

  const validateStep = (currentStep: number) => {
    const nextErrors: FormErrors = {};

    if (currentStep === 0) {
      requireField(nextErrors, "bornAgain", "Born again question");
      requireField(nextErrors, "firstName", "First Name");
      requireField(nextErrors, "lastName", "Last Name");
      requireField(nextErrors, "gender", "Gender");
      requireField(nextErrors, "dateOfBirth", "Date of Birth");
      if (data.dateOfBirth && !isDateNotInFuture(data.dateOfBirth)) {
        nextErrors.dateOfBirth = "Date of birth cannot be in the future.";
      }
    }

    if (currentStep === 1) {
      requireField(nextErrors, "email", "Email");
      requireField(nextErrors, "phone", "Phone Number");
      requireField(nextErrors, "street1", "Street Address");
      requireField(nextErrors, "city", "City");
      requireField(nextErrors, "state", "State / Province");
      requireField(nextErrors, "zip", "Postal / Zip Code");
      requireField(nextErrors, "previousChurch", "Previous Church");
      requireField(nextErrors, "pastorFirstName", "Pastor First Name");
      requireField(nextErrors, "pastorLastName", "Pastor Last Name");

      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        nextErrors.email = "Please enter a valid email address.";
      }
      if (data.phone && !isValidUsPhone(data.phone)) {
        nextErrors.phone =
          "Please enter a valid US phone number (e.g. (503) 555-1234 or 503-555-1234).";
      }
    }

    if (currentStep === 2) {
      requireField(nextErrors, "married", "Marriage question");
      requireField(nextErrors, "spouseFirstName", "Spouse First Name", data.married === "Yes");
      requireField(nextErrors, "spouseLastName", "Spouse Last Name", data.married === "Yes");
      requireField(nextErrors, "hasKids", "Kids question");
      if (data.hasKids === "Yes") {
        requireField(nextErrors, "kidsCount", "How many kids");
        const count = data.kidsCount.trim();
        if (count && !/^\d{1,2}$/.test(count)) {
          nextErrors.kidsCount = "Please enter a number from 1 to 99.";
        } else if (count && Number(count) < 1) {
          nextErrors.kidsCount = "Please enter at least 1.";
        }
      }
    }

    if (currentStep === 3) {
      requireField(nextErrors, "acceptedBylaw", "Bylaw question");
      requireField(nextErrors, "membershipDate", "Membership Date");
      if (data.membershipDate && !isDateNotInFuture(data.membershipDate)) {
        nextErrors.membershipDate = "Membership date cannot be in the future.";
      }
      requireField(nextErrors, "baptized", "Baptism question");
      requireField(nextErrors, "baptismDate", "Baptism Date", data.baptized === "Yes");
      if (data.baptized === "Yes" && data.baptismDate && !isDateNotInFuture(data.baptismDate)) {
        nextErrors.baptismDate = "Baptism date cannot be in the future.";
      }
    }

    if (currentStep === 4) {
      requireField(nextErrors, "testimony", "Testimony");
      requireField(nextErrors, "gifts", "Talents / giftings");
      requireField(nextErrors, "previousRole", "Past church role");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetFormDraft = () => {
    clearMembershipDraftStorage();
    setStep(0);
    setData(initialState);
    setErrors({});
    setFinalBylawAccepted(false);
  };

  const handleNext = () => {
    if (step === 0 && data.bornAgain === "No") {
      resetFormDraft();
      setBornAgainBlockedOpen(true);
      return;
    }
    const valid = validateStep(step);
    if (!valid) return;
    setStep((s) => Math.min(4, s + 1));
  };

  const handleSubmit = async () => {
    const allErrors = validateMembershipApplication(data, { finalBylawAccepted });
    setErrors(allErrors);
    if (hasMembershipErrors(allErrors)) {
      const firstStepWithError = stepFieldKeys.findIndex((keys) =>
        keys.some((key) => allErrors[key]),
      );
      if (firstStepWithError >= 0) setStep(firstStepWithError);
      setSubmitStatus("error");
      setSubmitMessage("Please complete all required fields before submitting.");
      return;
    }

    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          finalBylawAccepted,
          companyWebsite: honeypot,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: FormErrors;
      };

      if (!res.ok) {
        if (payload.errors) setErrors(payload.errors);
        setSubmitStatus("error");
        setSubmitMessage(
          payload.error ??
            "We could not send your application. Please try again or contact the church office.",
        );
        return;
      }

      resetFormDraft();
      setSubmitStatus("success");
      setSubmitMessage("");
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(
        "Network error. Please check your connection and try again, or call the church office.",
      );
    }
  };

  if (submitStatus === "success") {
    return (
      <div
        ref={successRef}
        className="rounded-3xl border border-sage-500/25 bg-sage-500/[0.06] p-8 shadow-card-soft sm:p-10"
        role="status"
      >
        <p className="flex items-center gap-2 font-heading text-2xl text-navy-950">
          <CheckCircle2 className="size-6 text-forest-700" aria-hidden />
          Application submitted
        </p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
          Thank you. Your membership application was sent to our church office. Someone will
          follow up with you soon.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex rounded-full border border-cream-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-cream-50"
          onClick={() => setSubmitStatus("idle")}
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-card-soft sm:p-10" suppressHydrationWarning>
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold tracking-[0.18em] text-gold-700 uppercase">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{steps[step].label}</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-forest-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-5 grid grid-cols-5 gap-2">
          {steps.map((item, idx) => (
            <div
              key={item.id}
              className={cn(
                "h-1.5 rounded-full transition",
                idx <= step ? "bg-navy-950" : "bg-cream-200",
              )}
              aria-hidden
            />
          ))}
        </div>
      </div>

      {step === 0 ? (
        <div className="space-y-5">
          <YesNoField
            label="ጌታን እንደግል አዳኝ አድርገው ተቀብለዋል? Are you born again christian?"
            value={data.bornAgain}
            onChange={(v) => update("bornAgain", v)}
            error={errors.bornAgain}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="የመጀመሪያ ስም, First Name" value={data.firstName} onChange={(v) => update("firstName", v)} error={errors.firstName} required />
            <Input label="የአያት ስም, Last Name" value={data.lastName} onChange={(v) => update("lastName", v)} error={errors.lastName} required />
          </div>
          <SelectField
            label="ጾታ Gender"
            value={data.gender}
            onChange={(v) => update("gender", v)}
            options={["Male", "Female"]}
            error={errors.gender}
            required
          />
          <Input
            label="የትውልድ ቀን Date of Birth"
            type="date"
            value={data.dateOfBirth}
            onChange={(v) => update("dateOfBirth", v)}
            error={errors.dateOfBirth}
            required
            max={todayDateInputMax()}
          />
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-5">
          <Input label="ኢሜል Email" type="email" value={data.email} onChange={(v) => update("email", v)} error={errors.email} required />
          <Input label="ስልክ Phone Number" type="tel" value={data.phone} onChange={(v) => update("phone", v)} error={errors.phone} required />
          <div className="space-y-4 rounded-2xl border border-cream-200 bg-cream-50/70 p-5">
            <p className="text-sm font-semibold text-navy-950">አድራሻ Address</p>
            <Input label="Street Address" value={data.street1} onChange={(v) => update("street1", v)} error={errors.street1} required />
            <Input label="Street Address Line 2" value={data.street2} onChange={(v) => update("street2", v)} />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="City" value={data.city} onChange={(v) => update("city", v)} error={errors.city} required />
              <Input label="State / Province" value={data.state} onChange={(v) => update("state", v)} error={errors.state} required />
              <Input label="Postal / Zip Code" value={data.zip} onChange={(v) => update("zip", v)} error={errors.zip} required />
            </div>
          </div>
          <Input
            label="ቀድመው ያመልኩበት የነበረ ቤተክርስቲያን? What church are you attend before?"
            value={data.previousChurch}
            onChange={(v) => update("previousChurch", v)}
            error={errors.previousChurch}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="የመጋቢው ስም Pastor Name, First Name" value={data.pastorFirstName} onChange={(v) => update("pastorFirstName", v)} error={errors.pastorFirstName} required />
            <Input label="የመጋቢው ስም Pastor Name, Last Name" value={data.pastorLastName} onChange={(v) => update("pastorLastName", v)} error={errors.pastorLastName} required />
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-5">
          <YesNoField
            label="አግብተዋል? Are you married?"
            value={data.married}
            onChange={updateMarried}
            error={errors.married}
            required
          />
          {data.married === "Yes" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="የባለቤትዎ የመጀመሪያ ስም, Spouse First Name"
                value={data.spouseFirstName}
                onChange={(v) => update("spouseFirstName", v)}
                error={errors.spouseFirstName}
                required
              />
              <Input
                label="የባለቤትዎ የአያት ስም Spouse Last Name"
                value={data.spouseLastName}
                onChange={(v) => update("spouseLastName", v)}
                error={errors.spouseLastName}
                required
              />
            </div>
          ) : null}
          <YesNoField
            label="ልጆች አልዎት? Do you Have Kids?"
            value={data.hasKids}
            onChange={updateHasKids}
            error={errors.hasKids}
            required
          />
          {data.hasKids === "Yes" ? (
            <Input
              label="መልስዎ አዎ ከሆነ? ስንት ልጆች አልዎት? If Yes! How many Kids do you have?"
              type="number"
              min={1}
              max="99"
              value={data.kidsCount}
              onChange={(v) => update("kidsCount", v)}
              error={errors.kidsCount}
              required
            />
          ) : null}
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-5">
          <YesNoField
            label="የአቤኔዘር ኢትዮጵያን ቤ/ክ ባይሎ አንብበው ተቀብለዋል? Do you read and Accept the church Bylaw?"
            value={data.acceptedBylaw}
            onChange={(v) => update("acceptedBylaw", v)}
            error={errors.acceptedBylaw}
            required
          />
          <Input
            label="የአባልነት ማመልከቻ ቀን Membership request date (application date)"
            type="date"
            value={data.membershipDate}
            onChange={(v) => update("membershipDate", v)}
            error={errors.membershipDate}
            required
          />
          <YesNoField
            label="የውሃ ጥምቀት ወስደዋል? Are you Baptized?"
            value={data.baptized}
            onChange={(v) => update("baptized", v)}
            error={errors.baptized}
            required
          />
          <Input
            label="መቼ? When? Date"
            type="date"
            value={data.baptismDate}
            onChange={(v) => update("baptismDate", v)}
            error={errors.baptismDate}
            required={data.baptized === "Yes"}
          />
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-5">
          <Textarea
            label="ጌታን እንዴት እንዳገኙ ምስክርነትዎን ቢነግሩን? Could you share with us a short testimony of your salvation?"
            value={data.testimony}
            onChange={(v) => update("testimony", v)}
            error={errors.testimony}
            required
          />
          <Textarea
            label="ያልዎት ጸጋ ወይም ችሎታ? What are some of your talents and/or giftings?"
            value={data.gifts}
            onChange={(v) => update("gifts", v)}
            error={errors.gifts}
            required
          />
          <Textarea
            label="የቀድሞ ቤተክርስቲያን ሐላፊነት ነበርዎት? ከነበርዎት? What role do you play in your past church?, if any?"
            value={data.previousRole}
            onChange={(v) => update("previousRole", v)}
            error={errors.previousRole}
            required
          />
          <div className="rounded-2xl border border-forest-600/20 bg-forest-600/10 p-4 text-sm text-charcoal-800">
            <p className="flex items-center gap-2 font-medium text-navy-950">
              <CheckCircle2 className="size-4 text-forest-700" aria-hidden />
              Final submit
            </p>
            <p className="mt-1">
              Review your answers, accept the bylaws below, then submit. Our office and pastor
              will receive your application as a PDF by email.
            </p>
          </div>
          <label className="flex items-start gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
            <input
              type="checkbox"
              checked={finalBylawAccepted}
              onChange={(e) => setFinalBylawAccepted(e.target.checked)}
              className="mt-1 size-4 rounded border-cream-400 text-navy-950 focus:ring-gold-500/40"
            />
            <span className="text-sm leading-relaxed text-charcoal-800">
              I have read and accept the church bylaws before submitting this membership
              request.{" "}
              <NavLink
                href="/bylaws"
                className="font-semibold text-navy-950 underline"
                onAfterClick={markLeavingMembersForBylaws}
              >
                Review bylaws
              </NavLink>
              .
            </span>
          </label>
        </div>
      ) : null}

      <div className="sr-only" aria-hidden>
        <label htmlFor="membership-company-website">Company website</label>
        <input
          id="membership-company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {submitStatus === "error" && submitMessage ? (
        <p className="mt-6 rounded-2xl border border-burgundy-700/25 bg-burgundy-700/[0.06] px-4 py-3 text-sm text-burgundy-900">
          {submitMessage}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex rounded-full border border-cream-300 bg-white px-5 py-2.5 text-sm font-semibold text-charcoal-700 transition hover:border-cream-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <div className="flex items-center gap-3">
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex rounded-full bg-navy-950 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-navy-900"
            >
              Next step
            </button>
          ) : (
            <>
              {finalBylawAccepted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitStatus === "loading"}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-8 py-3.5 text-[0.9375rem] font-semibold text-cream-50 transition hover:bg-navy-900 disabled:cursor-wait disabled:opacity-70"
                >
                  {submitStatus === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "Submit application"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex rounded-full bg-navy-950/45 px-6 py-2.5 text-sm font-semibold text-cream-50/90"
                >
                  Accept bylaws to submit
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <p className="mt-5 text-xs text-charcoal-700/80">
        Need help filling this out? Call{" "}
        <a href={`tel:${siteConfig.contact.phoneTel}`} className="font-semibold underline">
          {siteConfig.contact.phone}
        </a>
        .
      </p>

      {mounted && bornAgainBlockedOpen
        ? createPortal(
            <BornAgainBlockedModal onClose={() => setBornAgainBlockedOpen(false)} />,
            document.body,
          )
        : null}
    </div>
  );
}

function BornAgainBlockedModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-950/55 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="born-again-blocked-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-cream-200 bg-white p-6 shadow-[0_24px_64px_-16px_rgba(11,28,44,0.35)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-cream-200 text-charcoal-700 transition hover:bg-cream-100"
          aria-label="Close"
        >
          <X className="size-4" aria-hidden />
        </button>
        <h2
          id="born-again-blocked-title"
          className="pr-10 font-heading text-xl tracking-tight text-navy-950 sm:text-2xl"
        >
          Unable to continue
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-charcoal-700 sm:text-[0.9375rem]">
          You can&apos;t fill out this form right now. Please contact us before completing a
          membership application so we can walk with you first.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTALink href="/contact" variant="primary" size="md" className="w-full sm:w-auto">
            Contact us
          </CTALink>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-full border border-cream-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-cream-50 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  error,
  required,
  max,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  required?: boolean;
  max?: string;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-950">
        {label}
        {required ? <span className="ml-1 text-burgundy-700">*</span> : null}
      </span>
      <input
        type={type}
        value={value}
        max={max}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-charcoal-800 outline-none transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/25",
          error ? "border-burgundy-700/45" : "border-cream-300",
        )}
      />
      {error ? <span className="mt-1.5 block text-xs text-burgundy-800">{error}</span> : null}
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-950">
        {label}
        {required ? <span className="ml-1 text-burgundy-700">*</span> : null}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal-800 outline-none transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/25",
          error ? "border-burgundy-700/45" : "border-cream-300",
        )}
      />
      {error ? <span className="mt-1.5 block text-xs text-burgundy-800">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-950">
        {label}
        {required ? <span className="ml-1 text-burgundy-700">*</span> : null}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-charcoal-800 outline-none transition focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/25",
          error ? "border-burgundy-700/45" : "border-cream-300",
        )}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="mt-1.5 block text-xs text-burgundy-800">{error}</span> : null}
    </label>
  );
}

function YesNoField({
  label,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-navy-950">
        {label}
        {required ? <span className="ml-1 text-burgundy-700">*</span> : null}
      </legend>
      <div className="flex items-center gap-3">
        {["Yes", "No"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              value === option
                ? "border-gold-500/50 bg-gold-400/12 text-navy-950"
                : "border-cream-300 bg-white text-charcoal-700 hover:border-cream-400",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {error ? <span className="mt-1.5 block text-xs text-burgundy-800">{error}</span> : null}
    </fieldset>
  );
}
