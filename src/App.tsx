import React from "react";
// import { match, __, not, select, when } from "ts-pattern";

type Args = { [argname: string]: boolean };

type Operation =
  | { value: string | boolean; operator: "NOT" }
  | { operation: Operation; operator: "NOT" }
  | {
      values?: (string | boolean)[];
      operations?: Operation[];
      operator: "OR" | "AND";
    };

/* ...todo:
a system for defining logical operations 
(not, and, or... more if you want) that can be passed:
 - selected args by name: (X and Y)
 - constant values not dependent on args: (true and X)
 - other operations: ((X and Y) or Z) 
 */

function evaluateOperation(operation: Operation, args: Args): boolean {
  /* ...todo: implement an evaluator for your operations, 
  given some args */

  console.log(operation);

  switch (operation.operator) {
    case "NOT":
      if ("value" in operation) {
        return !(typeof operation.value === "string"
          ? args[operation.value]
          : operation.value);
      } else {
        return !evaluateOperation(operation.operation, args);
      }
    case "OR":
      return (
        !operation.operations ||
        operation.operations
          .map((op) => evaluateOperation(op, args))
          .reduceRight(
            (acc, val) => acc || (typeof val === "string" ? args[val] : val)
          ) ||
        !operation.values ||
        operation.values
          .map((v) => (typeof v === "string" ? args[v] : v))
          .reduceRight((acc, curr) => acc || curr)
      );
    case "AND":
      return (
        !operation.operations ||
        (operation.operations
          .map((op) => evaluateOperation(op, args))
          .reduceRight(
            (acc, val) => acc && (typeof val === "string" ? args[val] : val)
          ) &&
          (!operation.values ||
            operation.values
              .map((v) => (typeof v === "string" ? args[v] : v))
              .reduceRight((acc, curr) => acc && curr)))
      );
  }

  //   const reducer = (op: Operation): boolean =>
  //     match<Operation, boolean>(op)
  //       .with({ operator: "NOT", kind: "simple" }, (op) => {
  //         console.log("not");

  //         return !op.value;
  //       })
  //       .with({ operator: "NOT", kind: "nested" }, (op) => {
  //         console.log("nested not");
  //         return !evaluateOperation(op.operation, args);
  //       })
  //   .with({ operator: "OR", firstOperation: undefined }, (op) => {
  //     return !!op.leftValue || !!op.rightOperation;
  //   })
  //   .with({ operator: "OR", leftValue: undefined }, (op) => {
  //     return (
  //       evaluateOperation(op.leftOperation, args) ||
  //       evaluateOperation(op.secondOperation, args)
  //     );
  //   })
  //   .with({ operator: "AND", leftOperation: undefined }, (op) => {
  //     return !!op.leftValue && !!op.rightOperation;
  //   })
  //   .with({ operator: "AND", leftValue: undefined }, (op) => {
  //     return (
  //       evaluateOperation(op.leftOperation, args) &&
  //       evaluateOperation(op.secondOperation, args)
  //     );
  //   })
  //   .with({ operator: "OR" }, (op) => {
  //     return (
  //       evaluateOperation(op.firstOperation, args) ||
  //       evaluateOperation(op.secondOperation, args)
  //     );
  //   })
  //   .with(__, (op) => {
  //     console.log("wildcard", operation);
  //     return true;
  //   })
  //   .exhaustive();

  //   return reducer(operation);
}

function OperationBuilder(props: {
  value: Operation;
  onChange: (value: Operation) => void;
}): JSX.Element {
  return <></>;
  /* ...todo: an ugly gui for creating operations */
}

export default function App() {
  const args: Args = { test: false, key: true };

  const notnotnot: Operation = {
    operation: {
      operation: { value: "test", operator: "NOT" },
      operator: "NOT",
    },
    value: false,
    operator: "NOT",
  };

  const andnot: Operation = {
    operator: "NOT",
    operation: {
      operator: "AND",
      values: [true, true, true],
      operations: [
        { operator: "NOT", value: false },
        { operator: "NOT", value: false },
        { operator: "NOT", value: false },
        { operator: "NOT", value: false },
        { operator: "NOT", value: false },
        { operator: "NOT", value: false },
      ],
    },
  };

  console.log("notnotnot", evaluateOperation(notnotnot, {}));
  console.log("andnot", evaluateOperation(andnot, args));

  return (
    <div>
      {/* todo: use <OperationBuilder> and have an interface
      for entering arguments and seeing the result */}
    </div>
  );
}
