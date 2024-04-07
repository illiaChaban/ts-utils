export type Nil = null | undefined;

export type FalsyValues = "" | null | undefined | 0 | false;
export type Falsy<T> = Extract<T, FalsyValues>;
export type Truthy<T> = Exclude<T, FalsyValues>;
