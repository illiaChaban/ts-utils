import { entries, fromEntries, FromEntriesWithReadOnly } from ".";
import { flow } from "../fn-utils";
import { Entry, Obj } from "../types";

export const updateEntries = ((updater) =>
  flow(entries, updater as any, fromEntries)) as UpdateEntries;

type UpdateEntries = {
  <T extends Obj, E extends readonly [PropertyKey, any]>(
    updater: (entries: Entry<NoInfer<T>>[]) => E[]
  ): (object: T) => FromEntriesWithReadOnly<E[]>;
};
