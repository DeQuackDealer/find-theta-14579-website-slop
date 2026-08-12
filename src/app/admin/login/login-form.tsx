"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div className="space-y-2">
        <label htmlFor="password" className="label-mono block text-fg-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-md border border-border-strong bg-bg px-4 py-3 text-fg outline-none transition-colors focus:border-fg"
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-red-400">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-accent px-4 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
