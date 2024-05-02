import { _ } from "../fn-utils";
import { isArray } from "../guards";
import { Key, Obj, Value } from "../types";
import { entries, fromEntries } from "./entries";
import { filter, remove } from "./filter-remove";

export const pick: PickFn = (keysOrFn: Function | string[]) => (obj: Obj) => {
  const predicate = isArray(keysOrFn)
    ? (v: any, k: string) => keysOrFn.includes(k)
    : keysOrFn;

  return _(
    obj,
    entries,
    filter(([k, v]) => predicate(v, k)),
    fromEntries
  );
};

type PickFn = {
  <T extends Obj, K extends keyof T>(keys: K[]): (obj: T) => Pick<T, K>;

  <T extends Obj, SubT extends Value<T>>(
    pickBy: (v: Value<T>, k: Key<T>) => v is SubT
  ): (obj: T) => { [K in keyof T as T[K] extends SubT ? K : never]: T[K] };

  <T extends Obj>(pickBy: (v: Value<T>, k: Key<T>) => boolean): (obj: T) => T;
};

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
