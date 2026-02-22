import React, { useState } from "react";

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Goa"];

const s = {
  wrapper: {
    background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)",
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.97)",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    maxWidth: "900px",
    margin: "0 auto",
  },
  tabs: { display: "flex", gap: "4px", marginBottom: "24px", borderBottom: "2px solid #eee", paddingBottom: "0" },
  tab: {
    padding: "10px 20px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    color: "#666",
    borderBottom: "3px solid transparent",
    marginBottom: "-2px",
    transition: "all 0.2s",
  },
  activeTab: { color: "#e94560", borderBottomColor: "#e94560" },
  tripTypes: { display: "flex", gap: "16px", marginBottom: "24px" },
  radioLabel: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px", color: "#333", fontWeight: "500" },
  row: { display: "flex", gap: "12px", alignItems: "flex-end", flexWrap: "wrap" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "140px" },
  label: { fontSize: "11px", fontWeight: "700", color: "#999", textTransform: "uppercase", letterSpacing: "1px" },
  input: {
    border: "2px solid #e8eef4",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a2e",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#f8fafc",
    width: "100%",
    boxSizing: "border-box",
  },
  select: {
    border: "2px solid #e8eef4",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a2e",
    outline: "none",
    background: "#f8fafc",
    cursor: "pointer",
    width: "100%",
  },
  searchBtn: {
    background: "linear-gradient(135deg, #e94560, #c0392b)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "14px 32px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 6px 20px rgba(233,69,96,0.4)",
    transition: "transform 0.15s, box-shadow 0.15s",
    marginTop: "2px",
  },
  swapBtn: {
    background: "linear-gradient(135deg, #e94560, #f5a623)",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
    alignSelf: "flex-end",
    marginBottom: "2px",
  },
};

export default function SearchBar({ onSearch, activeTab: propTab }) {
  const [tab, setTab] = useState(propTab || "flights");
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("Mumbai");
  const [to, setTo] = useState("Delhi");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState("1 Adult");
  const [hotelCity, setHotelCity] = useState("Goa");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("1 Room");

  const handleSwap = () => { const t = from; setFrom(to); setTo(t); };

  const handleSearch = () => {
    const payload = tab === "flights"
      ? { type: "flight", from, to, date, returnDate, travelers, tripType }
      : { type: "hotel", city: hotelCity, checkIn, checkOut, rooms };
    if (onSearch) onSearch(payload);
    alert(`🔍 Searching ${tab}...\n${JSON.stringify(payload, null, 2)}`);
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <div style={s.tabs}>
          {[["flights","✈️ Flights"],["hotels","🏨 Hotels"],["trains","🚂 Trains"],["buses","🚌 Buses"]].map(([key, label]) => (
            <button key={key} style={{ ...s.tab, ...(tab === key ? s.activeTab : {}) }} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        {tab === "flights" && (
          <>
            <div style={s.tripTypes}>
              {["one-way","round-trip","multi-city"].map(t => (
                <label key={t} style={s.radioLabel}>
                  <input type="radio" name="trip" value={t} checked={tripType === t} onChange={() => setTripType(t)} />
                  {t.charAt(0).toUpperCase() + t.slice(1).replace("-"," ")}
                </label>
              ))}
            </div>
            <div style={s.row}>
              <div style={s.inputGroup}>
                <span style={s.label}>From</span>
                <select style={s.select} value={from} onChange={e => setFrom(e.target.value)}>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button style={s.swapBtn} onClick={handleSwap}>⇄</button>
              <div style={s.inputGroup}>
                <span style={s.label}>To</span>
                <select style={s.select} value={to} onChange={e => setTo(e.target.value)}>
                  {cities.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={s.inputGroup}>
                <span style={s.label}>Departure</span>
                <input style={s.input} type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              {tripType === "round-trip" && (
                <div style={s.inputGroup}>
                  <span style={s.label}>Return</span>
                  <input style={s.input} type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
                </div>
              )}
              <div style={s.inputGroup}>
                <span style={s.label}>Travelers</span>
                <select style={s.select} value={travelers} onChange={e => setTravelers(e.target.value)}>
                  {["1 Adult","2 Adults","3 Adults","4 Adults","2 Adults, 1 Child"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <button style={s.searchBtn} onClick={handleSearch}>Search Flights</button>
            </div>
          </>
        )}

        {tab === "hotels" && (
          <div style={s.row}>
            <div style={{ ...s.inputGroup, flex: 2 }}>
              <span style={s.label}>City / Destination</span>
              <select style={s.select} value={hotelCity} onChange={e => setHotelCity(e.target.value)}>
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={s.inputGroup}>
              <span style={s.label}>Check-In</span>
              <input style={s.input} type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div style={s.inputGroup}>
              <span style={s.label}>Check-Out</span>
              <input style={s.input} type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
            </div>
            <div style={s.inputGroup}>
              <span style={s.label}>Rooms & Guests</span>
              <select style={s.select} value={rooms} onChange={e => setRooms(e.target.value)}>
                {["1 Room, 2 Guests","2 Rooms, 4 Guests","3 Rooms, 6 Guests"].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <button style={s.searchBtn} onClick={handleSearch}>Search Hotels</button>
          </div>
        )}

        {(tab === "trains" || tab === "buses") && (
          <div style={s.row}>
            <div style={s.inputGroup}>
              <span style={s.label}>From</span>
              <select style={s.select} value={from} onChange={e => setFrom(e.target.value)}>
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button style={s.swapBtn} onClick={handleSwap}>⇄</button>
            <div style={s.inputGroup}>
              <span style={s.label}>To</span>
              <select style={s.select} value={to} onChange={e => setTo(e.target.value)}>
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={s.inputGroup}>
              <span style={s.label}>Date</span>
              <input style={s.input} type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <button style={s.searchBtn} onClick={handleSearch}>Search {tab === "trains" ? "Trains" : "Buses"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
