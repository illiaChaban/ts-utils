import { Falsy, Nil } from "../types";

export const isFalsy = <T>(value: T): value is Extract<T, Falsy> => !value;
export const isTruthy = <T>(value: T): value is Exclude<T, Falsy> => !!value;

export const isNil = <T>(value: T): value is Extract<T, Nil> =>
  [null, undefined].includes(value as any);
