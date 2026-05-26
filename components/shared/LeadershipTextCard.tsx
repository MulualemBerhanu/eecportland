"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Landmark, PenLine, Shield } from "lucide-react";
import type { LeadershipMember } from "@/data/beliefs";
import { cn } from "@/lib/utils";

const roleIcon = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes("treasurer")) return Landmark;
  if (r.includes("secretary")) return PenLine;
  return Shield;
};

type Props = {
  person: LeadershipMember;
  index: number;
};

export function LeadershipTextCard({ person, index }: Props) {
  const reduce = useReducedMotion();
  const Icon = roleIcon(person.role);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px", amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 76,
        damping: 22,
        mass: 0.9,
        delay: index * 0.06,
      }}
      className="flex h-full flex-col rounded-2xl border border-cream-200 bg-white p-6 shadow-sm ring-1 ring-white/80 sm:p-7"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-cream-200 bg-cream-50 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] text-navy-900 uppercase",
          )}
        >
          <Icon className="size-3.5 shrink-0 text-gold-600" aria-hidden />
          {person.role}
        </span>
        <span
          className="font-heading text-3xl tabular-nums leading-none text-navy-900/10 select-none"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-heading text-xl leading-tight text-navy-950 sm:text-2xl">
        {person.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-700 sm:text-[0.9375rem]">
        {person.bio}
      </p>
    </motion.article>
  );
}
