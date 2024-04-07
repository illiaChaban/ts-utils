import { isArray } from "../is";
import { pipe } from "../pipe";
import { Arr, Key, NoInfer, Obj, Value } from "../types";
import { entries, fromEntries } from "./entries";

type Collection<T = any> = Obj<T> | Arr<T>;

type Filtered<T extends Collection, SubT = any> = T extends Obj
  ? { [K in keyof T as T[K] extends SubT ? K : never]: T[K] }
  : T extends Arr<infer V>
  ? Extract<V, SubT>[]
  : never;

export function filter<T extends Collection, SubT extends Value<T>>(
  predicate: (
    v: NoInfer<Value<T>>,
    k: NoInfer<Key<T>>,
    collection: NoInfer<T>
  ) => v is SubT
): (collection: T) => Filtered<T, SubT>;

export function filter<T extends Collection>(
  predicate: (
    v: NoInfer<Value<T>>,
    k: NoInfer<Key<T>>,
    collection: NoInfer<T>
  ) => boolean
): (collection: T) => Filtered<T>;

export function filter<T extends Collection, SubT extends Value<T>>(
  collection: T,
  predicate: (v: Value<T>, k: Key<T>, collection: T) => v is SubT
): Filtered<T, SubT>;

export function filter<T extends Collection>(
  collection: T,
  predicate: (v: Value<T>, k: Key<T>, collection: T) => boolean
): Filtered<T>;

export function filter(...args: any[]) {
  if (args.length === 2) {
    const [it, predicate] = args;
    return isArray(it)
      ? it.filter(predicate)
      : pipe(
          it,
          entries,
          (v) => v.filter(([key, value]) => predicate(value, key, it)),
          fromEntries
        );
  }
  return (collection: Collection) => filter(collection, args[0]);
}

// const arr = [1, 2, 3] as const;
// const obj = { one: 1, two: "hi" } as const;

// const v = filter(arr, (v, i) => true);
// const v1 = pipe(
//   arr,
//   filter((v, i, arr) => true),
//   (v) => v
// );

// const v2 = filter(obj, (v, i) => true);
// const v3 = pipe(
//   obj,
//   (v) => v,
//   filter(isString),
//   v => v,
// );
// const v4 = pipe(
//   obj,
//   (v) => v,
//   filter(isNumber),
//   v => v,
// );
