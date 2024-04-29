import { isObject } from "../is";
import { Arr, Obj } from "../types";

export const includes = ((searchEntry: any, fromIdx?: number) =>
  (value: string | Arr | Obj) => {
    if (isObject(value)) {
      return Object.keys(searchEntry).every(
        (key) => key in value && searchEntry[key] === value[key]
      );
    }
    return value.includes(searchEntry, fromIdx);
  }) as Includes;

type Includes = {
  /**
   * TODO: does it make sense to have it here? is it useful
   */
  <const T extends Obj, Y extends Partial<T>>(partial: Y): (
    obj: T
  ) => obj is Extract<T, Omit<T, keyof Y> & Y>;
  /**
  //  * Returns true if searchString appears as a substring of the result of converting this
  //  * object to a String, at one or more positions that are
  //  * greater than or equal to position; otherwise, returns false.
  //  * @param searchString search string
  //  * @param position If position is undefined, 0 is assumed, so as to search all of the String.
  //  */
  //   <T extends string, const Y extends (T extends string ? string : never)>(searchString: Y, position?: number): (
  //     value: T
  //   ) => value is Extract<T, `${string}${Y}${string}`>;
  //   /**
  //  * Determines whether an array includes a certain element, returning true or false as appropriate.
  //  * @param searchElement The element to search for.
  //  * @param fromIndex The position in this array at which to begin searching for searchElement.
  //  */
  //   <T extends Arr, S extends T[number]>(searchElement: S, fromIndex?: number): (
  //     value: T
  //   ) => boolean;
  <T, S extends T extends Arr ? T[number] : string>(
    searchElement: S,
    fromIndex?: number
  ): (
    value: T
  ) => value is T extends string
    ? S extends string
      ? Extract<T, `${string}${S}${string}`>
      : never
    : T extends Arr
    ? ExtractTuple<T, S>
    : never;
};

// Helper type to check if a type Y is contained in tuple T
type TupleContains<T extends Arr, Y> = Y extends T[number] ? T : never;

// ExtractTuple using the Contains helper
type ExtractTuple<T extends Arr, Y> = T extends any
  ? TupleContains<T, Y>
  : never;

// declare const a: "hello" | "hello world";
// if (_(a, includes("lo "))) {
//   a;
// }

// declare const b: [1, 2, 3] | ["hi", "hello"];
// if (_(b, includes("hi"))) {
//   b;
// }

// declare const c: { a: "one"; b: 2 } | { c: 3 };
// if (_(c, includes({ a: "one" }))) {
//   c;
// }

// type B = [1, 2, 3] | ["hi", "hello"];

// // Use the ExtractTuple type to extract the tuple containing 'hi'
// type C = ExtractTuple<B, "hi">; // ['hi', 'hello']
