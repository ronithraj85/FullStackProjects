import React, { useState } from "react";

const mockFlights = [
  { id: 1, airline: "IndiGo", code: "6E-204", from: "Mumbai", to: "Delhi", dep: "06:00", arr: "08:15", duration: "2h 15m", price: 3499, stops: 0, class: "Economy", rating: 4.2 },
  { id: 2, airline: "Air India", code: "AI-101", from: "Mumbai", to: "Delhi", dep: "08:30", arr: "11:00", duration: "2h 30m", price: 4999, stops: 0, class: "Economy", rating: 4.0 },
  { id: 3, airline: "SpiceJet", code: "SG-112", from: "Mumbai", to: "Delhi", dep: "10:45", arr: "13:30", duration: "2h 45m", price: 2999, stops: 0, class: "Economy", rating: 3.8 },
  { id: 4, airline: "Vistara", code: "UK-995", from: "Mumbai", to: "Delhi", dep: "14:00", arr: "16:15", duration: "2h 15m", price: 6499, stops: 0, class: "Business", rating: 4.7 },
  { id: 5, airline: "GoFirst", code: "G8-431", from: "Mumbai", to: "Delhi", dep: "18:30", arr: "21:00", duration: "2h 30m", price: 2599, stops: 1, class: "Economy", rating: 3.5 },
  { id: 6, airline: "AirAsia", code: "I5-764", from: "Mumbai", to: "Delhi", dep: "21:00", arr: "23:30", duration: "2h 30m", price: 2299, stops: 0, class: "Economy", rating: 3.9 },
];

const airlineColors = {
  IndiGo: "#1a237e",
  "Air India": "#b71c1c",
  SpiceJet: "#e65100",
  Vistara: "#4a148c",
  GoFirst: "#1b5e20",
  AirAsia: "#c62828",
};

