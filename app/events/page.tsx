import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import {
  CalendarDays,
  CalendarHeart,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import { CTALink } from "@/components/shared/CTAButton";
import { getCalendarEvents } from "@/lib/calendar-events";
import { FlyerImage } from "@/components/shared/FlyerImage";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming worship gatherings, community meals, serve days, and family events at Ebenezer Ethiopian Church.",
};

export default async function EventsPage() {
  const list = await getCalendarEvents(50, { noStore: true });
  const [featured, ...rest] = list;
  const eventsToShow = list;

  return (
    <div className="relative overflow-x-hidden">
      <PageHero
        eyebrow="Events"
        title="Gather, grow, and serve together"
        description="From worship gatherings to ministry activities, this page helps you see what’s coming up and plan your week with our church family."
      />

      <MotionSectionBridge variant="fromNavy" />
      {featured ? (
        <section className="-mt-6 pb-8 sm:-mt-10">
          <Container>
            <div className="overflow-hidden rounded-[2rem] border border-gold-500/35 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 shadow-[0_35px_80px_-45px_rgba(10,20,40,0.9)] ring-1 ring-white/10">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="p-7 text-cream-50 sm:p-10">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/35 bg-gold-300/10 px-3 py-1 text-[0.64rem] font-semibold tracking-[0.17em] text-gold-200 uppercase">
                      <Sparkles className="size-3.5" aria-hidden />
                      Featured Event
                    </p>
                    <p className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.64rem] font-semibold tracking-wider text-cream-100/90 uppercase">
                      Synced Live
                    </p>
                  </div>
                  <h2 className="font-heading mt-4 text-3xl leading-[1.28] text-white sm:text-4xl pb-[0.06em]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-cream-200">{featured.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-2.5 text-sm text-cream-100">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                      <CalendarDays className="size-4 text-gold-300" aria-hidden />
                      {featured.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                      <Clock3 className="size-4 text-gold-300" aria-hidden />
                      {featured.timeLabel}
                    </span>
                    {featured.location ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                        <MapPin className="size-4 text-gold-300" aria-hidden />
                        {featured.location}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <CTALink href="#all-events" variant="primary" size="md">
                      Explore all events
                    </CTALink>
                    {featured.detailsUrl ? (
                      <CTALink href={featured.detailsUrl} external variant="outlineLight" size="md">
                        Register / details
                      </CTALink>
                    ) : null}
                  </div>
                </div>

                {featured.flyerImage ? (
                  <div className="min-h-[260px] border-t border-white/10 lg:min-h-full lg:border-t-0 lg:border-l lg:border-white/10">
                    <FlyerImage
                      src={featured.flyerImage}
                      alt={`Flyer for ${featured.title}`}
                      className="h-full min-h-[260px] rounded-none border-0 lg:min-h-full"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[260px] items-center justify-center border-t border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(236,193,91,0.26),transparent_54%),radial-gradient(ellipse_at_bottom_left,rgba(88,143,125,0.32),transparent_58%)] p-8 text-center lg:min-h-full lg:border-t-0 lg:border-l lg:border-white/10">
                    <p className="max-w-xs text-sm leading-relaxed text-cream-100/90">
                      Event flyers will appear here automatically when a{" "}
                      <span className="font-semibold text-gold-200">Flyer:</span> link is added
                      to the calendar description.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {featured ? <MotionSectionBridge variant="softRamp" /> : null}
      <AnimatedSection className="py-12 sm:py-20" id="all-events">
        <Container>
          {list.length ? (
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">
                  Upcoming Schedule
                </p>
                <h2 className="font-heading mt-2 text-3xl text-navy-950 sm:text-4xl">
                  Plan your next steps with us
                </h2>
              </div>
              <p className="rounded-full border border-cream-200 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-700 sm:text-sm">
                {list.length} upcoming event{list.length > 1 ? "s" : ""}
              </p>
            </div>
          ) : null}

          {list.length ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {eventsToShow.map((e) => (
                <article
                  key={e.id}
                  className="group overflow-hidden rounded-3xl border border-cream-200/90 bg-white p-6 shadow-card-soft ring-1 ring-navy-950/[0.035] transition duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  {e.id === featured?.id ? (
                    <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-gold-300/60 bg-gold-50 px-3 py-1 text-[0.64rem] font-semibold tracking-[0.14em] text-gold-800 uppercase">
                      <Sparkles className="size-3.5" aria-hidden />
                      Featured
                    </p>
                  ) : null}
                  <div className="mb-5 flex flex-wrap gap-2.5 text-xs text-charcoal-700">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-cream-50 px-3 py-1.5">
                      <CalendarDays className="size-3.5 text-gold-700" aria-hidden />
                      {e.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-cream-50 px-3 py-1.5">
                      <Clock3 className="size-3.5 text-gold-700" aria-hidden />
                      {e.timeLabel}
                    </span>
                    {e.location ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-cream-50 px-3 py-1.5">
                        <MapPin className="size-3.5 text-gold-700" aria-hidden />
                        {e.location}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl leading-[1.28] text-navy-950 pb-[0.05em]">
                      {e.title}
                    </h3>
                    <p className="mt-2 text-charcoal-700">{e.summary}</p>
                  </div>

                  <div className="mt-5 mb-5 overflow-hidden rounded-2xl border border-cream-200/90 bg-navy-900/95 ring-1 ring-white/10">
                    {e.flyerImage ? (
                      <FlyerImage
                        src={e.flyerImage}
                        alt={`Flyer for ${e.title}`}
                        className="h-full min-h-[380px] rounded-none border-0 sm:min-h-[500px]"
                        imgClassName="transition duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex min-h-[380px] items-center justify-center bg-[radial-gradient(ellipse_at_top_right,rgba(236,193,91,0.26),transparent_54%),radial-gradient(ellipse_at_bottom_left,rgba(88,143,125,0.32),transparent_58%)] p-6 text-center sm:min-h-[500px]">
                        <p className="max-w-xs text-sm leading-relaxed text-cream-100/90">
                          Event flyers will appear here automatically when a{" "}
                          <span className="font-semibold text-gold-200">Flyer:</span> link is added
                          to the calendar description.
                        </p>
                      </div>
                    )}
                  </div>

                  {e.detailsUrl ? (
                    <div className="mt-5">
                      <CTALink href={e.detailsUrl} external variant="outlineWarm" size="md">
                        Register / details
                      </CTALink>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-dashed border-cream-300 bg-white px-8 py-16 text-center shadow-sm">
              <CalendarHeart
                className="size-12 text-gold-500"
                aria-hidden
              />
              <h2 className="font-heading mt-6 text-2xl text-navy-950">
                New events are on the way
              </h2>
              <p className="mt-3 text-charcoal-700">
                No upcoming events found in the linked calendar yet. Check back soon.
              </p>
            </div>
          )}
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="aurora" />
    </div>
  );
}
