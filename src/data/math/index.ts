import { flow } from "../../fn-utils";

export const min = (n: number) => (val: number) => Math.max(n, val);
export const max = (n: number) => (val: number) => Math.min(n, val);

export const clamp = (minN: number, maxN: number) => flow(min(minN), max(maxN));
