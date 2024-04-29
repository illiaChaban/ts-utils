import { Arr, NoInfer, ExtractTuple } from "../types";

export const some = ((predicate: any) => (arr: Arr) =>
  arr.some(predicate)) as Some;

type Some = {
  /**
   * Determines whether the specified callback function returns true for any element of an array.
   * @param predicate A function that accepts up to three arguments. The some method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value true, or until the end of the array.
   */
  <T extends Arr, S extends T[number]>(
    predicate: (
      value: NoInfer<T>[number],
      index: number,
      array: NoInfer<T>
    ) => value is S
  ): (arr: T) => arr is ExtractTuple<T, S>;
  /**
   * Determines whether the specified callback function returns true for any element of an array.
   * @param predicate A function that accepts up to three arguments. The some method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value true, or until the end of the array.
   */
  <T>(
    predicate: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => unknown
  ): (arr: Arr<T>) => boolean;
};

// declare const a: [1, 2, 3] | ["hi", "hello"] | [1, "hey"];
// if (_(a, some(isString))) {
//   a // ["hi", "hello"] | [1, "hey"]
// }

export const every = ((predicate: any) => (arr: Arr) =>
  arr.every(predicate)) as Every;

type Every = {
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the array.
   */
  <T, S extends T>(
    predicate: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => value is S
  ): (arr: Arr<T>) => arr is S[];
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the array.
   */
  <T>(
    predicate: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => unknown
  ): (arr: Arr<T>) => boolean;
};

// declare const a: (string | number)[];

// if (a.every(isNumber)) {
//   a;
// }
// if (_(a, every(isNumber))) {
//   a;
// }
