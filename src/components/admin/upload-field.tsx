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
        kind === "model"
          ? `That file is ${formatBytes(file.size)} (limit ${formatBytes(limit)}). Export it as compressed .glb, or commit it to /public/models and enter the path instead.`
          : `That file is ${formatBytes(file.size)}. The limit is ${formatBytes(limit)}.`,
      );
      return;
    }

    setBusy(true);
    setProgress(0);
    setError(null);
    try {
      // NOTE: do not enable `multipart` here. Multipart posts to Vercel's
      // /api/blob/mpu endpoint, which sends no CORS headers under the
      // handleUpload client-token flow, so the browser blocks it and the
      // upload hangs at 0% for every file regardless of size. Multipart
      // needs a presigned-POST route instead. Large models should be
      // committed to /public/models rather than uploaded (see its README).
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob-upload",
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
          {/* Editable so a file committed to /public can be referenced by
              path (e.g. /models/thoth.glb) without going through Blob. */}
          <input
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={busy}
            placeholder={
              kind === "model" ? "/models/robot.glb — or upload" : "Paste a URL — or upload"
            }
            className="w-full min-w-0 flex-1 rounded-md border border-border-strong bg-bg px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-fg disabled:opacity-50"
          />
          {url && !busy ? (
            <button
              type="button"
              onClick={() => setUrl("")}
              aria-label="Clear"
              className="shrink-0 text-fg-faint transition-colors hover:text-fg"
            >
              <X size={14} />
            </button>
          ) : null}
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
            {busy ? `${Math.round(progress)}%` : "Upload"}
          </button>
        </div>
      </div>

      {busy ? (
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-bg-elevated"
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
      ) : null}

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
