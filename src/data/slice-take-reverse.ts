import { _ } from "../fn-utils";
import { Arr, IsTuple } from "../types";
import { prototypeMethod } from "./_internal";

export const slice = prototypeMethod<any>("slice") as {
  /**
   * Returns a copy of a section of an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of the array.
   * For example, -2 refers to the second to last element of the array.
   * @param start The beginning index of the specified portion of the array.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the array.
   */
  <T>(start?: number, end?: number): (arr: Arr<T>) => Arr<T>;
  /**
   * Returns a section of a string.
   * @param start The index to the beginning of the specified portion of stringObj.
   * @param end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.
   * If this value is not specified, the substring continues to the end of stringObj.
   */
  (start?: number, end?: number): (value: string) => string;
};

export const take =
  (num: number) =>
  <T>(arr: Arr<T>): Arr<T> =>
    slice<any>(0, num)(arr);

export const reverse =
  <T extends Arr>() =>
  (arr: T): IsTuple<T> extends true ? Reverse<T> : T =>
    [...arr].reverse() as any;

export const reverseM =
  <T extends any[]>() =>
  (arr: T): IsTuple<T> extends true ? Reverse<T> : T =>
    arr.reverse() as any;

type Reverse<From extends Arr, To extends Arr = []> = From extends readonly [
  infer X,
  ...infer Y
]
  ? Reverse<Y, [X, ...To]>
  : To;
