/**
 * Drizzle wraps every failed query in a DrizzleQueryError whose `.message`
 * is just the dumped SQL + params, not the reason. The actual driver error
 * (e.g. "relation does not exist", auth failure) lives one level down in
 * `.cause`. Prefer that when present so admins see the real reason.
 */
export function getErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof Error) {
    if (err.cause instanceof Error && err.cause.message) {
      return err.cause.message;
    }
    return err.message || fallback;
  }
  return fallback;
}
