import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // eslint-disable-next-line
  root: resolve(__dirname, "src"),
  build: {
    // eslint-disable-next-line
    outDir: resolve(__dirname, "dist"),
  },
});
