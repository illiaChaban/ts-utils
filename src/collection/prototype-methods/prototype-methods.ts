import { _ } from "../../fn-utils";
import { Arr, NoInfer } from "../../types";

/**
 * Creates a new array with items concatenated to the end of the array.
 * @param items New elements to add to the array.
 */
export const concat = prototypeMethod("concat") as {
  <T>(items: Arr<NoInfer<T>>): (arr: Arr<T>) => T[];
};

/**
 * Performs the specified action for each element in an array.
 * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
 */
export const each = prototypeMethod("forEach") as {
  <T>(
    callbackfn: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => void
  ): (arr: readonly T[]) => void;
};

/**
 * Determines whether all the members of an array satisfy the specified test.
 * @param predicate A function that accepts up to three arguments. The every method calls
 * the predicate function for each element in the array until the predicate returns a value
 * which is coercible to the Boolean value false, or until the end of the array.
 */
export const every = prototypeMethod("every") as {
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the array.
   */
  <T, S extends T>(
    predicate: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => value is S
  ): (arr: Arr<T>) => arr is readonly S[];
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the array.
   */
  <T>(
    predicate: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => unknown
  ): (arr: Arr<T>) => boolean;
};

_(
  [1, 2, 3],
  each((x) => x)
);

export const at = prototypeMethod("at") as {
  /**
   * Takes an integer value and returns the item at that index,
   * allowing for positive and negative integers.
   * Negative integers count back from the last item in the array.
   */
  <T extends Arr | string, I extends number>(index: I): (
    val: T
  ) => [IsPositive<I>, IsCountable<T>, I] extends [true, true, keyof T]
    ? T[I]
    : [T["length"], I] extends [SupportedPositive, SupportedNegative]
    ? T[Subtract<T["length"], Abs<I>>]
    : T[number] | undefined;
  // : T | undefined
  // : T | undefined
  // : T['length'] extends SupportedNumber
  //   ? I extends SupportedNumber

  // : [T['length'], I] extends [SupportedNumber, SupportedNumber] ? Add<T['length'], I> extends number ? Add<T['length'], I> : never
  // : T | undefined;
  /**
   * Takes an integer value and returns the item at that index,
   * allowing for positive and negative integers.
   * Negative integers count back from the last item in the array.
   */
  // <T extends string, I extends number>(index: I): (val: T) => T[I];
};

// type StringToPositiveNumberMap = {
//   "0": 0;
//   "1": 1;
//   "2": 2;
//   "3": 3;
//   "4": 4;
//   "5": 5;
//   "6": 6;
//   "7": 7;
//   "8": 8;
//   "9": 9;
//   // Extend this map based on your needs
// };

type IsCountable<T> = T extends Arr | string
  ? number extends T["length"]
    ? false
    : true
  : false;

type IsTuple<T> = T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;

type XXX = number[][3];
type XX7 = number[]["length"];
type XX8 = keyof [1, 2, 3];

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

type Length<T> = T extends { length: infer L } ? L : never;

type BuildTuple<L extends number, T extends any[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, any]>;

// type BuildTuple<L extends number, T extends any[] = []> =  T['length'] extends L ? T : BuildTuple<L, [...T, any]>;

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

type X = [1, 2, 3];
type XX = X["length"];
// type XXX = 4 > 2

const x = [1, 2, 3].at(0);
const xx = _([1, 2, 3], at(3));
const x1 = "hello world";
type X1 = (typeof x1)["length"];
const x2 = _("hello world" as const, at(3));

type PrototypeMethod = keyof (ReadonlyArray<any> & String & ObjectConstructor);

function prototypeMethod(name: PrototypeMethod) {
  return (...args: any[]) =>
    (value: any) =>
      value[name](...args);
}
