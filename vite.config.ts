import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Alleen importeren als dev in Replit
const isReplitDev = process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined;

export default defineConfig({
  plugins: [
    react(),
    // Replit plugins dynamisch alleen in dev
    ...(isReplitDev
      ? [
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require("@replit/vite-plugin-cartographer").cartographer(),
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require("@replit/vite-plugin-dev-banner").devBanner(),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  css: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
});
