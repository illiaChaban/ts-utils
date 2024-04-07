export * from "./no-infer";
export * from "./object";

export type Nil = null | undefined;

export type FalsyValues = "" | null | undefined | 0 | false;
export type Falsy<T> = Extract<T, FalsyValues>;
export type Truthy<T> = Exclude<T, FalsyValues>;

// export type Fn<P = any, R = any> = (v: P) => R;

// TODO: type MaybeReadonly
