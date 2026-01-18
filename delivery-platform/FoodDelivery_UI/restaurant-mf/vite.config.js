import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    port: 3004,
  },
  build: {
    target: "esnext",
  },
  plugins: [
    federation({
      name: "restaurant",
      filename: "remoteEntry.js",
      exposes: {
        "./Restaurants": "./src/pages/Restaurants.jsx",
        "./RestaurantDetails": "./src/pages/RestaurantDetails.jsx",
        "./Cart": "./src/pages/Cart.jsx",

        // 🔥 OWNER PAGES
        "./OwnerDashboard": "./src/pages/owner/OwnerDashboard.jsx",
        "./AddRestaurant": "./src/pages/owner/AddRestaurant.jsx",
        "./ManageMenu": "./src/pages/owner/ManageMenu.jsx",
        "./AddMenuItem": "./src/pages/owner/AddMenuItem.jsx",
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
