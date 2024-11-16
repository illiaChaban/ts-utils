import { describe, expect, it } from "vitest";
import { _ } from "../../fn-utils";
import { at, first, last } from "../at";

describe(at.name, () => {
  it("should have proper types", () => {
    expect(_([1, 2, 3], at(2)) satisfies 3).toBe(3);
    expect(_([1, 2, 3], at(-1)) satisfies 3).toBe(3);
    expect(_([1, 2, 3], at(-2)) satisfies 2).toBe(2);
    expect(_([1, 2, 3], at(0)) satisfies 1).toBe(1);

    _([] as number[], at(0)) satisfies number | undefined;
    _([] as { id: string }[], at(-1)) satisfies { id: string } | undefined;
  });
});

describe(first.name, () => {
  it("should have proper types", () => {
    expect(_([], first) satisfies undefined).toBe(undefined);
    expect(_([1, 2, 3], first) satisfies 1).toBe(1);
    _([] as number[], first) satisfies number | undefined;
  });
});

describe(last.name, () => {
  it("should have proper types", () => {
    expect(_([], last) satisfies undefined).toBe(undefined);
    expect(_([1, 2, 3], last) satisfies 3).toBe(3);
    _([] as number[], last) satisfies number | undefined;
  });
});
