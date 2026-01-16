import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: { port: 3003 },
  build: { target: "esnext" },
  plugins: [
    federation({
      name: "admin",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx",
      },
      shared: ["react", "react-dom"],
    }),
    react(),
  ],
});
