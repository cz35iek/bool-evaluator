import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.129.0/testing/asserts.ts";
import { evaluate } from "./evaluate.ts";

Deno.test("test basic expressions", function (): void {
  assertEquals(evaluate("1"), true);
  assertEquals(evaluate("0OR1"), true);
  assertEquals(evaluate("0AND1"), false);
  assertEquals(evaluate("NOT1"), false);
  assertThrows(() => evaluate("NOT11"));
  assertThrows(() => evaluate("ANDAND"));
});

Deno.test("test parenthesis", function (): void {
  assertEquals(evaluate("(((((1)))))"), true);
  assertEquals(evaluate("NOT(1AND0OR1)"), false);
  assertEquals(evaluate("(NOT(1AND0OR1))"), false);
  assertThrows(() => evaluate("()"));
  assertThrows(() => evaluate(")NOT1("));
  assertThrows(() => evaluate("(NOT)(1AND0OR1)"));
});

Deno.test("test complex expressions", function (): void {
  assertEquals(evaluate("1OR1AND1"), true);
  assertEquals(evaluate("NOTNOTNOTNOTNOT1"), false);
  assertEquals(evaluate("NOT((1AND0)OR1)"), false);
});
