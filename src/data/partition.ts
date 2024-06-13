import { Arr } from "../types";

export function partition<T, S extends T>(
  guard: (v: NoInfer<T>) => v is S
): (arr: Arr<T>) => [S[], Exclude<T, S>[]];

export function partition<T>(
  guard: (v: NoInfer<T>) => boolean
): (arr: Arr<T>) => [T[], T[]];

export function partition(cb: any) {
  return (arr: Arr) => {
    const [truthy, falsy] = [[], []] as any[];
    arr.forEach((v) => {
      const bucket = cb(v) ? truthy : falsy;
      bucket.push(v);
    });
    return [truthy, falsy];
  };
}
