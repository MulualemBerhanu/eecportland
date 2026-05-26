import type { CalendarEvent } from "@/lib/calendar-events";
import { CTALink } from "@/components/shared/CTAButton";
import { Container } from "@/components/shared/Container";
import { FlyerImage } from "@/components/shared/FlyerImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

type EventsPreviewHomeProps = {
  upcoming: CalendarEvent[];
};

export function EventsPreviewHome({ upcoming }: EventsPreviewHomeProps) {

  return (
    <section className="section-y-xl relative overflow-x-hidden border-t border-cream-200/80 bg-gradient-to-b from-cream-100/95 via-cream-50 to-cream-100/80">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_20%,rgba(201,162,39,0.1),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.38]"
        aria-hidden
      />
      <Container className="relative">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Upcoming"
            title="Mark your calendar"
            description="Worship nights, serve days, and family gatherings. Join us as we follow Jesus together."
            className="max-w-xl lg:max-w-2xl"
          />
          <CTALink href="/events" variant="secondary" size="md" className="shrink-0">
            Full calendar
          </CTALink>
        </div>
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {upcoming.length ? (
            upcoming.map((e) => (
              <article
                key={e.id}
                className="shadow-card-soft group relative flex flex-col overflow-hidden rounded-3xl border border-cream-200/90 bg-gradient-to-b from-white to-cream-50/35 p-6 ring-1 ring-navy-950/[0.035] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-500/25 hover:shadow-card-hover"
              >
                <div className="mb-4 flex flex-wrap gap-2.5 text-xs text-charcoal-700">
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

                <h3 className="font-heading text-xl leading-tight text-navy-950">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{e.summary}</p>

                <div className="mt-5 overflow-hidden rounded-2xl border border-cream-200/90 bg-navy-900/95 ring-1 ring-white/10">
                  {e.flyerImage ? (
                    <FlyerImage
                      src={e.flyerImage}
                      alt={`Flyer for ${e.title}`}
                      className="min-h-[320px] rounded-none border-0"
                    />
                  ) : (
                    <div className="flex min-h-[320px] items-center justify-center bg-[radial-gradient(ellipse_at_top_right,rgba(236,193,91,0.26),transparent_54%),radial-gradient(ellipse_at_bottom_left,rgba(88,143,125,0.32),transparent_58%)] p-6 text-center">
                      <p className="max-w-xs text-sm leading-relaxed text-cream-100/90">
                        Event flyers appear automatically from your Google Calendar.
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
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-cream-300 bg-white/80 p-8 text-center text-charcoal-700 lg:col-span-3">
              Upcoming events will appear here automatically once they are added to the church calendar.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
