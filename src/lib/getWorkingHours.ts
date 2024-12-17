export function getWorkingHours(): { label: number; value: number }[] {
  return Array.from({ length: 7 }, (_, i) => ({
    label: i + 1,
    value: i + 1,
  }));
}
