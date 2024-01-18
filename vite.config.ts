import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [react(), typescript()],
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
});
