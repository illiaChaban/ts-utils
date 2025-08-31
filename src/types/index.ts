export * from "./collection";
export * from "./tuples";
export * from "./utils";

export type Nil = null | undefined;

export type FalsyValues = "" | null | undefined | 0 | false;
export type Falsy<T> = Extract<T, FalsyValues>;
export type Truthy<T> = Exclude<T, FalsyValues>;

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type OmitKnown<T, K extends keyof T> = Omit<T, K>;

// TODO: type MaybeReadonly
