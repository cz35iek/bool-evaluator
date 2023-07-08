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