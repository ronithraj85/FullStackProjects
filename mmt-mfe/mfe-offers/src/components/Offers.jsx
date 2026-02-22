import React, { useState } from "react";

const offers = [
  { id: 1, title: "FLAT 20% OFF on Flights", code: "FLYNOW20", discount: "Up to ₹2000 off", validTill: "28 Feb 2025", category: "Flights", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", icon: "✈️" },
  { id: 2, title: "Hotel Stay @ ₹999/night", code: "HOTEL999", discount: "Starting ₹999", validTill: "05 Mar 2025", category: "Hotels", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", icon: "🏨" },
  { id: 3, title: "HDFC Card Extra 10% OFF", code: "HDFC10", discount: "Extra ₹1500 off", validTill: "31 Mar 2025", category: "Bank Offer", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", icon: "💳" },
  { id: 4, title: "Goa Holiday Package", code: "GOAFUN", discount: "Flat ₹5000 off", validTill: "15 Mar 2025", category: "Holidays", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", icon: "🏖️" },
  { id: 5, title: "First Booking Offer", code: "FIRST500", discount: "₹500 instant off", validTill: "31 Dec 2025", category: "New User", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", icon: "🎉" },
  { id: 6, title: "Weekend Getaway Deal", code: "WEEKEND", discount: "Up to 30% off", validTill: "Every Weekend", category: "Hotels", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", icon: "🌅" },
];

const s = {
  container: { padding: "30px", fontFamily: "'Segoe UI', sans-serif", background: "#f0f4f8", minHeight: "100vh" },
  header: { textAlign: "center", marginBottom: "32px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#1a1a2e", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#666" },
  filterRow: { display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap" },
  filterBtn: { padding: "8px 20px", border: "2px solid #e0e7ef", borderRadius: "20px", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#555", transition: "all 0.2s" },
  activeFilter: { background: "#1a1a2e", color: "#fff", borderColor: "#1a1a2e" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" },
  card: { borderRadius: "18px", overflow: "hidden", boxShadow: "0 6px 24px rgba(0,0,0,0.12)", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" },
  cardTop: { padding: "28px 24px 20px", color: "#fff", position: "relative", minHeight: "120px" },
  icon: { fontSize: "36px", marginBottom: "10px" },
  offerTitle: { fontSize: "18px", fontWeight: "800", marginBottom: "6px" },
  discount: { fontSize: "14px", opacity: 0.9, fontWeight: "600" },
  validTill: { position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" },
  cardBottom: { background: "#fff", padding: "16px 24px" },
  codeRow: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  codeLabel: { fontSize: "11px", color: "#999", fontWeight: "600", textTransform: "uppercase" },
  codeBadge: { background: "#f8fafc", border: "2px dashed #cdd", borderRadius: "8px", padding: "8px 16px", fontSize: "15px", fontWeight: "800", color: "#1a1a2e", letterSpacing: "2px", flex: 1, margin: "0 8px", textAlign: "center" },
  copyBtn: { background: "linear-gradient(135deg, #e94560, #c0392b)", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 14px", cursor: "pointer", fontSize: "12px", fontWeight: "700" },
};

const categories = ["All", "Flights", "Hotels", "Holidays", "Bank Offer", "New User"];

export default function Offers() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  const filtered = activeCategory === "All" ? offers : offers.filter(o => o.category === activeCategory);

  const handleCopy = (id, code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={s.container}>
      <div style={s.header}>
        <div style={s.title}>🎫 Exclusive Offers & Deals</div>
        <div style={s.subtitle}>Save more on your next trip with these handpicked deals</div>
      </div>
      <div style={s.filterRow}>
        {categories.map(cat => (
          <button key={cat} style={{ ...s.filterBtn, ...(activeCategory === cat ? s.activeFilter : {}) }} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div style={s.grid}>
        {filtered.map(offer => (
          <div key={offer.id} style={s.card}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.12)"; }}
          >
            <div style={{ ...s.cardTop, background: offer.gradient }}>
              <div style={s.validTill}>⏰ {offer.validTill}</div>
              <div style={s.icon}>{offer.icon}</div>
              <div style={s.offerTitle}>{offer.title}</div>
              <div style={s.discount}>{offer.discount}</div>
            </div>
            <div style={s.cardBottom}>
              <div style={s.codeLabel}>Coupon Code</div>
              <div style={s.codeRow}>
                <div style={s.codeBadge}>{offer.code}</div>
                <button style={s.copyBtn} onClick={() => handleCopy(offer.id, offer.code)}>
                  {copiedId === offer.id ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
