"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-85 disabled:opacity-50"
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
