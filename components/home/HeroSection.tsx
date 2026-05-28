"use client";

import Image from "next/image";
import { NavLink } from "@/components/layout/NavLink";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Gift,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { CTALink } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { siteConfig } from "@/lib/site";
import type { CalendarEvent } from "@/lib/calendar-events";

const HERO_IMAGE = "/church.png";

const easeLuxury = [0.25, 0.1, 0.25, 1] as const;

const copyStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeLuxury },
  },
};

type HeroSectionProps = {
  upcomingEvent?: CalendarEvent | null;
};

function UpcomingEventBanner({
  upcomingEvent,
}: {
  upcomingEvent?: CalendarEvent | null;
}) {
  if (!upcomingEvent) {
    return (
      <p className="mt-4 flex items-center gap-2 text-sm text-cream-100/90">
        <CalendarDays className="size-4 shrink-0 text-gold-300" aria-hidden />
        <span>Join us this Sunday — all are welcome.</span>
      </p>
    );
  }

  return (
    <div className="mt-5 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] shadow-[0_24px_64px_-32px_rgba(0,0,0,0.55)] backdrop-blur-xl">
      <div className="h-0.5 bg-gradient-to-r from-gold-400 via-gold-300 to-sage-500/80" />
      <div className="p-4 sm:p-5">
        <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-gold-300 uppercase">
          Upcoming event
        </p>
        <p className="font-heading mt-2 text-xl leading-snug text-cream-50 sm:text-2xl">
          {upcomingEvent.title}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-cream-100/85 sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
            <CalendarDays className="size-3.5 text-gold-300" aria-hidden />
            {upcomingEvent.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
            <Clock3 className="size-3.5 text-gold-300" aria-hidden />
            {upcomingEvent.timeLabel}
          </span>
          {upcomingEvent.location ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
              <MapPin className="size-3.5 text-sage-400" aria-hidden />
              {upcomingEvent.location}
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <CTALink href="/events" variant="outlineLight" size="md" className="!py-2.5 !text-xs sm:!text-sm">
            See events
          </CTALink>
          {upcomingEvent.detailsUrl ? (
            <CTALink
              href={upcomingEvent.detailsUrl}
              variant="primary"
              size="md"
              className="!py-2.5 !text-xs sm:!text-sm"
              external
            >
              Details
            </CTALink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ upcomingEvent }: HeroSectionProps) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const reduce = mounted ? prefersReduced : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 48]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 24]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] shrink-0 flex-col overflow-hidden bg-navy-950"
    >
      {/* Cinematic background */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
        aria-hidden
      >
        <Image
          src={HERO_IMAGE}
          alt={`${siteConfig.name} — worship and community in ${siteConfig.address.city}`}
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-[center_38%] saturate-[1.08] contrast-[1.05]"
        />
      </motion.div>

      {/* Layered scrims for readability */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/72 to-navy-950/25 sm:from-navy-950/92 sm:via-navy-950/58 sm:to-navy-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-navy-950/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_12%_18%,rgba(212,175,55,0.14),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_88%_12%,rgba(122,158,140,0.12),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream-50/95 to-transparent" />
      </div>

      {/* Fine grain */}
      <div
        className="bg-grain pointer-events-none absolute inset-0 z-[2] opacity-[0.22]"
        aria-hidden
      />

      {/* Content */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-[calc(124px+0.5rem+env(safe-area-inset-top))] pb-[max(5.5rem,env(safe-area-inset-bottom))] sm:pt-36 lg:pt-40">
        <motion.div
          style={{ y: contentY }}
          className="relative z-20 mx-auto w-full max-w-3xl overflow-visible lg:max-w-[42rem]"
        >
          <motion.div
            variants={copyStagger}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="relative"
          >
            {/* Accent frame */}
            <div
              className="pointer-events-none absolute -left-3 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-transparent via-gold-400/70 to-transparent lg:block"
              aria-hidden
            />

            <motion.div variants={fadeUp} className="inline-flex pt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.62rem] font-semibold tracking-[0.24em] text-cream-50 uppercase backdrop-blur-md">
                <Sparkles className="size-3.5 text-gold-300" aria-hidden />
                Welcome home
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
              <h1 className="font-ethiopic max-w-[20ch] text-balance text-[clamp(1.65rem,4.5vw+0.5rem,2.75rem)] font-bold leading-[1.22] tracking-tight text-cream-50 sm:leading-[1.2] lg:text-[2.85rem]">
                አቤኔዘር ኢትዮጵያዊያን ቤተክርስቲያን በፖርትላንድ
              </h1>
              <div className="hero-english-lockup mt-4 sm:mt-5">
                <p className="hero-english-eyebrow">
                  <span className="shrink-0">Faith · Family · Fellowship</span>
                </p>
                <h2
                  className="hero-english-title text-balance"
                  aria-label="Ebenezer Ethiopian Church Portland"
                >
                  Ebenezer <em>Ethiopian</em> Church
                </h2>
                <p className="hero-english-city">Portland</p>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className="h-px max-w-[5rem] flex-1 bg-gradient-to-r from-transparent to-gold-400/80"
                  aria-hidden
                />
                <span
                  className="size-1.5 rounded-full bg-gold-400 shadow-[0_0_16px_rgba(212,175,55,0.65)]"
                  aria-hidden
                />
                <span
                  className="h-px max-w-[5rem] flex-1 bg-gradient-to-l from-transparent to-gold-400/80"
                  aria-hidden
                />
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-cream-100/88 sm:text-base lg:text-[1.0625rem] lg:leading-[1.72] [&::first-line]:font-medium [&::first-line]:text-cream-50"
            >
              At Ebenezer, you are more than a visitor. You are invited into a living
              community of worship, discipleship, and prayer—where every generation can grow
              in Jesus, serve with purpose, and walk in hope together.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-row items-stretch gap-2.5 sm:mt-8 sm:gap-3"
            >
              <CTALink
                href="/give"
                variant="primary"
                size="md"
                icon={Gift}
                className="min-w-0 flex-1 justify-center !gap-1.5 !px-3.5 !py-2.5 !text-[0.8125rem] sm:flex-none sm:min-w-[9.25rem] sm:!px-5 sm:!py-2.5 sm:!text-sm [&_svg]:size-3.5"
              >
                Give
              </CTALink>
              <CTALink
                href="/ministries"
                variant="outlineLight"
                size="md"
                icon={UsersRound}
                className="min-w-0 flex-1 justify-center !gap-1.5 !px-3.5 !py-2.5 !text-[0.8125rem] sm:flex-none sm:min-w-[9.25rem] sm:!px-5 sm:!py-2.5 sm:!text-sm [&_svg]:size-3.5"
              >
                Ministries
              </CTALink>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/[0.06] p-4 text-sm text-cream-100/90 backdrop-blur-md sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:p-5"
            >
              <span className="inline-flex min-w-0 items-start gap-2.5 sm:items-center">
                <Clock3 className="mt-0.5 size-4 shrink-0 text-gold-300 sm:mt-0" aria-hidden />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-medium text-cream-50">{siteConfig.serviceTime}</span>
                  <span className="text-cream-100/75">{siteConfig.fridayGathering}</span>
                </span>
              </span>
              <span className="hidden h-8 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
              <span className="inline-flex min-w-0 items-start gap-2.5 sm:items-center">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sage-400 sm:mt-0" aria-hidden />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city},{" "}
                  {siteConfig.address.state}
                </span>
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <UpcomingEventBanner upcomingEvent={upcomingEvent} />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-6 flex items-center gap-2.5 text-sm text-cream-100/85"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-gold-300">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
              <span>
                New here?{" "}
                <NavLink
                  href="/visit"
                  className="font-semibold text-gold-200 underline decoration-gold-400/50 underline-offset-4 transition hover:text-gold-100"
                >
                  See what your first Sunday can feel like
                </NavLink>
              </span>
            </motion.p>
          </motion.div>
        </motion.div>

        {!reduce ? (
          <motion.a
            href="#welcome-intro"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: easeLuxury }}
            className="mx-auto mt-10 flex flex-col items-center gap-1 text-cream-50/70 sm:mt-12 lg:absolute lg:bottom-[max(5rem,env(safe-area-inset-bottom))] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
            aria-label="Scroll to welcome section"
          >
            <span className="text-[0.6rem] font-semibold tracking-[0.32em] uppercase">
              Explore
            </span>
            <ChevronDown className="size-5 motion-safe:animate-float-soft" />
          </motion.a>
        ) : null}
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3]">
        <WaveDivider className="relative [&_svg]:h-10 [&_svg]:sm:h-12" colorClass="text-cream-50" />
      </div>
    </section>
  );
}
