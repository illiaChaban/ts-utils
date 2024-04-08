import { Arr, Collection, Key, NoInfer, Obj, Value } from "../types";

type Mapped<T extends Collection, Y> = T extends Obj
  ? { [K in keyof T]: Y }
  : T extends Arr
  ? Y[]
  : never;

export function map<T extends Collection, Y>(
  fn: (v: NoInfer<Value<T>>, k: NoInfer<Key<T>>, collection: NoInfer<T>) => Y
): (collection: T) => Mapped<T, Y>;

export function map<T extends Collection, Y>(
  collection: T,
  fn: (v: Value<T>, k: Key<T>, collection: T) => Y
): Mapped<T, Y>;

export function map(...args: any[]) {
  // TODO:
  return null as any;
}

// export const mapValues = <T extends AnyObj, TResult>(
//   object: T,
//   mapper: (val: T[keyof T], key: keyof T) => TResult,
// ): { [K in keyof T]: TResult } => {
//   const newEntries = Object.entries(object).map(([key, value]) => [
//     key,
//     mapper(value as any, key as keyof T),
//   ])
//   return Object.fromEntries(newEntries) as any
// }
