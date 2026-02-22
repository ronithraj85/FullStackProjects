# ✈️ MakeMyTrip Clone — Micro Frontend (MFE) Architecture

A production-inspired **MakeMyTrip clone** built using **Webpack Module Federation** — the gold standard for Micro Frontend architecture in React. This project demonstrates real-world MFE patterns including independent deployability, shared dependencies, error isolation, and shell orchestration.

---

## 📁 Project Structure

```
mmt-mfe/
├── package.json              ← Root monorepo (concurrently runner)
├── mfe-header/               ← Header MFE  (port 3001)
├── mfe-search/               ← Search MFE  (port 3002)
├── mfe-flights/              ← Flights MFE (port 3003)
├── mfe-hotels/               ← Hotels MFE  (port 3004)
├── mfe-offers/               ← Offers MFE  (port 3005)
└── shell-app/                ← Shell/Host   (port 3000)
```

Each MFE is a **fully independent React application** — it can run standalone OR be consumed by the Shell.

---

## 🚀 Steps to Run

### Prerequisites
- **Node.js** v16+ (v18+ recommended)
- **npm** v8+

### Step 1 — Install all dependencies
```bash
cd mmt-mfe
npm run install:all
```
This installs the root `concurrently` package + all 6 app dependencies.

### Step 2 — Start everything
```bash
npm start
```
This launches all 6 apps simultaneously with colored terminal output.

### Step 3 — Open the Shell
```
http://localhost:3000
```

### Individual MFE URLs (standalone)
| MFE | URL |
|-----|-----|
| Shell (full app) | http://localhost:3000 |
| Header | http://localhost:3001 |
| Search | http://localhost:3002 |
| Flights | http://localhost:3003 |
| Hotels | http://localhost:3004 |
| Offers | http://localhost:3005 |

---

## 🏗️ Architecture Deep Dive

### What is Micro Frontend (MFE)?
MFE is an architectural pattern where a frontend app is split into **independently developed, tested, and deployed** pieces — each owned by a separate team. It's the frontend equivalent of microservices.

```
Without MFE:                    With MFE:
┌──────────────────────┐        ┌───────────────────────────────────┐
│   Monolithic React   │        │           Shell App               │
│  ┌────────────────┐  │        │  ┌────────┐ ┌────────┐ ┌───────┐ │
│  │    Header      │  │        │  │ Header │ │ Search │ │Flights│ │
│  │    Search      │  │   →    │  │  MFE   │ │  MFE   │ │  MFE  │ │
│  │    Flights     │  │        │  └────────┘ └────────┘ └───────┘ │
│  │    Hotels      │  │        │  ┌────────┐ ┌────────┐           │
│  │    Offers      │  │        │  │ Hotels │ │ Offers │           │
│  └────────────────┘  │        │  │  MFE   │ │  MFE   │           │
└──────────────────────┘        │  └────────┘ └────────┘           │
  One giant bundle              └───────────────────────────────────┘
  One team                        6 independent apps, 6 teams
  One deployment                  6 independent deployments
```

---

### Webpack Module Federation (The Engine)

Module Federation is a **Webpack 5 plugin** that allows one JavaScript app to **dynamically load code from another app at runtime** — without sharing the source code at build time.

#### How it works:

**Step 1 — Remote (MFE) exposes a component:**
```js
// mfe-flights/webpack.config.js
new ModuleFederationPlugin({
  name: "mfe_flights",         // Global variable name
  filename: "remoteEntry.js",  // Manifest file served at /remoteEntry.js
  exposes: {
    "./FlightList": "./src/components/FlightList"  // What to share
  },
  shared: { react: { singleton: true } }           // Don't duplicate React
})
```
This produces a `remoteEntry.js` at `http://localhost:3003/remoteEntry.js`. It's a **manifest** that tells consumers where to find the chunks.

**Step 2 — Shell (Host) registers remotes:**
```js
// shell-app/webpack.config.js
new ModuleFederationPlugin({
  name: "shell",
  remotes: {
    mfe_flights: "mfe_flights@http://localhost:3003/remoteEntry.js",
    // FORMAT: "globalVarName@remoteEntryUrl"
  },
  shared: { react: { singleton: true } }
})
```

**Step 3 — Shell dynamically imports the component:**
```jsx
// shell-app/src/App.jsx
const FlightList = lazy(() => import("mfe_flights/FlightList"));
// ↑ This is NOT a local import — Webpack rewires it to fetch from port 3003
```

At runtime, when React renders `<FlightList />`, Webpack:
1. Checks if `mfe_flights` chunks are already loaded
2. If not, fetches `http://localhost:3003/remoteEntry.js`
3. Downloads the component chunk on-demand
4. Renders it inside the Shell DOM

---

### The `index.js` → `bootstrap.js` Pattern

Every MFE has this exact pattern:

```js
// src/index.js
import("./bootstrap");  // ← Dynamic import (async)
```

