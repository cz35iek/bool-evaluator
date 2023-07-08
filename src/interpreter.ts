import { Args, Expression, Value } from "./grammar.ts";

export const evaluate = (e: Expression, args: Args): boolean | undefined => {
  console.log(
    `Evaluating expresison ${JSON.stringify(e)} with arguments ${
      JSON.stringify(
        args,
      )
    }`,
  );

  if (typeof e === "string") {
    return args[e];
  }
  if (typeof e === "boolean") {
    return e;
  }
  if (!e) {
    return undefined;
  }

  const not = (value?: boolean) => value != undefined ? !value : undefined;

  switch (e.operator) {
    case "NOT":
      return not(evaluate(e.value, args));
    case "AND":
      return evaluate(e.left, args) && evaluate(e.right, args);
    case "OR":
      return evaluate(e.left, args) || evaluate(e.right, args);
  }
};
