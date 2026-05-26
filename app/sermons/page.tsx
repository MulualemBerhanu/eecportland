import type { Metadata } from "next";
import Link from "next/link";
import { getSermonsWithYouTubeMeta } from "@/lib/youtube-sermon-metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { PaginatedSermonVideoGrid } from "@/components/media/PaginatedSermonVideoGrid";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import { allMediaPhotos } from "@/data/media-photos";
import { PhotoGalleryLightbox } from "@/components/media/PhotoGalleryLightbox";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Watch or listen to recent messages and special services from Ebenezer Ethiopian Church.",
};

export default async function SermonsPage() {
  const sermonItems = await getSermonsWithYouTubeMeta();

  return (
    <div className="relative overflow-x-hidden">
      <PageHero
        eyebrow="Media"
        title="Growing through God’s Word together"
        description="Catch up on recent messages and see photos from our church family, whether you worshiped with us last Sunday or are exploring Ebenezer from home."
      />

      <MotionSectionBridge variant="ribbon" />
      <AnimatedSection
        id="community-gallery"
        className="scroll-mt-36 py-16 sm:scroll-mt-40 sm:py-20"
      >
        <Container>
          <div className="rounded-3xl border border-cream-200/85 bg-white p-6 shadow-card-soft sm:p-8">
            <h2 className="font-heading text-2xl text-navy-950 sm:text-3xl">
              Community photo gallery
            </h2>
            <p className="mt-3 max-w-2xl text-charcoal-700">
              Browse moments from worship, fellowship, and ministry life. Use the
              controls below to flip through pages. Click any photo to view it in
              fullscreen.
            </p>
            <PhotoGalleryLightbox images={allMediaPhotos} />
          </div>
        </Container>
      </AnimatedSection>

      <MotionSectionBridge variant="fold" />
      <AnimatedSection id="videos" className="scroll-mt-36 py-12 pb-20 sm:scroll-mt-40 sm:py-16 sm:pb-28">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-heading text-2xl text-navy-950 sm:text-3xl">
              Videos
            </h2>
            <Link
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-navy-950 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-600"
            >
              Full channel on YouTube
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            Browse recent messages in pages for quicker loading. Use the controls below to
            move between pages.
          </p>
          <PaginatedSermonVideoGrid sermons={sermonItems} />
        </Container>
      </AnimatedSection>
      <MotionSectionBridge variant="aurora" />
    </div>
  );
}
