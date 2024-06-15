/** immediately calls a function
 * it's subjectively easier to read than iife i.e. (() => {...})()
 * @example
 * const x = call(() => {
 *  ...
 *  return 5
 * })
 */
export const call = <R>(fn: () => R): R => fn();
