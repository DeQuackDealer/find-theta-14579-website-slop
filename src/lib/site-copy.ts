// Every editable prose block on the public site lives here. The settings row
// stores an override per key; a blank override means "use the default below",
// so the site never renders an empty paragraph and the admin form can show the
// default as placeholder text.

export const COPY_DEFAULTS = {
  heroTagline:
    "A student-run FIRST Tech Challenge team. Every season sets a new unknown in front of us, and we build until we find the angle that solves it.",
  storyHeading: "Different faces every season, the same core philosophy.",
  storyParagraph1:
    "{team} is a student-led FIRST Tech Challenge team competing as team {number}. Each season starts with an empty bench and one unsolved variable. We take a robot from bare chassis to competition floor and we own all of it: the CAD, the machining, the wiring, the code.",
  storyParagraph2:
    "The ibis is on our badge for a reason. It works the shoreline with its head down, patient, reading what is in front of it, and it moves the second conditions change. We build the same way: look closely, adapt fast, keep the machine honest.",
  capDesign: "Every mechanism drawn in CAD and revised until the angles work.",
  capFabrication:
    "Machining, 3D printing, and assembly, all of it at our own bench.",
  capProgramming:
    "Autonomous paths, driver controls, and sensors that agree with each other.",
  capStrategy:
    "Scouting the field, reading opponents, changing the plan between matches.",
  honoursNote: "Every award the flock has brought home so far.",
  honoursEmpty:
    "Nothing on the shelf yet. Our first awards are still ahead of us, so come back after the next competition, or help us get there sooner.",
  fleetEmpty:
    "We're still deep in the build phase. Once the season is running and the competition robot is locked in, this page fills out with the full breakdown: CAD, weight budgets, subsystem specs, and how each machine actually held up on the field.",
  galleryEmpty:
    "We shoot at every stage: sketch reviews, late nights in the shop, qualifiers, and the long drives in between. As the season runs on and events wrap up, this grid fills with the real thing.",
  updatesEmpty:
    "We're a young team moving fast through the front of the season. Once there's real build progress worth writing about, it lands here: honest engineering notes with the rough edges left in, never press releases.",
  sponsorsIntro:
    "Robotics costs money. Every part, every tool, and every trip to a competition is paid for through sponsorship. If you or your organisation want a place on this wall, come talk to us.",
  sponsorsEmpty:
    "We're putting together the sponsor roster for this season. Local business, family friend, or an organisation that backs student engineering, there's room for your name here.",
  footerAbout:
    "A student-run FIRST Tech Challenge team. We design, build, and program our own competition robots, one season and one unknown at a time.",
  footerContactNote:
    "Sponsorship, mentoring, media, or a plain hello. Our inbox stays open.",
  notFoundBody:
    "Whatever you were after landed somewhere else. Check the link, or head back and find your way from the flock.",
} satisfies Record<string, string>;

export type CopyKey = keyof typeof COPY_DEFAULTS;
export type SiteCopy = Record<CopyKey, string>;

export const COPY_KEYS = Object.keys(COPY_DEFAULTS) as CopyKey[];

export const BLANK_COPY = Object.fromEntries(
  COPY_KEYS.map((k) => [k, ""]),
) as SiteCopy;

type CopySource = Partial<SiteCopy> & { teamName: string; teamNumber: string };

// {team} and {number} are substituted in defaults and in admin overrides
// alike, so renaming the team never leaves stale copy behind.
export function resolveCopy(settings: CopySource): SiteCopy {
  const fill = (value: string) =>
    value
      .replaceAll("{team}", settings.teamName)
      .replaceAll("{number}", settings.teamNumber);

  return Object.fromEntries(
    COPY_KEYS.map((k) => [k, fill(settings[k]?.trim() || COPY_DEFAULTS[k])]),
  ) as SiteCopy;
}
