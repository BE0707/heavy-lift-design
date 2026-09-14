/**
 * Ölçü metnini sunum parçalarına ayırır:
 * "≈ 7–9 m (havuz)" → { approx: true, value: "7–9", unit: "m", note: "havuz" }
 */
export function splitMeasure(raw: string) {
  const match = raw.match(/^(≈\s*)?(.+?)(?:\s+(m|t))?(?:\s*\((.+)\))?$/);
  if (!match) return { approx: false, value: raw, unit: "", note: "" };
  return { approx: Boolean(match[1]), value: match[2], unit: match[3] ?? "", note: match[4] ?? "" };
}
