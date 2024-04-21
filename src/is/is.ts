import { Primitive } from "../types";

export function is<const A extends Primitive>(
  ...args: [A]
): <T>(value: T) => value is Extract<T, A>;
export function is<const A extends Primitive, const B extends Primitive>(
  ...args: [A, B]
): <T>(value: T) => value is Extract<T, A | B>;
export function is<
  const A extends Primitive,
  const B extends Primitive,
  const C extends Primitive
>(...args: [A, B, C]): <T>(value: T) => value is Extract<T, A | B | C>;

export function is<Args extends Primitive[]>(...args: Args) {
  return <T>(value: T): value is Extract<T, Args> =>
    args.includes(value as any);
}

export function isNot<const A extends Primitive>(
  ...args: [A]
): <T>(value: T) => value is Exclude<T, A>;
export function isNot<const A extends Primitive, const B extends Primitive>(
  ...args: [A, B]
): <T>(value: T) => value is Exclude<T, A | B>;
export function isNot<
  const A extends Primitive,
  const B extends Primitive,
  const C extends Primitive
>(...args: [A, B, C]): <T>(value: T) => value is Exclude<T, A | B | C>;

export function isNot<Args extends Primitive[]>(...args: Args) {
  return <T>(value: T): value is Exclude<T, Args> =>
    !args.includes(value as any);
}
