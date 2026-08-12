import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { IbisMark } from "@/components/ibis-mark";
import { getSettings } from "@/lib/db/queries";
import { resolveCopy } from "@/lib/site-copy";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const settings = await getSettings();
  const copy = resolveCopy(settings);

  return (
    <>
      <Nav
        teamName={settings.teamName}
        teamNumber={settings.teamNumber}
        defaultPalette={settings.activePalette}
      />
      <main className="relative overflow-hidden border-b border-border">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-5 py-24 sm:px-8 sm:py-32">
          <IbisMark className="h-10 w-10 text-fg-faint" />
          <p className="label-mono mt-8 flex items-center gap-3 text-fg-faint">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            404 / Not found
          </p>
          <h1 className="mt-4 text-5xl leading-tight tracking-tight text-fg sm:text-6xl">
            This page drifted off the field.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted">
            {copy.notFoundBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/" variant="primary">
              <ArrowLeft size={15} />
              Back home
            </Button>
            <Button href="/robots" variant="secondary">
              Meet the flock
            </Button>
          </div>
        </div>
      </main>
      <Footer
        teamName={settings.teamName}
        teamNumber={settings.teamNumber}
        location={settings.location}
        contactEmail={settings.contactEmail}
        about={copy.footerAbout}
        contactNote={copy.footerContactNote}
        socials={{
          instagram: settings.socialInstagram,
          youtube: settings.socialYoutube,
          linkedin: settings.socialLinkedin,
          github: settings.socialGithub,
          ftcScout: settings.socialFtcScout,
        }}
      />
    </>
  );
}
