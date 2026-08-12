import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  real,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const robots = pgTable(
  "robots",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    number: text("number").notNull(), // display number, e.g. "06"
    name: text("name").notNull(),
    tagline: text("tagline").notNull(),
    summary: text("summary").notNull().default(""),
    seasonLabel: text("season_label").notNull(), // e.g. "DECODE"
    seasonYear: text("season_year").notNull(), // e.g. "2025-26"
    seasonNumber: integer("season_number").notNull(), // e.g. 2
    competition: text("competition").notNull(), // e.g. "FIRST World Championship"
    assemblyLabel: text("assembly_label").notNull().default("Competition assembly"),
    modelUrl: text("model_url"), // uploaded .glb, nullable -> procedural fallback used
    coverImageUrl: text("cover_image_url"),
    order: integer("order").notNull().default(0), // higher = more recent, sorts desc
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("robots_slug_idx").on(t.slug)],
);

export const robotHotspots = pgTable("robot_hotspots", {
  id: serial("id").primaryKey(),
  robotId: integer("robot_id")
    .notNull()
    .references(() => robots.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  description: text("description").notNull().default(""),
  x: real("x").notNull().default(0.5), // normalized 0..1 position over viewer
  y: real("y").notNull().default(0.5),
  order: integer("order").notNull().default(0),
});

export const robotImages = pgTable("robot_images", {
  id: serial("id").primaryKey(),
  robotId: integer("robot_id")
    .notNull()
    .references(() => robots.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  caption: text("caption").notNull().default(""),
  order: integer("order").notNull().default(0),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  seasonYear: text("season_year").notNull(), // e.g. "2025-26"
  competition: text("competition").notNull(),
  description: text("description").notNull(),
  standout: boolean("standout").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sponsors = pgTable("sponsors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  tier: text("tier").notNull().default("Supporting"), // Title / Gold / Supporting
  url: text("url"),
  order: integer("order").notNull().default(0),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  caption: text("caption").notNull().default(""),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    body: text("body").notNull().default(""),
    coverImageUrl: text("cover_image_url"),
    publishedAt: timestamp("published_at").notNull().defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("blog_posts_slug_idx").on(t.slug)],
);

export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  teamName: text("team_name").notNull().default("Find Theta"),
  teamNumber: text("team_number").notNull().default("14579"),
  location: text("location").notNull().default(""),
  heroTagline: text("hero_tagline").notNull().default(""),
  storyHeading: text("story_heading").notNull().default(""),
  storyParagraph1: text("story_paragraph_1").notNull().default(""),
  storyParagraph2: text("story_paragraph_2").notNull().default(""),
  statAwards: integer("stat_awards").notNull().default(0),
  statMembers: integer("stat_members").notNull().default(0),
  statWorldChamps: integer("stat_world_champs").notNull().default(0),
  statQualRate: integer("stat_qual_rate").notNull().default(0),
  activePalette: text("active_palette").notNull().default("bone"),
  contactEmail: text("contact_email").notNull().default(""),
  socialInstagram: text("social_instagram"),
  socialYoutube: text("social_youtube"),
  socialGithub: text("social_github"),
  socialLinkedin: text("social_linkedin"),
  socialFtcScout: text("social_ftc_scout"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
