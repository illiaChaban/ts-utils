import { NoInfer } from "../types";

/**
 * Performs the specified action for each element in an array.
 * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
 */
export const each =
  <T>(
    callbackfn: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => void
  ) =>
  (arr: readonly T[]) =>
    arr.forEach(callbackfn);

/**
 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
 * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
 */
export const map =
  <T, U>(
    callbackfn: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => U
  ) =>
  (array: readonly T[]): U[] =>
    array.map(callbackfn);
