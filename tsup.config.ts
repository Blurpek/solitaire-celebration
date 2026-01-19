// import { defineConfig } from "tsup";

// export default defineConfig({
//   entry: ["src/index.ts"],
//   format: ["esm", "cjs"],
//   outExtension({ format }) {
//     return { js: format === "esm" ? ".mjs" : ".cjs" };
//   },
//   dts: true,
//   sourcemap: true,
//   clean: true,
//   external: ["react"],
//   loader: {
//     ".png": "dataurl", // <--- inline as base64
//   },
// });
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm", "iife"], // include esm explicitly
  globalName: "SolitaireCelebrationLib", // for iife
  dts: true,
  sourcemap: true,
  clean: true,
  loader: { ".png": "dataurl" },
  external: ["react", "react-dom"], // React as peer dependency
  splitting: false, // for single entry output
  outExtension: ({ format }) => ({ js: format === "esm" ? ".mjs" : ".js" }),
});
