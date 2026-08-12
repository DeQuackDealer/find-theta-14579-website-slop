"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, FormError } from "./field";
import { SubmitButton } from "./submit-button";
import { updateSettings } from "@/lib/actions/settings";
import { PALETTES } from "@/lib/palettes";
import { COPY_DEFAULTS, type CopyKey } from "@/lib/site-copy";
import type { SiteSettings } from "@/lib/db/queries";

// Leaving a copy field blank falls back to the default, which is shown as the
// placeholder so the editor can see what they are replacing.
function CopyField({
  label,
  name,
  settings,
  rows = 3,
}: {
  label: string;
  name: CopyKey;
  settings: SiteSettings;
  rows?: number;
}) {
  return (
    <TextAreaField
      label={label}
      name={name}
      defaultValue={settings[name]}
      placeholder={COPY_DEFAULTS[name]}
      rows={rows}
    />
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useActionState(updateSettings, undefined);

  return (
    <form action={formAction} className="mt-8 max-w-2xl space-y-10">
      <FormError message={state?.error} />

      <section className="space-y-6">
        <h2 className="label-mono text-fg-faint">Team</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Team name" name="teamName" defaultValue={settings.teamName} required />
          <TextField
            label="Team number"
            name="teamNumber"
            defaultValue={settings.teamNumber}
            required
          />
        </div>
        <TextField
          label="Location"
          name="location"
          defaultValue={settings.location}
          placeholder="e.g. City, Country"
        />
        <TextField
          label="Contact email"
          name="contactEmail"
          type="email"
          defaultValue={settings.contactEmail}
        />
      </section>

      <section className="space-y-6 border-t border-border pt-8">
        <div className="space-y-2">
          <h2 className="label-mono text-fg-faint">Homepage copy</h2>
          <p className="text-sm text-fg-muted">
            Leave any field blank to use the built-in default shown in grey.
            Write <code className="text-fg">{"{team}"}</code> or{" "}
            <code className="text-fg">{"{number}"}</code> anywhere to drop in
            the team name or number.
          </p>
        </div>
        <CopyField settings={settings} label="Hero tagline" name="heroTagline" rows={2} />
        <TextField
          label="Story heading"
          name="storyHeading"
          defaultValue={settings.storyHeading}
          placeholder={COPY_DEFAULTS.storyHeading}
        />
        <CopyField settings={settings} label="Story paragraph 1" name="storyParagraph1" />
        <CopyField settings={settings} label="Story paragraph 2" name="storyParagraph2" />
      </section>

      <section className="space-y-6 border-t border-border pt-8">
        <h2 className="label-mono text-fg-faint">What we do (four blocks)</h2>
        <CopyField settings={settings} label="Design" name="capDesign" rows={2} />
        <CopyField settings={settings} label="Fabrication" name="capFabrication" rows={2} />
        <CopyField settings={settings} label="Programming" name="capProgramming" rows={2} />
        <CopyField settings={settings} label="Strategy" name="capStrategy" rows={2} />
      </section>

      <section className="space-y-6 border-t border-border pt-8">
        <h2 className="label-mono text-fg-faint">Record book</h2>
        <CopyField settings={settings} label="Line under the award count" name="honoursNote" rows={2} />
        <CopyField settings={settings} label="Text shown with no awards yet" name="honoursEmpty" />
      </section>

      <section className="space-y-6 border-t border-border pt-8">
        <div className="space-y-2">
          <h2 className="label-mono text-fg-faint">Empty states</h2>
          <p className="text-sm text-fg-muted">
            Shown on each page until there is real content to list.
          </p>
        </div>
        <CopyField settings={settings} label="Flock page, no robots" name="fleetEmpty" rows={4} />
        <CopyField settings={settings} label="Gallery page, no photos" name="galleryEmpty" rows={4} />
        <CopyField settings={settings} label="Updates page, no posts" name="updatesEmpty" rows={4} />
        <CopyField settings={settings} label="Sponsors page, no sponsors" name="sponsorsEmpty" rows={4} />
      </section>

      <section className="space-y-6 border-t border-border pt-8">
        <h2 className="label-mono text-fg-faint">Sponsors page</h2>
        <CopyField settings={settings} label="Intro under the page title" name="sponsorsIntro" />
      </section>

      <section className="space-y-6 border-t border-border pt-8">
        <h2 className="label-mono text-fg-faint">Footer and 404</h2>
        <CopyField settings={settings} label="Footer contact note" name="footerContactNote" rows={2} />
        <CopyField settings={settings} label="Footer team blurb" name="footerAbout" rows={3} />
        <CopyField settings={settings} label="404 page body" name="notFoundBody" rows={3} />
      </section>

      <section className="space-y-6 border-t border-border pt-8">
        <h2 className="label-mono text-fg-faint">Stats strip</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <TextField
            label="Awards"
            name="statAwards"
            type="number"
            defaultValue={settings.statAwards}
          />
          <TextField
            label="Members"
            name="statMembers"
            type="number"
            defaultValue={settings.statMembers}
          />
          <TextField
            label="World champs"
            name="statWorldChamps"
            type="number"
            defaultValue={settings.statWorldChamps}
          />
          <TextField
            label="Qual rate %"
            name="statQualRate"
            type="number"
            defaultValue={settings.statQualRate}
          />
        </div>
      </section>

      <section className="space-y-4 border-t border-border pt-8">
        <h2 className="label-mono text-fg-faint">Default colour palette</h2>
        <p className="text-sm text-fg-muted">
          Visitors can still switch palettes themselves from the site nav.
          This sets what they see on first visit.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PALETTES.map((p) => (
            <label
              key={p.id}
              className="flex cursor-pointer flex-col gap-2 rounded-lg border border-border-strong p-3 has-[:checked]:border-fg"
            >
              <input
                type="radio"
                name="activePalette"
                value={p.id}
                defaultChecked={settings.activePalette === p.id}
                className="sr-only"
              />
              <span
                className="flex h-8 overflow-hidden rounded-md border border-border"
                style={{ background: p.swatch[0] }}
              >
                <span className="block h-full w-1/2" style={{ background: p.swatch[2] }} />
              </span>
              <span className="text-sm text-fg">{p.name}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-6 border-t border-border pt-8">
        <h2 className="label-mono text-fg-faint">Social links</h2>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Instagram"
            name="socialInstagram"
            defaultValue={settings.socialInstagram ?? ""}
            placeholder="https://instagram.com/…"
          />
          <TextField
            label="YouTube"
            name="socialYoutube"
            defaultValue={settings.socialYoutube ?? ""}
            placeholder="https://youtube.com/…"
          />
          <TextField
            label="GitHub"
            name="socialGithub"
            defaultValue={settings.socialGithub ?? ""}
            placeholder="https://github.com/…"
          />
          <TextField
            label="LinkedIn"
            name="socialLinkedin"
            defaultValue={settings.socialLinkedin ?? ""}
            placeholder="https://linkedin.com/…"
          />
          <TextField
            label="FTC Scout"
            name="socialFtcScout"
            defaultValue={settings.socialFtcScout ?? ""}
            placeholder="https://ftcscout.org/…"
          />
        </div>
      </section>

      <SubmitButton>Save settings</SubmitButton>
    </form>
  );
}
