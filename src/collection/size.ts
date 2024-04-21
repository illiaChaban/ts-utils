import { isArray, isObject, isString } from "../is";
import { Collection } from "../types";
import { panic } from "../utils";
import { values } from "./entries";

export function size(
  v: Collection | Map<any, any> | Set<any> | string
): number {
  return isArray(v) || isString(v)
    ? v.length
    : isObject(v)
    ? values(v).length
    : v instanceof Map || v instanceof Set
    ? v.size
    : panic("size -> Unknown value type: " + typeof v);
}

// const x = [1,2,3] as const
// const x1 = size(x)
