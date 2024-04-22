import { isString } from "lodash";
import { Nil, NoInfer } from "../types";
import { isDate, isNil, isNumber } from "../is";

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
  if (isNil(a) && isNil(b)) return 0;
  if (isNil(a)) return 1;
  if (isNil(b)) return -1;
  return a < b ? -1 : a > b ? 1 : 0;
};

export const compareNumbers = (a: number | Nil, b: number | Nil) =>
  (a ?? -Infinity) - (b ?? -Infinity);

export const compareLocaleStrings = (a: string | Nil, b: string | Nil) =>
  (a ?? "").localeCompare(b ?? "");

export const compareDates = (a: Date | Nil, b: Date | Nil) =>
  compareNumbers(a?.getTime?.(), b?.getTime?.());

export const compareDefault = (a: unknown, b: unknown): number => {
  if (isDate(a) && isDate(b)) return compareDates(a, b);
  if (isString(a) && isString(b)) return compareLocaleStrings(a, b);
  if (isNumber(a) && isNumber(b)) return compareNumbers(a, b);
  return compareAny(a, b);
};

/** Flips the sign if the sort comparison (-1 => 1)
 * @example
 * pipe(
 *  [1, 3, -5],
 *  sort(flow(compareNumbers, desc))
 * ) // [3, 1, -5]
 *
 * pipe([
 *  {createdAt: 1713746652697, name: 'A'},
 *  {createdAt: 1713746652690, name: 'B'},
 * ],
 * sort((a, b) =>
 *  flow(compareNumbers, desc)(a.createdAt, b.createdAt)
 *  || compareLocaleStrings(a.name, b.name)
 * ),
 * )
 */
export const desc = (n: number) => -n;

type CompareFn<T> = (a: T, b: T) => number;
