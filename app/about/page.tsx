import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import { CTALink } from "@/components/shared/CTAButton";
import { MissionStatementCard } from "@/components/about/MissionStatementCard";
import { ChurchStorySection } from "@/components/about/ChurchStorySection";
import { PastoralWelcomeCard } from "@/components/about/PastoralWelcomeCard";
import { LeadershipTextCard } from "@/components/shared/LeadershipTextCard";
import { beliefs, leadership } from "@/data/beliefs";
import {
  commitmentPoints,
  focusPoints,
  missionStatement,
  visionStatement,
} from "@/data/values";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our story, mission, vision, and beliefs. Ebenezer Ethiopian Church is a Christ-centered community in Milwaukie.",
};

const aboutNav = [
  { href: "#story", label: "Story" },
  { href: "#mission-vision", label: "Mission & Vision" },
  { href: "#beliefs", label: "Beliefs" },
  { href: "#leadership", label: "Leadership" },
];

export default function AboutPage() {
  const missionSummary = missionStatement.body.split("\n\n")[1] ?? missionStatement.body;
  const missionVerse = missionStatement.body.split("\n\n")[0] ?? "";

  return (
    <div className="relative overflow-x-hidden">
      <PageHero
        eyebrow="About us"
        title="Rooted in Scripture, reaching in love"
        description="We are an Ethiopian evangelical church family learning to follow Jesus with humility, joy, and courage across cultures and generations."
      />

      <section className="relative z-20 -mt-8 pb-2 sm:-mt-10">
        <Container>
          <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-2xl border border-cream-200 bg-white/95 p-2 shadow-sm backdrop-blur">
            {aboutNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-charcoal-700 transition hover:bg-cream-100 hover:text-navy-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <MotionSectionBridge variant="fromNavy" />

      <AnimatedSection id="story" className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
            <PastoralWelcomeCard />
            <ChurchStorySection />
          </div>
        </Container>
      </AnimatedSection>

      <MotionSectionBridge variant="ribbon" />

      <section
        id="mission-vision"
        className="relative overflow-hidden border-y border-cream-200 bg-cream-100/60 py-16 sm:py-24"
      >
        <div
          className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-gold-400/16 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-6 size-64 rounded-full bg-sage-500/16 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-2">
            <MissionStatementCard
              title={missionStatement.title}
              verse={missionVerse}
              summary={missionSummary}
              fullBody={missionStatement.body}
            />
            <article className="rounded-3xl border border-cream-200 bg-white p-8 shadow-sm sm:p-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
                {visionStatement.title}
              </p>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-charcoal-700">
                {visionStatement.body}
              </p>
            </article>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-cream-200 bg-white p-8 shadow-sm sm:p-10">
              <h3 className="font-heading text-2xl text-navy-950">Our Commitments</h3>
              <ul className="mt-5 space-y-3 text-charcoal-700">
                {commitmentPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 size-1.5 rounded-full bg-gold-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-cream-200 bg-white p-8 shadow-sm sm:p-10">
              <h3 className="font-heading text-2xl text-navy-950">Our Focus</h3>
              <ul className="mt-5 space-y-3 text-charcoal-700">
                {focusPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 size-1.5 rounded-full bg-gold-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <MotionSectionBridge variant="fold" />

      <AnimatedSection id="beliefs" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title="Statement of faith"
            description="Our conviction is rooted in Scripture and centered on the saving work of Jesus Christ."
            className="mx-auto"
          />
          <article className="mx-auto mt-10 max-w-5xl rounded-2xl border border-cream-200 bg-white p-7 shadow-sm sm:p-9">
            <p className="text-lg leading-relaxed text-charcoal-700">
              We believe in one God who is three distinct persons-Father, Son and Holy
              Spirit. We believe that the Bible is the written and inspired Word of God
              and is the source of God&apos;s blessings. We believe that Jesus Christ is
              the Son of God, and the Savior of the world. We believe that the blood
              Jesus shed on the cross allowed us to have an intimate relationship with
              God. It is through our faith in His selfless act of love that we are
              saved. We believe that Jesus Christ rose from the dead and is coming
              again. We believe in water baptism and baptism in the Holy Spirit with the
              evidence of speaking in tongues. We believe that God wants us to have a
              full life, free from poverty, sickness and disease. We believe that tithing
              represents our love for God and we strive to honor Him in everything we do.
            </p>
          </article>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-cream-200 bg-white p-7 shadow-sm"
              >
                <h3 className="font-heading text-xl text-navy-950">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal-700">{b.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <MotionSectionBridge variant="toNavy" />

      <section id="leadership" className="relative overflow-hidden bg-cream-100 py-16 sm:py-24">
        <div
          className="pointer-events-none absolute -left-24 top-1/4 size-[28rem] rounded-full bg-gradient-to-br from-gold-400/25 via-gold-200/10 to-transparent blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 size-[22rem] rounded-full bg-gradient-to-tl from-sage-500/18 via-transparent to-transparent blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(250,248,245,0.85)_100%)]"
          aria-hidden
        />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow="Leadership"
            title="Board & officers"
            description="Faithful servants who help guide our church family. Introduce yourself on Sunday, and we would love to meet you."
            className="mx-auto"
          />
          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {leadership.map((person, index) => (
              <div key={person.name}>
                <LeadershipTextCard person={person} index={index} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <MotionSectionBridge variant="fromNavy" />

      <AnimatedSection className="py-16 sm:py-24">
        <Container className="max-w-3xl text-center">
          <h2 className="font-heading text-3xl text-navy-950 sm:text-4xl">
            Community & outreach
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-700">
            The gospel sends us outward. We partner with local schools, serve
            neighbors in need, and support mission workers who are planting churches
            and caring for the vulnerable. Mercy is not an extra program. It is the
            natural fruit of people who have been loved by God.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTALink href="/visit" variant="primary" size="lg">
              Plan your visit
            </CTALink>
            <CTALink href="/contact" variant="outlineWarm" size="lg">
              Contact our team
            </CTALink>
          </div>
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="aurora" />
    </div>
  );
}
