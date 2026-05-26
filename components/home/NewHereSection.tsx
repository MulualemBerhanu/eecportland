"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Car,
  CheckCircle2,
  Coffee,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { CTALink } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const points = [
  "A blended worship style, with contemporary songs and timeless truths.",
  "Teaching that is clear, gospel-centered, and applicable to daily life.",
  "Families welcome, with safe children’s ministry and loving volunteers.",
  "Easy parking, clear signage, and hosts ready to answer questions.",
];

const journeySteps = [
  {
    id: "arrive",
    label: "Arrive",
    title: "Step in with ease",
    body: "Park, breathe, and walk through the doors. No performance needed, only presence.",
    icon: Car,
  },
  {
    id: "welcome",
    label: "Welcome",
    title: "Greeted, not spotlighted",
    body: "Hosts are nearby if you want them, and invisible if you don’t. You set the pace.",
    icon: HeartHandshake,
  },
  {
    id: "worship",
    label: "Worship",
    title: "Christ at the center",
    body: "Sing, pray, and hear Scripture opened with clarity and warmth.",
    icon: Sparkles,
  },
  {
    id: "connect",
    label: "Connect",
    title: "Coffee & conversation",
    body: "Stay afterward. We’d love to learn your name when you’re ready.",
    icon: Coffee,
  },
] as const;

export function NewHereSection() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(journeySteps[0].id);

  return (
    <section className="section-y-xl relative overflow-x-hidden border-t border-cream-200/70 bg-gradient-to-b from-cream-50 via-white to-cream-50/90">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,162,39,0.06),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.35]"
        aria-hidden
      />

      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <SectionHeading
            eyebrow="New here?"
            title="Your first Sunday, four gentle steps"
            description="We know visiting a church can stir questions. Here is what you can expect: genuine welcome, reverent joy, and space to encounter God at your pace."
            className="max-w-2xl lg:max-w-3xl"
          />
        </motion.div>

        {/* Desktop: horizontal step rail */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div
              className="absolute left-0 right-0 top-[2.25rem] h-px bg-gradient-to-r from-cream-200 via-gold-500/35 to-cream-200"
              aria-hidden
            />
            <ol className="relative grid grid-cols-4 gap-4">
              {journeySteps.map((step, i) => {
                const Icon = step.icon;
                const active = activeId === step.id;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(step.id)}
                      onMouseEnter={() => setActiveId(step.id)}
                      onFocus={() => setActiveId(step.id)}
                      className={cn(
                        "group/step w-full rounded-2xl border bg-white/80 p-6 text-left shadow-[0_2px_0_rgba(15,39,68,0.04)] ring-1 transition-all duration-500 ease-out",
                        "backdrop-blur-sm hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-36px_rgba(10,22,40,0.22)]",
                        active
                          ? "border-gold-500/35 ring-gold-500/20 shadow-[0_24px_50px_-32px_rgba(201,162,39,0.2)]"
                          : "border-cream-200/90 ring-navy-950/[0.04] hover:border-gold-500/25",
                      )}
                    >
                      <span className="relative mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 font-heading text-xs text-gold-300 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] ring-1 ring-white/10 transition duration-500 group-hover/step:scale-[1.06] group-hover/step:ring-gold-400/30">
                        <Icon
                          className="size-6 text-gold-200/95 transition duration-500 group-hover/step:scale-110"
                          aria-hidden
                        />
                        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gold-500 text-[0.65rem] font-bold text-navy-950 ring-2 ring-white">
                          {i + 1}
                        </span>
                      </span>
                      <p className="text-center text-[0.65rem] font-semibold tracking-[0.2em] text-gold-600 uppercase">
                        {step.label}
                      </p>
                      <p className="mt-3 text-center font-heading text-lg text-navy-950">
                        {step.title}
                      </p>
                      <p className="mt-2 text-center text-sm leading-relaxed text-charcoal-700">
                        {step.body}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Mobile / tablet: stacked cards */}
        <motion.ol
          className="mt-14 grid gap-5 lg:hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.06 },
            },
          }}
        >
          {journeySteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
                }}
                className="relative overflow-hidden rounded-2xl border border-cream-200/90 bg-white/90 p-6 shadow-[0_16px_48px_-36px_rgba(10,22,40,0.18)] ring-1 ring-navy-950/[0.04] backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-gold-500/10 blur-2xl" />
                <div className="relative flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-navy-900 to-navy-950 text-gold-300 ring-1 ring-white/10">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-gold-600 uppercase">
                      {i + 1}. {step.label}
                    </p>
                    <h3 className="mt-1 font-heading text-xl text-navy-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[1.02rem] leading-relaxed text-charcoal-700">
                      {step.body}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>

        <div className="mt-20 grid gap-14 lg:mt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
          >
            <h3 className="font-heading text-2xl text-navy-950 sm:text-3xl">
              What you’ll notice
            </h3>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-charcoal-700">
              Small details that add up to a peaceful first visit.
            </p>
            <ul className="mt-10 space-y-4">
              {points.map((p) => (
                <li
                  key={p}
                  className="group flex gap-4 rounded-2xl border border-cream-200/80 bg-white/70 px-5 py-4 text-[1.05rem] leading-relaxed text-charcoal-700 shadow-sm ring-1 ring-navy-950/[0.03] backdrop-blur-sm transition duration-500 hover:border-gold-500/25 hover:shadow-[0_20px_44px_-32px_rgba(10,22,40,0.15)]"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-gold-600 transition duration-500 group-hover:scale-110"
                    aria-hidden
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <CTALink href="/visit" variant="primary" size="lg">
                Your first visit guide
              </CTALink>
            </div>
          </motion.div>

          <motion.div
            className="relative lg:pt-2"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.72, delay: 0.08, ease }}
          >
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-navy-950/10 via-gold-500/12 to-forest-700/10 blur-2xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.85rem] border border-cream-200/90 bg-gradient-to-br from-navy-950/[0.03] to-white p-8 shadow-[0_32px_80px_-44px_rgba(10,22,40,0.3)] ring-1 ring-navy-950/[0.05] sm:p-10">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(201,162,39,0.08),transparent_55%)]"
                aria-hidden
              />
              <p className="relative text-[0.65rem] font-semibold tracking-[0.28em] text-gold-600 uppercase">
                This week’s step
              </p>
              <p className="relative mt-4 font-heading text-2xl leading-snug text-navy-950 sm:text-3xl">
                {
                  journeySteps.find((s) => s.id === activeId)?.title ??
                  journeySteps[0].title
                }
              </p>
              <p className="relative mt-4 text-lg leading-relaxed text-charcoal-700">
                {
                  journeySteps.find((s) => s.id === activeId)?.body ??
                  journeySteps[0].body
                }
              </p>
              <div className="relative mt-8 flex flex-wrap gap-2">
                {journeySteps.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition duration-300",
                      activeId === s.id
                        ? "bg-navy-950 text-cream-50 shadow-lg shadow-navy-950/25"
                        : "bg-cream-100/80 text-charcoal-700 ring-1 ring-cream-200 hover:bg-white hover:ring-gold-500/25",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
