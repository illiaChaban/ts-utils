import { Arr } from "../types";

export const uniq = <T>(arr: Arr<T>): Arr<T> => [...new Set(arr)];
