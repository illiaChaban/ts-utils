import { Primitive } from "../types";
import { ExtractIs } from "./shared";

export const is = ((...args: Primitive[]) =>
  (value: unknown): boolean =>
    args.some(sameValueZero(value))) as Is;

type Is = {
  <const T extends unknown = unknown, const Args extends T[] = []>(
    ...args: Args
  ): T extends unknown
    ? <Y>(value: Y) => value is ExtractIs<Y, Args[number]>
    : (value: T) => value is ExtractIs<T, Args[number]>;
};

export { is as eq };

export const isNot = (<const Args extends Primitive[]>(...args: Args) =>
  <T>(value: T): value is Exclude<T, Args[number]> =>
    !is(...args)(value)) as IsNot;

type IsNot = {
  <const T extends unknown = unknown, const Args extends T[] = []>(
    ...args: Args
  ): T extends unknown
    ? <Y>(value: Y) => value is Exclude<Y, Args[number]>
    : (value: T) => value is Exclude<T, Args[number]>;
};

/**
 * JS comparisons include
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality
 *
 * ==
 * ===
 * Object.is
 * sameValueZero
 *
 * @example
 * NaN == NaN // false
 * NaN === NaN // false
 * Object.is(NaN, NaN) // true
 * sameValueZero(NaN, NaN) // true
 *
 * -0 == 0 // true
 * -0 === 0 // true
 * Object.is(-0, 0) // false
 * sameValueZero(-0, 0) // true
 *
 * null == undefined // true, everything else - false
 * new String('foo') == 'foo // true, everything else - false
 */
export function sameValueZero(x: unknown) {
  return (y: unknown): boolean => {
    if (typeof x === "number" && typeof y === "number") {
      // x and y are equal (may be -0 and 0) or they are both NaN
      return x === y || (x !== x && y !== y);
    }
    return x === y;
  };
}

/** Gets the value of type guard */
export type InferIs<T> = T extends (v: unknown) => v is infer Y ? Y : never;
