import { serve, serveStatic } from "https://deno.land/x/sift@0.4.3/mod.ts";

serve({
  // You can serve a single file.
  "/": serveStatic("public/index.html", { baseUrl: import.meta.url }),
  // Or a directory of files.
  "/public/:filename+": serveStatic("public", { baseUrl: import.meta.url }),
});