import { FalsyValues, NoInfer } from "../types";
import { thru } from "./tap";

export function iif<T, SubT extends T, A, B>(
  checkCondition: (v: NoInfer<T>) => v is SubT,
  doThis: (v: NoInfer<SubT>) => A,
  doThat: (v: Exclude<NoInfer<T>, SubT>) => B
): (v: T) => A | B;

export function iif<T, A, B>(
  checkCondition: (v: NoInfer<T>) => boolean,
  doThis: (v: NoInfer<T>) => A,
  doThat: (v: NoInfer<T>) => B
): (v: T) => A | B;

export function iif<T, SubT extends T, Y>(
  checkCondition: (v: NoInfer<T>) => v is SubT,
  doThis: (v: SubT) => Y
): (v: T) => Y | Exclude<T, SubT>;

export function iif<T, Y>(
  checkCondition: (v: NoInfer<T>) => boolean,
  doThis: (v: NoInfer<T>) => Y
): (v: T) => T | Y;

export function iif<T, Y>(
  maybeDoThis: FalsyValues | ((v: NoInfer<T>) => Y)
): (v: T) => T | Y;

export function iif(...args: any[]) {
  if (args.length === 1) return args[0] ?? thru;
  const [checkCondition, doThis, doThat = thru] = args;
  return (v: any) => (checkCondition(v) ? doThis(v) : doThat(v));
}

// const toString = (v: unknown): string => v + "";
// const toBoolean = (v: unknown): boolean => !v;
// const toNumber = (v: unknown): number => v as any;

// const v = 5 as 5 | "hello";
// const isCondition = () => !Math.random();
// const x = pipe(v, v => v, iif(isString, v => toBoolean(v), thru)); // boolean | 5
// const x2 = pipe(v , iif(isString, toBoolean))
// const x3 = pipe(v , v => isString(v) ? toBoolean(v) : v)
