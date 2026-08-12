import { getDb } from "./index";
import { BLANK_COPY } from "../site-copy";
import { robots, robotHotspots, galleryImages, blogPosts, siteSettings } from "./schema";

async function seed() {
  const db = getDb();

  await db
    .insert(siteSettings)
    .values({
      id: 1,
      teamName: "Find Theta",
      teamNumber: "14579",
      location: "",
      // Copy stays blank on purpose: the site renders COPY_DEFAULTS
      // (src/lib/site-copy.ts) until someone overrides it in the admin.
      ...BLANK_COPY,
      statAwards: 0,
      statMembers: 9,
      statWorldChamps: 0,
      statQualRate: 0,
      activePalette: "bone",
      contactEmail: "",
    })
    .onConflictDoNothing();

  const [thoth] = await db
    .insert(robots)
    .values({
      slug: "thoth",
      number: "01",
      name: "THOTH",
      tagline: "The first machine off the drawing board",
      summary:
        "Our first competition robot, named for the ibis-headed god of knowledge. Thoth was built to be reliable first and clever second: a plain four-wheel drivetrain, one linear slide, and an intake we tuned across dozens of bench tests before it ever saw a field.",
      seasonLabel: "DECODE",
      seasonYear: "2025-26",
      seasonNumber: 1,
      competition: "Regional Qualifier",
      assemblyLabel: "Competition assembly",
      order: 1,
    })
    .onConflictDoNothing()
    .returning({ id: robots.id });

  if (thoth) {
    await db.insert(robotHotspots).values([
      {
        robotId: thoth.id,
        label: "Drivetrain",
        description: "Four-wheel mecanum base, tuned for field control over raw speed.",
        x: 0.42,
        y: 0.78,
        order: 0,
      },
      {
        robotId: thoth.id,
        label: "Linear slide",
        description: "Single-stage slide carrying the intake to scoring height.",
        x: 0.3,
        y: 0.35,
        order: 1,
      },
      {
        robotId: thoth.id,
        label: "Intake",
        description: "Compliant-wheel intake, first mechanism we prototyped for this season.",
        x: 0.68,
        y: 0.42,
        order: 2,
      },
    ]);
  }

  await db.insert(galleryImages).values([
    {
      url: "https://picsum.photos/seed/find-theta-gallery-1/800/1000",
      caption: "Build season, week 3.",
      order: 4,
    },
    {
      url: "https://picsum.photos/seed/find-theta-gallery-2/1000/750",
      caption: "First full-field test.",
      order: 3,
    },
    {
      url: "https://picsum.photos/seed/find-theta-gallery-3/900/900",
      caption: "Wiring the control hub.",
      order: 2,
    },
    {
      url: "https://picsum.photos/seed/find-theta-gallery-4/1000/750",
      caption: "Pit setup, morning of scrimmage.",
      order: 1,
    },
  ]);

  await db
    .insert(blogPosts)
    .values({
      slug: "welcome-to-find-theta",
      title: "Welcome to Find Theta",
      excerpt: "Our website, and our rookie season, both start here.",
      body: `Find Theta is FIRST Tech Challenge team 14579. This site is where we post our robots, our results, and whatever we work out along the way.\n\nWe are early. Thoth, our first competition robot, is on the bench, and our first qualifier is still ahead of us. Check back after the event for an update.`,
      publishedAt: new Date(),
    })
    .onConflictDoNothing();

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
