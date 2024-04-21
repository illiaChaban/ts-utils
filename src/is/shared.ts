export type ExtractIs<T, SubType> = Extract<T, SubType> extends never
  ? T extends unknown
    ? SubType extends T
      ? SubType
      : never
    : never
  : Extract<T, SubType>;
