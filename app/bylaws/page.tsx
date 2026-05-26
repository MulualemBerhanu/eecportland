import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import { BylawsBackToFormLink } from "@/components/bylaws/BylawsBackToFormLink";
import { BylawsDraftLifecycle } from "@/components/bylaws/BylawsDraftLifecycle";
import { CTALink } from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: "Bylaws",
  description:
    "Read and download the official bylaws of Ebenezer Ethiopian Church Portland Oregon.",
};

export default function BylawsPage() {
  return (
    <div className="relative overflow-x-hidden">
      <BylawsDraftLifecycle />
      <PageHero
        eyebrow="Governance"
        title="Church bylaws"
        description="Read the official bylaws of Ebenezer Ethiopian Church Portland Oregon."
      />
      <MotionSectionBridge variant="fromNavy" />
      <div className="border-b border-cream-200/80 bg-cream-50/90 py-4 sm:py-5">
        <Container className="max-w-6xl">
          <BylawsBackToFormLink />
        </Container>
      </div>
      <AnimatedSection className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-card-soft sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
                  Official Document
                </p>
                <h2 className="font-heading mt-2 text-2xl text-navy-950 sm:text-3xl">
                  Bylaws Final Draft (Revised)
                </h2>
              </div>
              <CTALink href="/bylaws/document" variant="outlineWarm" size="md" external>
                Open / download PDF
              </CTALink>
            </div>
            <div className="overflow-hidden rounded-2xl border border-cream-200 bg-cream-50">
              <iframe
                title="Ebenezer Ethiopian Church Bylaws PDF"
                src="/bylaws/document"
                className="h-[70vh] w-full"
              />
            </div>
          </div>
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="aurora" />
    </div>
  );
}
