"use client";

import { useActionState } from "react";
import { TextField, TextAreaField, FormError } from "./field";
import { SubmitButton } from "./submit-button";
import { updateSettings } from "@/lib/actions/settings";
import { PALETTES } from "@/lib/palettes";
import type { SiteSettings } from "@/lib/db/queries";

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
        <h2 className="label-mono text-fg-faint">Homepage copy</h2>
        <TextAreaField
          label="Hero tagline"
          name="heroTagline"
          defaultValue={settings.heroTagline}
          rows={2}
        />
        <TextField
          label="Story heading"
          name="storyHeading"
          defaultValue={settings.storyHeading}
        />
        <TextAreaField
          label="Story paragraph 1"
          name="storyParagraph1"
          defaultValue={settings.storyParagraph1}
          rows={3}
        />
        <TextAreaField
          label="Story paragraph 2"
          name="storyParagraph2"
          defaultValue={settings.storyParagraph2}
          rows={3}
        />
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
