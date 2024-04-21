export const filter: Filter = (predicate: any) => (array: readonly any[]) =>
  array.filter(predicate);

type Filter = {
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   */
  <T, S extends T>(
    predicate: (value: T, index: number, array: readonly T[]) => value is S
  ): (array: readonly T[]) => S[];
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   */
  <T>(predicate: (value: T, index: number, array: readonly T[]) => unknown): (
    array: readonly T[]
  ) => T[];
};
