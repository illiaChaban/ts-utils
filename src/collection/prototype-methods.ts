import { Arr, NoInfer } from "../types";

/**
 * Creates a new array with items concatenated to the end of the array.
 * @param items New elements to add to the array.
 */
export const concat = prototypeMethod("concat") as {
  <T>(items: Arr<NoInfer<T>>): (arr: Arr<T>) => T[];
};

/**
 * Performs the specified action for each element in an array.
 * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
 */
export const each = prototypeMethod("forEach") as {
  <T>(
    callbackfn: (
      value: NoInfer<T>,
      index: number,
      array: readonly NoInfer<T>[]
    ) => void
  ): (arr: readonly T[]) => void;
};

export const every = prototypeMethod("every") as {
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
  ): (arr: Arr<T>) => arr is readonly S[];
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

type PrototypeMethods = keyof (ReadonlyArray<any> & String & ObjectConstructor);

function prototypeMethod(name: PrototypeMethods) {
  return (...args: any[]) =>
    (value: any) =>
      value[name](...args);
}
