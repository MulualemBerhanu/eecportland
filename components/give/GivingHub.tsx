"use client";

import { useMemo, useState } from "react";
import { Building2, HandHeart, Receipt, ShieldCheck } from "lucide-react";
import { CTALink } from "@/components/shared/CTAButton";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type TabId = "general" | "building";

const tabs = [
  {
    id: "general" as const,
    label: "General Giving",
    title: "Support weekly ministry",
    description:
      "Your regular gifts sustain worship, discipleship, mercy care, and gospel outreach across every generation.",
    bullets: [
      "Supports Sunday ministry, prayer, and pastoral care",
      "Funds discipleship for children, youth, and adults",
      "Strengthens local outreach and benevolence",
    ],
    ctaLabel: "Give securely",
    ctaHref: siteConfig.givingUrl,
    icon: HandHeart,
  },
  {
    id: "building" as const,
    label: "Building Fund",
    title: "Invest in our future home",
    description:
      "Building fund contributions help create long-term space for worship, discipleship, and community service.",
    bullets: [
      "Expands ministry capacity for coming generations",
      "Helps prepare a permanent, welcoming worship space",
      "Supports facilities for discipleship and outreach",
    ],
    ctaLabel: "Support building fund",
    ctaHref: siteConfig.buildingFundUrl,
    icon: Building2,
  },
];

const trustPoints = [
  { label: "Secure checkout", icon: ShieldCheck },
  { label: "Tax-deductible records", icon: Receipt },
  { label: "Church-managed stewardship", icon: Building2 },
];

export function GivingHub() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const active = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );
  const ActiveIcon = active.icon;

  return (
    <section className="border-y border-cream-200 bg-cream-100/60 py-16 pb-28 sm:py-24 sm:pb-24">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-3xl text-navy-950 sm:text-4xl">Give online</h2>
        <p className="mt-4 text-charcoal-700">
          Choose where your gift goes, then give through our secure Tithely links.
        </p>

        <div
          className="mt-8 grid grid-cols-2 gap-2 rounded-2xl border border-cream-200 bg-white p-2 shadow-sm"
          role="tablist"
          aria-label="Giving options"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={cn(
                "rounded-xl px-4 py-3 text-sm font-semibold transition",
                activeTab === tab.id
                  ? "bg-navy-950 text-cream-50 shadow-sm"
                  : "text-charcoal-700 hover:bg-cream-100",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <article className="mt-6 rounded-3xl border border-cream-200 bg-white p-7 text-left shadow-sm sm:p-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-400/10 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-gold-700 uppercase">
            <ActiveIcon className="size-3.5" aria-hidden />
            {active.label}
          </div>
          <h3 className="font-heading mt-4 text-2xl text-navy-950 sm:text-3xl">{active.title}</h3>
          <p className="mt-3 leading-relaxed text-charcoal-700">{active.description}</p>
          <ul className="mt-5 space-y-3 text-sm text-charcoal-700 sm:text-base">
            {active.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 rounded-full bg-gold-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 hidden sm:block">
            <CTALink href={active.ctaHref} variant="primary" size="lg" external>
              {active.ctaLabel}
            </CTALink>
          </div>
        </article>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.label}
                className="flex items-center justify-center gap-2 rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-charcoal-700 shadow-sm"
              >
                <Icon className="size-4 text-navy-900" aria-hidden />
                <span>{point.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-[60] sm:hidden">
        <CTALink
          href={active.ctaHref}
          variant="primary"
          size="lg"
          className="w-full justify-center shadow-[0_12px_35px_-14px_rgba(11,28,44,0.55)]"
          external
        >
          {active.ctaLabel}
        </CTALink>
      </div>
    </section>
  );
}
