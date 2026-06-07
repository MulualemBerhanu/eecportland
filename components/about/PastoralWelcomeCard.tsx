"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CTALink } from "@/components/shared/CTAButton";
import { cn } from "@/lib/utils";

const PASTOR_PORTRAIT = "/paster.jpeg";
const PASTOR_NAME = "Pastor Demess Tadesse";
const PASTOR_ROLE = "Senior Pastor";

const ease = [0.22, 1, 0.36, 1] as const;

const welcomeParagraphs = [
  "It is a joy to have you with us, whether you are visiting for the first time or have been part of our church family for years.",
  "In our church, we are committed to creating a welcoming, inclusive environment where people of all ages can encounter God\u2019s love, experience His grace, and be transformed by His truth.",
  "We believe God has an incredible plan for each of us, and together, we are called to serve, grow, and impact our communities for Christ.",
] as const;

export function PastoralWelcomeCard() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="pastoral-welcome-title"
      className="relative overflow-hidden rounded-[1.75rem] bg-navy-950 text-cream-50 shadow-[0_40px_100px_-48px_rgba(11,28,44,0.55)] ring-1 ring-navy-800/80 sm:rounded-[2rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_0%,rgba(212,175,55,0.22),transparent_50%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(122,158,140,0.14),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
        aria-hidden
      />

      <div className="relative flex flex-col lg:flex-row lg:items-stretch">
        <motion.div
          className="relative w-full shrink-0 lg:w-[42%] xl:w-[38%]"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.75, ease }}
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-auto lg:min-h-[420px] lg:h-full">
            <Image
              src={PASTOR_PORTRAIT}
              alt={`Portrait of ${PASTOR_NAME}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-[center_20%]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/10 lg:bg-gradient-to-r lg:from-transparent lg:via-navy-950/20 lg:to-navy-950"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:hidden">
              <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-gold-300 uppercase">
                {PASTOR_ROLE}
              </p>
              <p className="font-heading mt-1 text-2xl leading-tight">{PASTOR_NAME}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-1 flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.8, ease, delay: 0.06 }}
        >
          <p className="text-[0.68rem] font-semibold tracking-[0.34em] text-gold-300 uppercase">
            Welcome
          </p>
          <h2
            id="pastoral-welcome-title"
            className="font-heading mt-3 text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.12] tracking-tight text-cream-50"
          >
            A pastoral welcome
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-50/82 sm:text-lg">
            Welcome to our Ebenezer Ethiopian Church Portland community.
          </p>

          <div className="mt-8 space-y-4 border-l-2 border-gold-500/45 pl-5 sm:mt-10 sm:space-y-5 sm:pl-6">
            {welcomeParagraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
                className={cn(
                  "text-sm leading-relaxed text-cream-50/88 sm:text-[0.9375rem]",
                  i === 0 && "text-base text-cream-50 sm:text-lg",
                )}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="hidden lg:block">
              <p className="text-sm text-cream-50/65">In Christ&apos;s service,</p>
              <p className="font-heading mt-1 text-2xl text-cream-50">{PASTOR_NAME}</p>
              <p className="mt-1 text-xs tracking-[0.2em] text-gold-300/90 uppercase">
                {PASTOR_ROLE}
              </p>
            </div>
            <CTALink href="/visit" variant="primary" size="md" className="w-full sm:w-auto">
              Plan your visit
            </CTALink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
