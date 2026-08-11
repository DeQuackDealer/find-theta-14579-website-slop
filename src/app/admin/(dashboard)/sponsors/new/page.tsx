import { SponsorForm } from "@/components/admin/sponsor-form";
import { createSponsor } from "@/lib/actions/sponsors";

export default function NewSponsorPage() {
  return (
    <div>
      <h1 className="text-2xl text-fg">New sponsor</h1>
      <div className="mt-8">
        <SponsorForm action={createSponsor} />
      </div>
    </div>
  );
}
