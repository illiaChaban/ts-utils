export const tap =
  <T>(cb?: (v: T) => any) =>
  (v: T): T => {
    cb?.(v);
    return v;
  };

export const noop = () => {};
export const thru = <T>(v: T) => v;

export const log = <T>(msg: string) => tap<T>((v) => console.log(msg, v));
