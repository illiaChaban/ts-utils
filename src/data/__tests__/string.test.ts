import { describe, expect, it } from "vitest";
import { _ } from "../../fn-utils";
import { replaceAll } from "../string";
import { join, split } from "../join-split";
import { uniq } from "../uniq";

describe("string methods", () => {
  it("should infer correct types", () => {
    function uniqueCharacters(...strings: string[]): string {
      return _(
        strings,
        join(""),
        split(""),
        uniq,
        join(""),
        replaceAll(" ", "%20")
      );
    }

    const strings = [""] as string[];

    const a = _(
      strings,
      join(""),
      (s) => s satisfies string,
      split(""),
      uniq,
      join(""),
      replaceAll(" ", "%20")
    ) satisfies string;

    const b = _(strings, join(""), split("")) satisfies string[];

    expect(a).toBe("");
  });
});
