import { Falsy, Truthy, Nil } from "../types";

export const isFalsy = <T>(value: T): value is Falsy<T> => !value;
export const isTruthy = <T>(value: T): value is Truthy<T> => !!value;

export const isNil = <T>(value: T): value is Extract<T, Nil> =>
  [null, undefined].includes(value as any);

export const isArray = Array.isArray;
export const isObject = (v: unknown): v is Record<any, any> => {
  return v !== null && typeof v === "object" && !isArray(v);
};
export const isFunction = (v: unknown): v is (...args: any[]) => any => {
  return typeof v === "function";
};

export const isNumber = <T>(v: T): v is ExtractIs<T, number> => {
  return typeof v === "number";
};

// export const isString: {
//   <T>(v: T): v is Extract<T, string>;
//   (v: unknown): v is string;
// } = (v: any): v is string => typeof v === "string";

export const isString = <T>(v: T): v is ExtractIs<T, string> => {
  return typeof v === "string";
};

// const v = 5 as 5 | "hello";
// if (isString(v)) {
//   v;
// }
// const v1 = v as unknown;
// if (isString(v1)) {
//   v1;
// }

// type ExtractIs<T, SubType> = T extends SubType
//   ? T
//   : SubType extends T
//   ? SubType
//   : never;

type ExtractIs<T, SubType> = Extract<T, SubType> extends never
  ? T extends unknown
    ? SubType extends T
      ? SubType
      : never
    : never
  : Extract<T, SubType>;

// type X = 5 | "hello" extends unknown ? true : false;
// type X1 = unknown extends 5 | "hello" ? true : false;
