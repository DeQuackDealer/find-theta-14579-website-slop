import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getSettings } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <Nav
        teamName={settings.teamName}
        teamNumber={settings.teamNumber}
        defaultPalette={settings.activePalette}
      />
      <main>{children}</main>
      <Footer
        teamName={settings.teamName}
        teamNumber={settings.teamNumber}
        location={settings.location}
        contactEmail={settings.contactEmail}
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
