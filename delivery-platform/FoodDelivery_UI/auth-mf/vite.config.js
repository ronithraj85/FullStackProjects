import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 3001, // 🔥 REQUIRED
  },
  plugins: [
    react(),
    federation({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
  },
});
