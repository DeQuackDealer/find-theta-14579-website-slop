CREATE TABLE "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"season_year" text NOT NULL,
	"competition" text NOT NULL,
	"description" text NOT NULL,
	"standout" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"cover_image_url" text,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"caption" text DEFAULT '' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "robot_hotspots" (
	"id" serial PRIMARY KEY NOT NULL,
	"robot_id" integer NOT NULL,
	"label" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"x" real DEFAULT 0.5 NOT NULL,
	"y" real DEFAULT 0.5 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "robot_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"robot_id" integer NOT NULL,
	"url" text NOT NULL,
	"caption" text DEFAULT '' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "robots" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"number" text NOT NULL,
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"season_label" text NOT NULL,
	"season_year" text NOT NULL,
	"season_number" integer NOT NULL,
	"competition" text NOT NULL,
	"assembly_label" text DEFAULT 'Competition assembly' NOT NULL,
	"model_url" text,
	"cover_image_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"team_name" text DEFAULT 'Find Theta' NOT NULL,
	"team_number" text DEFAULT '14579' NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"hero_tagline" text DEFAULT '' NOT NULL,
	"story_heading" text DEFAULT '' NOT NULL,
	"story_paragraph_1" text DEFAULT '' NOT NULL,
	"story_paragraph_2" text DEFAULT '' NOT NULL,
	"stat_awards" integer DEFAULT 0 NOT NULL,
	"stat_members" integer DEFAULT 0 NOT NULL,
	"stat_world_champs" integer DEFAULT 0 NOT NULL,
	"stat_qual_rate" integer DEFAULT 0 NOT NULL,
	"active_palette" text DEFAULT 'bone' NOT NULL,
	"contact_email" text DEFAULT '' NOT NULL,
	"social_instagram" text,
	"social_youtube" text,
	"social_github" text,
	"social_linkedin" text,
	"social_ftc_scout" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo_url" text,
	"tier" text DEFAULT 'Supporting' NOT NULL,
	"url" text,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "robot_hotspots" ADD CONSTRAINT "robot_hotspots_robot_id_robots_id_fk" FOREIGN KEY ("robot_id") REFERENCES "public"."robots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "robot_images" ADD CONSTRAINT "robot_images_robot_id_robots_id_fk" FOREIGN KEY ("robot_id") REFERENCES "public"."robots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "robots_slug_idx" ON "robots" USING btree ("slug");