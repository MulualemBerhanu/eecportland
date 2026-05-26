import { EventsPreviewHome } from "@/components/home/EventsPreviewHome";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { GivingCTASection } from "@/components/home/GivingCTASection";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionVisionHome } from "@/components/home/MissionVisionHome";
import { MinistriesPreview } from "@/components/home/MinistriesPreview";
import { NewHereSection } from "@/components/home/NewHereSection";
import { SermonPreviewHome } from "@/components/home/SermonPreviewHome";
import { CommunityGallerySection } from "@/components/home/CommunityGallerySection";
import { WelcomeIntro } from "@/components/home/WelcomeIntro";
import { MotionSectionBridge } from "@/components/shared/MotionSectionBridge";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { getCalendarEvents } from "@/lib/calendar-events";
import { getSermonsWithYouTubeMeta } from "@/lib/youtube-sermon-metadata";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
};

export default async function HomePage() {
  /** Pull enough items so a `Featured: true` event is found even if it is not in the next 3 by date. */
  const homeUpcomingEvents = await getCalendarEvents(12);
  const heroUpcoming =
    homeUpcomingEvents.find((e) => e.isFeatured) ?? homeUpcomingEvents[0] ?? null;
  const previewUpcoming = homeUpcomingEvents.slice(0, 3);
  const sermonList = await getSermonsWithYouTubeMeta();

  return (
    <div className="relative overflow-x-hidden">
      <HeroSection upcomingEvent={heroUpcoming} />
      <MotionSectionBridge variant="aurora" />
      <WelcomeIntro />
      <MotionSectionBridge variant="ribbon" />
      <NewHereSection />
      <MotionSectionBridge variant="fold" />
      <CommunityGallerySection />
      <MotionSectionBridge variant="toNavy" />
      <MissionVisionHome />
      <MotionSectionBridge variant="fromNavy" />
      <MinistriesPreview />
      <MotionSectionBridge variant="fold" />
      <SermonPreviewHome sermons={sermonList} />
      <MotionSectionBridge variant="spire" />
      <EventsPreviewHome upcoming={previewUpcoming} />
      <MotionSectionBridge variant="steps" />
      <GivingCTASection />
      <MotionSectionBridge variant="aurora" />
      <FinalCTASection />
    </div>
  );
}
