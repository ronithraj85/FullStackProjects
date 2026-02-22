import React, { Suspense, useState, lazy } from "react";

// Lazy-load remote MFEs via Module Federation
const Header = lazy(() => import("mfe_header/Header"));
const SearchBar = lazy(() => import("mfe_search/SearchBar"));
const FlightList = lazy(() => import("mfe_flights/FlightList"));
const HotelList = lazy(() => import("mfe_hotels/HotelList"));
const Offers = lazy(() => import("mfe_offers/Offers"));

function MFELoader({ children, name }) {
  return (
    <Suspense fallback={<LoadingFallback name={name} />}>
      <ErrorBoundary name={name}>{children}</ErrorBoundary>
    </Suspense>
  );
}

function LoadingFallback({ name }) {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        background: "#fff",
        borderRadius: "12px",
        margin: "20px",
        color: "#666",
        fontSize: "14px",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
      Loading {name || "module"}...
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "30px",
            background: "#fff5f5",
            border: "2px dashed #f5c6cb",
            borderRadius: "12px",
            margin: "20px",
            textAlign: "center",
            color: "#721c24",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>⚠️</div>
          <strong>{this.props.name} MFE failed to load</strong>
          <p style={{ fontSize: "13px", marginTop: "8px", color: "#999" }}>
            Make sure this micro-frontend is running on its port.
          </p>
          <code style={{ fontSize: "11px", color: "#e94560" }}>
            {this.state.error?.message}
          </code>
        </div>
      );
    }
    return this.props.children;
  }
}

const tabs = {
  flights: { label: "✈️ Flights", component: (p) => <FlightList {...p} /> },
  hotels: { label: "🏨 Hotels", component: (p) => <HotelList {...p} /> },
  offers: { label: "🎫 Offers", component: (p) => <Offers {...p} /> },
};

export default function App() {
  const [activeTab, setActiveTab] = useState("flights");

  const handleTabChange = (tab) => {
    if (tabs[tab]) setActiveTab(tab);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8" }}>
      {/* HEADER MFE */}
      <MFELoader name="Header">
        <Header onTabChange={handleTabChange} />
      </MFELoader>

      {/* SEARCH MFE */}
      <MFELoader name="Search">
        <SearchBar
          activeTab={activeTab}
          onSearch={(data) => console.log("Search:", data)}
        />
      </MFELoader>

      {/* CONTENT MFEs - conditionally rendered based on active tab */}
      <div style={{ padding: "0" }}>
        {activeTab === "flights" && (
          <MFELoader name="Flights">
            <FlightList />
          </MFELoader>
        )}
        {activeTab === "hotels" && (
          <MFELoader name="Hotels">
            <HotelList />
          </MFELoader>
        )}
        {activeTab === "offers" && (
          <MFELoader name="Offers">
            <Offers />
          </MFELoader>
        )}
        {!["flights", "hotels", "offers"].includes(activeTab) && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#999",
              fontSize: "16px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚧</div>
            <strong>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </strong>{" "}
            module coming soon!
          </div>
        )}
      </div>

      {/* MFE STATUS PANEL */}
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          background: "#1a1a2e",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "11px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          zIndex: 9999,
          minWidth: "200px",
        }}
      >
        <div
          style={{ fontWeight: "700", marginBottom: "8px", color: "#f5a623" }}
        >
          🔌 MFE Status
        </div>
        {[
          { name: "Header", port: 3001 },
          { name: "Search", port: 3002 },
          { name: "Flights", port: 3003 },
          { name: "Hotels", port: 3004 },
          { name: "Offers", port: 3005 },
          { name: "Shell", port: 3006 },
        ].map((mfe) => (
          <div
            key={mfe.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <span>{mfe.name}</span>
            <span style={{ color: "#4caf50" }}>● :{mfe.port}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
