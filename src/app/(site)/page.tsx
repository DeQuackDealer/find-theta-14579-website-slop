import { HeroSection } from "@/components/home/hero-section";
import { StorySection } from "@/components/home/story-section";
import { FleetSection } from "@/components/home/fleet-section";
import { SpotlightSection } from "@/components/home/spotlight-section";
import { HonoursSection } from "@/components/home/honours-section";
import { UpdatesSection } from "@/components/home/updates-section";
import { GalleryPreviewSection } from "@/components/home/gallery-preview-section";
import {
  getSettings,
  getRobots,
  getAchievements,
  getBlogPosts,
  getGalleryImages,
} from "@/lib/db/queries";
import { resolveCopy } from "@/lib/site-copy";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, robots, achievements, posts, images] = await Promise.all([
    getSettings(),
    getRobots(),
    getAchievements(),
    getBlogPosts(),
    getGalleryImages(),
  ]);
  const copy = resolveCopy(settings);

  return (
    <>
      <HeroSection
        teamNumber={settings.teamNumber}
        location={settings.location}
        tagline={copy.heroTagline}
      />
      <StorySection
        heading={copy.storyHeading}
        paragraph1={copy.storyParagraph1}
        paragraph2={copy.storyParagraph2}
        capabilities={{
          Design: copy.capDesign,
          Fabrication: copy.capFabrication,
          Programming: copy.capProgramming,
          Strategy: copy.capStrategy,
        }}
        stats={[
          { value: settings.statAwards, suffix: "+", label: "awards & honours" },
          { value: settings.statMembers, suffix: "+", label: "members & alumni" },
          { value: settings.statWorldChamps, label: "world championships" },
          { value: settings.statQualRate, suffix: "%", label: "qualification rate" },
        ]}
      />
      <FleetSection robots={robots} />
      <SpotlightSection />
      <HonoursSection
        achievements={achievements}
        count={settings.statAwards}
        note={copy.honoursNote}
        emptyBody={copy.honoursEmpty}
      />
      <UpdatesSection posts={posts} />
      <GalleryPreviewSection images={images} />
    </>
  );
}
