import { h, jsx, serve } from "https://deno.land/x/sift@0.4.3/mod.ts";

const App = () => (
  <div>
    <h1>Hello world!</h1>
    <input onChange={() => console.log("asd")} />
    <input type="button" onClick={() => console.log("asd")} />
  </div>
);

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
);

serve({
  "/": () => jsx(<App />),
  404: () => jsx(<NotFound />, { status: 404 }),
});
