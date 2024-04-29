import { _ } from "../fn-utils";
import { Arr, FlattenTuple, NoInfer } from "../types";

/**
 * Creates a new array with items appended to the end of an array.
 * @param items New elements to add to the array.
 */
export const push =
  <T>(...items: NoInfer<T>[]) =>
  (arr: Arr<T>) =>
    [...arr, ...items];

/**
 * Concatenates strings / arrays
 * @param sources
 */
export const concat = ((...sources: any[]) =>
  (target: string | Arr) =>
    target.concat(...sources)) as Concat;

type Concat = {
  /** Creates a new concatenated array */
  <T extends Arr, const S extends Arr[]>(...sources: S): (
    target: T
  ) => FlattenTuple<[T, ...S]>;

  /** Creates a new concatenated string */
  <T extends string, const S extends string[]>(...sources: S): (
    target: T
  ) => ConcatStrings<T, S>;
};

type ConcatStrings<T extends string, S extends string[]> = S extends [
  infer First,
  ...infer Others
]
  ? First extends string
    ? Others extends string[]
      ? ConcatStrings<`${T}${First}`, Others>
      : never
    : never
  : T;

// declare const a: [1,2,3] | ['hi', 'hello']
// _(a, concat(['hello', 2], ['hey', 'there']), v => v) // [1, 2, 3, "hello", 2, "hey", "there"] | ["hi", "hello", "hello", 2, "hey", "there"

// declare const b: 'hello world' | 'hi there'
// _(b, concat(' , ', 'helo'), v => v) // "hello world , helo" | "hi there , helo"

// type X = ConcatStrings<'hi', [', ', 'there']>
