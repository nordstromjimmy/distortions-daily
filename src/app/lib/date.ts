// src/lib/date.ts

/**
 * Returns the current local date in 'YYYY-MM-DD' format,
 * adjusted for the user's local timezone.

 */
export function getLocalToday(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const local = new Date(now.getTime() - offset);
  return local.toISOString().split("T")[0];
}
