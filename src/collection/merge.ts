import { isArray } from "../is";
import { Arr, Obj } from "../types";

/**
 * Given target & sources arrays, creates a new concatenated array
 * Given target & sources objects, creates a new shallowly merged object
 * @param sources
 */
export const merge = ((...sources: any[]) =>
  (target: any) => {
    if (isArray(target)) return target.concat(...sources);
    return Object.assign({}, target, ...sources);
  }) as Merge;

type Merge = {
  /** Creates a new shallowly merged object */
  <T extends Obj, S extends Obj[]>(...sources: S): (
    target: T
  ) => TupleToIntersection<[T, ...S]>;
  /** Creates a new concatenated array */
  <T extends Arr, const S extends Arr[]>(...sources: S): (
    target: T
  ) => Flatten<[T, ...S]>;
};

type TupleToIntersection<T extends any[]> = {
  [K in keyof T]: (x: T[K]) => void;
} extends {
  [K: number]: (x: infer I) => void;
}
  ? I
  : never;

// Takes array of tuples and merges them into one tuple
type Flatten<T extends readonly any[]> = T extends readonly [
  infer F,
  ...infer R
]
  ? F extends readonly any[]
    ? [...Flatten<F>, ...Flatten<R>]
    : [F, ...Flatten<R>]
  : [];
