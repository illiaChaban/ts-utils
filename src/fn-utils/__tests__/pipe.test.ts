import { describe, expect, it } from "vitest";
import { pipe } from "../pipe";

describe(pipe.name, () => {
  it("should pipe value", () => {
    const add = (a: number) => (b: number) => b + a;
    const multiply = (a: number) => (b: number) => b * a;
    expect(pipe(5, add(2), multiply(3))).toBe(21);
  });
});
