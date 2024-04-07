import { EmptySlot } from "./empty-slot";

export type Value<T> = T extends Record<any, infer X>
  ? X
  : T extends readonly (infer X)[]
  ? X
  : never;

export type Key<T> = T extends Record<infer K, any>
  ? K
  : T extends Arr
  ? number
  : never;

export type Entry<T extends Record<any, any>> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export type Arr<T = any> = T[] | readonly T[];

export type AnyRecordKey = string | number | symbol;

export type Obj<K = EmptySlot, T = EmptySlot> = [K, T] extends [
  EmptySlot,
  EmptySlot
]
  ? Record<any, any>
  : [K, T] extends [any, EmptySlot]
  ? Record<any, K>
  : [K, T] extends [AnyRecordKey, any]
  ? Record<Extract<K, AnyRecordKey>, T>
  : never;

type X = keyof number[];
type A = X extends number ? true : false;

// type X = Obj
// type X1 = Obj<number>
// type X2 = Obj<'hi' | 'hello', number>
