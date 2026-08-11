import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { getSponsors } from "@/lib/db/queries";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteSponsor } from "@/lib/actions/sponsors";

export const dynamic = "force-dynamic";

export default async function AdminSponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-fg">Sponsors</h1>
        <Link
          href="/admin/sponsors/new"
          className="flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          <Plus size={14} weight="bold" />
          New sponsor
        </Link>
      </div>

      {sponsors.length === 0 ? (
        <p className="mt-8 text-sm text-fg-faint">No sponsors yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border border-t border-border">
          {sponsors.map((s) => (
            <div key={s.id} className="flex items-center gap-4 py-4">
              <Link href={`/admin/sponsors/${s.id}`} className="min-w-0 flex-1">
                <p className="text-fg">{s.name}</p>
                <p className="text-xs text-fg-faint">{s.tier}</p>
              </Link>
              <DeleteButton action={deleteSponsor.bind(null, s.id)} label="Delete" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
