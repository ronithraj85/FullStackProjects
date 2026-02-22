import React, { useState } from "react";

const hotels = [
  { id: 1, name: "The Taj Mahal Palace", location: "Colaba, Mumbai", stars: 5, price: 18500, rating: 4.8, reviews: 2341, amenities: ["Pool","Spa","WiFi","Restaurant","Gym"], tag: "Luxury", img: "🏰" },
  { id: 2, name: "Marriott Juhu", location: "Juhu Beach, Mumbai", stars: 5, price: 12000, rating: 4.6, reviews: 1876, amenities: ["Pool","WiFi","Restaurant","Bar","Gym"], tag: "Premium", img: "🏨" },
  { id: 3, name: "ITC Grand Central", location: "Parel, Mumbai", stars: 5, price: 9500, rating: 4.5, reviews: 1543, amenities: ["Pool","Spa","WiFi","Restaurant"], tag: "Premium", img: "🏩" },
  { id: 4, name: "Trident Nariman Point", location: "Marine Lines, Mumbai", stars: 5, price: 8200, rating: 4.4, reviews: 2100, amenities: ["Pool","WiFi","Restaurant","Bar"], tag: "Business", img: "🏛️" },
  { id: 5, name: "Radisson Blu", location: "Andheri, Mumbai", stars: 4, price: 5500, rating: 4.2, reviews: 987, amenities: ["Pool","WiFi","Restaurant","Gym"], tag: "Business", img: "🏢" },
  { id: 6, name: "Lemon Tree Premier", location: "Powai, Mumbai", stars: 4, price: 4200, rating: 4.0, reviews: 756, amenities: ["WiFi","Restaurant","Gym"], tag: "Value", img: "🌿" },
];

const s = {
  container: { padding: "20px", fontFamily: "'Segoe UI', sans-serif", background: "#f0f4f8", minHeight: "100vh" },
  title: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e", marginBottom: "4px" },
  subtitle: { fontSize: "13px", color: "#666", marginBottom: "20px" },
  layout: { display: "flex", gap: "20px" },
  sidebar: { width: "220px", flexShrink: 0 },
  filterCard: { background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: "16px" },
  filterTitle: { fontSize: "13px", fontWeight: "700", color: "#1a1a2e", marginBottom: "14px", textTransform: "uppercase" },
  grid: { flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", alignContent: "start" },
  card: { background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", transition: "all 0.2s", cursor: "pointer" },
  imgArea: { height: "120px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "52px", position: "relative" },
  tagBadge: { position: "absolute", top: "10px", right: "10px", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" },
  body: { padding: "16px" },
  hotelName: { fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "4px" },
  location: { fontSize: "12px", color: "#888", marginBottom: "8px" },
  ratingRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" },
  rating: { background: "#1565c0", color: "#fff", padding: "3px 8px", borderRadius: "6px", fontSize: "13px", fontWeight: "700" },
  reviews: { fontSize: "12px", color: "#888" },
  stars: { color: "#f5a623", fontSize: "12px" },
  amenities: { display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" },
  amenityTag: { background: "#f0f4f8", color: "#555", padding: "3px 8px", borderRadius: "4px", fontSize: "11px" },
  priceRow: { display: "flex", alignItems: "flex-end", justifyContent: "space-between" },
  price: { fontSize: "22px", fontWeight: "800", color: "#e94560" },
  perNight: { fontSize: "11px", color: "#999" },
  bookBtn: { background: "linear-gradient(135deg, #e94560, #c0392b)", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "12px", fontWeight: "700", boxShadow: "0 4px 12px rgba(233,69,96,0.3)" },
};

const tagColors = { Luxury: ["#7b1fa2", "#f3e5f5"], Premium: ["#1565c0", "#e3f2fd"], Business: ["#2e7d32", "#e8f5e9"], Value: ["#e65100", "#fff3e0"] };

export default function HotelList() {
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("price");

  const sorted = [...hotels].sort((a, b) => sortBy === "price" ? a.price - b.price : sortBy === "rating" ? b.rating - a.rating : 0);

  return (
    <div style={s.container}>
      <div style={s.title}>🏨 Hotels in Mumbai</div>
      <div style={s.subtitle}>{hotels.length} hotels found · Feb 25 – Feb 27, 2025</div>
      <div style={s.layout}>
        <div style={s.sidebar}>
          <div style={s.filterCard}>
            <div style={s.filterTitle}>Sort By</div>
            {["price", "rating"].map(opt => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", cursor: "pointer", fontSize: "13px" }}>
                <input type="radio" name="sort" checked={sortBy === opt} onChange={() => setSortBy(opt)} />
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </label>
            ))}
          </div>
          <div style={s.filterCard}>
            <div style={s.filterTitle}>Star Rating</div>
            {[5, 4, 3].map(star => (
              <label key={star} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", cursor: "pointer", fontSize: "13px" }}>
                <input type="checkbox" defaultChecked />
                {"⭐".repeat(star)}
              </label>
            ))}
          </div>
        </div>
        <div style={s.grid}>
          {sorted.map(hotel => {
            const [tc, bg] = tagColors[hotel.tag] || ["#333", "#f5f5f5"];
            return (
              <div key={hotel.id} style={{ ...s.card, ...(selected === hotel.id ? { border: "2px solid #e94560" } : {}) }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)"; }}
              >
                <div style={{ ...s.imgArea, background: `linear-gradient(135deg, ${bg}, #fff)` }}>
                  {hotel.img}
                  <span style={{ ...s.tagBadge, color: tc, background: bg }}>{hotel.tag}</span>
                </div>
                <div style={s.body}>
                  <div style={s.hotelName}>{hotel.name}</div>
                  <div style={s.location}>📍 {hotel.location}</div>
                  <div style={s.ratingRow}>
                    <span style={s.rating}>{hotel.rating}</span>
                    <span style={s.stars}>{"★".repeat(hotel.stars)}</span>
                    <span style={s.reviews}>({hotel.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div style={s.amenities}>
                    {hotel.amenities.map(a => <span key={a} style={s.amenityTag}>{a}</span>)}
                  </div>
                  <div style={s.priceRow}>
                    <div>
                      <div style={s.price}>₹{hotel.price.toLocaleString()}</div>
                      <div style={s.perNight}>per night</div>
                    </div>
                    <button style={s.bookBtn} onClick={() => setSelected(hotel.id)}>
                      {selected === hotel.id ? "✓ Selected" : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
