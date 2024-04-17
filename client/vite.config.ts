import dotenv from "dotenv";
import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
dotenv.config();
export default defineConfig({
  plugins: [react()],
  // define process env
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
