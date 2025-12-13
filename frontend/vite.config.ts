import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  preview: {
    port: 9000,
    strictPort: true,
  },
  server: {
    port: 9000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:9000",
  },
});
