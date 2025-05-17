import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "./plugins/handlebars";

const routes = [
  "index",
  "signup",
  "profile",
  "chat",
  "settings",
  "password",
  "404",
  "500",
];

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: routes.map((route) => resolve(__dirname, `src/${route}.html`)),
    },
  },
  plugins: [handlebars()],
});
