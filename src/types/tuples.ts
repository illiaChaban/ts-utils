import { Arr } from "./collection";

/** Helper type to check if a type Y is contained in tuple T */
type TupleContains<T extends Arr, Y> = Y extends T[number] ? T : never;

/** Extracts tuple types that contain element
 * @example
 * type B = [1, 2, 3] | ["hi", "hello"];
 * type C = ExtractTuple<B, "hi">; // ['hi', 'hello']
 */
export type ExtractTuple<T extends Arr, WithElement> = T extends any
  ? TupleContains<T, WithElement>
  : never;

export type TupleToIntersection<T extends any[]> = {
  [K in keyof T]: (x: T[K]) => void;
} extends {
  [K: number]: (x: infer I) => void;
}
  ? I
  : never;

/** Takes array of tuples and merges them into one tuple */
export type FlattenTuple<T extends readonly any[]> = T extends readonly [
  infer F,
  ...infer R
]
  ? F extends readonly any[]
    ? [...FlattenTuple<F>, ...FlattenTuple<R>]
    : [F, ...FlattenTuple<R>]
  : [];

export type IsTuple<T> = T extends Arr
  ? number extends T["length"]
    ? false
    : true
  : false;
