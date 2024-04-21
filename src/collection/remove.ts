import { not } from "../fn-utils";

export const remove: Remove = (predicate: any) => (array: any) =>
  array.filter(not(predicate));

type Remove = {
  /**
   * Returns the elements of an array that do not meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The remove method calls the predicate function one time for each element in the array.
   */
  <T, S extends T>(
    predicate: (value: T, index: number, array: readonly T[]) => value is S
  ): (array: readonly T[]) => Exclude<T, S>[];
  /**
   * Returns the elements of an array that do not meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The remove method calls the predicate function one time for each element in the array.
   */
  <T>(predicate: (value: T, index: number, array: readonly T[]) => unknown): (
    array: readonly T[]
  ) => T[];
};
