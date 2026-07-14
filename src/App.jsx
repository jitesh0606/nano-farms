import "./App.css";
import "./styles/Cart.css";
import "./styles/Checkout.css";
import "./styles/Success.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import supabase from "./lib/supabase";
import Admin from "./components/Admin";
import TrackOrder from "./components/TrackOrder";
import milk from "./assets/milk.png"
import dairy from "./assets/dairy products.png"
import vegetable from "./assets/fresh vegetable.png"
import fertilizer from "./assets/fertilizer.png"
import logo from "./assets/logo.png"
import cowmilk from "./assets/cowmilk.png";
import buffalomilk from "./assets/buffalomilk.png";
import CartRow from "./CartRow";

import paneer from "./assets/paneer.png";
import ghee from "./assets/ghee.png";
import curd from "./assets/curd.png";
import butter from "./assets/butter.png";

import potato from "./assets/potato.png";
import onion from "./assets/onion.png";
import tomato from "./assets/tomato.png";
import ginger from "./assets/ginger.png";

import vermicompost from "./assets/vermicompost.png";
import cowdung from "./assets/cowdung.png";
import neemcake from "./assets/neemcake.png";
import compost from "./assets/compost.png";
import { useState, useEffect } from "react";

import Milk from "./Milk";
import Dairy from "./Dairy";
import Vegetables from "./Vegetable";
import Fertilizer from "./Fertilizer";


  function App() {
const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  useEffect(() => {
  async function checkSession() {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      setIsAdminLoggedIn(true);
    }
  }

  checkSession();
}, []);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [rawMilkCount, setRawMilkCount] = useState(0);
const [buffaloMilkCount, setBuffaloMilkCount] = useState(0);
const [paneerCount, setPaneerCount] = useState(0);
const [gheeCount, setGheeCount] = useState(0);
const [curdCount, setCurdCount] = useState(0);
const [butterCount, setButterCount] = useState(0);
const [potatoCount, setPotatoCount] = useState(0);
const [onionCount, setOnionCount] = useState(0);
const [tomatoCount, setTomatoCount] = useState(0);
const [gingerCount, setGingerCount] = useState(0);
const [vermicompostCount, setVermicompostCount] = useState(0);
const [cowDungCount, setCowDungCount] = useState(0);
const [neemCakeCount, setNeemCakeCount] = useState(0);
const [compostCount, setCompostCount] = useState(0);
const totalPrice =
  rawMilkCount * 80 +
  buffaloMilkCount * 90 +
  paneerCount * 95 +
  gheeCount * 600 +
  curdCount * 30 +
  butterCount * 300 +
  potatoCount * 50 +
  onionCount * 50 +
  tomatoCount * 70 +
  gingerCount * 30 +
  vermicompostCount * 90 +
  cowDungCount * 90 +
  neemCakeCount * 100 +
  compostCount * 100;
const [name, setName] = useState("");
const [mobile, setMobile] = useState("");
const [address, setAddress] = useState("");
const [nameError, setNameError] = useState("");
const [mobileError, setMobileError] = useState("");
const [addressError, setAddressError] = useState("");
const [paymentMethod, setPaymentMethod] = useState("cod");
const [orderNumber, setOrderNumber] = useState("");
const products = [
  { name: "Raw Milk", page: "milk", image: cowmilk },
  { name: "Buffalo Milk", page: "milk", image: buffalomilk },

  { name: "Paneer", page: "dairy", image: paneer },
  { name: "Ghee", page: "dairy", image: ghee },
  { name: "Curd", page: "dairy", image: curd },
  { name: "White Butter", page: "dairy", image: butter },

  { name: "Potato", page: "vegetables", image: potato },
  { name: "Onion", page: "vegetables", image: onion },
  { name: "Tomato", page: "vegetables", image: tomato },
  { name: "Ginger", page: "vegetables", image: ginger },

  { name: "Vermicompost", page: "fertilizer", image: vermicompost },
  { name: "Cow Dung Manure", page: "fertilizer", image: cowdung },
  { name: "Neem Cake", page: "fertilizer", image: neemcake },
  { name: "Organic Compost", page: "fertilizer", image: compost },
];

