type UnknownFunction = (...params: unknown[]) => unknown;

function flow(...fns: UnknownFunction[]): UnknownFunction {
  return (...initialParams: unknown[]): unknown =>
    fns.reduce<unknown>((value, fn, index) => {
      const params = index === 0 ? (value as unknown[]) : [value];
      return fn(...params);
    }, initialParams);
}

type NoInfer<A extends any> = [A][A extends any ? 0 : never];

function pipe<const A>(a: A): A;
function pipe<const A, B extends DetermineProxy<A>>(a: A, ab: B): A;
function pipe<const A, B>(a: A, ab: (a: NoInfer<A>) => B): B;
function pipe<const A, B, C extends DetermineProxy<B>>(
  a: A,
  ab: (a: NoInfer<A>) => B,
  bc: C extends DetermineProxy<B> ? C : never
): B;
function pipe<const A, B, C>(
  a: A,
  ab: (a: NoInfer<A>) => B,
  bc: (b: NoInfer<B>) => C
): C;
// function pipe<const A, B, C>(
//   a: A,
//   ab: (this: void, a: A) => B,
//   bc: (this: void, b: B) => C
// ): C;
// function pipe<const A, B, C, D>(
//   a: A,
//   ab: (this: void, a: A) => B,
//   bc: (this: void, b: B) => C,
//   cd: (this: void, c: C) => D
// ): D;
// function pipe<const A, B, C, D, E>(
//   a: A,
//   ab: (this: void, a: A) => B,
//   bc: (this: void, b: B) => C,
//   cd: (this: void, c: C) => D,
//   de: (this: void, d: D) => E
// ): E;
// function pipe<const A, B, C, D, E, F>(
//   a: A,
//   ab: (this: void, a: A) => B,
//   bc: (this: void, b: B) => C,
//   cd: (this: void, c: C) => D,
//   de: (this: void, d: D) => E,
//   ef: (this: void, e: E) => F
// ): F;
// function pipe<const A, B, C, D, E, F, G>(
//   a: A,
//   ab: (this: void, a: A) => B,
//   bc: (this: void, b: B) => C,
//   cd: (this: void, c: C) => D,
//   de: (this: void, d: D) => E,
//   ef: (this: void, e: E) => F,
//   fg: (this: void, f: F) => G
// ): G;
// function pipe<const A, B, C, D, E, F, G, H>(
//   a: A,
//   ab: (this: void, a: A) => B,
//   bc: (this: void, b: B) => C,
//   cd: (this: void, c: C) => D,
//   de: (this: void, d: D) => E,
//   ef: (this: void, e: E) => F,
//   fg: (this: void, f: F) => G,
//   gh: (this: void, g: G) => H
// ): H;
// function pipe<const A, B, C, D, E, F, G, H, I>(
//   a: A,
//   ab: (this: void, a: A) => B,
//   bc: (this: void, b: B) => C,
//   cd: (this: void, c: C) => D,
//   de: (this: void, d: D) => E,
//   ef: (this: void, e: E) => F,
//   fg: (this: void, f: F) => G,
//   gh: (this: void, g: G) => H,
//   hi: (this: void, h: H) => I
// ): I;
// function pipe<const A, B, C, D, E, F, G, H, I, J>(
//   a: A,
//   ab: (this: void, a: A) => B,
//   bc: (this: void, b: B) => C,
//   cd: (this: void, c: C) => D,
//   de: (this: void, d: D) => E,
//   ef: (this: void, e: E) => F,
//   fg: (this: void, f: F) => G,
//   gh: (this: void, g: G) => H,
//   hi: (this: void, h: H) => I,
//   ij: (this: void, i: I) => J
// ): J;
function pipe(value: unknown, ...fns: UnknownFunction[]): unknown {
  return flow(
    // @ts-ignore
    ...fns
  )(value);
}

function add(a: number) {
  return (b: number): number => b + a;
}

function toString(v: any): string {
  return v + "";
}

// type ProxyType<T = null> = T extends string
//   ? {
//     // __type: 'string'
//     split: (splitter?: string) => (str: T) => string[]
//     // custom test
//     map: <U>(callbackfn: (value: NoInfer<T>) => U) => (str: T) => U
//   } : T extends any[]
//   ? {
//     // __type: 'array'
//     join: (separator?: string) => (arr: T) => string
//     map: <U>(callbackfn: (value: NoInfer<T>, index: number, array: T) => U) => (arr: T) => U[]
//   } : never

type ArrayProxyGeneric = {
  join: <T extends readonly any[]>(
    separator?: string
  ) => ((arr: T) => string) & StringProxyGeneric;
  map: <T extends readonly any[], U>(
    callbackfn: (value: NoInfer<T>, index: number, array: T) => U
  ) => ((arr: T) => U[]) & ArrayProxyTyped<U[]>;
};
type ArrayProxyTyped<T extends readonly any[]> = {
  join: (separator?: string) => ((arr: T) => string) & StringProxyGeneric;
  map: <U>(
    callbackfn: (value: NoInfer<T>, index: number, array: T) => U
  ) => ((arr: T) => U[]) & ArrayProxyTyped<U[]>;
};
type StringProxyGeneric = {
  split: <T extends string>(
    splitter?: string
  ) => ((str: T) => string[]) & ArrayProxyTyped<string[]>;
  // custom test
  map: <T extends string, U>(
    callbackfn: (value: NoInfer<T>) => U
  ) => ((str: T) => U) & DetermineProxy<U>;
};
type StringProxyTyped<T extends string> = {
  split: (
    splitter?: string
  ) => ((str: T) => string[]) & ArrayProxyTyped<string[]>;
  // custom test
  map: <U>(
    callbackfn: (value: NoInfer<T>) => U
  ) => ((str: T) => U) & DetermineProxy<U>;
};
type DetermineProxy<T> = T extends string
  ? StringProxyTyped<T>
  : T extends readonly any[]
  ? ArrayProxyTyped<T>
  : never;

// type ProxyType2<T> = T extends string
//   ? StringProxy<T>
//   : T extends readonly any[]
//   ? ArrayProxyGeneric<T>
//   : never

[].map;
"".split;

const proxy = new Proxy(
  {},
  {
    get(target, prop, receiver) {
      console.log("get", prop, prop === Symbol.toPrimitive);

      // This trap can intercept implicit conversions
      if (prop === Symbol.toPrimitive) {
        console.log("returning 2");
        return (arg: any) => {
          console.log(arg);
          return 2;
        };
      }
      // check if it's a function in the original?
      return (...args: any[]) =>
        (value: any) => {
          console.log({ value, prop });
          return value[prop](...args);
        };
    },
  }
);

"hello".split;
// const p = proxy as any as ProxyType2<string> | ProxyType2<any[]>

const s = proxy as any as StringProxyGeneric;
const a = proxy as any as ArrayProxyGeneric;

type X = String["split"];

// console.log('primitive', 5 + proxy)

console.log(
  pipe(
    "hello",
    s.map((v) => [1, 2, 3]),
    // .join(" "),
    (v) => v
  )
);

// console.log(
//   pipe(
//     'hello',
//     p.toUpperCase(),
//     p.split(''),
//     p.filter(v => v !== 'E' && v !== 'O'),
//     p.join(''),
//   )
// )
