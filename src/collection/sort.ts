import { isString } from "lodash";
import { NoInfer } from "../types";
import { isDate, isNumber } from "../is";

/**
 * Sorts an array in place.
 * This method mutates the array and returns a reference to the same array.
 * @param compareFn Function used to determine the order of the elements. It is expected to return
 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
 * value otherwise.
 * If omitted, default compare function is used that properly handles number, strings, dates (ascending order).
 * Missing values (null, undefined) are treated as -Infinity
 */
export const sortM =
  <T>(campareFn: CompareFn<NoInfer<T>> = compareDefault) =>
  (arr: T[]) =>
    arr.sort(campareFn);

/**
 * It returns a new array with the elements sorted in ascending order.
 * This method sorts copied array.
 * @param compareFn Function used to determine the order of the elements. It is expected to return
 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
 * value otherwise.
 * If omitted, default compare function is used that properly handles number, strings, dates (ascending order).
 * Missing values (null, undefined) are treated as -Infinity
 */
export const sort =
  <T>(campareFn: CompareFn<NoInfer<T>> = compareDefault) =>
  (arr: T[]) =>
    [...arr].sort(campareFn);

export const compareAny = (a: any, b: any) => {
  a ??= -Infinity;
  b ??= -Infinity;
  return a < b ? -1 : a > b ? 1 : 0;
};

export const compareNumbers = (a: number, b: number) => a - b;
export const compareLocaleStrings = (a: string, b: string) =>
  a.localeCompare(b);
export const compareDates = (a: Date, b: Date) =>
  compareNumbers(a.getTime(), b.getTime());

export const compareDefault = (
  a: number | string | Date | unknown,
  b: number | string | Date | unknown
): number => {
  if (isDate(a) && isDate(b)) return compareDates(a, b);
  if (isString(a) && isString(b)) return compareLocaleStrings(a, b);
  if (isNumber(a) && isNumber(b)) return compareNumbers(a, b);
  return compareAny(a, b);
};

/** Flips the sign if you need to sort by desc
 * @example
 * pipe([1, 3, -5], sort(desc(compareNumbers)) // [3, 1, -5]
 */
export const desc = (n: number) => -n;

type CompareFn<T> = (a: T, b: T) => number;
