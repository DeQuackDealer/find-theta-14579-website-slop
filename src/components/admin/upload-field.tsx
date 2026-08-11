"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { UploadSimple, X, Spinner } from "@phosphor-icons/react";

export function UploadField({
  label,
  name,
  defaultValue,
  accept,
  kind = "image",
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  accept: string;
  kind?: "image" | "model";
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob-upload",
      });
      setUrl(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="label-mono block text-fg-muted">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-3">
        {kind === "image" && url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="size-16 shrink-0 rounded-md border border-border object-cover"
          />
        ) : null}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="flex items-center gap-2 rounded-md border border-border-strong px-3.5 py-2 text-sm text-fg transition-colors hover:bg-bg-elevated disabled:opacity-50"
          >
            {busy ? (
              <Spinner size={14} className="animate-spin" />
            ) : (
              <UploadSimple size={14} />
            )}
            {busy ? "Uploading…" : url ? "Replace" : "Upload"}
          </button>
          {url ? (
            <>
              <span className="truncate text-xs text-fg-faint">
                {url.split("/").pop()}
              </span>
              <button
                type="button"
                onClick={() => setUrl("")}
                aria-label="Remove file"
                className="text-fg-faint transition-colors hover:text-fg"
              >
                <X size={14} />
              </button>
            </>
          ) : null}
        </div>
      </div>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
