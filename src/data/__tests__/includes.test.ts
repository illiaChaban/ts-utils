import { describe, it } from "vitest";
import { includes } from "../includes";
import { _ } from "../../fn-utils";

describe(includes.name, () => {
  it("should have correct types", () => {
    const a: "hello" | "hello world" = "" as any;
    if (_(a, includes("lo "))) {
      a satisfies "hello world";
    }

    const b: [1, 2, 3] | ["hi", "hello"] = [] as any;
    if (_(b, includes("hi"))) {
      b satisfies ["hi", "hello"];
    }

    if (_(b, includes(2))) {
      b satisfies [1, 2, 3];
    }
  });
});
