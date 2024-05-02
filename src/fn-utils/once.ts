export const once = <T extends (...args: any[]) => any>(func: T): T => {
  let ran = false;
  let value: any;

  return ((...args) => {
    if (ran) return value as any;
    ran = true;
    value = func(...args);
    return value;
  }) as T;
};
