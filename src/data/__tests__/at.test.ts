import { describe, it } from "vitest";
import { _ } from "../../fn-utils";
import { at } from "../at";

describe(at.name, () => {
  it("should have proper types", () => {
    _([1, 2, 3], at(2)) satisfies 3;
    _([1, 2, 3], at(-1)) satisfies 3;
    _([1, 2, 3], at(-2)) satisfies 2;
    _([1, 2, 3], at(0)) satisfies 1;

    _([] as number[], at(0)) satisfies number | undefined;
    _([] as { id: string }[], at(-1)) satisfies { id: string } | undefined;
  });
});
