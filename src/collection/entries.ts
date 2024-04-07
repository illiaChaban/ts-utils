import { Entry, Key, Obj, Value } from "../types";

export const values = Object.values as {
  <T extends Obj>(obj: T): Value<T>[];
};

export const keys = Object.keys as {
  <T extends Obj>(obj: T): Key<T>[];
};

export const entries = Object.entries as {
  <T extends Obj>(obj: T): Entry<T>[];
};

/**
 * Taken from this article: https://dev.to/svehla/typescript-object-fromentries-389c
 */
export const fromEntries = (() => {
  type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

  type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

  type Cast<X, Y> = X extends Y ? X : Y;

  type FromEntries<T> = T extends [infer Key, any][]
    ? { [K in Cast<Key, PropertyKey>]: Extract<ArrayElement<T>, [K, any]>[1] } // <- Change here `string` -> `PropertyKey`.
    : { [key in string]: any };

  type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>;

  return Object.fromEntries as {
    <T>(entries: T): FromEntriesWithReadOnly<T>;
  };
})();

// const obj = { one: 1, two: "hello" };
// const obj1 = { one: 1, two: "hello" } as const;

// const x = pipe(obj, entries, (v) => v, fromEntries);
// const x1 = pipe(obj1, entries, (v) => v, fromEntries);
// const x2 = pipe([['hi', 1], ['hello', 'world']] as const, v => v, fromEntries)
