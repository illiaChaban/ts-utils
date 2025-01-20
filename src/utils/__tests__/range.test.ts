import { it, describe, expect } from "vitest";
import { range } from "../range";
import { _ } from "../../fn-utils";

describe(range.name, () => {
  it("should create an array of indexes with one arg", () => {
    expect(range(0)).toEqual([]);
    expect(range(3)).toEqual([0, 1, 2]);
  });

  it("should not create an array with negative args", () => {
    expect(range(-1)).toEqual([]);
    expect(range(-7)).toEqual([]);
    expect(range(2, -1)).toEqual([]);
  });

  it("should create an array of indexes with 2 args", () => {
    expect(range(2, 2)).toEqual([]);
    expect(range(0, 4)).toEqual([0, 1, 2, 3]);
    expect(range(2, 5)).toEqual([2, 3, 4]);
    expect(range(-1, 2)).toEqual([-1, 0, 1]);
  });
  // it("should work as type guard", () => {
  //   const isName = is("john", "lee");
  //   const name: string = "hello";
  //   if (isName(name)) {
  //     name satisfies "john" | "lee";
  //   }

  //   const v = "else" as "hi" | "else";
  //   if (is("hi", "hello")(v)) {
  //     v satisfies "hi";
  //   }

  //   if (_(v, is("hi"))) {
  //     v satisfies "hi";
  //   }

  //   // @ts-expect-error
  //   _(v, is("unknown"));
  // });
});

// describe(isNot.name, () => {
//   it("should work as type guard", () => {
//     const isName = isNot("john", "lee");
//     const name: "hello" | "john" = "hello";
//     if (isName(name)) {
//       name satisfies "hello";
//     }

//     const v = "else" as "hi" | "hello" | "else";
//     if (isNot("hi", "hello")(v)) {
//       v satisfies "else";
//     }

//     if (_(v, isNot("hi"))) {
//       v satisfies "else" | "hello";
//     }

//     // @ts-expect-error
//     _(v, isNot("unknown"));
//   });
// });
