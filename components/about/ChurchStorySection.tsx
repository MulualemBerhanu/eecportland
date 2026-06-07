"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, HeartHandshake, MapPin, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type StoryChapter = {
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
};

const storyChapters: StoryChapter[] = [
  {
    icon: Users,
    label: "One family",
    title: "Many nations, one worship",
    body: "Many in our church family come from Ethiopia and the broader Horn of Africa; others have joined us from across the United States. That diversity is a gift. We worship in unity, disciple in relationship, and welcome neighbors without pretense.",
  },
  {
    icon: HeartHandshake,
    label: "Our growth",
    title: "From gathering to congregation",
    body: "What began as a small gathering of believers has grown into a congregation committed to gospel clarity, cultural warmth, and compassionate service.",
  },
  {
    icon: MapPin,
    label: "Today",
    title: `Serving ${siteConfig.address.city} and beyond`,
    body: `Today, ${siteConfig.shortName} serves ${siteConfig.address.city} and beyond through Sunday worship, midweek prayer, small groups, and outreach, pointing every heart toward the grace of Jesus Christ.`,
  },
];

function StoryCard({
  chapter,
  index,
  reduce,
}: {
  chapter: StoryChapter;
  index: number;
  reduce: boolean | null;
}) {
  const Icon = chapter.icon;
  const lift = index === 1 ? "sm:mt-6 lg:mt-10" : index === 2 ? "sm:mt-3 lg:mt-5" : "";

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      className={cn("relative min-w-0", lift)}
    >
      <article className="group relative h-full overflow-hidden rounded-[1.35rem] border border-cream-200/90 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(11,28,44,0.14)] ring-1 ring-navy-950/[0.03] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_70px_-28px_rgba(11,28,44,0.18)] sm:rounded-[1.5rem] sm:p-8">
        <div
          className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-gold-400/12 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-cream-200 bg-cream-50 text-gold-600 shadow-sm">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden />
          </div>
          <span
            className="font-heading text-4xl leading-none text-navy-950/[0.07] tabular-nums"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-5 text-[0.65rem] font-semibold tracking-[0.22em] text-gold-600 uppercase">
          {chapter.label}
        </p>
        <h3 className="font-heading mt-2 text-xl leading-tight text-navy-950 sm:text-[1.35rem]">
          {chapter.title}
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal-700 sm:text-base">
          {chapter.body}
        </p>
      </article>
    </motion.li>
  );
}

export function ChurchStorySection() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="church-story-title" className="relative">
      <div className="flex justify-center" aria-hidden>
        <div className="flex flex-col items-center">
          <div className="size-2.5 rounded-full bg-gold-500 shadow-[0_0_0_6px_rgba(212,175,55,0.2)]" />
          <div className="h-12 w-px bg-gradient-to-b from-gold-500/70 via-gold-500/25 to-transparent sm:h-16" />
        </div>
      </div>

      <motion.header
        className="relative overflow-hidden rounded-[1.75rem] border border-cream-200/90 bg-white px-5 py-9 text-center shadow-card-soft ring-1 ring-navy-950/[0.04] sm:rounded-[2rem] sm:px-10 sm:py-12"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-56px" }}
        transition={{ duration: 0.75, ease }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.35]"
          aria-hidden
        />
        <div className="relative">
          <p className="text-[0.68rem] font-semibold tracking-[0.34em] text-gold-600 uppercase">
            Our story
          </p>
          <h2
            id="church-story-title"
            className="font-heading mx-auto mt-3 max-w-3xl text-[clamp(1.6rem,4.2vw,2.75rem)] leading-[1.14] tracking-tight text-navy-950"
          >
            From Ebenezer to every neighborhood
          </h2>
          <div className="mx-auto mt-5 max-w-md">
            <p className="font-heading text-lg leading-snug text-navy-900/88 italic sm:text-xl">
              &ldquo;Thus far the Lord has helped us.&rdquo;
            </p>
            <p className="mt-3 text-sm font-medium text-charcoal-600">
              1 Samuel 7:12 · <span className="text-gold-700">Ebenezer</span> — stone of help
            </p>
          </div>
        </div>
      </motion.header>

      <div className="relative mt-8 sm:mt-12">
        <div
          className="pointer-events-none absolute left-5 top-0 bottom-8 w-px bg-gradient-to-b from-gold-500/55 via-cream-300/80 to-transparent md:hidden"
          aria-hidden
        />

        <ol className="relative flex flex-col gap-5 pl-12 md:grid md:grid-cols-3 md:gap-6 md:pl-0 lg:gap-8">
          {storyChapters.map((chapter, index) => (
            <div key={chapter.label} className="relative md:contents">
              <div
                className="absolute left-0 top-8 flex size-9 items-center justify-center rounded-full border-2 border-white bg-gold-500 text-xs font-bold text-navy-950 shadow-md md:hidden"
                aria-hidden
              >
                {index + 1}
              </div>
              <StoryCard chapter={chapter} index={index} reduce={reduce} />
            </div>
          ))}
        </ol>
      </div>

      <motion.aside
        className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-navy-950/10 bg-navy-950 px-5 py-7 text-center sm:mt-12 sm:flex-row sm:gap-6 sm:px-8 sm:py-8 sm:text-left"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold-500/35 bg-navy-900 text-gold-300">
          <BookOpen className="size-5" strokeWidth={1.5} aria-hidden />
        </div>
        <p className="text-sm leading-relaxed text-cream-50/88 sm:text-[0.9375rem]">
          <span className="font-semibold text-gold-300">Ebenezer</span>{" "}
          means the stone of help, a name that keeps us grateful for God&apos;s faithfulness as we
          step into whatever chapter He writes next with this church family.
        </p>
      </motion.aside>
    </section>
  );
}
