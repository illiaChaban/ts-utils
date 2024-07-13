import _throttle from "lodash.throttle";

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds. The throttled
 * function comes with a cancel method to cancel delayed invocations and a flush method to immediately invoke
 * them. Provide an options object to indicate that func should be invoked on the leading and/or trailing edge
 * of the wait timeout. Subsequent calls to the throttled function return the result of the last func call.
 *
 * Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if
 * the the throttled function is invoked more than once during the wait timeout.
 *
 * @param func The function to throttle.
 * @param wait The number of milliseconds to throttle invocations to.
 * @param options The options object.
 * @param options.leading Specify invoking on the leading edge of the timeout.
 * @param options.trailing Specify invoking on the trailing edge of the timeout.
 * @return Returns the new throttled function.
 */
export const throttle =
  (
    wait: number = 0,
    options?: {
      leading?: boolean | undefined;
      trailing?: boolean | undefined;
    }
  ) =>
  <T extends AnyFunction>(fn: T): DebouncedFunc<T> =>
    _throttle(fn, wait, options);

type AnyFunction = (...args: readonly any[]) => unknown;

interface DebouncedFunc<T extends (...args: any[]) => any> {
  /**
   * Call the original function, but applying the debounce rules.
   *
   * If the debounced function can be run immediately, this calls it and returns its return
   * value.
   *
   * Otherwise, it returns the return value of the last invocation, or undefined if the debounced
   * function was not invoked yet.
   */
  (...args: Parameters<T>): ReturnType<T> | undefined;

  /**
   * Throw away any pending invocation of the debounced function.
   */
  cancel(): void;

  /**
   * If there is a pending invocation of the debounced function, invoke it immediately and return
   * its return value.
   *
   * Otherwise, return the value from the last invocation, or undefined if the debounced function
   * was never invoked.
   */
  flush(): ReturnType<T> | undefined;
}
