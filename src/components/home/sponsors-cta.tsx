import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function SponsorsCta({ contactEmail }: { contactEmail: string }) {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-lg text-2xl leading-snug text-fg sm:text-3xl">
            Robotics is not cheap.{" "}
            <em className="italic text-fg-muted">
              Meet the sponsors backing a community team on the world stage.
            </em>
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Button href="/sponsors" variant="secondary">
              Our sponsors
            </Button>
            {contactEmail ? (
              <Button href={`mailto:${contactEmail}`} variant="primary">
                Back the team
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
