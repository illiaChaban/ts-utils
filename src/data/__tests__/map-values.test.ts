import { describe, expect, it } from "vitest";
import { mapValues } from "../map-values";
import { _ } from "../../fn-utils/pipe";

describe(mapValues.name, () => {
  it("should map values", () => {
    const x = {
      a: "hello",
      b: "world",
    } as const;

    const mappedA = _(
      x,
      mapValues((x) => 2)
    ) satisfies { a: number; b: number };
    expect(mappedA).toEqual({ a: 2, b: 2 });

    const mappedB = _(
      x,
      mapValues((a) => (a === "hello" ? `${a}_world` : 2))
    ) satisfies Record<keyof typeof x, string | 2>;
    expect(mappedB).toEqual({ a: "hello_world", b: 2 });
  });
});
