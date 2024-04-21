import { EmptySlot } from "./empty-slot";

export type Value<T> = T extends readonly (infer X)[]
  ? X
  : T extends Record<any, infer X>
  ? X
  : never;

export type Key<T> = T extends readonly any[]
  ? number
  : T extends Record<infer K, any>
  ? K
  : never;

export type Entry<T extends Collection> = T extends Arr<infer Y>
  ? [number, Y]
  : {
      [K in keyof T]: [K, T[K]];
    }[keyof T];

/** T[] extends readonly T[] */
export type Arr<T = unknown> = readonly T[];

/**
 * string for keys and unknown for values is used instead of any,any due to weird assignability types
 * @example
 * any[] extends Record<string, any> ? true : false // true
 *
 * @link
 * https://stackoverflow.com/questions/71422178/typescript-record-accepts-array-why
 */
export type Obj<K = EmptySlot, T = EmptySlot> = [K, T] extends [
  EmptySlot,
  EmptySlot
]
  ? Record<string, unknown>
  : [K, T] extends [any, EmptySlot]
  ? Record<string, K>
  : [K, T] extends [string, any]
  ? Record<Extract<K, string>, T>
  : never;

export type Collection<T = unknown> = Obj<T> | Arr<T>;

// type X = keyof number[];
// type A = any[] extends Record<string, unknown> ? true : false;

// const x: Record<string, unknown> = {hi: 'x', 0: 2}

// type X = Obj
// type X1 = Obj<number>
// type X2 = Obj<'hi' | 'hello', number>
