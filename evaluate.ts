import {
  Grammar,
  Parser,
} from "https://deno.land/x/nearley@2.19.7-deno/mod.ts";
import myCompiledGrammar from "./grammar.ts";

export const evaluate = (expression: string) => {
  const grammar = Grammar.fromCompiled(myCompiledGrammar);
  const parser = new Parser(grammar, { keepHistory: true });

  parser.feed(expression);

  const resultSet = new Set(parser.results);

  if (resultSet.size !== 1) {
    throw new Error("Ambiguous grammar!");
  }

  return parser.results[0];
};
