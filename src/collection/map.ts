/**
 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
 * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
 */
export const map =
  <T, U>(callbackfn: (value: T, index: number, array: readonly T[]) => U) =>
  (array: readonly T[]): U[] =>
    array.map(callbackfn);
