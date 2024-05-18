import { NoInfer } from "../types";

export const mapValues =
  <K extends string, T, Y>(map: (value: NoInfer<T>, key: NoInfer<K>) => Y) =>
  (obj: Record<K, T>): Record<K, Y> => {
    const mapped = {} as Record<K, Y>;
    const keys = Object.keys(obj) as K[];
    keys.forEach((key) => {
      mapped[key] = map(obj[key], key);
    });
    return mapped;
  };
