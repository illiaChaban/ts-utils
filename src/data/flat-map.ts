import { Arr } from "../types";
import { prototypeMethod } from "./_internal";

export const flat = prototypeMethod("flat") as {
  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the
   * specified depth.
   *
   * @param depth The maximum recursion depth
   */
  <T extends Arr, D extends number = 1>(depth?: D): (
    value: T
  ) => FlatArray<T, D>[];
};
export const flatMap = prototypeMethod("flatMap") as {
  /**
   * Calls a defined callback function on each element of an array. Then, flattens the result into
   * a new array.
   * This is identical to a map followed by flat with depth 1.
   *
   * @param callback A function that accepts up to three arguments. The flatMap method calls the
   * callback function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callback function. If
   * thisArg is omitted, undefined is used as the this value.
   */
  <T, U>(
    callback: (
      value: NoInfer<T>,
      index: number,
      array: NoInfer<T>[]
    ) => U | ReadonlyArray<U>
  ): (value: Arr<T>) => U[];
};
