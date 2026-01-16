import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 5173, // 🔥 REQUIRED
    strictPort: true, // fail if port is occupied
  },
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        auth: "http://localhost:3001/assets/remoteEntry.js",
        order: "http://localhost:3002/assets/remoteEntry.js",
        admin: "http://localhost:3003/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
  },
});
