import { evaluate } from "./interpreter2.ts";

const assert = (condition: boolean, message?: string) => {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
  console.log("succeded");
};

const test = () => {
  assert(
    evaluate(
      {
        value: {
          operator: "NOT",
          value: { operator: "NOT", value: "test" },
        },
        operator: "NOT",
      },
      {},
    ) == undefined,
    "not(not(not({test:undefined})))==undefined"
  );

  assert(
    evaluate(
      {
        value: {
          operator: "NOT",
          value: { operator: "NOT", value: "test" },
        },
        operator: "NOT",
      },
      { test: false },
    ) === true,
    'NOT(NOT(NOT({test:false})))==true'
  );

  assert(
    evaluate(
      {
        operator: "NOT",
        value: {
          left: "test",
          operator: "AND",
          right: true,
        },
      },
      { test: true },
    ) === false,
    'NOT({test: true} AND true)===false'
  );

  assert(
    evaluate(
      {
        operator: "NOT",
        value: {
          left: "test",
          operator: "AND",
          right: true,
        },
      },
      {},
    ) == undefined,
    'NOT({test: undefined} AND true)==undefined'
  );

  assert(
    evaluate(
      {
        left: "test",
        operator: "OR",
        right: true
      },
      { test: false },
    ) === true,
    '{test: true} OR true===true'
  );

  assert(
    evaluate(
      {
        left: "test",
        operator: "OR",
        right: true
      },
      {},
    ) == true,
    '{test: undefined} OR true===true'
  );  

  assert(
    evaluate(
      {
        value: { left:false, operator:"OR", right:true},
        operator: "NOT" 
      },
      {"test":true},
    ) == true,
    'NOT({test: true} OR true)===true'
  );  
};

test();
