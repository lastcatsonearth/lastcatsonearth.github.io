import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  base: "/",
  // Build time, used by useReleaseCountdown so pre-rendered pages of past releases already show the player.
  define: { __BUILD_TIME__: JSON.stringify(Date.now()) },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});