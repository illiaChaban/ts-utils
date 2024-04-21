import { size } from "../collection";
import { Collection } from "../types";
import { ExtractIs } from "./shared";

type SizeableObj<T = any> = Collection<T> | Set<T> | Map<any, T>;

export const isEmpty = (
  value: SizeableObj | string
): value is SizeableObj<never> | "" => !size(value);

export const isNonEmpty = <T extends SizeableObj | string>(
  value: T
): value is ExtractIs<T, Exclude<T, SizeableObj<never> | "">> => !!size(value);
