/**
 * Adds all the elements of an array into a string, separated by the specified separator string.
 * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
 */
export const join =
  <T>(separator?: string) =>
  (arr: readonly T[]) =>
    arr.join(separator);

/**
 * Split a string into substrings using the specified separator and return them as an array.
 * @param splitter An object that can split a string.
 * @param limit A value used to limit the number of elements returned in the array.
 */
export const split =
  (separator: string, limit?: number) =>
  (str: string): string[] =>
    str.split(separator, limit);
