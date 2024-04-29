import { _ } from "../fn-utils";

export const exclude =
  <T>(...values: T[]) =>
  <Y>(
    value: Extract<Y, T> extends never
      ? // custom TS error message
        "Type of passed value should have something in common with values to exclude"
      : Y
  ): Y extends T ? null : Y =>
    values.includes(value as any) ? null : (value as any);

// declare const a: "a" | "b";
// declare const aa: "a";
// declare const b: "b" | "c";
// declare const c: "d" | "e";

// const x = _(a, exclude(b));
// const x2 = _(aa, exclude(a));
// const x1 = _(a, exclude(c)); // should error
