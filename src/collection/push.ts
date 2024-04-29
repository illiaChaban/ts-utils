import { Arr, NoInfer } from "../types";

// export const concat =

/**
 * Creates a new array with items appended to the end of an array.
 * @param items New elements to add to the array.
 */
export const push =
  <T>(...items: NoInfer<T>[]) =>
  (arr: Arr<T>) =>
    [...arr, ...items];
