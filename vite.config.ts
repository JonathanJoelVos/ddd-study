import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  //configura para que o vitest entenda o alias path "@/"
  plugins: [tsConfigPaths()],
  // torna global as funções e não precisamos das import {describe } from "vite" pro exemplo
  test: {
    globals: true,
  },
});
