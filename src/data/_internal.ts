import { Arr, Obj } from "../types";

type Structures = ReadonlyArray<any> & String & ObjectConstructor;
type PrototypeMethod = keyof Structures;
type GetValue<T extends PrototypeMethod> = T extends keyof ReadonlyArray<any>
  ? Arr
  : T extends String
  ? string
  : T extends keyof ObjectConstructor
  ? Obj
  : never;

export function prototypeMethod<T extends PrototypeMethod>(name: T) {
  return (...args: Parameters<Structures[T]>) =>
    (value: GetValue<T>): ReturnType<Structures[T]> =>
      (value as any)[name](...args);
}
