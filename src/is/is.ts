import { Primitive } from "../types";

export function is<const Args extends Primitive[]>(...args: Args) {
  return <T>(value: T): value is Extract<T, Args[number]> =>
    args.includes(value as any);
}

export function isNot<const Args extends Primitive[]>(...args: Args) {
  return <T>(value: T): value is Exclude<T, Args[number]> =>
    !args.includes(value as any);
}
