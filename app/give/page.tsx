import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import { GivingHub } from "@/components/give/GivingHub";
import { giveFaqs } from "@/data/faqs";
import { Heart, Landmark, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Generous giving supports worship, mercy, and missions at Ebenezer Ethiopian Church, grateful, secure, and stewarded with care.",
};

export default function GivePage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageHero
        eyebrow="Give"
        title="Cheerful generosity for eternal impact"
        description="We give because God first gave Himself. Your gifts help us preach the gospel, care for neighbors, and send missionaries faithfully and transparently."
      />

      <MotionSectionBridge variant="fromNavy" />
      <AnimatedSection className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-charcoal-700">
              Scripture calls us to give willingly, proportionally, and joyfully, not
              under pressure. Whether you are new to faith or have walked with Jesus
              for decades, we invite you to pray, plan, and give in a way that
              honors the Lord and reflects His kindness.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Why we give",
                body: "Giving is worship. It trains our hearts toward trust, fuels ministry, and sends hope beyond our walls.",
              },
              {
                icon: Landmark,
                title: "Stewardship",
                body: "The Elders Committee prepares a proposed budget, and the Executive Board of Directors reviews and approves the final budget. Church accounts are supervised through the Treasurer’s office with accountability and record keeping.",
              },
              {
                icon: Mail,
                title: "Questions",
                body: "Our office can help with recurring gifts, giving questions, or planned-giving introductions.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-cream-200 bg-white p-7 shadow-sm"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy-950/5 text-navy-900">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-heading mt-4 text-xl text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </AnimatedSection>

      <MotionSectionBridge variant="ribbon" />
      <GivingHub />

      <MotionSectionBridge variant="fold" />
      <AnimatedSection className="py-16 sm:py-24">
        <Container>
          <h2 className="font-heading text-center text-3xl text-navy-950">
            Other ways to give
          </h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-charcoal-700">
            <div className="rounded-2xl border border-cream-200 bg-white p-6">
              <p className="font-medium text-navy-950">In person</p>
              <p className="mt-2">
                Offering boxes are available during Sunday worship. Use envelopes
                for cash gifts if you need a receipt.
              </p>
            </div>
            <div className="rounded-2xl border border-cream-200 bg-white p-6">
              <p className="font-medium text-navy-950">By mail</p>
              <p className="mt-2">
                Mail checks to the church office. Please write “General Fund” or your
                designation in the memo line.
              </p>
            </div>
            <div className="rounded-2xl border border-cream-200 bg-white p-6">
              <p className="font-medium text-navy-950">Bank transfer</p>
              <p className="mt-2">
                Contact the office for ACH routing details. Our team will respond
                promptly.
              </p>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      <MotionSectionBridge variant="steps" />
      <AnimatedSection className="pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <h2 className="font-heading text-center text-2xl text-navy-950">
            Common questions
          </h2>
          <dl className="mt-10 space-y-6">
            {giveFaqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-cream-200 bg-white p-6"
              >
                <dt className="font-heading text-lg text-navy-950">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-charcoal-700">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="aurora" />
    </div>
  );
}
