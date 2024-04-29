export const cast =
  <T>() =>
  (value: unknown): T =>
    value as any;

export { cast as as };
