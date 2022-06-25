/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

const fileName = {
  es: "react-infinite-scroll-tiny.mjs",
  cjs: "react-infinite-scroll-tiny.cjs",
  iife: "react-infinite-scroll-tiny.iife.js",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  base: "./",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "react-infinite-scroll-tiny",
      formats: ["es", "cjs", "iife"],
      fileName: (format) => fileName[format],
    },
    rollupOptions: {
      external: ["react"],
      output: {
        extend: true,
      },
    },
  },
});
