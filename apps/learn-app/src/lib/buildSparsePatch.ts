type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

/**
 * Builds a "sparse" patch object: only includes keys whose values differ from baseline.
 *
 * Important: missing keys are treated as "not touched" (not deletions). To clear a value,
 * callers must include the key with an explicit null (or empty array/string as appropriate).
 */
export function buildSparsePatch(
  baseline: unknown,
  updated: unknown,
): Json | undefined {
  if (deepEqual(baseline, updated)) return undefined;

  if (updated === undefined) return undefined;

  if (Array.isArray(updated)) {
    return updated as unknown as Json;
  }

  if (isPlainObject(updated)) {
    const baselineObj = isPlainObject(baseline) ? baseline : {};
    const patch: Record<string, Json> = {};

    for (const key of Object.keys(updated)) {
      const nextValue = (updated as Record<string, unknown>)[key];
      if (nextValue === undefined) continue;

      const childPatch = buildSparsePatch(baselineObj[key], nextValue);
      if (childPatch !== undefined) {
        patch[key] = childPatch;
      }
    }

    return Object.keys(patch).length > 0 ? (patch as Json) : undefined;
  }

  return updated as unknown as Json;
}