```js
// src/bootstrap.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

**Why not import bootstrap directly?**

Module Federation needs to **negotiate shared dependencies** (like React) before executing any code. The async `import()` in `index.js` gives Webpack a "tick" to:
1. Load the remote's `remoteEntry.js`
2. Check what versions of shared libs are available
3. Decide whether to reuse the host's React or load a new copy

If you skip this and write `import React from 'react'` at the top level of `index.js`, the synchronous import runs **before** Module Federation can negotiate shared modules — causing version mismatches or duplicate React instances.

---

### Shared Dependencies & Singletons

```js
shared: {
  react: { singleton: true, requiredVersion: "^18.2.0" },
  "react-dom": { singleton: true, requiredVersion: "^18.2.0" }
}
```

`singleton: true` means: **"Only one copy of React should ever exist in the browser, no matter how many MFEs load."**

Without this:
- Shell loads React 18.2
- mfe-flights loads React 18.2  
- mfe-hotels loads React 18.2
- **3 copies of React** → hooks fail, context breaks, 3x bundle size

With `singleton: true`:
- The **highest compatible version** is loaded once
- All MFEs share the same React instance
- Hooks work correctly across MFE boundaries

---

### Error Boundaries & Graceful Degradation

Each MFE is wrapped in an `ErrorBoundary`:

```jsx
// shell-app/src/App.jsx
<MFELoader name="Flights">
  <FlightList />
</MFELoader>
```

If `mfe-flights` crashes or is offline:
- Only the Flights section shows an error
- Header, Search, Hotels, Offers continue working
- The shell never crashes

This is the **fault isolation** superpower of MFE. In a monolith, one broken component can white-screen the entire app.

---

## 🔌 Port Map

| App | Port | Remote Variable | exposes |
|-----|------|-----------------|---------|
| shell-app | 3000 | (host) | — |
| mfe-header | 3001 | mfe_header | `./Header` |
| mfe-search | 3002 | mfe_search | `./SearchBar` |
| mfe-flights | 3003 | mfe_flights | `./FlightList` |
| mfe-hotels | 3004 | mfe_hotels | `./HotelList` |
| mfe-offers | 3005 | mfe_offers | `./Offers` |

---

## 🔄 Communication Between MFEs

MFEs communicate via **props passed through the Shell**:

```jsx
// Shell passes tab change down to SearchBar
<Header onTabChange={handleTabChange} />
<SearchBar activeTab={activeTab} />
```

For more complex cross-MFE communication, patterns include:
- **Custom Events** (window.dispatchEvent) — decoupled, no shared state
- **Shared State Library** (Zustand/Redux in a shared MFE) — more structured
- **URL / Query Params** — best for navigation-driven state

---

## 📦 Build for Production

Build all MFEs independently:
```bash
npm run build
```

Each MFE outputs to its own `dist/` folder and can be deployed to **separate servers/CDNs**:
```
mfe-header/dist/  → cdn.example.com/header/
mfe-search/dist/  → cdn.example.com/search/
mfe-flights/dist/ → cdn.example.com/flights/
shell-app/dist/   → www.example.com/
```

Update the `remotes` URLs in `shell-app/webpack.config.js` to point to the CDN URLs.

---

## ❓ Common MFE Interview Questions

**Q: Why use MFE instead of a monorepo?**  
A: MFEs allow **independent deployment** — Team A can ship Header changes without waiting for Team B's Flights feature. In a monorepo, everything ships together.

**Q: How does Module Federation differ from npm packages?**  
A: npm packages are resolved at **build time**. Module Federation resolves at **runtime** — so an MFE can update its bundle without the Shell needing a rebuild or redeploy.

**Q: What happens if an MFE is down?**  
A: With proper Error Boundaries, the shell shows a fallback for that section. Other MFEs continue working. This is **fault isolation**.

**Q: How do you handle CSS conflicts between MFEs?**  
A: Options include CSS Modules, CSS-in-JS (styled-components), Shadow DOM, or BEM naming conventions.

**Q: How do you share authentication state across MFEs?**  
A: Store auth token in `localStorage` or a shared cookie. Each MFE reads it independently. Or expose an `auth` MFE via Module Federation that all others import.

**Q: What is the `remoteEntry.js` file?**  
A: It's a small JavaScript manifest generated by Module Federation. It tells the host app: "here's what I expose, here's where my chunks live, here's what shared deps I need."

**Q: Why is the `singleton: true` flag important?**  
A: React uses internal globals (fiber, context, hooks). If two copies exist, hooks like `useContext` won't find the right context. `singleton: true` enforces one shared instance.

---

## 🛠️ Troubleshooting

| Error | Fix |
|-------|-----|
| `Cannot find module 'rxjs'` | Run `npm install rxjs` or delete `node_modules` and `npm install` |
| `'concurrently' is not recognized` | Run `npm install` in the root directory |
| MFE shows "failed to load" | Make sure that MFE's dev server is running on its port |
| Blank page | Check browser console for Module Federation errors; ensure all ports are running |
| React version mismatch | All MFEs must declare the same `requiredVersion` for react |
| `Shared module is not available for eager consumption` | You're missing the `index.js` → `bootstrap.js` async pattern |

---

## 🧠 Key Concepts Summary

| Concept | Description |
|---------|-------------|
| **Host/Shell** | The container app that stitches MFEs together (shell-app) |
| **Remote** | An MFE that exposes components (all other apps) |
| **remoteEntry.js** | Webpack-generated manifest file for a remote |
| **exposes** | What a remote makes available to hosts |
| **remotes** | What URLs the host uses to find remotes |
| **shared** | Dependencies shared across host and remotes (e.g. React) |
| **singleton** | Enforce only one instance of a shared dep in memory |
| **Suspense** | React's async loading wrapper for lazy MFE imports |
| **ErrorBoundary** | Catches MFE crashes and shows fallback UI |
| **bootstrap.js pattern** | Async entry point to allow Module Federation negotiation |

---

Built with ❤️ using React 18 + Webpack 5 Module Federation
