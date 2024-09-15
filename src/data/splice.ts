import { Arr } from "../types";

/**
 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the UPDATED array.
 */
export function splice<T>(
  start: number,
  deleteCount?: number,
): (arr: Arr<T>) => Arr<T>;
/**
 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the UPDATED array.
 */
export function splice<T>(
  start: number,
  deleteCount: number,
  ...items: T[]
): (arr: Arr<T>) => Arr<T>;
export function splice<T>(
  start: number,
  deleteCount: number | undefined,
  ...items: T[]
) {
  return (arr: Arr<T>) => {
    const copy = [...arr];
    copy.splice(start, deleteCount as any, ...items);
    return copy;
  };
}

/**
 * Mutable; Removes elements from an array and, if necessary, inserts new elements in their place, returning the UPDATED array.
 */
export function spliceM<T>(
  start: number,
  deleteCount?: number,
): (arr: T[]) => T[];
/**
 * Mutable; Removes elements from an array and, if necessary, inserts new elements in their place, returning the UPDATED array.
 */
export function spliceM<T>(
  start: number,
  deleteCount: number,
  ...items: T[]
): (arr: T[]) => T[];
export function spliceM<T>(
  start: number,
  deleteCount: number | undefined,
  ...items: T[]
) {
  return (arr: T[]) => {
    arr.splice(start, deleteCount as any, ...items);
    return arr;
  };
}
