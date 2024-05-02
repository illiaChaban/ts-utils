import { Arr, NoInfer } from "../types";
import { prototypeMethod } from "./_internal";

export const find = prototypeMethod("find") as {
  /**
   * Returns the value of the first element in the array where predicate is true, and undefined
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found, find
   * immediately returns that element value. Otherwise, find returns undefined.
   */
  <T, S extends T>(
    predicate: (
      value: NoInfer<T>,
      index: number,
      obj: Arr<NoInfer<T>>
    ) => value is S
  ): (value: Arr<T>) => S | undefined;
  <T>(
    predicate: (
      value: NoInfer<T>,
      index: number,
      obj: Arr<NoInfer<T>>
    ) => unknown
  ): (value: Arr<T>) => T | undefined;
};

export const findIndex = prototypeMethod("findIndex") as {
  /**
   * Returns the index of the first element in the array where predicate is true, and -1
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found,
   * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
   */
  <T>(
    predicate: (value: NoInfer<T>, index: number, obj: NoInfer<T>[]) => unknown
  ): (value: Arr<T>) => number;
};
export const indexOf = prototypeMethod("indexOf") as {
  /**
   * Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
   */
  <T>(searchElement: NoInfer<T>, fromIndex?: number): (value: Arr<T>) => number;
};
export const lastIndexOf = prototypeMethod("lastIndexOf") as {
  /**
   * Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array.
   */
  <T>(searchElement: NoInfer<T>, fromIndex?: number): (value: Arr<T>) => number;
};

// TODO: not available yet on types
// findLast
// findLastIndex
