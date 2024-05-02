import { fromEntries, map } from ".";
import { isArray } from "../guards";
import { flow } from "../fn-utils";
import { Collection, Key, Value } from "../types";

export const keyBy: KeyBy = (getKey) =>
  flow(
    toEntries,
    map(([k, v]: any) => [getKey(v, k), v]),
    fromEntries
  ) as any;

const toEntries = (collection: Collection) => {
  if (isArray(collection)) return collection.map((v, i) => [i, v]);
  return Object.entries(collection);
};

type KeyBy = {
  <T extends Collection, K extends PropertyKey>(
    getKey: (v: Value<T>, k: Key<T>) => K
  ): (obj: T) => Record<K, Value<T>>;
};
