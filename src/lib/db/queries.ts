import { asc, desc, eq } from "drizzle-orm";
import { getDb } from "./index";
import {
  robots,
  robotHotspots,
  robotImages,
  achievements,
  sponsors,
  galleryImages,
  blogPosts,
  siteSettings,
} from "./schema";

const DEFAULT_SETTINGS = {
  id: 1,
  teamName: "Find Theta",
  teamNumber: "14579",
  location: "",
  heroTagline: "",
  storyHeading: "",
  storyParagraph1: "",
  storyParagraph2: "",
  statAwards: 0,
  statMembers: 0,
  statWorldChamps: 0,
  statQualRate: 0,
  activePalette: "bone",
  contactEmail: "",
  socialInstagram: null as string | null,
  socialYoutube: null as string | null,
  socialGithub: null as string | null,
  socialLinkedin: null as string | null,
  socialFtcScout: null as string | null,
  updatedAt: new Date(),
};

export type SiteSettings = typeof DEFAULT_SETTINGS;

// The database is an external system that may not be provisioned yet
// (local dev before `npm run db:push`, or a cold first deploy). Every
// reader here degrades to a safe empty/default value instead of throwing,
// so the site always renders.
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn("[db] query failed, using fallback:", err);
    return fallback;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  return safe(async () => {
    const rows = await getDb().select().from(siteSettings).limit(1);
    return rows[0] ?? DEFAULT_SETTINGS;
  }, DEFAULT_SETTINGS);
}

export async function getRobots() {
  return safe(
    () => getDb().select().from(robots).orderBy(desc(robots.order)),
    [],
  );
}

export async function getRobotById(id: number) {
  return safe(async () => {
    const rows = await getDb().select().from(robots).where(eq(robots.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);
}

export async function getRobotBySlug(slug: string) {
  return safe(async () => {
    const rows = await getDb()
      .select()
      .from(robots)
      .where(eq(robots.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  }, null);
}

export async function getRobotHotspots(robotId: number) {
  return safe(
    () =>
      getDb()
        .select()
        .from(robotHotspots)
        .where(eq(robotHotspots.robotId, robotId))
        .orderBy(asc(robotHotspots.order)),
    [],
  );
}

export async function getRobotImages(robotId: number) {
  return safe(
    () =>
      getDb()
        .select()
        .from(robotImages)
        .where(eq(robotImages.robotId, robotId))
        .orderBy(asc(robotImages.order)),
    [],
  );
}

export async function getAchievementById(id: number) {
  return safe(async () => {
    const rows = await getDb()
      .select()
      .from(achievements)
      .where(eq(achievements.id, id))
      .limit(1);
    return rows[0] ?? null;
  }, null);
}

export async function getAchievements() {
  return safe(
    () => getDb().select().from(achievements).orderBy(desc(achievements.order)),
    [],
  );
}

export async function getSponsorById(id: number) {
  return safe(async () => {
    const rows = await getDb().select().from(sponsors).where(eq(sponsors.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);
}

export async function getSponsors() {
  return safe(
    () => getDb().select().from(sponsors).orderBy(asc(sponsors.order)),
    [],
  );
}

export async function getGalleryImages() {
  return safe(
    () =>
      getDb().select().from(galleryImages).orderBy(desc(galleryImages.order)),
    [],
  );
}

export async function getBlogPosts() {
  return safe(
    () =>
      getDb().select().from(blogPosts).orderBy(desc(blogPosts.publishedAt)),
    [],
  );
}

export async function getBlogPostById(id: number) {
  return safe(async () => {
    const rows = await getDb().select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return rows[0] ?? null;
  }, null);
}

export async function getBlogPostBySlug(slug: string) {
  return safe(async () => {
    const rows = await getDb()
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  }, null);
}
