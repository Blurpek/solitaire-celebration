import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    outExtension({ format }) {
      return { js: format === "esm" ? ".mjs" : ".cjs" };
    },
    dts: true,
    sourcemap: true,
    clean: true,
    minify: true,
    external: ["react"],
    loader: {
      ".png": "dataurl",
    },
  },

  {
    entry: {
      index: "src/SolitaireCelebration.ts",
    },
    format: ["iife"],
    globalName: "SolitaireCelebration",
    sourcemap: true,
    minify: true,
    clean: false,
    splitting: false,
    loader: { ".png": "dataurl" },
    external: [],
    outExtension: () => ({
      js: ".iife.js",
    }),
  },
]);
