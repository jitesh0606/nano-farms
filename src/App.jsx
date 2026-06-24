import "./App.css";
import milk from "./assets/milk.png"
import dairy from "./assets/dairy products.png"
import vegetable from "./assets/fresh vegetable.png"
import fertilizer from "./assets/fertilizer.png"
import logo from "./assets/logo.png"
import { useState } from "react";

import Milk from "./Milk";
import Dairy from "./Dairy";
import Vegetables from "./Vegetable";
import Fertilizer from "./Fertilizer";


  function App() {

  const [page, setPage] = useState("home");
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
    gingerCount * 30;
const [name, setName] = useState("");
const [mobile, setMobile] = useState("");
const [address, setAddress] = useState("");

const orderId = Math.floor(
  1000 + Math.random() * 9000
);

const filteredCards = [
  { name: "Milk", page: "milk", image: milk },
  { name: "Dairy", page: "dairy", image: dairy },
  { name: "Vegetables", page: "vegetables", image: vegetable },
  { name: "Fertilizer", page: "fertilizer", image: fertilizer }
].filter((item) =>
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
      <h1>✅ Order Placed Successfully</h1>
<h3>Order ID: NF{orderId}</h3>

<p>Order Date: {new Date().toLocaleString()}</p>
      <h2>Thank You For Shopping With Nano Farms</h2>
      <h3>Order ID: NF{orderId}</h3>
<p>Mobile: {mobile}</p>
<p>Address: {address}</p>
      <p>Total Items: {cartCount}</p>
      <p>Total Amount: ₹{totalPrice}</p>

      <button
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
  Back To Home
</button>
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


<br /><br />

<input
  type="text"
  placeholder="Enter Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<br /><br />

<input
  type="tel"
  placeholder="Enter Mobile Number"
  value={mobile}
  onChange={(e) => setMobile(e.target.value)}
/>

<br /><br />

<textarea
  placeholder="Enter Delivery Address"
  rows="4"
  cols="40"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
></textarea>

<br /><br />

<h2>Total Amount: ₹{totalPrice}</h2>
<h2>Total Items: {cartCount}</h2>

<button
  onClick={() => {
    if (
      name.trim() === "" ||
      mobile.trim() === "" ||
      address.trim() === ""
    ) {
      alert("Please fill all details");
      return;
    }

    const message = `
🛒 New Order - Order details
🆔 Order ID: NF${orderId}
👤 Name: ${name}
📞 Mobile: ${mobile}

🥛 Raw Milk: ${rawMilkCount}
🐃 Buffalo Milk: ${buffaloMilkCount}

🧀 Paneer: ${paneerCount}
🥣 Curd: ${curdCount}
🧈 Butter: ${butterCount}

🥔 Potato: ${potatoCount}
🧅 Onion: ${onionCount}
🍅 Tomato: ${tomatoCount}
🫚 Ginger: ${gingerCount}

🌱 Vermicompost: ${vermicompostCount}
🐄 Cow Dung: ${cowDungCount}
🌿 Neem Cake: ${neemCakeCount}
♻️ Compost: ${compostCount}

💰 Total Amount: ₹${totalPrice}

📍 Address:
${address}
`;

    const whatsappNumber = "917895184668"; // apna number

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setPage("success");
  }}
>
  Place Order
</button>
    </div>
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

        {rawMilkCount > 0 && (
          <div className="cart-item">
            <span>🥛 Raw Milk × {rawMilkCount}</span>
            <span>₹{rawMilkCount * 80}</span>
          </div>
        )}

        {buffaloMilkCount > 0 && (
          <div className="cart-item">
            <span>🐃 Buffalo Milk × {buffaloMilkCount}</span>
            <span>₹{buffaloMilkCount * 90}</span>
          </div>
        )}

        {paneerCount > 0 && (
          <div className="cart-item">
            <span>🧀 Paneer × {paneerCount}</span>
            <span>₹{paneerCount * 95}</span>
          </div>
        )}

        {curdCount > 0 && (
          <div className="cart-item">
            <span>🥣 Curd × {curdCount}</span>
            <span>₹{curdCount * 30}</span>
          </div>
        )}

        {butterCount > 0 && (
          <div className="cart-item">
            <span>🧈 White Butter × {butterCount}</span>
            <span>₹{butterCount * 300}</span>
          </div>
        )}

        {potatoCount > 0 && (
          <div className="cart-item">
            <span>🥔 Potato × {potatoCount}</span>
            <span>₹{potatoCount * 50}</span>
          </div>
        )}

        {onionCount > 0 && (
          <div className="cart-item">
            <span>🧅 Onion × {onionCount}</span>
            <span>₹{onionCount * 50}</span>
          </div>
        )}

        {tomatoCount > 0 && (
          <div className="cart-item">
            <span>🍅 Tomato × {tomatoCount}</span>
            <span>₹{tomatoCount * 70}</span>
          </div>
        )}

        {gingerCount > 0 && (
          <div className="cart-item">
            <span>🫚 Ginger × {gingerCount}</span>
            <span>₹{gingerCount * 30}</span>
          </div>
        )}

        {vermicompostCount > 0 && (
          <div className="cart-item">
            <span>🌱 Vermicompost × {vermicompostCount}</span>
            <span>₹{vermicompostCount * 90}</span>
          </div>
        )}

        {cowDungCount > 0 && (
          <div className="cart-item">
            <span>🐄 Cow Dung Manure × {cowDungCount}</span>
            <span>₹{cowDungCount * 90}</span>
          </div>
        )}

        {neemCakeCount > 0 && (
          <div className="cart-item">
            <span>🌿 Neem Cake × {neemCakeCount}</span>
            <span>₹{neemCakeCount * 100}</span>
          </div>
        )}

        {compostCount > 0 && (
          <div className="cart-item">
            <span>♻️ Organic Compost × {compostCount}</span>
            <span>₹{compostCount * 100}</span>
          </div>
        )}

        {cartCount === 0 && (
          <h2>Your Cart is Empty 🛒</h2>
        )}

        <div className="total-box">
          <h2>Total Items: {cartCount}</h2>
          <h2>Total Amount: ₹{totalPrice}</h2>
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
   
<header className="header-banner"></header>


<nav className="menu"><h3>🛒 Cart ({cartCount})</h3>
<button
  onClick={() => {
    setPage("cart");
  }}
>
  View Cart
</button>

  <button onClick={() => setPage("home")}>
  Home
</button>
<button onClick={() => setPage("milk")}>
  Milk</button>

<button onClick={() => setPage("dairy")}>
  Dairy Products</button>

<button onClick={() => setPage("vegetables")}>
  Vegetables</button>

<button onClick={() => setPage("fertilizer")}>
  Fertilizers</button>

  <span>|</span>
  
  <button onClick={() => setPage("contact")}>
  Contact
</button>
</nav>

<div className="search-bar">
  <input
  type="text"
  placeholder="Search Products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
</div>


      <section className="hero">
        <section className="products">

 {filteredCards.map((item) => (
  <div className="card" key={item.name}>
    <img src={item.image} alt={item.name} />

    <h3>{item.name}</h3>

    <button onClick={() => setPage(item.page)}>
      View Products
    </button>
  </div>
))}

  

</section>

        <h2>Pure & Natural Farm Products</h2>

        <p>
          Fresh Milk • Dairy Products • Vegetables • Organic Fertilizers
        </p>

        
      </section>
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