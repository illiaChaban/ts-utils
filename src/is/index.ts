import { Falsy, Truthy, Nil } from "../types";

export const isFalsy = <T>(value: T): value is Falsy<T> => !value;
export const isTruthy = <T>(value: T): value is Truthy<T> => !!value;

export const isNil = <T>(value: T): value is Extract<T, Nil> =>
  [null, undefined].includes(value as any);
