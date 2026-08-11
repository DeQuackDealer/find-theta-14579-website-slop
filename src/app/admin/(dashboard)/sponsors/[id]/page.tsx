import { notFound } from "next/navigation";
import { SponsorForm } from "@/components/admin/sponsor-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { getSponsorById } from "@/lib/db/queries";
import { updateSponsor, deleteSponsor } from "@/lib/actions/sponsors";

export const dynamic = "force-dynamic";

export default async function EditSponsorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const sponsor = await getSponsorById(id);
  if (!sponsor) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-fg">Edit sponsor</h1>
        <DeleteButton action={deleteSponsor.bind(null, id)} label="Delete" />
      </div>
      <div className="mt-8">
        <SponsorForm action={updateSponsor.bind(null, id)} sponsor={sponsor} />
      </div>
    </div>
  );
}
