import React, { useState } from "react";

const styles = {
  header: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    padding: "0",
    fontFamily: "'Segoe UI', sans-serif",
    boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  topBar: {
    background: "rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    padding: "6px 40px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "20px",
  },
  topLink: { color: "#a0b4cc", fontSize: "12px", cursor: "pointer", textDecoration: "none" },
  nav: {
    display: "flex",
    alignItems: "center",
    padding: "14px 40px",
    gap: "32px",
  },
  logo: {
    fontSize: "26px",
    fontWeight: "800",
    background: "linear-gradient(90deg, #e94560, #f5a623)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
    marginRight: "20px",
    cursor: "pointer",
  },
  navLinks: { display: "flex", gap: "8px", flex: 1 },
  navItem: {
    color: "#c8d8e8",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    border: "none",
    background: "transparent",
  },
  activeNav: {
    background: "rgba(233,69,96,0.15)",
    color: "#e94560",
    borderBottom: "2px solid #e94560",
  },
  authButtons: { display: "flex", gap: "10px", marginLeft: "auto" },
  loginBtn: {
    background: "transparent",
    border: "1.5px solid #e94560",
    color: "#e94560",
    padding: "8px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  signupBtn: {
    background: "linear-gradient(135deg, #e94560, #c0392b)",
    border: "none",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
};

const navItems = [
  { label: "✈️ Flights", key: "flights" },
  { label: "🏨 Hotels", key: "hotels" },
  { label: "🚂 Trains", key: "trains" },
  { label: "🚌 Buses", key: "buses" },
  { label: "🚕 Cabs", key: "cabs" },
  { label: "🏖️ Holidays", key: "holidays" },
  { label: "🎫 Offers", key: "offers" },
];

export default function Header({ onTabChange }) {
  const [active, setActive] = useState("flights");

  const handleNav = (key) => {
    setActive(key);
    if (onTabChange) onTabChange(key);
  };

  return (
    <header style={styles.header}>
      <div style={styles.topBar}>
        <span style={styles.topLink}>🌐 EN</span>
        <span style={styles.topLink}>₹ INR</span>
        <span style={styles.topLink}>📱 Download App</span>
        <span style={styles.topLink}>❓ Support</span>
      </div>
      <nav style={styles.nav}>
        <div style={styles.logo}>MakeMyTrip</div>
        <div style={styles.navLinks}>
          {navItems.map((item) => (
            <button
              key={item.key}
              style={{ ...styles.navItem, ...(active === item.key ? styles.activeNav : {}) }}
              onClick={() => handleNav(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div style={styles.authButtons}>
          <button style={styles.loginBtn}>Login</button>
          <button style={styles.signupBtn}>Sign Up</button>
        </div>
      </nav>
    </header>
  );
}
