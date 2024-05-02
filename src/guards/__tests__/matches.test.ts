import { _ } from "../../fn-utils";
import { is, InferIs } from "../is";
import { isNumber } from "../is-type";
import { matches } from "../matches";
import { expect, it, describe } from "vitest";

describe(matches.name, () => {
  it("should check shallow", () => {
    const isTypeX = matches({ type: is("x", "x2"), two: isNumber });
    expect(isTypeX({ type: "x", two: 5 })).toBe(true);
    expect(isTypeX({ type: "hi", three: "hello" })).toBe(false);

    expect(
      _({ type: "hi", another: "hello" }, matches({ type: is("hi") }))
    ).toBe(true);
  });

  it("should check deep", () => {
    const deepCheck = matches({ one: matches({ two: is("hello") }) });

    expect(deepCheck({ three: "hi" })).toBe(false);
    expect(deepCheck({ four: { six: "one" } })).toBe(false);
    expect(deepCheck({ one: { two: "else" } })).toBe(false);
    expect(deepCheck({ one: { two: "hello" }, another: "here" })).toBe(true);
    expect(deepCheck({ one: { two: "hello", another: "one" } })).toBe(true);
  });

  it("satisfies expected types", () => {
    const isTypeX = matches({ type: is("x", "x2"), two: isNumber });

    const x: { type: "x"; two: 5 } | { type: "hi"; three: string } = {} as any;
    if (isTypeX(x)) {
      x satisfies { type: "x"; two: 5 };
    }

    if (_(x, matches({ type: is("hi") }))) {
      x satisfies { type: "hi"; three: string };
    }

    const x1: { type: "x" } | { type: "hi" } | { type: "hello" } = {} as any;
    if (_(x1, matches({ type: is("x", "hi") }))) {
      x1 satisfies
        | {
            type: "x";
          }
        | {
            type: "hi";
          };
    }

    type TypeX = InferIs<typeof isTypeX>;
    const typeX = {} as TypeX;

    typeX satisfies {
      type: "x" | "x2";
      two: number;
    };

    const deepCheck = matches({ one: matches({ two: is("hello") }) });

    const deep:
      | { three: "hi" }
      | { four: { six: "one" } }
      | { one: { two: string } }
      | { one: { two: "hello" }; another: "here" }
      | { one: { two: "hello"; another: "one" } } = {} as any;

    if (_(deep, deepCheck)) {
      deep satisfies
        | {
            one: {
              two: "hello";
            };
            another: "here";
          }
        | {
            one: {
              two: "hello";
              another: "one";
            };
          };
    }
  });
});
