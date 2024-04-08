import { not } from "../fn-utils";
import { Arr, Collection, Key, NoInfer, Obj, Value } from "../types";
import { filter } from "./filter";

type Removed<T extends Collection, SubT = any> = T extends Obj
  ? { [K in keyof T as T[K] extends SubT ? never : K]: T[K] }
  : T extends Arr<infer V>
  ? Exclude<V, SubT>[]
  : never;

export function remove<T extends Collection, SubT extends Value<T>>(
  predicate: (
    v: NoInfer<Value<T>>,
    k: NoInfer<Key<T>>,
    collection: NoInfer<T>
  ) => v is SubT
): (collection: T) => Removed<T, SubT>;

export function remove<T extends Collection>(
  predicate: (
    v: NoInfer<Value<T>>,
    k: NoInfer<Key<T>>,
    collection: NoInfer<T>
  ) => boolean
): (collection: T) => Removed<T>;

export function remove<T extends Collection, SubT extends Value<T>>(
  collection: T,
  predicate: (v: Value<T>, k: Key<T>, collection: T) => v is SubT
): Removed<T, SubT>;

export function remove<T extends Collection>(
  collection: T,
  predicate: (v: Value<T>, k: Key<T>, collection: T) => boolean
): Removed<T>;

export function remove(...args: any[]) {
  if (args.length === 2) {
    const [it, predicate] = args;
    return filter(it, not(predicate));
  }
  return filter(not(args[0]));
}

// const arr = [1, 2, "hi", 3] as const;
// const obj = { one: 1, two: "hi" } as const;

// const v = remove(arr, isNumber);
// const v1 = pipe(arr, remove(isString), (v) => v);

// const v2 = remove(obj, isNumber);
// const v3 = pipe(
//   obj,
//   (v) => v,
//   remove(isString),
//   (v) => v
// );
// const v4 = pipe(
//   obj,
//   (v) => v,
//   remove(isNumber),
//   (v) => v
// );
