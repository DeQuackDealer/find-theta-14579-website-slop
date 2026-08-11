import { HeroSection } from "@/components/home/hero-section";
import { StorySection } from "@/components/home/story-section";
import { FleetSection } from "@/components/home/fleet-section";
import { SpotlightSection } from "@/components/home/spotlight-section";
import { HonoursSection } from "@/components/home/honours-section";
import { UpdatesSection } from "@/components/home/updates-section";
import { GalleryPreviewSection } from "@/components/home/gallery-preview-section";
import { SponsorsCta } from "@/components/home/sponsors-cta";
import {
  getSettings,
  getRobots,
  getAchievements,
  getBlogPosts,
  getGalleryImages,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, robots, achievements, posts, images] = await Promise.all([
    getSettings(),
    getRobots(),
    getAchievements(),
    getBlogPosts(),
    getGalleryImages(),
  ]);

  return (
    <>
      <HeroSection
        teamNumber={settings.teamNumber}
        location={settings.location}
        tagline={
          settings.heroTagline ||
          "A student-run FIRST Tech Challenge team building competition robots with the precision of the ibis."
        }
      />
      <StorySection
        heading={
          settings.storyHeading ||
          "Different faces every season, the same core philosophy."
        }
        paragraph1={
          settings.storyParagraph1 ||
          `${settings.teamName} is a student-led FIRST Tech Challenge team, competing as team ${settings.teamNumber}. We design, build, and program every robot from a bare chassis to a competition-ready machine, season after season.`
        }
        paragraph2={
          settings.storyParagraph2 ||
          "We watch the ibis for a reason: an animal that thrives by staying sharp-eyed and adaptable, never boxed in by one habitat. That is the standard we hold our engineering to."
        }
        stats={[
          { value: settings.statAwards, suffix: "+", label: "awards & honours" },
          { value: settings.statMembers, suffix: "+", label: "members & alumni" },
          { value: settings.statWorldChamps, label: "world championships" },
          { value: settings.statQualRate, suffix: "%", label: "qualification rate" },
        ]}
      />
      <FleetSection robots={robots} />
      <SpotlightSection />
      <HonoursSection achievements={achievements} count={settings.statAwards} />
      <UpdatesSection posts={posts} />
      <GalleryPreviewSection images={images} />
      <SponsorsCta contactEmail={settings.contactEmail} />
    </>
  );
}
