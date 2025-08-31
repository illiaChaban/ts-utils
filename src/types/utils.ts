/**
 * Makes the hover overlay more readable by "rebuilding" complext type as object
 *
 * explanation: https://www.totaltypescript.com/concepts/the-prettify-helper */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Merges two types, with second type overriding first
 *
 * @example
 *
 * type X = Override<{ a: 1, b: 2 }, { a: 3 }> // { a: 3, b: 2 }
 */
export type Override<T extends {}, U extends { [K in keyof T]?: any }> = Omit<
  T,
  keyof U
> &
  U;
