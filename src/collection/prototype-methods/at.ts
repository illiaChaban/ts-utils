import { Arr } from "../../types";
import { prototypeMethod } from "./internal";

/**
 * Takes an integer value and returns the item at that index,
 * allowing for positive and negative integers.
 * Negative integers count back from the last item in the array.
 */
export const at = prototypeMethod("at") as {
  /**
   * Takes an integer value and returns the item at that index,
   * allowing for positive and negative integers.
   * Negative integers count back from the last item in the array.
   */
  <T extends Arr | string, I extends number>(index: I): (
    val: T
  ) => [IsPositive<I>, IsTuple<T>, I] extends [true, true, keyof T]
    ? T[I]
    : [T["length"], I] extends [SupportedPositive, SupportedNegative]
    ? T[Subtract<T["length"], Abs<I>>]
    : T[number] | undefined;
};

type IsTuple<T> = T extends Arr
  ? number extends T["length"]
    ? false
    : true
  : false;

type SupportedNegative = -1 | -2 | -3;

type ConvertStringToNum<T extends string> =
  T extends keyof SupportedPositiveNumberTuple
    ? SupportedPositiveNumberTuple[T]
    : never;

type Abs<N extends number> = `${N}` extends `-${infer T}`
  ? ConvertStringToNum<T>
  : N;

type SupportedPositiveNumberTuple = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type SupportedPositive = SupportedPositiveNumberTuple[number];

/**
 * TS Math
 * link https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
 */
type Length<T> = T extends { length: infer L } ? L : never;

type BuildTuple<L extends number, T extends any[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, any]>;

type Add<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;

type Subtract<A extends number, B extends number> = BuildTuple<A> extends [
  ...infer U,
  ...BuildTuple<B>
]
  ? Length<U>
  : never;

type IsPositive<N extends number> = `${N}` extends `-${number}` ? false : true;
