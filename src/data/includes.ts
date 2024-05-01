import { Arr, ExtractTuple } from "../types";

/**
 * For string:
 * Returns true if searchString appears as a substring of the result of converting this
 * object to a String, at one or more positions that are
 * greater than or equal to position; otherwise, returns false.
 * @param searchString search string
 * @param position If position is undefined, 0 is assumed, so as to search all of the String.
 *
 * For array:
 * Determines whether an array includes a certain element, returning true or false as appropriate.
 * @param searchElement The element to search for.
 * @param fromIndex The position in this array at which to begin searching for searchElement.
 */
export const includes = ((searchEntry: any, fromIdx?: number) =>
  (value: string | Arr) =>
    value.includes(searchEntry, fromIdx)) as Includes;

type Includes = {
  /**
   * For string:
   * Returns true if searchString appears as a substring of the result of converting this
   * object to a String, at one or more positions that are
   * greater than or equal to position; otherwise, returns false.
   * @param searchString search string
   * @param position If position is undefined, 0 is assumed, so as to search all of the String.
   *
   * For array:
   * Determines whether an array includes a certain element, returning true or false as appropriate.
   * @param searchElement The element to search for.
   * @param fromIndex The position in this array at which to begin searching for searchElement.
   */

  // Breaking down this into 2 overloads for some reason doesn't work
  <T extends Arr | string, S extends T extends Arr ? T[number] : string>(
    searchElement: S,
    fromIndex?: number
  ): (
    value: T
  ) => value is T extends string
    ? S extends string
      ? Extract<T, `${string}${S}${string}`>
      : never
    : T extends Arr
    ? ExtractTuple<T, S>
    : never;
};
