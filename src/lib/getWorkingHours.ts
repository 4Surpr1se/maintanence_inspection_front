export function getWorkingHours(maxHours: number): { label: number; value: number }[] {
  return Array.from({ length: maxHours }, (_, i) => ({
    label: i + 1,
    value: i + 1,
  }));
}
