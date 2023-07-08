import { h, jsx, serve } from "https://deno.land/x/sift@0.4.3/mod.ts";
import React, { useState } from "react";

export type Args = { [argname: string]: boolean };
export type Value = string | boolean | undefined;

export type UnaryOperator = "NOT";
export type BinaryOperator = "AND" | "OR";

export type BinaryExpression = {
  left: Expression;
  operator: BinaryOperator;
  right: Expression;
};

export type UnaryExpression = { value: Expression; operator: UnaryOperator };
export type Expression = BinaryExpression | UnaryExpression | Value;

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

export default function App() {
  const [expression, setExpression] = useState<string>(
    '{\n  "value": false,\n  "operator": "NOT" \n}',
  );
  const [args, setArgs] = useState<string>("{}");
  const [result, setResult] = useState(undefined);

  return (
    <div>
      <div>
        <div>expression</div>
        <textarea
          type="text"
          onChange={(e) => setExpression(e.target.value)}
          style={{ width: "600px", height: "200px" }}
          value={expression}
        />
      </div>
      <div>
        <div>args</div>
        <textarea
          type="text"
          onChange={(e) => setArgs(e.target.value)}
          style={{ width: "300px", height: "200px" }}
          value={args}
        />
      </div>
      <div>
        <button
          onClick={() => {
            const parsedExpression = JSON.parse(expression) as Expression;
            const parsedArgs = JSON.parse(args) as Args;
            const res = evaluate(parsedExpression, parsedArgs);
            console.log(JSON.stringify(res));
            // setResult(res !== undefined ? JSON.stringify(res): "undefined");
            setResult(JSON.stringify(res));
          }}
        >
          evaluate
        </button>
        {result}
      </div>
    </div>
  );
}
