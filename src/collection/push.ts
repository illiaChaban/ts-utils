import { NoInfer } from "../types";
import { concat } from "./concat";

/**
 * Creates a new array with items appended to the end of an array.
 * @param items New elements to add to the array.
 */
export const push = <T>(...items: NoInfer<T>[]) => concat(items);
