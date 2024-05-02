import { _, iif } from "../fn-utils";
import { as, isString } from "../guards";
import { Arr, NoInfer } from "../types";
import { each } from "./each-map";

/** Like Object.groupBy but supports an array of keys */
export const groupBy =
  <T, const Key extends string>(
    getKeys: (value: NoInfer<T>, i: number) => Key[] | Key
  ) =>
  (arr: Arr<T>): Record<Key, Arr<T>> => {
    const group = {} as Record<Key, any>;

    arr.forEach((value, i) =>
      _(
        getKeys(value, i),
        iif(isString, (v) => [v]),
        as<Key[]>(),
        each((key) => {
          group[key] ??= [];
          group[key].push(value);
        })
      )
    );

    return group;
  };

// declare const a: {id: number, types: ('one' | 'two' | 'three')[]}[]
// const a1 = _(a, groupBy(v => v.id > 0 ? 'hi' : 'hello'))
