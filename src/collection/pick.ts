import { isArray } from "../is";
import { _ } from "../fn-utils";
import { Obj, Value, Key } from "../types";
import { entries, fromEntries } from "./entries";
import { filter } from "./prototype-methods/filter";

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
