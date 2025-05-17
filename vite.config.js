import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import context from "./src/context";

const pages = ["login", "signup", "profile", "chat", "settings", "404", "500"];

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  plugins: [
    handlebars({
      partialDirectory: pages
        .map((page) => resolve(__dirname, `src/pages/${page}`))
        .concat(resolve(__dirname, "src/components")),
      context,
    }),
  ],
});
