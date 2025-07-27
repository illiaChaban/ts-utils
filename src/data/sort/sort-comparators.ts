import { not } from "../../fn-utils";
import { isValidNumber, isValidDate, isNil } from "../../guards";
import { Nil } from "../../types";

export const compareBase = (a: any, b: any) => {
  return a < b ? -1 : a > b ? 1 : 0;
};

export const orderMultiplier = (order: Order) => (order === "asc" ? 1 : -1);

/** works only with valid numbers that are not NaN */
export const compareValidNumbers = (order: Order) => (a: number, b: number) => (a - b) * orderMultiplier(order);
export const compareValidStrings = (order: Order) => (a: string, b: string) => a.localeCompare(b) * orderMultiplier(order);
/** works only with valid dates */
export const compareValidDates = (order: Order) => (a: Date, b: Date) =>
  compareValidNumbers(order)(a.getTime(), b.getTime());

const orderInvalidLast =
  (isValid: (a: unknown) => boolean) =>
    (a: unknown, b: unknown): 1 | 0 | -1 | null => {
      const aIsValid = isValid(a);
      const bIsValid = isValid(b);
      if (!aIsValid && !bIsValid) return 0;
      // always put invalid values at the end regardless of order
      if (!aIsValid) return 1; // put a last
      if (!bIsValid) return -1; // put b last
      return null;
    };

export const compareNumbers =
  (order: Order = "asc") =>
    (a: number | Nil, b: number | Nil) => {
      return (
        orderInvalidLast(isValidNumber)(a, b) ??
        compareValidNumbers(order)(a as number, b as number)
      );
    };

export const compareDates =
  (order: Order = "asc") =>
    (a: Date | Nil, b: Date | Nil) => {
      return (
        orderInvalidLast(isValidDate)(a, b) ??
        compareValidDates(order)(a as Date, b as Date)
      );
    };

export const compareStrings =
  (order: Order = "asc") =>
    (a: string | Nil, b: string | Nil) => {
      return (
        orderInvalidLast(not(isNil))(a, b) ??
        compareValidStrings(order)(a as string, b as string)
      );
    };

export type Order = "asc" | "desc";
