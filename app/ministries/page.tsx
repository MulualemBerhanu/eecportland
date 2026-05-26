import type { Metadata } from "next";
import { ministriesIntro } from "@/data/ministries";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import { MinistryExplorer } from "@/components/ministries/MinistryExplorer";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Worship, youth, children, evangelism, men’s and women’s fellowship, and our ministerial training program at Ebenezer Ethiopian Church in Portland.",
};

export default function MinistriesPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageHero
        eyebrow="Ministries"
        title="Where faith becomes fellowship"
        description={ministriesIntro}
      />
      <MotionSectionBridge variant="fromNavy" />
      <AnimatedSection className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl text-navy-950 sm:text-3xl">At a glance</h2>
            <p className="mt-3 text-charcoal-700">
              Tap any ministry card to open full details in a focused panel.
            </p>
          </div>
          <MinistryExplorer />
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="aurora" />
    </div>
  );
}
