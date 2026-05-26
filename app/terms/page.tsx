import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Ebenezer Ethiopian Church website services and content.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const effectiveDate = "April 19, 2026";

  return (
    <div className="relative overflow-x-hidden">
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        description="Terms governing access to Ebenezer Ethiopian Church website, forms, and online tools."
      />
      <MotionSectionBridge variant="fromNavy" />
      <AnimatedSection className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <div className="space-y-8 leading-relaxed text-charcoal-700">
            <p className="text-sm text-charcoal-600">Effective date: {effectiveDate}</p>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">1. Agreement to terms</h2>
              <p>
                By accessing or using this website, you agree to these Terms of Use and
                applicable laws. If you do not agree, please do not use this website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">2. Purpose of this website</h2>
              <p>
                This website is provided by Ebenezer Ethiopian Church for ministry
                communication, event information, contact and prayer requests, membership
                workflow support, and giving access through approved third-party services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">3. Content and doctrine</h2>
              <p>
                Church teaching content on this website is provided for spiritual
                encouragement and informational purposes. In case of conflict between web
                summaries and official church governing documents, the church&apos;s governing
                documents and adopted leadership decisions control.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">4. Acceptable use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Use this site for unlawful, abusive, or fraudulent purposes.</li>
                <li>Attempt unauthorized access to systems, forms, or data.</li>
                <li>Interfere with site functionality, security, or availability.</li>
                <li>Submit knowingly false or misleading information through forms.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">
                5. Forms, membership, and submissions
              </h2>
              <p>
                Submitting contact, prayer, or membership-related forms does not
                automatically create membership status, leadership status, or contractual
                rights. Church membership and related matters are handled according to the
                church&apos;s governing process.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">6. Online giving</h2>
              <p>
                Online giving is processed through third-party providers. Donation
                transactions, payment methods, receipts, and technical processing are
                governed by those providers&apos; terms and policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">
                7. Links to third-party websites
              </h2>
              <p>
                This website may include links to external websites or services. We are not
                responsible for the content, security, availability, or practices of those
                third-party sites.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">8. Intellectual property</h2>
              <p>
                Unless otherwise noted, website text, branding, and original media are
                church property or used with permission. You may view and share church pages
                for personal, non-commercial use. Do not reproduce or republish materials
                for commercial use without written permission.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">9. No warranty</h2>
              <p>
                This website and its content are provided on an &quot;as is&quot; and &quot;as available&quot;
                basis. We do not warrant uninterrupted operation, complete accuracy, or
                error-free availability at all times.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">10. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, Ebenezer Ethiopian Church is not
                liable for indirect, incidental, or consequential damages arising from use
                of this website, third-party services, or reliance on website content.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">11. Changes to terms</h2>
              <p>
                We may update these terms at any time. Updated terms will be posted on this
                page with a revised effective date. Continued use of the website after
                updates constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-2xl text-navy-950">12. Contact</h2>
              <p>
                For questions about these terms, please contact the church through the
                Contact page.
              </p>
            </section>
          </div>
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="aurora" />
    </div>
  );
}
