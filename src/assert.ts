import { Truthy } from "./types";

export function assert(
  value: unknown,
  error: Error | string = "Assertion failed"
): asserts value {
  if (!value) {
    const err = typeof error === "string" ? new Error(error) : error;
    throw err;
  }
}

export const assertValue = <T>(
  value: T,
  error: Error | string = "Value assertion failed"
): Truthy<T> => {
  assert(value, error);
  return value as any;
};
