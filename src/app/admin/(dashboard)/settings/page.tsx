import { getSettings } from "@/lib/db/queries";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, { saved }] = await Promise.all([getSettings(), searchParams]);

  return (
    <div>
      <h1 className="text-2xl text-fg">Settings</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Team info, homepage copy, and the site&rsquo;s default colour palette.
      </p>
      {saved ? (
        <p className="mt-4 rounded-md border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm text-fg">
          Settings saved.
        </p>
      ) : null}

      <SettingsForm settings={settings} />
    </div>
  );
}
