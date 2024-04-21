import { NoInfer } from "../types";

/**
 * Creates a new array with items concatenated to the end of the array.
 * @param items New elements to add to the array.
 */
export const concat =
  <T>(items: NoInfer<T>[]) =>
  (arr: T[]) =>
    [...arr, ...items];
