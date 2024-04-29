export { default as groupBy } from "lodash/fp/groupBy";

export { default as difference } from "lodash/fp/difference";
export { default as intersection } from "lodash/fp/intersection";
export { default as partition } from "lodash/fp/partition";
export { default as find } from "lodash/fp/find";
export { default as findLast } from "lodash/fp/findLast";
export { default as findIndex } from "lodash/fp/findIndex";
export { default as findLastIndex } from "lodash/fp/findLastIndex";
export { default as reverse } from "lodash/fp/reverse";
export { default as indexOf } from "lodash/fp/indexOf";
export { default as flatMap } from "lodash/fp/flatMap";
export { default as isEqual } from "lodash/fp/isEqual";

export { default as clamp } from "lodash/fp/clamp";

export { default as split } from "lodash/fp/split";
export { default as trim } from "lodash/fp/trim";
export { default as trimEnd } from "lodash/fp/trimEnd";
export { default as trimStart } from "lodash/fp/trimStart";

export { default as endsWith } from "lodash/fp/endsWith";
export { default as startsWith } from "lodash/fp/startsWith";

export { default as slice } from "lodash/fp/slice";

// renames
export { default as flat } from "lodash/fp/flatten";
export { default as toUpperCase } from "lodash/fp/toUpper";
export { default as toLowerCase } from "lodash/fp/toLower";

export * from "./entries";
export * from "./some-every";
export * from "./filter-remove";
export * from "./join-split";
export * from "./key-by";
export * from "./assign";
export * from "./each-map";
export * from "./pick-omit";
export * from "./concat-push";
export * from "./reduce";
export * from "./filter-remove";
export * from "./size";
export * from "./some-every";
export * from "./update-entries";
export * from "./sort";
export * from "./uniq";
export * from "./extract-exclude";
// groupBy
// find, findLast, findIndex, findLastIndex, indexOf
// flatMap, flat
// slice
// reverse
// toArray?
// mapValues ?

// simplify API ?
// _(arr, some(is(element)))  ===
// _(arr, includes(el)) // includes support string + object
