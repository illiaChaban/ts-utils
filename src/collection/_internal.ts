type PrototypeMethod = keyof (ReadonlyArray<any> & String & ObjectConstructor);

export function prototypeMethod(name: PrototypeMethod) {
  return (...args: any[]) =>
    (value: any) =>
      value[name](...args);
}
