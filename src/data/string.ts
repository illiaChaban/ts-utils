import { prototypeMethod } from "./_internal";

/** Removes the leading and trailing white space and line terminator characters from a string. */
export const trim = prototypeMethod("trim");
/** Removes the trailing white space and line terminator characters from a string. */
export const trimEnd = prototypeMethod("trimEnd");
/** Removes the leading white space and line terminator characters from a string. */
export const trimStart = prototypeMethod("trimStart");
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * endPosition – length(this). Otherwise returns false.
 */
export const endsWith = prototypeMethod("endsWith");
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * position. Otherwise returns false.
 */
export const startsWith = prototypeMethod("startsWith");
/** Converts all the alphabetic characters in a string to lowercase. */
export const toLowerCase = prototypeMethod("toLowerCase");
/** Converts all the alphabetic characters in a string to uppercase. */
export const toUpperCase = prototypeMethod("toUpperCase");

/**
 * A regular expression method that replaces matched substrings of a string. Called by the
 * String.prototype.replace method.
 */
export const replace = prototypeMethod("replace");
/** Replace all instances of a substring in a string, using a regular expression or search string. */
export const replaceAll = prototypeMethod("replaceAll") as {
  /**
   * Replace all instances of a substring in a string, using a regular expression or search string.
   * @param searchValue A string to search for.
   * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
   */
  (searchValue: string | RegExp, replaceValue: string): (v: string) => string;

  /**
   * Replace all instances of a substring in a string, using a regular expression or search string.
   * @param searchValue A string to search for.
   * @param replacer A function that returns the replacement text.
   */
  (
    searchValue: string | RegExp,
    replacer: (substring: string, ...args: any[]) => string
  ): (v: string) => string;
};