const s = {
  container: { padding: "20px", fontFamily: "'Segoe UI', sans-serif", background: "#f0f4f8", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  title: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e" },
  subtitle: { fontSize: "13px", color: "#666", marginTop: "4px" },
  layout: { display: "flex", gap: "20px" },
  sidebar: { width: "220px", flexShrink: 0 },
  filterCard: { background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "16px" },
  filterTitle: { fontSize: "13px", fontWeight: "700", color: "#1a1a2e", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.5px" },
  filterOption: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", cursor: "pointer", fontSize: "13px", color: "#444" },
  flightsList: { flex: 1 },
  sortBar: { background: "#fff", borderRadius: "10px", padding: "12px 16px", display: "flex", gap: "8px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  sortBtn: { padding: "7px 16px", border: "1.5px solid #e0e7ef", borderRadius: "20px", cursor: "pointer", fontSize: "12px", fontWeight: "600", background: "#fff", color: "#555", transition: "all 0.2s" },
  activeSortBtn: { background: "#e94560", color: "#fff", borderColor: "#e94560" },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    transition: "transform 0.15s, box-shadow 0.15s",
    cursor: "pointer",
    border: "2px solid transparent",
  },
  airlineBadge: { width: "48px", height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: "800", textAlign: "center", flexShrink: 0 },
  flightInfo: { flex: 1 },
  timeRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" },
  time: { fontSize: "22px", fontWeight: "800", color: "#1a1a2e" },
  route: { fontSize: "12px", color: "#999", fontWeight: "600" },
  duration: { fontSize: "12px", color: "#666", textAlign: "center", padding: "0 12px" },
  durationLine: { height: "1px", background: "#ddd", flex: 1, position: "relative" },
  stops: { fontSize: "11px", color: "#999", textAlign: "center", marginTop: "4px" },
  badge: { background: "#e8f5e9", color: "#2e7d32", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" },
  price: { textAlign: "right", minWidth: "120px" },
  priceAmount: { fontSize: "24px", fontWeight: "800", color: "#e94560" },
  priceNote: { fontSize: "11px", color: "#999", marginTop: "2px" },
  bookBtn: { background: "linear-gradient(135deg, #e94560, #c0392b)", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "13px", fontWeight: "700", marginTop: "8px", width: "100%", boxShadow: "0 4px 12px rgba(233,69,96,0.3)" },
  ratingBadge: { background: "#fff3e0", color: "#e65100", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" },
};

export default function FlightList({ searchParams }) {
  const [sortBy, setSortBy] = useState("price");
  const [selectedStops, setSelectedStops] = useState([]);
  const [bookedId, setBookedId] = useState(null);

  const filtered = mockFlights.filter(f => selectedStops.length === 0 || selectedStops.includes(f.stops));
  const sorted = [...filtered].sort((a, b) => sortBy === "price" ? a.price - b.price : sortBy === "duration" ? a.duration.localeCompare(b.duration) : b.dep.localeCompare(a.dep));

  const toggleStop = (s) => setSelectedStops(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div>
          <div style={s.title}>✈️ Mumbai → Delhi Flights</div>
          <div style={s.subtitle}>{sorted.length} flights found · Tue, 25 Feb 2025</div>
        </div>
      </div>
      <div style={s.layout}>
        <div style={s.sidebar}>
          <div style={s.filterCard}>
            <div style={s.filterTitle}>Stops</div>
            {[0, 1].map(stop => (
              <label key={stop} style={s.filterOption}>
                <input type="checkbox" checked={selectedStops.includes(stop)} onChange={() => toggleStop(stop)} />
                {stop === 0 ? "Non-stop" : `${stop} Stop`}
              </label>
            ))}
          </div>
          <div style={s.filterCard}>
            <div style={s.filterTitle}>Airlines</div>
            {[...new Set(mockFlights.map(f => f.airline))].map(a => (
              <label key={a} style={s.filterOption}>
                <input type="checkbox" defaultChecked />
                {a}
              </label>
            ))}
          </div>
          <div style={s.filterCard}>
            <div style={s.filterTitle}>Price Range</div>
            <div style={{ fontSize: "13px", color: "#666" }}>₹2,299 – ₹6,499</div>
            <input type="range" min="2299" max="6499" defaultValue="6499" style={{ width: "100%", marginTop: "8px" }} />
          </div>
        </div>

        <div style={s.flightsList}>
          <div style={s.sortBar}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#666", alignSelf: "center", marginRight: "4px" }}>Sort by:</span>
            {["price", "duration", "departure"].map(opt => (
              <button key={opt} style={{ ...s.sortBtn, ...(sortBy === opt ? s.activeSortBtn : {}) }} onClick={() => setSortBy(opt)}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          {sorted.map(flight => (
            <div key={flight.id} style={{ ...s.card, ...(bookedId === flight.id ? { border: "2px solid #4caf50", background: "#f1fff5" } : {}) }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"; }}
            >
              <div style={{ ...s.airlineBadge, background: airlineColors[flight.airline] || "#333" }}>
                {flight.airline.split(" ").map(w => w[0]).join("")}
              </div>
              <div style={s.flightInfo}>
                <div style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>{flight.airline} · {flight.code} · {flight.class}</div>
                <div style={s.timeRow}>
                  <div>
                    <div style={s.time}>{flight.dep}</div>
                    <div style={s.route}>{flight.from}</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <div style={s.durationLine} />
                      <span style={{ fontSize: "11px", color: "#aaa" }}>✈</span>
                      <div style={s.durationLine} />
                    </div>
                    <div style={s.duration}>{flight.duration}</div>
                    <div style={s.stops}>{flight.stops === 0 ? <span style={s.badge}>Non-stop</span> : `${flight.stops} stop`}</div>
                  </div>
                  <div>
                    <div style={s.time}>{flight.arr}</div>
                    <div style={s.route}>{flight.to}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <span style={s.ratingBadge}>⭐ {flight.rating}</span>
              </div>
              <div style={s.price}>
                <div style={s.priceAmount}>₹{flight.price.toLocaleString()}</div>
                <div style={s.priceNote}>per person</div>
                <button style={s.bookBtn} onClick={() => setBookedId(flight.id)}>
                  {bookedId === flight.id ? "✓ Booked!" : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
