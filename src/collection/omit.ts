import { entries, fromEntries } from ".";
import { remove } from "./remove";
import { isArray } from "../is";
import { _ } from "../fn-utils";
import { Key, Obj, Value } from "../types";

export const omit: OmitFn = (keysOrFn: Function | string[]) => (obj: Obj) => {
  const predicate = isArray(keysOrFn)
    ? (v: any, k: string) => keysOrFn.includes(k)
    : keysOrFn;

  return _(
    obj,
    entries,
    remove(([k, v]) => predicate(v, k)),
    fromEntries
  );
};

type OmitFn = {
  <T extends Obj, K extends keyof T>(keys: K[]): (obj: T) => Omit<T, K>;

  <T extends Obj, SubT extends Value<T>>(
    omitBy: (v: Value<T>, k: Key<T>) => v is SubT
  ): (obj: T) => { [K in keyof T as T[K] extends SubT ? never : K]: T[K] };

  <T extends Obj>(omitBy: (v: Value<T>, k: Key<T>) => boolean): (obj: T) => T;
};
