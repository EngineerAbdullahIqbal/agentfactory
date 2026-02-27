import { describe, expect, it } from "vitest";
import { buildSparsePatch } from "@/lib/buildSparsePatch";

describe("buildSparsePatch", () => {
  it("returns undefined when values are deeply equal", () => {
    expect(buildSparsePatch({ a: 1 }, { a: 1 })).toBeUndefined();
  });

  it("returns a nested sparse patch for a changed leaf field", () => {
    const baseline = { a: { b: 1, c: 2 }, d: 3 };
    const updated = { a: { b: 1, c: 4 }, d: 3 };
    expect(buildSparsePatch(baseline, updated)).toEqual({ a: { c: 4 } });
  });

  it("treats missing keys as not-touched (not deletions)", () => {
    const baseline = { a: 1, b: 2 };
    const updated = { a: 1 };
    expect(buildSparsePatch(baseline, updated)).toBeUndefined();
  });

  it("includes arrays atomically when changed", () => {
    const baseline = { items: [1, 2] };
    const updated = { items: [1, 2, 3] };
    expect(buildSparsePatch(baseline, updated)).toEqual({ items: [1, 2, 3] });
  });

  it("includes explicit nulls to allow clearing a field", () => {
    const baseline = { x: "hello" };
    const updated = { x: null };
    expect(buildSparsePatch(baseline, updated)).toEqual({ x: null });
  });

  it("ignores explicit undefined values (treated as omitted)", () => {
    const baseline = { x: "hello" };
    const updated = { x: undefined as unknown };
    expect(buildSparsePatch(baseline, updated)).toBeUndefined();
  });
});

