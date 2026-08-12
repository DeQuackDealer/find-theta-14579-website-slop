"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { UploadSimple, X, Spinner } from "@phosphor-icons/react";
import { maxBytesFor, formatBytes } from "@/lib/uploads";

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
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    // Check the ceiling before transferring anything - otherwise an
    // oversized CAD export only fails after a long upload.
    const limit = maxBytesFor(file.name);
    if (file.size > limit) {
      setError(
        `That file is ${formatBytes(file.size)}. The limit is ${formatBytes(limit)}.`,
      );
      return;
    }

    setBusy(true);
    setProgress(0);
    setError(null);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob-upload",
        // Splits large files into parts uploaded in parallel, with retries
        // per part - substantially faster than one serial stream for models.
        multipart: true,
        onUploadProgress: ({ percentage }) => setProgress(percentage),
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
            className="flex shrink-0 items-center gap-2 rounded-md border border-border-strong px-3.5 py-2 text-sm text-fg transition-colors hover:bg-bg-elevated disabled:opacity-50"
          >
            {busy ? (
              <Spinner size={14} className="animate-spin" />
            ) : (
              <UploadSimple size={14} />
            )}
            {busy ? `Uploading… ${Math.round(progress)}%` : url ? "Replace" : "Upload"}
          </button>

          {busy ? (
            <div
              className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-bg-elevated"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Upload progress"
            >
              <div
                className="h-full bg-accent transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          ) : url ? (
            <>
              <span className="truncate text-xs text-fg-faint">
                {url.split("/").pop()}
              </span>
              <button
                type="button"
                onClick={() => setUrl("")}
                aria-label="Remove file"
                className="shrink-0 text-fg-faint transition-colors hover:text-fg"
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
