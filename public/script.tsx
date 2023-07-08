import React, { useState } from "https://esm.sh/react@17.0.2";
import ReactDOM from "https://esm.sh/react-dom@17.0.2";
import { evaluate } from "../evaluate.ts";

function App() {
  const [expression, setExpression] = useState<string>(
    "1OR1",
  );
  const [args, setArgs] = useState<string>("{}");
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);

  const handleExpressionChange = (
    e: any,
  ) => {
    setExpression(e.target.value);

    let result = "undefined";
    setIsError(false);

    try {
      result = JSON.stringify(evaluate(e.target.value));
    } catch (error) {
      setIsError(true);
    }

    setResult(result);
  };

  return (
    <div>
      <div>
        <div>expression</div>
        <textarea
          onChange={(e) => handleExpressionChange(e)}
          style={{
            width: "600px",
            height: "40px",
            border: isError ? "1px solid red" : "1px solid",
            outline: "none"
          }}
          value={expression}
        />
      </div>
      <div>
        <div>args</div>
        <textarea
          onChange={(e) => setArgs(e.target.value)}
          style={{ width: "300px", height: "200px", outline:"none" }}
          value={args}
        />
      </div>
      <div>
        {result}
      </div>
    </div>
  );
}

function main() {
  ReactDOM.render(React.createElement(App), document.querySelector("#main"));
}

addEventListener("DOMContentLoaded", () => {
  main();
});
