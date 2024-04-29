import { isArray } from "../is";
import { Arr, FlattenTuple, Obj, TupleToIntersection } from "../types";

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
  ) => FlattenTuple<[T, ...S]>;
};
