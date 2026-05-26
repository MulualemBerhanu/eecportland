import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import { MembersDraftLifecycle } from "@/components/members/MembersDraftLifecycle";
import { MembershipMultiStepForm } from "@/components/members/MembershipMultiStepForm";

export const metadata: Metadata = {
  title: "Members Form",
  description:
    "Ebenzer Ethiopian Church Portland Membership Form: guided multi-step experience.",
};

export default function MembersPage() {
  return (
    <div className="relative overflow-x-hidden">
      <MembersDraftLifecycle />
      <PageHero
        eyebrow="Members Form"
        title="Membership application"
        description="Complete the guided form below using the same questions from our church membership form."
      />
      <MotionSectionBridge variant="fromNavy" />
      <AnimatedSection
        id="membership-form"
        className="scroll-mt-28 py-10 sm:scroll-mt-32 sm:py-12"
      >
        <Container className="max-w-4xl">
          <MembershipMultiStepForm />
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="aurora" />
    </div>
  );
}
