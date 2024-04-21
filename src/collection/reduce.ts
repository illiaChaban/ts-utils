import { Arr, NoInfer } from "../types";

export const reduce: Reduce =
  (...args: any[]) =>
  (arr: Arr) => {
    if (args.length === 1) return arr.reduce(args[0]);
    const [initialValue, callback] = args;
    return arr.reduce(callback, initialValue);
  };

type Reduce = {
  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  <T>(
    callbackfn: (
      previousValue: NoInfer<T>,
      currentValue: NoInfer<T>,
      currentIndex: number,
      array: Arr<NoInfer<T>>
    ) => NoInfer<T>
  ): (arr: Arr<T>) => T;
  <T>(
    initialValue: NoInfer<T>,
    callbackfn: (
      previousValue: NoInfer<T>,
      currentValue: NoInfer<T>,
      currentIndex: number,
      array: Arr<NoInfer<T>>
    ) => T
  ): (arr: Arr<T>) => T;
  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  <T, U>(
    initialValue: U,
    callbackfn: (
      previousValue: U,
      currentValue: NoInfer<T>,
      currentIndex: number,
      array: Arr<NoInfer<T>>
    ) => U
  ): (arr: Arr<T>) => U;
};
