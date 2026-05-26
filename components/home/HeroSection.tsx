"use client";

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
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/lib/calendar-events";

/** Served from `public/hero.png` */
const HERO_IMAGE = "/hero.png";
const HERO_VIDEO = "/Church Community Moments.mp4";

/** Copy reveal: smooth deceleration, no snap */
const easeLuxury = [0.25, 0.1, 0.25, 1] as const;

const copyStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.14 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: easeLuxury },
  },
};

const wordLine = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.065, delayChildren: 0.06 },
  },
};

const wordPop = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
};

const HERO_ENGLISH_WORDS = [
  "Ebenezer",
  "Ethiopian",
  "Church",
  "Portland",
] as const;

/** Soft “light through glass”: top / right */
function HeroLightRays({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none text-white/40", className)}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-ray-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="32%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-ray-b" x1="100%" y1="0%" x2="0%" y2="80%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
          <stop offset="38%" stopColor="#e8d5a0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M520 -40 L820 120 L780 420 L420 600 L380 200 Z"
        fill="url(#hero-ray-a)"
        className="blur-[0.5px]"
      />
      <path
        d="M680 -80 L900 200 L860 520 L520 640 L480 180 Z"
        fill="url(#hero-ray-b)"
        opacity="0.85"
      />
    </svg>
  );
}

function HeroMotif({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none text-gold-400/22", className)}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        opacity="0.45"
        d="M40 520C180 360 220 180 520 40"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        opacity="0.3"
        d="M120 560C280 400 340 200 580 80"
        stroke="currentColor"
        strokeWidth="0.85"
      />
      <circle cx="480" cy="140" r="120" stroke="currentColor" strokeWidth="0.75" opacity="0.18" />
      <circle cx="140" cy="420" r="90" stroke="currentColor" strokeWidth="0.75" opacity="0.12" />
    </svg>
  );
}

