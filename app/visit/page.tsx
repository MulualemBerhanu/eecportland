import type { Metadata } from "next";
import { CTALink } from "@/components/shared/CTAButton";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import { siteConfig } from "@/lib/site";
import { Car, Heart, Shirt, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Visit Us / New Here",
  description:
    "What to expect on Sunday: worship, kids, dress, parking, and atmosphere at Ebenezer Ethiopian Church.",
};

const steps = [
  {
    title: "Come as you are",
    body: "You’ll find casual and dressy. What matters is that you’re here. Modest, respectful attire is always welcome.",
    icon: Shirt,
  },
  {
    title: "Worship with us",
    body: "We sing contemporary songs and timeless hymns, pray together, and open Scripture. Services are about 75 minutes.",
    icon: Sparkles,
  },
  {
    title: "Kids & students",
    body: "Children’s ministry is staffed by trained volunteers. Check in at the welcome desk for safety and peace of mind.",
    icon: Users,
  },
  {
    title: "Parking & arrival",
    body: "Guest parking is marked near the main entrance. Arrive a few minutes early to meet a host and find your seat.",
    icon: Car,
  },
  {
    title: "Community afterward",
    body: "Stay for coffee and conversation. We’d love to know your name and answer questions at your pace.",
    icon: Heart,
  },
];

export default function VisitPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageHero
        eyebrow="New here"
        title="Your first visit can feel like coming home"
        description={`${siteConfig.serviceTime}. ${siteConfig.fridayGathering} Whether you’ve been in church your whole life or you’re just curious about Jesus, you belong here.`}
      />

      <MotionSectionBridge variant="fromNavy" />
      <AnimatedSection className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl text-navy-950 sm:text-4xl">
              What to expect on Sunday
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal-700">
              Our atmosphere is reverent and joyful, serious about God, warm toward
              people. You’ll hear the gospel clearly, see diverse cultures united in
              Christ, and be invited, never pressured, to take a next step.
            </p>
            <div className="mt-10 flex justify-center">
              <CTALink href="/contact" variant="outlineWarm" size="lg">
                Ask a question
              </CTALink>
            </div>
          </div>
          <ol className="mx-auto mt-14 max-w-3xl space-y-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  className="flex gap-5 rounded-2xl border border-cream-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 font-heading text-sm text-gold-400">
                    {i + 1}
                  </span>
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-700">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl text-navy-950">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-charcoal-700">{s.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </AnimatedSection>
    </div>
  );
}
