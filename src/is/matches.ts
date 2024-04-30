import { isObject } from "./is-type";
import { ExtractIs } from "./shared";

/** Checks if 'value' partially matches 'shape' object
 * @param shape - record of type guards
 * @param value - any value to check
 *
 * @example
 *
 * declare const x: { type: "x"; two: 5 } | { type: "hi"; three: string };
 *
 * if (_(x, matches({ type: is("hi") }))) {
 *   x satisfies { type: "hi"; three: string };
 * }
 */
export const matches =
  <T extends Record<string, (value: unknown) => boolean>>(shape: T) =>
  <Y>(
    value: Y
  ): value is ExtractIs<
    Y,
    { [K in keyof T]: T[K] extends (v: unknown) => v is infer X ? X : never }
  > => {
    return (
      isObject(value) &&
      Object.entries(shape).every(
        ([key, guard]) => key in value && guard(value[key])
      )
    );
  };
