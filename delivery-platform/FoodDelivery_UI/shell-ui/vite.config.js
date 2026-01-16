import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    federation({
      name: "shell",
      remotes: {
        auth: "http://localhost:3001/assets/remoteEntry.js",
        order: "http://localhost:3002/assets/remoteEntry.js",
        admin: "http://localhost:3003/assets/remoteEntry.js",
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
