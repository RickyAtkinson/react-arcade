import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { name } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  ...(process.env.NODE_ENV === "production"
    ? { base: `/${name}/` }
    : { build: { sourcemap: true } }),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