const ctaMicro =
  "origin-center transition-[transform,box-shadow,filter] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.02] active:scale-[0.99] motion-reduce:transform-none";

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
      <div className="mt-3 flex w-full items-center gap-2 text-[0.7rem] max-md:rounded-xl max-md:border max-md:border-white/22 max-md:bg-white/20 max-md:px-3 max-md:py-2.5 max-md:font-semibold max-md:text-charcoal-950 max-md:shadow-sm max-md:backdrop-blur-sm sm:mt-3.5 sm:gap-2.5 sm:text-sm md:border-0 md:border-t md:border-white/25 md:bg-transparent md:px-0 md:py-0 md:pt-3 md:font-medium md:text-charcoal-800 md:shadow-none md:backdrop-blur-none md:rounded-none lg:text-[0.9375rem] [@media(max-height:820px)]:mt-2.5 [@media(max-height:820px)]:pt-2.5">
        <CalendarDays className="size-4 shrink-0 text-gold-700" aria-hidden />
        <span>Join us this Sunday.</span>
      </div>
    );
  }

  return (
    <div className="mt-2 w-full max-w-3xl overflow-hidden rounded-xl border border-cream-200/90 bg-white/92 shadow-[0_10px_28px_-18px_rgba(11,28,44,0.22)] backdrop-blur-sm sm:mt-2.5 [@media(max-height:820px)]:mt-1.5">
      <div className="h-1 bg-gradient-to-r from-gold-500/80 via-gold-300/70 to-forest-600/70" />
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[0.63rem] font-semibold tracking-[0.2em] text-gold-700 uppercase">
            Upcoming event
          </p>
        </div>
        <p className="font-heading mt-2 text-[1.3rem] leading-[1.3] text-navy-950 sm:text-[1.95rem] sm:leading-[1.28]">
          {upcomingEvent.title}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-charcoal-700 sm:gap-2.5 sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-white px-3 py-1.5">
            <CalendarDays className="size-3.5 text-gold-700" aria-hidden />
            {upcomingEvent.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-white px-3 py-1.5">
            <Clock3 className="size-3.5 text-gold-700" aria-hidden />
            {upcomingEvent.timeLabel}
          </span>
          {upcomingEvent.location ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-white px-3 py-1.5">
              <MapPin className="size-3.5 text-gold-700" aria-hidden />
              {upcomingEvent.location}
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <CTALink href="/events" variant="outlineWarm" size="md" className="!py-2.5 !text-xs sm:!text-sm">
            See Events
          </CTALink>
          {upcomingEvent.detailsUrl ? (
            <CTALink
              href={upcomingEvent.detailsUrl}
              variant="secondary"
              size="md"
              className="!py-2.5 !text-xs sm:!text-sm"
              external
            >
              View Details
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

  const parallaxBgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 95],
  );
  const parallaxGlowX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 28],
  );
  const parallaxGlowY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -18],
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-svh shrink-0 flex-col overflow-x-hidden bg-cream-50"
    >
      {/* Layer 1: hero media (video with image fallback; full frame visible: object-contain) */}
      <motion.div
        className="absolute inset-0 z-[1] flex min-h-0 items-center justify-center overflow-hidden will-change-transform"
        style={{ y: parallaxBgY }}
        aria-hidden
      >
        {reduce ? (
          <div
            className="h-full min-h-0 w-full max-w-none origin-center bg-cover bg-center bg-no-repeat brightness-[1.08] contrast-[1.04] saturate-[1.06]"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
        ) : (
          <>
            <video
              className="h-full min-h-0 w-full max-h-full object-contain object-center brightness-[1.08] contrast-[1.12] saturate-[1.2] max-md:object-cover max-md:brightness-[1.12] max-md:contrast-[1.18] max-md:saturate-[1.35] sm:brightness-[1.12] sm:contrast-[1.16] sm:saturate-[1.26] md:object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={HERO_IMAGE}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
            <div
              className={cn(
                "pointer-events-none absolute inset-0 h-full min-h-0 w-full max-w-none origin-center bg-contain bg-center bg-no-repeat",
                "opacity-[0.08] hero-ken",
              )}
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
          </>
        )}
      </motion.div>

      {/* Layer 2: warm light scrims (lighter on mobile so background video reads through) */}
      <div className="pointer-events-none absolute inset-0 z-[2] max-md:opacity-[0.32] md:opacity-100">
        <div
          className="absolute inset-0 bg-gradient-to-r from-cream-50/32 via-cream-50/8 to-white/0 sm:from-cream-50/26 sm:via-cream-50/5 sm:to-white/0"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/7 via-transparent to-cream-100/10"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-cream-50/28 via-transparent to-white/5 sm:from-cream-50/18 sm:to-white/2"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_88%_72%_at_78%_8%,rgba(241,210,122,0.24),transparent_58%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_58%_48%_at_70%_40%,rgba(28,46,69,0.06),transparent_62%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_52%_42%_at_48%_48%,transparent_35%,rgba(250,248,245,0.35)_78%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_68%_52%_at_92%_88%,rgba(122,158,140,0.07),transparent_54%)]"
          aria-hidden
        />

        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_10%_18%,rgba(255,255,255,0.22),transparent_55%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_88%_10%,rgba(212,175,55,0.06),transparent_50%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-tr from-navy-950/3 via-transparent to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,28,44,0.06)_0%,rgba(11,28,44,0.03)_34%,transparent_52%)] sm:bg-[linear-gradient(to_right,rgba(11,28,44,0.045)_0%,rgba(11,28,44,0.02)_34%,transparent_52%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,28,44,0.08)_0%,transparent_20%,transparent_70%,rgba(11,28,44,0.07)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream-100/50"
          aria-hidden
        />

        {/* Animated mist (18–24s loops) */}
        {!reduce ? (
          <>
            <motion.div
              className="hero-gold-mist-layer absolute -right-36 top-[-10%] hidden h-[38rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,transparent_68%)] blur-3xl md:block"
              style={{ x: parallaxGlowX, y: parallaxGlowY }}
              aria-hidden
            />
            <div
              className="hero-cool-mist-layer absolute -left-40 bottom-[-5%] hidden h-[36rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(28,46,69,0.14)_0%,rgba(11,28,44,0.1)_45%,transparent_72%)] blur-3xl md:block"
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute -right-32 top-[12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,transparent_70%)] blur-3xl"
            aria-hidden
          />
        )}

        {/* Light rays (top / right) */}
        <HeroLightRays className="absolute -right-4 top-0 hidden h-[min(85vh,640px)] w-[min(95vw,740px)] opacity-[0.38] mix-blend-soft-light md:right-0 md:block" />

        {/* Soft orbs (breathing, Framer) */}
        {!reduce ? (
          <>
            <motion.div
              className="absolute left-[8%] top-[22%] hidden h-72 w-72 rounded-full bg-gold-300/14 blur-3xl mesh-shift-soft md:block"
              animate={{ opacity: [0.42, 0.68, 0.42] }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
              }}
              aria-hidden
            />
            <motion.div
              className="absolute bottom-[12%] right-[18%] hidden h-80 w-80 rounded-full bg-sage-500/10 blur-3xl md:block"
              animate={{ opacity: [0.3, 0.52, 0.3] }}
              transition={{
                duration: 19,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
              }}
              aria-hidden
            />
          </>
        ) : null}

        <div className="hero-vignette-soft max-md:opacity-40" aria-hidden />
        <div className="bg-grain hero-grain absolute inset-0 opacity-[0.45] max-md:opacity-[0.18]" aria-hidden />
        <div
          className="absolute inset-0 bg-grid-warm opacity-[0.018]"
          aria-hidden
        />

        <HeroMotif className="absolute -right-10 top-1/2 hidden h-[min(88vw,500px)] w-[min(88vw,500px)] -translate-y-1/2 opacity-55 md:block" />
      </div>

      {/* Layer 3: content */}
      <Container className="relative z-30 flex w-full flex-col overflow-x-hidden pt-[calc(124px+0.75rem+env(safe-area-inset-top))] pb-[max(4.5rem,env(safe-area-inset-bottom))] max-md:pb-[max(7rem,calc(4.25rem+env(safe-area-inset-bottom)))] sm:pt-[8.5rem] lg:pt-40">
        <div className="relative mx-auto flex w-full max-w-[min(72rem,calc(100%-1rem))] flex-col justify-start pb-1 pt-0.5 max-md:pb-0.5 sm:pb-2 sm:pt-1">
          <div className="relative flex w-full flex-col overflow-hidden rounded-[2.4rem] p-[2px] shadow-[0_36px_120px_-52px_rgba(8,18,32,0.82),0_0_0_1px_rgba(255,255,255,0.14)] max-md:rounded-[1.7rem] max-md:shadow-[0_14px_44px_-26px_rgba(8,18,32,0.38),0_0_0_1px_rgba(255,255,255,0.12)]">
            <div className="hero-aurora-ring max-md:opacity-35 rounded-[2.4rem] md:opacity-100" aria-hidden />
            <motion.div
              variants={copyStagger}
              initial={reduce ? false : "hidden"}
              animate={reduce ? undefined : "show"}
              className={cn(
                "hero-panel-sheen hero-mobile-luxury relative z-10 flex w-full flex-col overflow-hidden rounded-[calc(2.4rem-2px)] border shadow-[0_8px_32px_-18px_rgba(8,18,32,0.22)]",
                "max-md:rounded-[1.65rem] max-md:border-white/25 max-md:bg-transparent max-md:shadow-none",
                "max-md:backdrop-blur-none border-white/10 bg-white/[0.045] backdrop-blur-[2px]",
                "md:border-white/22 md:bg-white/[0.08] md:backdrop-blur-[12px] md:shadow-[0_28px_100px_-42px_rgba(8,18,32,0.72),inset_0_1px_0_rgba(255,255,255,0.38)]",
                "pt-4 pr-3 pb-3 pl-3 max-md:pb-6 sm:pt-5 sm:pr-5 sm:pb-5 sm:pl-5 lg:pt-6 lg:pr-6 lg:pb-6 lg:pl-6",
                "[@media(max-height:820px)]:px-2.5 [@media(max-height:820px)]:pb-2.5 [@media(max-height:820px)]:pt-3.5 [@media(max-height:820px)]:sm:px-3 [@media(max-height:820px)]:sm:pb-3 [@media(max-height:820px)]:sm:pt-4",
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] hero-bento-mesh hero-bento-mesh-motion max-md:opacity-25 md:opacity-100"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.12)_38%,rgba(255,255,255,0.04)_62%,rgba(241,210,122,0.08)_100%)] max-md:opacity-35 md:opacity-100"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-24 -top-28 hidden h-[min(52vw,420px)] w-[min(52vw,420px)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(241,210,122,0.22),transparent_68%)] blur-2xl md:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-28 -left-16 hidden h-[min(48vw,360px)] w-[min(48vw,360px)] rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(122,158,140,0.18),transparent_70%)] blur-2xl md:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-px rounded-[calc(2.4rem-3px)] ring-1 ring-white/35 max-md:ring-white/12"
                aria-hidden
              />

              <motion.p
                variants={fadeUp}
                className="relative shrink-0 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-navy-950/55 max-md:text-[0.62rem] max-md:tracking-[0.26em] max-md:text-navy-950/75 sm:text-[0.6rem] md:font-medium md:tracking-[0.38em] md:text-navy-950/45"
              >
                {siteConfig.address.city} · Worship · Community · Hope
              </motion.p>

              <motion.div variants={fadeUp} className="relative mt-2 inline-flex shrink-0 items-center gap-2 sm:mt-3 [@media(max-height:820px)]:mt-1.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-cream-200/85 bg-white/75 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-gold-800 shadow-[0_8px_28px_-14px_rgba(10,22,40,0.35)] backdrop-blur-sm max-md:rounded-2xl max-md:border-white/50 max-md:bg-white/58 max-md:px-4 max-md:py-2.5 max-md:text-[0.59rem] max-md:tracking-[0.22em] max-md:shadow-lg max-md:backdrop-blur-md sm:px-3.5 sm:py-2 sm:text-[0.6rem]">
                  <Sparkles className="size-3.5 text-sage-700" aria-hidden />
                  Welcome home
                </span>
              </motion.div>

              <div className="relative mt-3 max-md:mt-4 md:mt-3">
                <motion.div
                  variants={fadeUp}
                  className="relative flex flex-col gap-4 pb-2 pt-0.5 max-md:gap-5 max-md:pb-5 sm:gap-4 md:gap-5 [@media(max-height:820px)]:gap-3"
                >
                  <div className="relative max-md:pb-1">
                    <h1 className="font-ethiopic relative max-w-[22ch] text-balance text-[clamp(1.45rem,4.2vw+0.55rem,1.85rem)] font-bold leading-[1.26] tracking-tight text-navy-950 max-md:leading-[1.28] sm:text-[2rem] sm:leading-[1.28] md:text-[2.35rem] md:font-semibold lg:text-[2.55rem] md:drop-shadow-[0_1px_0_rgba(255,255,255,0.65)] [@media(max-height:820px)]:text-[1.5rem] [@media(max-height:820px)]:sm:text-[1.75rem]">
                      አቤኔዘር ኢትዮጵያዊያን ቤተክርስቲያን በፖርትላንድ
                    </h1>
                    <motion.div
                      variants={wordLine}
                      className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1 sm:mt-3 sm:gap-x-2.5 [@media(max-height:820px)]:mt-1.5"
                    >
                      {HERO_ENGLISH_WORDS.map((word) => (
                        <motion.span
                          key={word}
                          variants={wordPop}
                          className="text-[1.05rem] font-semibold leading-snug tracking-tight text-navy-950 max-md:text-[1.08rem] sm:text-xl md:bg-gradient-to-r md:from-navy-950 md:via-navy-900 md:to-navy-950 md:bg-clip-text md:text-transparent md:text-[1.45rem] md:leading-[1.32] md:pb-[0.08em] [@media(max-height:820px)]:text-[0.95rem] [@media(max-height:820px)]:sm:text-[1.05rem]"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.div>
                    <div className="mt-3.5 flex items-center gap-3 max-md:mt-4 [@media(max-height:820px)]:mt-3">
                      <span
                        className="h-px flex-1 max-w-[6.5rem] bg-gradient-to-r from-transparent via-gold-500/55 to-gold-500/90"
                        aria-hidden
                      />
                      <span
                        className="inline-flex size-2 rounded-full bg-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.55)]"
                        aria-hidden
                      />
                      <span
                        className="h-px flex-1 max-w-[6.5rem] bg-gradient-to-l from-transparent via-gold-500/55 to-gold-500/90"
                        aria-hidden
                      />
                    </div>
                  </div>

                  <p className="relative hidden max-w-2xl text-charcoal-900 sm:block sm:rounded-2xl sm:border sm:border-white/20 sm:bg-white/25 sm:px-4 sm:py-4 sm:text-[0.9375rem] sm:leading-[1.65] sm:shadow-sm sm:backdrop-blur-sm md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-charcoal-800 md:shadow-none md:backdrop-blur-none lg:text-[1.0625rem] lg:leading-[1.72] [@media(max-height:820px)]:text-[0.8125rem] [&::first-line]:font-semibold [&::first-line]:text-navy-950 sm:[&::first-line]:text-[1.02rem] md:[&::first-line]:text-[0.9375rem] lg:[&::first-line]:text-[1.125rem]">
                    At Ebenezer, you are more than a visitor. You are invited into a living
                    community of worship, discipleship, and prayer where every generation can
                    grow in Jesus, serve with purpose, and walk in hope together.
                  </p>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                className="relative shrink-0 space-y-3 max-md:mt-9 md:mt-5 max-md:rounded-2xl max-md:border max-md:border-white/25 max-md:bg-gradient-to-br max-md:from-white/40 max-md:to-white/[0.1] max-md:p-4 max-md:pb-3.5 max-md:shadow-lg max-md:backdrop-blur-md md:space-y-2.5 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
              >
                <p className="text-[0.52rem] font-bold uppercase tracking-[0.26em] text-gold-900/90 max-md:mb-0.5 max-md:text-[0.56rem] sm:text-[0.55rem] md:font-semibold md:tracking-[0.22em] md:text-navy-950/55">
                  Start here
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-3 md:gap-2.5">
                  <div className="relative flex flex-1 sm:flex-none">
                    <span
                      className="pointer-events-none absolute -inset-0.5 rounded-xl bg-gradient-to-r from-gold-400/25 via-amber-200/15 to-gold-500/20 opacity-90 blur-md motion-reduce:opacity-25 sm:rounded-2xl max-md:rounded-xl"
                      aria-hidden
                    />
                    <CTALink
                      href="/give"
                      variant="primary"
                      size="lg"
                      icon={Gift}
                      className={cn(
                        ctaMicro,
                        "relative z-10 w-full justify-center rounded-xl sm:w-auto sm:min-w-[200px] sm:rounded-2xl",
                        "!px-6 !py-3.5 !text-[0.92rem] !font-semibold !tracking-tight whitespace-nowrap sm:!px-8 sm:!py-3.5 sm:!text-[0.95rem]",
                        "shadow-[0_0_0_1px_rgba(255,255,255,0.25)_inset,0_8px_32px_-10px_rgba(201,162,39,0.55)]",
                      )}
                    >
                      Give
                    </CTALink>
                  </div>
                  <CTALink
                    href="/ministries"
                    variant="outlineWarm"
                    size="lg"
                    icon={UsersRound}
                    className={cn(
                      ctaMicro,
                      "relative z-10 w-full flex-1 justify-center rounded-xl border-white/55 bg-white/65 !px-6 !py-3.5 !text-[0.9rem] !font-semibold whitespace-nowrap text-navy-950 shadow-md backdrop-blur-md sm:w-auto sm:flex-none sm:rounded-2xl sm:!px-8 sm:!py-3.5 sm:!text-[0.92rem] md:border-white/60 md:bg-white/70 md:shadow-sm",
                    )}
                  >
                    Ministries
                  </CTALink>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="relative mt-4 flex shrink-0 flex-col gap-3.5 rounded-2xl border border-white/25 bg-white/22 p-4 text-[0.78rem] font-semibold leading-snug text-navy-950 shadow-sm backdrop-blur-md sm:mt-5 md:mt-4 md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-2 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-[0.74rem] md:shadow-none md:backdrop-blur-none lg:text-[0.9rem] lg:leading-relaxed [@media(max-height:820px)]:mt-3"
              >
                <span className="inline-flex min-w-0 items-start gap-2 sm:items-center">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-gold-700 sm:mt-0" aria-hidden />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span>{siteConfig.serviceTime}</span>
                    <span className="font-normal text-navy-950/80">{siteConfig.fridayGathering}</span>
                  </span>
                </span>
                <span
                  className="hidden h-4 w-px shrink-0 bg-navy-950/10 sm:block"
                  aria-hidden
                />
                <span className="inline-flex min-w-0 items-start gap-2 sm:items-center">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-sage-700 sm:mt-0" aria-hidden />
                  <span>
                    {siteConfig.address.street}, {siteConfig.address.city},{" "}
                    {siteConfig.address.state}
                  </span>
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="shrink-0">
                <UpcomingEventBanner upcomingEvent={upcomingEvent} />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-2 flex shrink-0 items-center gap-2 pb-1 text-xs font-medium leading-snug text-charcoal-800 max-md:flex-col max-md:items-start max-md:gap-2.5 max-md:rounded-2xl max-md:border max-md:border-white/22 max-md:bg-white/18 max-md:px-3 max-md:py-3 max-md:text-[0.8125rem] max-md:font-semibold max-md:text-charcoal-950 max-md:shadow-sm max-md:backdrop-blur-sm sm:mt-2.5 sm:flex-row sm:items-center sm:gap-2 sm:py-2.5 sm:text-[0.8125rem] md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:font-medium md:text-charcoal-700 md:shadow-none md:backdrop-blur-none lg:text-[0.9375rem] lg:leading-relaxed"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-cream-200 bg-white/90 text-gold-800 shadow-sm max-md:border-charcoal-900/12">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
                <span>
                  New here?{" "}
                  <NavLink
                    href="/visit"
                    className="font-semibold text-navy-950 underline decoration-gold-500/45 underline-offset-[5px] transition max-md:text-navy-950 max-md:decoration-gold-600/55 hover:text-gold-800 hover:decoration-gold-600"
                  >
                    See what your first Sunday can feel like
                  </NavLink>
                </span>
              </motion.p>
            </motion.div>
          </div>
        </div>

        {!reduce ? (
          <motion.a
            href="#welcome-intro"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.38, duration: 1, ease: easeLuxury }}
            className="relative z-40 mx-auto mt-5 flex shrink-0 flex-col items-center gap-1.5 rounded-full border border-white/28 bg-white/35 px-4 py-2 text-navy-900/70 shadow-md backdrop-blur-md max-md:text-navy-950 sm:mt-6 md:absolute md:mt-0 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-navy-900/55 md:shadow-none md:backdrop-blur-none md:bottom-[max(4.75rem,env(safe-area-inset-bottom))] md:left-1/2 md:-translate-x-1/2"
            aria-label="Scroll to welcome section"
          >
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] max-md:tracking-[0.28em]">
              Explore
            </span>
            <ChevronDown className="size-5 opacity-85 motion-safe:animate-float-soft" />
          </motion.a>
        ) : null}
      </Container>

      {/* Bottom handoff: sits behind hero UI (z-30) so CTAs stay visible */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4]">
        <div
          className="absolute inset-x-0 bottom-0 h-[min(14svh,120px)] bg-gradient-to-b from-transparent via-cream-100/30 to-cream-50/90"
          aria-hidden
        />
        <WaveDivider className="relative [&_svg]:h-10 [&_svg]:sm:h-12" colorClass="text-cream-50" />
      </div>
    </section>
  );
}

