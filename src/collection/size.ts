import { isObject } from "../is";
import { values } from "./entries";

export function size(obj: Record<any, any>): number;
export function size<T extends { length: number }>(v: T): T["length"];
export function size(v: any) {
  return isObject(v) ? values(v).length : v.length ?? 0;
}

// const x = [1,2,3] as const
// const x1 = size(x)
