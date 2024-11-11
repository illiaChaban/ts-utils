export const toArray = <T>(v: T[] | ArrayLike<T> | Iterable<T>): T[] => {
  return Array.from(v);
};
