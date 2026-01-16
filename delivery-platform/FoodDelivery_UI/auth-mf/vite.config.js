import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    target: "esnext", // 🔥 REQUIRED for module federation
  },
  plugins: [
    federation({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "18.2.0" },
        "react-router-dom": { singleton: true },
      },
    }),
    react(),
  ],
});
