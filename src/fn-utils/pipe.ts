import { NoInfer } from "../types";

type UnknownFunction = (...params: unknown[]) => unknown;
// removed NoInfer due to some type issues with join/split
type Fn<A, B> = (this: void, a: A) => B;

export function flow<A extends unknown[], B>(
  ab: (this: void, ...args: A) => B
): (...args: A) => B;
export function flow<A extends unknown[], B, C>(
  ab: (this: void, ...args: A) => B,
  bc: Fn<B, C>
): (...args: A) => C;
export function flow<A extends unknown[], B, C, D>(
  ab: (this: void, ...args: A) => B,
  bc: Fn<B, C>,
  cd: Fn<C, D>
): (...args: A) => D;
export function flow<A extends unknown[], B, C, D, E>(
  ab: (this: void, ...args: A) => B,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>
): (...args: A) => E;
export function flow<A extends unknown[], B, C, D, E, F>(
  ab: (this: void, ...args: A) => B,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>
): (...args: A) => F;
export function flow<A extends unknown[], B, C, D, E, F, G>(
  ab: (this: void, ...args: A) => B,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>
): (...args: A) => G;
export function flow<A extends unknown[], B, C, D, E, F, G, H>(
  ab: (this: void, ...args: A) => B,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>,
  gh: Fn<G, H>
): (...args: A) => H;
export function flow<A extends unknown[], B, C, D, E, F, G, H, I>(
  ab: (this: void, ...args: A) => B,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>,
  gh: Fn<G, H>,
  hi: Fn<H, I>
): (...args: A) => I;
export function flow<A extends unknown[], B, C, D, E, F, G, H, I, J>(
  ab: (this: void, ...args: A) => B,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>,
  gh: Fn<G, H>,
  hi: Fn<H, I>,
  ij: Fn<I, J>
): (...args: A) => J;
export function flow(
  first: UnknownFunction,
  ...fns: UnknownFunction[]
): UnknownFunction {
  return (...args: unknown[]): unknown =>
    fns.reduce((v, fn) => fn(v), first(...args));
}

export function pipe<const A>(a: A): A;
export function pipe<const A, B extends A>(
  a: A,
  ab: (a: NoInfer<A>) => a is B
): a is B;
export function pipe<const A, B>(a: A, ab: Fn<A, B>): B;
export function pipe<const A, B, C>(a: A, ab: Fn<A, B>, bc: Fn<B, C>): C;
export function pipe<const A, B, C, D>(
  a: A,
  ab: Fn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>
): D;
export function pipe<const A, B, C, D, E>(
  a: A,
  ab: Fn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>
): E;
export function pipe<const A, B, C, D, E, F>(
  a: A,
  ab: Fn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>
): F;
export function pipe<const A, B, C, D, E, F, G>(
  a: A,
  ab: Fn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>
): G;
export function pipe<const A, B, C, D, E, F, G, H>(
  a: A,
  ab: Fn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>,
  gh: Fn<G, H>
): H;
export function pipe<const A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: Fn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>,
  gh: Fn<G, H>,
  hi: Fn<H, I>
): I;
export function pipe<const A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: Fn<A, B>,
  bc: Fn<B, C>,
  cd: Fn<C, D>,
  de: Fn<D, E>,
  ef: Fn<E, F>,
  fg: Fn<F, G>,
  gh: Fn<G, H>,
  hi: Fn<H, I>,
  ij: Fn<I, J>
): J;
export function pipe(value: unknown, ...fns: UnknownFunction[]): unknown {
  return fns.reduce((v, fn) => fn(v), value);
}

/** pipe alias */
export { pipe as _ };
