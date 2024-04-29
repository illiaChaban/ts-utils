import { NoInfer } from "../../types";

/**
 * Sorts an array in place. (M for Mutating)
 * @param compareFn Function used to determine the order of the elements. It is expected to return
 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
 * value otherwise.
 */
export const sortM =
  <T>(campareFn: CompareFn<NoInfer<T>>) =>
  (arr: T[]) =>
    arr.sort(campareFn);

/**
 * It returns a new (copied) sorted array.
 * @param compareFn Function used to determine the order of the elements. It is expected to return
 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
 * value otherwise.
 */
export const sort =
  <T>(campareFn: CompareFn<NoInfer<T>>) =>
  (arr: T[]) =>
    [...arr].sort(campareFn);

type CompareFn<T> = (a: T, b: T) => number;