const filteredProducts = products.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
);

if(page === "milk"){
  return (
    <Milk
  goHome={() => setPage("home")}
  cartCount={cartCount}
  setCartCount={setCartCount}
  rawMilkCount={rawMilkCount}
  setRawMilkCount={setRawMilkCount}
  buffaloMilkCount={buffaloMilkCount}
  setBuffaloMilkCount={setBuffaloMilkCount}
/>
);
}
  if (page === "dairy") {
  return (
    <Dairy
      goHome={() => setPage("home")}
      cartCount={cartCount}
      setCartCount={setCartCount}

      paneerCount={paneerCount}
      setPaneerCount={setPaneerCount}

      gheeCount={gheeCount}
      setGheeCount={setGheeCount}

      curdCount={curdCount}
      setCurdCount={setCurdCount}

      butterCount={butterCount}
      setButterCount={setButterCount}
    />
  );
}

if (page === "vegetables") {
  return (
    <Vegetables
      goHome={() => setPage("home")}
      cartCount={cartCount}
      setCartCount={setCartCount}

      potatoCount={potatoCount}
      setPotatoCount={setPotatoCount}

      onionCount={onionCount}
      setOnionCount={setOnionCount}

      tomatoCount={tomatoCount}
      setTomatoCount={setTomatoCount}

      gingerCount={gingerCount}
      setGingerCount={setGingerCount}
    />
  );
}
if (page === "fertilizer") {
  return (
<Fertilizer
  goHome={() => setPage("home")}
  cartCount={cartCount}
  setCartCount={setCartCount}

  vermicompostCount={vermicompostCount}
  setVermicompostCount={setVermicompostCount}

  cowDungCount={cowDungCount}
  setCowDungCount={setCowDungCount}

  neemCakeCount={neemCakeCount}
  setNeemCakeCount={setNeemCakeCount}

  compostCount={compostCount}
  setCompostCount={setCompostCount}
/>
  );
}
if (page === "success") {
  return (
    <div className="product-page">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1 className="success-title">
          Order Placed Successfully
        </h1>

        <p className="success-subtitle">
          Thank you for shopping with <b>Nano Farms</b> 🌿
        </p>

        <div className="success-details">

          <div className="detail-row">
            <div className="detail-label">
              🆔 Order ID
            </div>
            <div className="detail-value">
              {orderNumber}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">
              📅 Date
            </div>
            <div className="detail-value">
              {new Date().toLocaleDateString("en-IN",{
                day:"2-digit",
                month:"long",
                year:"numeric",
              })}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">
              🕒 Time
            </div>
            <div className="detail-value">
              {new Date().toLocaleTimeString("en-IN",{
                hour:"2-digit",
                minute:"2-digit",
              })}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">
              📱 Mobile
            </div>
            <div className="detail-value">
              {mobile}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">
              📍 Address
            </div>
            <div className="detail-value address-value">
              {address}
            </div>
          </div>

        </div>

        <div className="success-buttons">

          <button
            className="home-btn"
            onClick={() => {

              setCartCount(0);

              setRawMilkCount(0);
              setBuffaloMilkCount(0);

              setPaneerCount(0);
              setGheeCount(0);
              setCurdCount(0);
              setButterCount(0);

              setPotatoCount(0);
              setOnionCount(0);
              setTomatoCount(0);
              setGingerCount(0);

              setVermicompostCount(0);
              setCowDungCount(0);
              setNeemCakeCount(0);
              setCompostCount(0);

              setPage("home");

            }}
          >
            🏠 Back To Home
          </button>

          <button
            className="track-btn"
            onClick={() => setPage("track")}
          >
            📦 Track Order
          </button>

        </div>

      </div>

    </div>
  );
}
if (page === "checkout") {
  return (
    <div className="product-page">

      <button onClick={() => setPage("cart")}>
        ⬅ Back to Cart
      </button>

      <h1>📦 Checkout</h1>

      <div className="order-info">

        <div className="info-item">
          <span>🆔 Order ID</span>
          <strong>{orderNumber}</strong>
        </div>

        <div className="info-item">
          <span>🗓️ Date</span>
          <strong>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </div>

        <div className="info-item">
          <span>⏰ Order Time</span>
          <strong>
            {new Date().toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
        </div>

      </div>

      <div className="checkout-box">

        {/* ORDER SUMMARY */}

        <div className="order-summary">

          <h2>🧾 Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{cartCount}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charges</span>
            <span>
              {totalPrice >= 500 ? "FREE" : "₹40"}
            </span>
          </div>

          <hr />

          <div className="summary-row total-row">
            <span>Grand Total</span>
            <span>
              ₹{totalPrice >= 500 ? totalPrice : totalPrice + 40}
            </span>
          </div>

        </div>

        {/* CUSTOMER */}

        <div className="customer-box">

          <h2>👤 Customer Information</h2>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="checkout-input"
          />

          {nameError && (
            <p className="error-text">{nameError}</p>
          )}

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="checkout-input"
          />

          {mobileError && (
            <p className="error-text">{mobileError}</p>
          )}

          <textarea
            rows="5"
            placeholder="Enter Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="checkout-textarea"
          ></textarea>

          {addressError && (
            <p className="error-text">{addressError}</p>
          )}

        </div>

        {/* PAYMENT */}

        <div className="payment-box">

          <h2>💳 Payment Method</h2>

          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI Payment
          </label>

          <label>
            <input
              type="radio"
              value="qr"
              checked={paymentMethod === "qr"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Scan QR Code
          </label>

        </div>

      </div>

      <button
        className="place-order-btn"
        onClick={async () => {
   if (name.trim().length < 3) {
  alert("Please enter a valid name");
  return;
}

if (!/^[0-9]{10}$/.test(mobile)) {
  alert("Please enter a valid 10-digit mobile number");
  return;
}

if (address.trim().length < 15) {
  alert("Please enter a complete delivery address");
  return;
}
const orderItems = `
${rawMilkCount > 0 ? `🥛 Raw Milk: ${rawMilkCount}\n` : ""}
${buffaloMilkCount > 0 ? `🐃 Buffalo Milk: ${buffaloMilkCount}\n` : ""}

${paneerCount > 0 ? `🧀 Paneer: ${paneerCount}\n` : ""}
${curdCount > 0 ? `🥣 Curd: ${curdCount}\n` : ""}
${butterCount > 0 ? `🧈 Butter: ${butterCount}\n` : ""}
${gheeCount > 0 ? `🫙 Ghee: ${gheeCount}\n` : ""}

${potatoCount > 0 ? `🥔 Potato: ${potatoCount}\n` : ""}
${onionCount > 0 ? `🧅 Onion: ${onionCount}\n` : ""}
${tomatoCount > 0 ? `🍅 Tomato: ${tomatoCount}\n` : ""}
${gingerCount > 0 ? `🫚 Ginger: ${gingerCount}\n` : ""}

${vermicompostCount > 0 ? `🌱 Vermicompost: ${vermicompostCount}\n` : ""}
${cowDungCount > 0 ? `🐄 Cow Dung: ${cowDungCount}\n` : ""}
${neemCakeCount > 0 ? `🌿 Neem Cake: ${neemCakeCount}\n` : ""}
${compostCount > 0 ? `♻️ Organic Compost: ${compostCount}\n` : ""}
`;



const grandTotal =
  totalPrice >= 500 ? totalPrice : totalPrice + 40;

const orderproducts = {
  rawMilk: rawMilkCount,
  buffaloMilk: buffaloMilkCount,
  paneer: paneerCount,
  ghee: gheeCount,
  curd: curdCount,
  butter: butterCount,
  potato: potatoCount,
  onion: onionCount,
  tomato: tomatoCount,
  ginger: gingerCount,
  vermicompost: vermicompostCount,
  cowDung: cowDungCount,
  neemCake: neemCakeCount,
  compost: compostCount,
};
const { data, error } = await supabase
  .from("orders")
  .insert([
    {
      customer_name: name,
      mobile: mobile,
      address: address,
      products: orderproducts,
      total: grandTotal,
      payment_method: paymentMethod,
    },
  ])
  .select();

if (error) {
 console.log(error);
alert(error.message);
  return;
}
setOrderNumber(data[0].order_number);
    const message = `
🛒 New Order - Order details
🆔 Order ID: ${orderNumber}
👤 Name: ${name}
📞 Mobile: ${mobile}
💳 Payment Method: ${paymentMethod.toUpperCase()}
🛍️ Order Items:
${orderItems}
💰 Total Amount: ₹${totalPrice}

📍 Address:
${address}
`;

    const whatsappNumber = "917895184668"; // apna number

   
    setPage("success");
  }}
>
  Place Order
</button>
    </div>
  );
}

if (page === "admin") {

  if (!isAdminLoggedIn) {
    return (
      <Login
        goHome={() => setPage("home")}
        onLogin={() => {
          setIsAdminLoggedIn(true);
          setPage("admin");
        }}
      />
    );
  }

  return (
    <Admin
      goHome={() => setPage("home")}
    />
  );
}
if (page === "track") {
  return (
    <TrackOrder
      goHome={() => setPage("home")}
    />
  );
}
if(page === "contact"){
  return(
    <div className="product-page">
      <h1>Contact Us</h1>

      <p>📞 +91 9837369626</p>
      <p>📧 nanofarms@gmail.com</p>
      <p>📍  daurala,Meerut, Uttar Pradesh</p>

      <button onClick={() => setPage("home")}>
        Back Home
      </button>
    </div>
  );
}
if (page === "cart") {
  return (
    <div className="product-page">
      <button onClick={() => setPage("home")}>
        ⬅ Back to Home
      </button>

      <h1>🛒 Shopping Cart</h1>

      <div className="cart-box">

        <CartRow
  emoji="🥛"
  name="Raw Milk"
  price={80}
  count={rawMilkCount}
  setCount={setRawMilkCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>
        <CartRow
  emoji="🐃"
  name="Buffalo Milk"
  price={90}
  count={buffaloMilkCount}
  setCount={setBuffaloMilkCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>
      <CartRow
  emoji="🧀"
  name="Paneer"
  price={95}
  count={paneerCount}
  setCount={setPaneerCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        <CartRow
  emoji="🥣"
  name="Curd"
  price={30}
  count={curdCount}
  setCount={setCurdCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        <CartRow
  emoji="🧈"
  name="White Butter"
  price={300}
  count={butterCount}
  setCount={setButterCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

       <CartRow
  emoji="🥔"
  name="Potato"
  price={50}
  count={potatoCount}
  setCount={setPotatoCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        <CartRow
  emoji="🧅"
  name="Onion"
  price={50}
  count={onionCount}
  setCount={setOnionCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        <CartRow
  emoji="🍅"
  name="Tomato"
  price={70}
  count={tomatoCount}
  setCount={setTomatoCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>
        <CartRow
  emoji="🫚"
  name="Ginger"
  price={30}
  count={gingerCount}
  setCount={setGingerCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        <CartRow
  emoji="🌱"
  name="Vermicompost"
  price={90}
  count={vermicompostCount}
  setCount={setVermicompostCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        <CartRow
  emoji="🐄"
  name="Cow Dung Manure"
  price={90}
  count={cowDungCount}
  setCount={setCowDungCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        <CartRow
  emoji="🌿"
  name="Neem Cake"
  price={100}
  count={neemCakeCount}
  setCount={setNeemCakeCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        <CartRow
  emoji="♻️"
  name="Organic Compost"
  price={100}
  count={compostCount}
  setCount={setCompostCount}
  cartCount={cartCount}
  setCartCount={setCartCount}
/>

        {cartCount === 0 && (
          <h2>Your Cart is Empty 🛒</h2>
        )}

        <div className="order-summary">

  <h2>🧾 Order Summary</h2>

  <div className="summary-row">
    <span>Total Items</span>
    <span>{cartCount}</span>
  </div>

  <div className="summary-row">
    <span>Subtotal</span>
    <span>₹{totalPrice}</span>
  </div>

  <div className="summary-row">
    <span>Delivery Charges</span>
    <span>
      {cartCount === 0
        ? "₹0"
        : totalPrice >= 500
        ? "FREE"
        : "₹40"}
    </span>
  </div>

  <hr />

  <div className="summary-row total-row">
    <span>Grand Total</span>
    <span>
      ₹{
        cartCount === 0
          ? 0
          : totalPrice >= 500
          ? totalPrice
          : totalPrice + 40
      }
    </span>
  </div>

</div>

        {cartCount > 0 && (
          <button
            className="checkout-btn"
            onClick={() => setPage("checkout")}
          >
            Proceed to Checkout
          </button>
        )}

      </div>
    </div>
  );
}



  return (
    <>
   
<header className="header-banner">

  <div className="banner-overlay">

    <h1 className="banner-title">
      🌿 FROM OUR FARMS TO YOUR FAMILY 🌿
    </h1>

    <div className="banner-divider"></div>

    <div className="banner-features">

      <span>🌱 100% ORGANIC</span>

      <span>🚜 FARM FRESH</span>

      <span>🍃 CHEMICAL FREE</span>

    </div>

  </div>

</header>

<nav className="menu">

  <button
    className="menu-icon"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </button>

  <button onClick={() => setPage("contact")}>
     Contact
  </button>

  <button
    className="cart-btn"
    onClick={() => setPage("cart")}
  >
    🛒 ({cartCount})
  </button>

</nav>


 



<div className={`side-menu ${menuOpen ? "open" : ""}`}>

    <button onClick={() => setPage("home")}>🏠 Home</button>

    <button onClick={() => setPage("milk")}>🥛 Milk</button>

    <button onClick={() => setPage("dairy")}>🧀 Dairy Products</button>

    <button onClick={() => setPage("vegetables")}>🥬 Vegetables</button>

    <button onClick={() => setPage("fertilizer")}>🌾 Fertilizers</button>

    <button onClick={() => setPage("track")}>📦 Track Order</button>

    <button onClick={() => setPage("admin")}>🔒 Admin Login</button>

  </div>
{menuOpen && (
  <div
    className="menu-overlay"
    onClick={() => setMenuOpen(false)}
  ></div>
)}
<SearchBar
  search={search}
  setSearch={setSearch}
/>


        <div className="home-content">
        <section className="products">

 {search === "" ? (

  <>
  
    <div className="card">
      <img src={milk} alt="Milk" />
      <h3>Fresh Milk</h3>

      <button onClick={() => setPage("milk")}>
        View Products
      </button>
    </div>

    <div className="card">
      <img src={dairy} alt="Dairy" />
      <h3>Dairy Products</h3>

      <button onClick={() => setPage("dairy")}>
        View Products
      </button>
    </div>

    <div className="card">
      <img src={vegetable} alt="Vegetables" />
      <h3>Fresh Vegetables</h3>

      <button onClick={() => setPage("vegetables")}>
        View Products
      </button>
    </div>

    <div className="card">
      <img src={fertilizer} alt="Fertilizer" />
      <h3>Organic Fertilizer</h3>

      <button onClick={() => setPage("fertilizer")}>
        View Products
      </button>
    </div>
  </>

) : (

  filteredProducts.map((item) => (
    <div className="card" key={item.name}>
      <img src={item.image} alt={item.name} />

      <h3>{item.name}</h3>

      <button onClick={() => setPage(item.page)}>
        View Product
      </button>
    </div>
  ))

)}

  

</section>
</div>
        <h2>Pure & Natural Farm Products</h2>

        <p>
          Fresh Milk • Dairy Products • Vegetables • Organic Fertilizers
        </p>

        
      
     <footer>
  <h3>Nano Farms 🌱</h3>
  <p>Fresh Farm Products Delivered To Your Doorstep</p>
  <p>📞 +91 9837369626</p>
</footer>
<section className="about">
  <h2>About Nano Farms</h2>

  <p>
    Nano Farms provides fresh milk, dairy products,
    vegetables and organic fertilizers directly from farms
    to customers.
  </p>
</section>
    </>
  );
}

export default App;