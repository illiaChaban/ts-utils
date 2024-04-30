import { _ } from "../../fn-utils";
import { is, InferIs } from "../is";
import { isNumber } from "../is-type";
import { matches } from "../matches";

const isTypeX = matches({ type: is("x", "x2"), two: isNumber });

declare const x: { type: "x"; two: 5 } | { type: "hi"; three: string };
if (isTypeX(x)) {
  x satisfies { type: "x"; two: 5 };
}

if (_(x, matches({ type: is("hi") }))) {
  x satisfies { type: "hi"; three: string };
}

declare const x1: { type: "x" } | { type: "hi" } | { type: "hello" };
if (_(x1, matches({ type: is("x", "hi") }))) {
  x1 satisfies
    | {
        type: "x";
      }
    | {
        type: "hi";
      };
}

type TypeX = InferIs<typeof isTypeX>;
declare const typeX: TypeX;

typeX satisfies {
  type: "x" | "x2";
  two: number;
};

const deepCheck = matches({ one: matches({ two: is("hello") }) });

declare const deep:
  | { three: "hi" }
  | { four: { six: "one" } }
  | { one: { two: string } }
  | { one: { two: "hello" }; another: "here" }
  | { one: { two: "hello"; another: "one" } };

if (_(deep, deepCheck)) {
  deep satisfies
    | {
        one: {
          two: "hello";
        };
        another: "here";
      }
    | {
        one: {
          two: "hello";
          another: "one";
        };
      };
}
