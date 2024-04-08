export const not =
  <P extends any[]>(fn: (...args: P) => boolean) =>
  (...args: P): boolean =>
    !fn(...args);
