import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default ({ mode }) => {
  
  // eslint-disable-next-line no-undef
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  
  return defineConfig({
  // eslint-disable-next-line
  root: resolve(__dirname, "src"),
  build: {
    // eslint-disable-next-line
    outDir: resolve(__dirname, "dist"),
  },
});
}
