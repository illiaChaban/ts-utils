type PrototypeMethods = keyof (ReadonlyArray<any> & String & ObjectConstructor);

Object.keys;

const propagatePrototypeMethod =
  (name: PrototypeMethods) =>
  (...args: any[]) =>
  (value: any) =>
    value[name](...args);

const entryMethod = <T extends PrototypeMethods>(name: T): { [K in T]: any } =>
  ({ [name]: propagatePrototypeMethod(name) } as any);

const P = {
  ...entryMethod("at"),
  ...entryMethod("concat"),
  ...entryMethod("trim"),
};
