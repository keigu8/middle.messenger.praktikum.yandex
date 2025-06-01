import { defineConfig } from "vite";
import { resolve } from "path";

const routes = [
  "index",
  "login",
  "signup",
  "profile",
  "chat",
  "settings",
  "password",
  "404",
  "500",
];

export default defineConfig({
  // eslint-disable-next-line
  root: resolve(__dirname, "src"),
  build: {
    // eslint-disable-next-line
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: routes.map((route) => resolve(__dirname, `src/${route}.html`)),
    },
  },
});
