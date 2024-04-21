type UnknownFunction = (...params: unknown[]) => unknown;

export function flow<A extends unknown[], B>(
  ab: (this: void, ...a: A) => B
): (...args: A) => B;
export function flow<A extends unknown[], B, C>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C
): (...args: A) => C;
export function flow<A extends unknown[], B, C, D>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D
): (...args: A) => D;
export function flow<A extends unknown[], B, C, D, E>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E
): (...args: A) => E;
export function flow<A extends unknown[], B, C, D, E, F>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F
): (...args: A) => F;
export function flow<A extends unknown[], B, C, D, E, F, G>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F,
  fg: (this: void, f: F) => G
): (...args: A) => G;
export function flow<A extends unknown[], B, C, D, E, F, G, H>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F,
  fg: (this: void, f: F) => G,
  gh: (this: void, g: G) => H
): (...args: A) => H;
export function flow<A extends unknown[], B, C, D, E, F, G, H, I>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F,
  fg: (this: void, f: F) => G,
  gh: (this: void, g: G) => H,
  hi: (this: void, h: H) => I
): (...args: A) => I;
export function flow<A extends unknown[], B, C, D, E, F, G, H, I, J>(
  ab: (this: void, ...a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F,
  fg: (this: void, f: F) => G,
  gh: (this: void, g: G) => H,
  hi: (this: void, h: H) => I,
  ij: (this: void, i: I) => J
): (...args: A) => J;
export function flow(...fns: UnknownFunction[]): UnknownFunction {
  return (...initialParams: unknown[]): unknown =>
    fns.reduce<unknown>((value, fn, index) => {
      const params = index === 0 ? (value as unknown[]) : [value];
      return fn(...params);
    }, initialParams);
}

export function pipe<const A>(a: A): A;
export function pipe<const A, B>(a: A, ab: (this: void, a: A) => B): B;
export function pipe<const A, B, C>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C
): C;
export function pipe<const A, B, C, D>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D
): D;
export function pipe<const A, B, C, D, E>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E
): E;
export function pipe<const A, B, C, D, E, F>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F
): F;
export function pipe<const A, B, C, D, E, F, G>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F,
  fg: (this: void, f: F) => G
): G;
export function pipe<const A, B, C, D, E, F, G, H>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F,
  fg: (this: void, f: F) => G,
  gh: (this: void, g: G) => H
): H;
export function pipe<const A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F,
  fg: (this: void, f: F) => G,
  gh: (this: void, g: G) => H,
  hi: (this: void, h: H) => I
): I;
export function pipe<const A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (this: void, a: A) => B,
  bc: (this: void, b: B) => C,
  cd: (this: void, c: C) => D,
  de: (this: void, d: D) => E,
  ef: (this: void, e: E) => F,
  fg: (this: void, f: F) => G,
  gh: (this: void, g: G) => H,
  hi: (this: void, h: H) => I,
  ij: (this: void, i: I) => J
): J;
export function pipe(value: unknown, ...fns: UnknownFunction[]): unknown {
  return flow(
    // @ts-ignore
    ...fns
  )(value);
}

export { pipe as _ };

/** pipe alias */
// export const _ = pipe;
