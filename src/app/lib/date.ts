export function getTodayUtc(): string {
  return new Date().toISOString().split("T")[0];
}
