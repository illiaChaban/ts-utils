import { isString } from "../is";
import { pipe } from "../pipe";
import { FalsyValues } from "../types";
import { pass } from "./tap";

export function iif<T, SubT extends T, A, B>(
  checkCondition: (v: NoInfer<T>) => v is SubT,
  doThis: (v: NoInfer<SubT>) => A,
  doThat: (v: Exclude<T, SubT>) => B
): (v: T) => A | B;

export function iif<T, A, B>(
  checkCondition: (v: NoInfer<T>) => boolean,
  doThis: (v: NoInfer<T>) => A,
  doThat: (v: NoInfer<T>) => B
): (v: T) => A | B;

export function iif<T, SubT extends T, Y>(
  checkCondition: (v: NoInfer<T>) => v is SubT,
  doThis: (v: SubT) => Y
): (v: T) => T | Y;

export function iif<T, Y>(
  checkCondition: (v: NoInfer<T>) => boolean,
  doThis: (v: NoInfer<T>) => Y
): (v: T) => T | Y;

export function iif<T, Y>(
  maybeDoThis: FalsyValues | ((v: NoInfer<T>) => Y)
): (v: T) => T | Y;

export function iif(...args: any[]) {
  if (args.length === 1) return args[0] ?? pass;
  const [checkCondition, doThis, doThat = pass] = args;
  return (v: any) => (checkCondition(v) ? doThis(v) : doThat(v));
}

const toString = (v: unknown): string => v + "";
const toBoolean = (v: unknown): boolean => !v;

const v = 5 as 5 | "hello";
const isCondition = () => !Math.random();
const x = pipe(
  v,
  iif(
    (v) => isString(v),
    (v) => v,
    toBoolean
  )
);
