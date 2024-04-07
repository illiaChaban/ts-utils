export const tap =
  <T>(cb: (v: T) => any) =>
  (v: T): T => {
    cb?.(v);
    return v;
  };

export const noop = () => {};
export const pass = <T>(v: T) => v;
