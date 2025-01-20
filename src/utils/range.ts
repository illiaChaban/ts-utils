export const range: {
  (to: number): number[];
  (from: number, to: number): number[];
} = (...args: number[]) => {
  const from = args.length > 1 ? args[0] : 0;
  const to = args.length > 1 ? args[1] : args[0];
  if (to <= from) return [];
  return new Array(to - from).fill(0).map((_, i) => from + i);
};
