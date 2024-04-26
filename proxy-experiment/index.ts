import { NoInfer, pipe } from "../src";

const _proxy = new Proxy(
  {},
  {
    get(target: any, prop) {
      // TODO: check if it's a function in the original? (special case for .length or other prop access like .size for Map)
      target[prop] ??=
        (...args: any[]) =>
        (value: any) => {
          // console.log({ value, prop });
          return value[prop](...args);
        };
      return target[prop];
    },
  }
);

export const P = _proxy as StringProxyGeneric & ArrayProxyGeneric;
export const S = _proxy as StringProxyGeneric;
export const A = _proxy as ArrayProxyGeneric;

type ArrayProxyGeneric = {
  join: <T extends readonly any[]>(
    separator?: string
  ) => ((arr: T) => string) & StringProxyGeneric;
  // map: <T extends readonly any[], U>(
  //   callbackfn: (value: NoInfer<T[number]>, index: number, array: T) => U
  // ) => (arr: T) => U[];

  // map: <T, U>(
  //   callbackfn: (value: NoInfer<T>, index: number, array: readonly NoInfer<T>[]) => U
  // ) => (array: readonly T[]) => U[];

  map: {
    // <T, U>(
    //   callbackfn: (value: NoInfer<T>, index: number, array: readonly NoInfer<T>[]) => U
    // ): (array: readonly T[]) => U[];

    // <T extends readonly any[], U>(
    //   callbackfn: (value: NoInfer<T[number]>, index: number, array: NoInfer<T>) => U
    // ): (arr: T) => U[];

    // <T extends string, U>(callbackfn: (value: NoInfer<T>) => U): (str: T) => U;

    <T extends readonly any[] | string, U>(
      callbackfn: T extends readonly any[]
        ? (value: NoInfer<T[number]>, index: number, array: NoInfer<T>) => U
        : (value: NoInfer<T>) => U
    ): (value: T) => T extends readonly any[] ? U[] : U;
  };
};

type StringProxyGeneric = {
  split: <T extends string>(splitter?: string) => (str: T) => string[];
  // custom test
  // map: <T extends string, U>(
  //   callbackfn: (value: NoInfer<T>) => U
  // ) => (str: T) => U;
};

pipe(
  "hello",
  P.map((v) => [1, 2, 3]),
  // v => v,
  // (v) => [1, 2, 3],
  P.map((v) => v)
  // .join(" "),
  // (v) => v
);

// export const { join, map } = _proxy as ArrayProxyGeneric & StringProxyGeneric;
