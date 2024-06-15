import { isFunction } from "../guards";
import { Primitive } from "../types";

export function not<P extends any[]>(
  fn: (...args: P) => boolean
): (...args: P) => boolean;
export function not<T extends Primitive>(value: T): boolean;
export function not(fnOrValue: ((...args: any[]) => boolean) | Primitive) {
  if (isFunction(fnOrValue))
    return (...args: any[]): boolean => !fnOrValue(...args);
  return !fnOrValue;
}
