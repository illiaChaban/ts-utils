import { _ } from "../fn-utils";
import { Arr, Falsy, Obj, Truthy } from "../types";
import { is, isNot } from "./is";
import { ExtractIs } from "./shared";

export const isFalsy = <T>(value: T): value is Falsy<T> => !value;
export const isTruthy = <T>(value: T): value is Truthy<T> => !!value;

export const isNil = is(null, undefined);
export const isValue = isNot(null, undefined);
export const isDefined = isNot(undefined);
export const isBoolean = is(true, false);

export const isArray = Array.isArray as {
  <T>(v: T): v is ExtractIs<T, Arr>;
};

export const isObject = <T>(v: T): v is ExtractIs<T, Obj> => {
  return v !== null && typeof v === "object" && !isArray(v);
};
export const isFunction = <T>(
  v: T,
): v is ExtractIs<T, (...args: any[]) => any> => {
  return typeof v === "function";
};

export const isNumber = <T>(v: T): v is ExtractIs<T, number> => {
  return typeof v === "number";
};

export const isValidNumber = <T>(v: T): v is ExtractIs<T, number> => {
  return isNumber(v) && !Number.isNaN(v);
};

export const isString = <T>(v: T): v is ExtractIs<T, string> => {
  return typeof v === "string";
};

export const isDate = <T>(v: T): v is ExtractIs<T, Date> => {
  return v instanceof Date;
};
export const isValidDate = <T>(v: T): v is ExtractIs<T, Date> => {
  return isDate(v) && !Number.isNaN(v.getTime());
};

// const v = 5 as 5 | "hello";
// if (isString(v)) {
//   v; // 'hello
// } else {
//   v; // 5
// }

// isString(v) ? v : v

// const v1 = v as unknown;
// if (isString(v1)) {
//   v1; // string
// }

// const x = pipe(
//   "hello" as number | "hello",
//   iif(isString, (v) => v)
// );

// const x = pipe(
//   {hello: 'world'} as {hello: 'world'} | string[],
//   iif(isObject, (v) => v)
// );

/**
 * This helps with more precise type inferance for "iif" utility
 * 
 * @example 
 * 
 *
  const isString = <T>(v: T): v is ExtractIs<T, string> => {
    return typeof v === "string";
  };

  const x = pipe(
    "hello" as number | "hello",
    iif(
      isString, 
      (v) => v // v is 'hello'
    )
  );

  // ------------------------
  const isString = (v: unknown): v is string => {
    return typeof v === "string";
  };

  const x = pipe(
    "hello" as number | "hello",
    iif(
      isString, 
      (v) => v // v is 'hello' | number
    )
  );
 */
