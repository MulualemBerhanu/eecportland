"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CTALink } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const IMG =
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900&q=80";

const ease = [0.22, 1, 0.36, 1] as const;

const bullets = [
  "We teach Scripture with clarity and Jesus at the center of every sermon and every ministry.",
  "We welcome first-time guests with hospitality, not pressure. come as you are and meet God with us.",
];

export function WelcomeIntro() {
  const reduce = useReducedMotion();

  return (
    <section
      id="welcome-intro"
      className="section-y-xl relative scroll-mt-28 overflow-x-hidden bg-band-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.45]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
        animate={
          reduce
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="relative lg:col-span-6"
            initial={reduce ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease }}
          >
            <div className="absolute -left-6 -top-6 hidden h-32 w-32 rounded-full bg-gold-500/15 blur-3xl lg:block" aria-hidden />
            <div className="relative">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-gold-400/30 via-transparent to-sage-500/18 blur-2xl" />
              <motion.div
                className="relative overflow-hidden rounded-[1.85rem] ring-1 ring-white/60 shadow-[0_40px_100px_-48px_rgba(10,22,40,0.55)]"
                whileHover={reduce ? undefined : { scale: 1.01 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/20" />
                <motion.div
                  initial={false}
                  whileHover={reduce ? undefined : { scale: 1.06 }}
                  transition={{ duration: 1.1, ease }}
                >
                  <Image
                    src={IMG}
                    alt="Families and friends talking together after church"
                    width={900}
                    height={720}
                    className="h-auto w-full object-cover"
                  />
                </motion.div>
              </motion.div>
              <motion.aside
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.65, ease }}
                className="absolute -bottom-6 -right-4 hidden max-w-[220px] rounded-2xl border border-cream-200/90 bg-white/95 p-5 text-sm leading-relaxed text-charcoal-700 shadow-xl backdrop-blur-sm lg:block"
              >
                <p className="font-heading text-base text-navy-950 italic">
                  “Come as you are and leave encouraged.”
                </p>
                <p className="mt-2 text-xs font-medium tracking-wide text-gold-700 uppercase">
                  Guest promise
                </p>
              </motion.aside>
            </div>
          </motion.div>

          <div className="lg:col-span-6 lg:pl-4">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease }}
            >
              <SectionHeading
                eyebrow="Who we are"
                title="Gathered in Christ, sent in love"
                description="Ebenezer Ethiopian Church exists to glorify God through faithful preaching, heartfelt worship, and compassionate community. Our story stretches from East Africa to our neighborhood. Many cultures, one Savior."
              />
            </motion.div>
            <motion.ul
              className="mt-10 space-y-5 text-[1.02rem] leading-relaxed text-charcoal-700"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
              }}
            >
              {bullets.map((text) => (
                <motion.li
                  key={text}
                  className="flex gap-4"
                  variants={{
                    hidden: { opacity: 0, x: 18 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.55, ease },
                    },
                  }}
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 ring-4 ring-gold-500/15" />
                  <span>{text}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="mt-12"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.55, ease }}
            >
              <CTALink href="/about" variant="secondary" size="lg">
                Read our story
              </CTALink>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
