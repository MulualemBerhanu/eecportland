import { missionStatement, visionStatement } from "@/data/values";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTALink } from "@/components/shared/CTAButton";

const missionPreview =
  "We exist to make disciples of Jesus Christ by proclaiming the gospel, nurturing believers in grace, and equipping every generation to serve in the power of the Holy Spirit.";

const visionPreview =
  "We envision a worshiping community rooted in truth, empowered by the Spirit, and committed to carrying Christ’s love across generations and into the world.";

export function MissionVisionHome() {
  return (
    <section className="section-y-xl relative overflow-x-hidden bg-cream-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_52%_at_50%_-8%,rgba(212,175,55,0.14),transparent_56%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sage-500/12 blur-3xl" />
        <div className="absolute right-[15%] top-1/3 h-72 w-72 rounded-full bg-navy-900/8 blur-3xl" />
      </div>
      <div className="bg-grain absolute inset-0 opacity-[0.022]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-warm opacity-[0.35]"
        aria-hidden
      />

      <Container className="relative">
        <SectionHeading
          align="center"
          eyebrow="Mission & vision"
          title="One Lord. One family. One calling."
          description="A clear snapshot of why we exist and where we are going. Read the full statement on the About page."
          className="max-w-2xl"
        />
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="group shadow-card-soft relative overflow-hidden rounded-3xl border border-cream-200/90 bg-white p-10 transition duration-500 hover:shadow-card-hover sm:p-11">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-300/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <p className="relative text-[0.7rem] font-semibold tracking-[0.28em] text-gold-700 uppercase">
              {missionStatement.title}
            </p>
            <p className="relative mt-6 text-lg leading-[1.75] text-charcoal-800 sm:text-xl sm:leading-[1.7]">
              {missionPreview}
            </p>
            <p className="mt-5 inline-flex rounded-full border border-cream-300 bg-cream-50 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-navy-900 uppercase">
              Matthew 28:18-19
            </p>
          </div>
          <div className="group shadow-card-soft relative overflow-hidden rounded-3xl border border-cream-200/90 bg-white p-10 transition duration-500 hover:shadow-card-hover sm:p-11">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sage-500/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <p className="relative text-[0.7rem] font-semibold tracking-[0.28em] text-gold-700 uppercase">
              {visionStatement.title}
            </p>
            <p className="relative mt-6 text-lg leading-[1.75] text-charcoal-800 sm:text-xl sm:leading-[1.7]">
              {visionPreview}
            </p>
            <p className="mt-5 text-sm font-medium text-charcoal-700">
              Full theological statement and detailed mission language are available on
              the About page.
            </p>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <CTALink href="/about" variant="outlineWarm" size="lg">
            Read full mission & vision
          </CTALink>
        </div>
      </Container>
    </section>
  );
}
