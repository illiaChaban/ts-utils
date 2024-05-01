import { describe, it } from "vitest";
import { iif } from "../iff";
import { pipe } from "../pipe";
import { isString } from "../../is";
import { thru } from "../tap";

describe(iif.name, () => {
  it("should have correct types", () => {
    const toString = (v: unknown): string => v + "";
    const toBoolean = (v: unknown): boolean => !v;
    const toNumber = (v: unknown): number => v as any;

    const v = 5 as 5 | "hello";
    const isCondition = () => !Math.random();

    pipe(
      v,
      iif(isCondition, (v) => v satisfies 5 | "hello")
    );
    pipe(
      v,
      iif(isString, (v) => v satisfies "hello")
    );
    pipe(v, iif(isCondition() && toBoolean), (v) => v) satisfies
      | 5
      | boolean
      | "hello";

    pipe(v, iif(false && toBoolean)) satisfies 5 | "hello";
    pipe(v, iif(null && toBoolean)) satisfies 5 | "hello";
    pipe(v, iif(undefined && toBoolean)) satisfies 5 | "hello";
    pipe(v, iif(0 && toBoolean)) satisfies 5 | "hello";
    pipe(v, iif("" && toBoolean)) satisfies 5 | "hello";

    pipe(v, iif(true && toBoolean)) satisfies boolean;
    pipe(v, iif(1 && toBoolean)) satisfies boolean;
    pipe(v, iif("hello" && toBoolean)) satisfies boolean;

    pipe(
      v,
      (v) => v,
      iif(isString, (v) => toBoolean(v), thru)
    ) satisfies boolean | 5;
    pipe(v, iif(isString, toBoolean)) satisfies boolean | 5;
    pipe(v, (v) => (isString(v) ? toBoolean(v) : v)) satisfies boolean | 5;
  });
});
