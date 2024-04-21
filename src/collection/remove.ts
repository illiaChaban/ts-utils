import { not } from "../fn-utils";

export const remove: Remove = (predicate: any) => (array: any) =>
  array.filter(not(predicate));

type Remove = {
  <T, S extends T>(
    predicate: (value: T, index: number, array: readonly T[]) => value is S
  ): (array: readonly T[]) => Exclude<T, S>[];

  <T>(predicate: (value: T, index: number, array: readonly T[]) => unknown): (
    array: readonly T[]
  ) => T[];
};
