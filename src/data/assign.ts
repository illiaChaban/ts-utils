import { Obj, TupleToIntersection } from "../types";

/** Creates a new shallowly merged object */
export const assign =
  <T extends Obj, S extends Obj[]>(...sources: S) =>
  (target: T): TupleToIntersection<[T, ...S]> =>
    Object.assign({}, target, ...sources);

// alias
export { assign as merge };
