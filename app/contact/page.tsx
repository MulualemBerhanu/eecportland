import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/shared/ContactForm";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import { contactFaqs } from "@/data/faqs";
import { siteConfig } from "@/lib/site";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Office hours, address, and contact form for Ebenezer Ethiopian Church in Milwaukie, OR.",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageHero
        eyebrow="Contact"
        title="We’re here to help"
        description="Questions about visiting, baptism, serving, or care? Reach out, and our team responds as quickly as we can."
      />
      <MotionSectionBridge variant="fromNavy" />
      <AnimatedSection className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="font-heading text-2xl text-navy-950">Visit & connect</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <p className="font-medium text-navy-950">Address</p>
                    <p className="mt-1 text-charcoal-700">{siteConfig.address.full}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <p className="font-medium text-navy-950">Phone</p>
                    <a
                      className="mt-1 block text-charcoal-700 underline-offset-4 hover:underline"
                      href={`tel:${siteConfig.contact.phoneTel}`}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-1 size-5 shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <p className="font-medium text-navy-950">Email</p>
                    <a
                      className="mt-1 block text-charcoal-700 underline-offset-4 hover:underline"
                      href={`mailto:${siteConfig.contact.email}`}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-1 size-5 shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <p className="font-medium text-navy-950">Service schedule</p>
                    <div className="mt-1 space-y-1 text-charcoal-700">
                      {siteConfig.serviceScheduleLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-10 rounded-2xl border border-cream-200 bg-cream-100/50 p-6">
                <h3 className="font-heading text-lg text-navy-950">Map</h3>
                <p className="mt-2 text-sm text-charcoal-700">
                  Find us at {siteConfig.address.full}.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-cream-300 bg-white">
                  <iframe
                    title={`Map to ${siteConfig.name}`}
                    src="https://www.google.com/maps?q=16575+SE+Webster+RD,+Milwaukie,+OR+97267&output=embed"
                    className="aspect-video w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=16575+SE+Webster+RD,+Milwaukie,+OR+97267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-gold-700 underline decoration-gold-500/40 underline-offset-2 hover:text-navy-950"
                >
                  Get directions
                </a>
              </div>

              <div className="mt-10">
                <h3 className="font-heading text-lg text-navy-950">Quick help</h3>
                <dl className="mt-4 space-y-4">
                  {contactFaqs.map((f) => (
                    <div key={f.question}>
                      <dt className="font-medium text-navy-950">{f.question}</dt>
                      <dd className="mt-1 text-sm text-charcoal-700">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="rounded-3xl border border-cream-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="font-heading text-2xl text-navy-950">Send a message</h2>
              <p className="mt-2 text-sm text-charcoal-700">
                We typically reply within two business days.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="ribbon" />
    </div>
  );
}
