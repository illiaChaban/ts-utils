import { isArray } from "../guards";
import { Collection, Entry, Key, Obj, Value } from "../types";

export const values = Object.values as {
  <T extends Obj>(obj: T): Value<T>[];
};

export const keys = Object.keys as {
  <T extends Obj>(obj: T): Key<T>[];
};

export const entries = <T extends Collection>(
  collection: Collection
): Entry<T>[] =>
  isArray(collection)
    ? ([...collection.entries()] as any)
    : Object.entries(collection);

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

type Cast<X, Y> = X extends Y ? X : Y;

type FromEntries<T> = T extends [infer Key, any][]
  ? { [K in Cast<Key, PropertyKey>]: Extract<ArrayElement<T>, [K, any]>[1] }
  : { [key in string]: any };

export type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>;

/**
 * Taken from this article: https://dev.to/svehla/typescript-object-fromentries-389c
 */
export const fromEntries = Object.fromEntries as {
  <T>(entries: T): FromEntriesWithReadOnly<T>;
};
