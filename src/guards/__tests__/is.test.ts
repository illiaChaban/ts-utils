import { it, describe } from "vitest";
import { is, isNot } from "../is";
import { _ } from "../../fn-utils";

describe(is.name, () => {
  it("should work as type guard", () => {
    const isName = is("john", "lee");
    const name: string = "hello";
    if (isName(name)) {
      name satisfies "john" | "lee";
    }

    const v = "else" as "hi" | "else";
    if (is("hi", "hello")(v)) {
      v satisfies "hi";
    }

    if (_(v, is("hi"))) {
      v satisfies "hi";
    }

    // @ts-expect-error
    _(v, is("unknown"));
  });
});

describe(isNot.name, () => {
  it("should work as type guard", () => {
    const isName = isNot("john", "lee");
    const name: "hello" | "john" = "hello";
    if (isName(name)) {
      name satisfies "hello";
    }

    const v = "else" as "hi" | "hello" | "else";
    if (isNot("hi", "hello")(v)) {
      v satisfies "else";
    }

    if (_(v, isNot("hi"))) {
      v satisfies "else" | "hello";
    }

    // @ts-expect-error
    _(v, isNot("unknown"));
  });
});
