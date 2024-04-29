import { Arr, NoInfer } from "../../types";

/**
 * Determines whether the specified callback function returns true for any element of an array.
 * @param predicate A function that accepts up to three arguments. The some method calls
 * the predicate function for each element in the array until the predicate returns a value
 * which is coercible to the Boolean value true, or until the end of the array.
 */
export const some =
  <T>(
    predicate: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => unknown
  ) =>
  (arr: Arr<T>): boolean =>
    arr.some(predicate);
