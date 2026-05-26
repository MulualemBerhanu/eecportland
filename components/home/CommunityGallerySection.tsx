"use client";

import Image from "next/image";
import { Images } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTALink } from "@/components/shared/CTAButton";
import { homeMediaPhotos } from "@/data/media-photos";

export function CommunityGallerySection() {
  return (
    <section className="section-y-xl relative overflow-x-hidden border-y border-cream-200/80 bg-gradient-to-b from-white via-cream-50/70 to-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(201,162,39,0.1),transparent_55%)]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          align="center"
          eyebrow="Church life"
          title="Moments from our community"
          description="Eight glimpses of worship, prayer, fellowship, and service. Open the full gallery on our media page to browse every photo."
          className="mx-auto max-w-3xl"
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {homeMediaPhotos.map((img, index) => (
            <AnimatedSection
              key={img}
              delay={(index % 8) * 0.04}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-cream-200/90 bg-white shadow-card-soft"
            >
              <Image
                src={`/eec photo/${img}`}
                alt={`Ebenezer Ethiopian Church photo ${index + 1}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, 25vw"
                quality={75}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/10 via-transparent to-transparent opacity-80" />
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <CTALink
            href="/sermons#community-gallery"
            variant="outlineWarm"
            size="lg"
            icon={Images}
            className="min-w-[min(100%,16rem)]"
          >
            View full gallery
          </CTALink>
        </div>
      </Container>
    </section>
  );
}
