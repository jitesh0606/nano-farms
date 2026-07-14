import { useState } from "react";
import "../styles/navbar.css";

function Navbar({ cartCount, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">

        <div className="logo-area">
          <h2>NANO FARMS 🌱</h2>
          <p>Healthy Families Start With Genuine Food</p>
        </div>

        <div className="nav-links">

          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("shop")}>
            Shop
          </button>

          <button onClick={() => setPage("track")}>
            Track Order
          </button>

          <button onClick={() => setPage("contact")}>
            Contact
          </button>

        </div>

        <div className="nav-right">

          <button
            className="cart-btn"
            onClick={() => setPage("cart")}
          >
            🛒 {cartCount}
          </button>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

        </div>

      </nav>
      {menuOpen && (
  <div
    className="menu-overlay"
    onClick={() => setMenuOpen(false)}
  />
)}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <button onClick={() => {setPage("home"); setMenuOpen(false);}}>
          🏠 Home
        </button>

        <button onClick={() => {setPage("shop"); setMenuOpen(false);}}>
          🛍 Shop
        </button>

        <button onClick={() => {setPage("track"); setMenuOpen(false);}}>
          📦 Track Order
        </button>

        <button onClick={() => {setPage("contact"); setMenuOpen(false);}}>
          📞 Contact
        </button>

        <button onClick={() => {setPage("admin"); setMenuOpen(false);}}>
          🔒 Admin
        </button>

      </div>
    </>
  );
}

export default Navbar;