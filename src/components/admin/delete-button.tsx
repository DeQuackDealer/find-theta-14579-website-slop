"use client";

import { Trash } from "@phosphor-icons/react";

export function DeleteButton({
  action,
  confirmMessage = "Delete this item? This cannot be undone.",
  label,
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label={label ?? "Delete"}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-fg-faint transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <Trash size={13} />
        {label}
      </button>
    </form>
  );
}
