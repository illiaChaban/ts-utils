import { isNil } from "lodash";
import { not } from "../fn-utils";
import { isValidNumber, isValidDate } from "../is";
import { Nil } from "../types";

export const compareBase = (a: any, b: any) => {
  return a < b ? -1 : a > b ? 1 : 0;
};

export const orderMultiplier = (order: Order) => (order === "asc" ? 1 : -1);

/** works only with valid numbers that are not NaN */
export const compareValidNumbers = (a: number, b: number) => a - b;
export const compareValidStrings = (a: string, b: string) => a.localeCompare(b);
/** works only with valid dates */
export const compareValidDates = (a: Date, b: Date) =>
  compareValidNumbers(a.getTime(), b.getTime());

const orderInvalidLast =
  (isValid: (a: unknown) => boolean) =>
  (a: unknown, b: unknown): 1 | 0 | -1 | null => {
    const aIsValid = isValid(a);
    const bIsValid = isValid(b);
    if (!aIsValid && !bIsValid) return 0;
    // always put invalid values at the end regardless of order
    if (!aIsValid) return 1;
    if (!bIsValid) return -1;
    return null;
  };

export const compareNumbers =
  (order: Order = "asc") =>
  (a: number | Nil, b: number | Nil) => {
    return (
      orderInvalidLast(isValidNumber)(a, b) ??
      compareValidNumbers(a as number, b as number) * orderMultiplier(order)
    );
  };

export const compareDates =
  (order: Order = "asc") =>
  (a: Date | Nil, b: Date | Nil) => {
    return (
      orderInvalidLast(isValidDate)(a, b) ??
      compareValidDates(a as Date, b as Date) * orderMultiplier(order)
    );
  };

export const compareStrings =
  (order: Order = "asc") =>
  (a: string | Nil, b: string | Nil) => {
    return (
      orderInvalidLast(not(isNil))(a, b) ??
      compareValidStrings(a as string, b as string) * orderMultiplier(order)
    );
  };

export type Order = "asc" | "desc";
