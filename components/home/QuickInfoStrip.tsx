"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useNavScrollClick } from "@/lib/use-nav-scroll-click";
import { Clock, HeartHandshake, MapPin, Radio } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/lib/site";

const MotionLink = motion(Link);

const items = [
  {
    icon: Clock,
    title: siteConfig.serviceTime,
    subtitle: siteConfig.fridayGathering,
  },
  {
    icon: MapPin,
    title: siteConfig.address.street,
    subtitle: `${siteConfig.address.city}, ${siteConfig.address.state}`,
  },
  {
    icon: Radio,
    title: "Watch online",
    subtitle: "Media & livestream (coming soon)",
    href: "/sermons",
  },
  {
    icon: HeartHandshake,
    title: "Prayer & care",
    subtitle: "Confidential care support",
    href: "/contact",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const list = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const cell = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

function QuickInfoLink({
  href,
  className,
  variants,
  children,
}: {
  href: string;
  className: string;
  variants: typeof cell;
  children: React.ReactNode;
}) {
  const handleClick = useNavScrollClick(href);
  return (
    <MotionLink href={href} className={className} variants={variants} onClick={handleClick}>
      {children}
    </MotionLink>
  );
}

export function QuickInfoStrip() {
  return (
    <section className="relative z-20 -mt-12 sm:-mt-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px", amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="shadow-card-soft overflow-hidden rounded-[1.4rem] border border-cream-200/90 bg-white/98 ring-1 ring-navy-950/[0.04] backdrop-blur-md"
        >
          <div className="h-1 bg-gradient-to-r from-gold-500/20 via-gold-500/60 to-gold-500/20" />
          <motion.div
            className="grid divide-y divide-cream-200/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {items.map((item) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-950/[0.06] to-navy-950/[0.02] text-navy-900 ring-1 ring-navy-950/10 transition duration-500 group-hover:from-gold-500/12 group-hover:to-gold-500/5 group-hover:text-gold-700 group-hover:ring-gold-500/25">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="mt-5">
                    <p className="font-heading text-lg tracking-tight text-navy-950">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-700">
                      {item.subtitle}
                    </p>
                  </div>
                </>
              );
              const cellClass =
                "group relative flex flex-col p-6 transition duration-500 sm:p-7 hover:bg-gradient-to-b hover:from-cream-50 hover:to-cream-100/80";
              if ("href" in item && item.href) {
                return (
                  <QuickInfoLink
                    key={item.title}
                    href={item.href}
                    className={cellClass}
                    variants={cell}
                  >
                    {inner}
                  </QuickInfoLink>
                );
              }
              return (
                <motion.div
                  key={item.title}
                  className={cellClass}
                  variants={cell}
                >
                  {inner}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
