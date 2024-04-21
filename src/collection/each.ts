export const each: Each = (cb: any) => (arr) => arr.forEach(cb);

type Each = {
  /**
   * Performs the specified action for each element in an array.
   * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  <T>(
    callbackfn: (value: T, index: number, array: readonly T[]) => void,
    thisArg?: any
  ): (arr: readonly T[]) => void;
};
