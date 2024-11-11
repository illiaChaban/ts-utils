import { Truthy } from "../types";

export function assert(
  value: unknown,
  error: Error | string = "Assertion failed",
): asserts value {
  if (!value) {
    const err = typeof error === "string" ? new Error(error) : error;
    throw err;
  }
}

export const assertValue =
  (error: Error | string = "Value assertion failed") =>
  <T>(value: T): Truthy<T> => {
    assert(value, error);
    return value as any;
  };

export const panic = (msg = "Panic: unknown error") => {
  throw new Error(msg);
};
