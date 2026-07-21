import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import "../styles/Admin.css";
function Admin({ goHome }) {

console.log("ADMIN COMPONENT LOADED");
const productNames = {
  rawMilk: "🥛 Raw Milk",
  buffaloMilk: "🐃 Buffalo Milk",
  paneer: "🧀 Paneer",
  ghee: "🫙 Ghee",
  curd: "🥣 Curd",
  butter: "🧈 Butter",
  potato: "🥔 Potato",
  onion: "🧅 Onion",
  tomato: "🍅 Tomato",
  ginger: "🫚 Ginger",
  vermicompost: "🌱 Vermicompost",
  cowDung: "🐄 Cow Dung",
  neemCake: "🌿 Neem Cake",
  compost: "🍂 Compost",
};
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
const [showDetails, setShowDetails] = useState(false);
  const [searchOrder, setSearchOrder] = useState("");
const [searchMobile, setSearchMobile] = useState("");
const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {

    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  }
  
async function updateStatus(id, status) {

  console.log("Updating", id, status);

  const { data, error } = await supabase
    .from("orders")
    .update({
      order_status: status,
    })
    .eq("id", id)
    .select();

  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  fetchOrders();
}
const totalOrders = orders.length;

const totalRevenue = orders.reduce(
  (sum, order) => sum + Number(order.total),
  0
);

const pendingOrders = orders.filter(
  (order) => order.order_status === "Pending"
).length;

const deliveredOrders = orders.filter(
  (order) => order.order_status === "Delivered"
).length;
  return (
    <div className="product-page">

     <div className="admin-topbar">
  <button className="admin-btn" onClick={goHome}>
    ⬅ Back Home
  </button>

  <button
    className="admin-btn logout-btn"
    onClick={async () => {
      await supabase.auth.signOut();
      window.location.reload();
    }}
  >
    🔓 Logout
  </button>
</div>

<div className="admin-header">
  <h1>🌿 Nano Farms Admin Dashboard</h1>
  <p>Manage Orders, Revenue & Deliveries</p>
</div>
     <div className="search-boxes">

  <input
    type="text"
    placeholder="Search Order Number"
    value={searchOrder}
    onChange={(e) => setSearchOrder(e.target.value)}
  />

  <br /><br />

  <input
    type="text"
    placeholder="Search Mobile Number"
    value={searchMobile}
    onChange={(e) => setSearchMobile(e.target.value)}
  />
{showDetails && selectedOrder && (
  <div className="popup-overlay">
    <div className="popup-box">

      <h2>{selectedOrder.order_number}</h2>

      <p><b>Name:</b> {selectedOrder.customer_name}</p>

      <p><b>Mobile:</b> {selectedOrder.mobile}</p>

      <p><b>Address:</b> {selectedOrder.address}</p>

      <p><b>Payment:</b> {selectedOrder.payment_method}</p>

      <p><b>Status:</b> {selectedOrder.order_status}</p>

      <p><b>Total:</b> ₹{selectedOrder.total}</p>

      <button onClick={() => setShowDetails(false)}>
        Close
      </button>

    </div>
  </div>
)}
</div>
      <div className="filter-buttons">

  <button onClick={() => setFilter("All")}>All</button>

  <button onClick={() => setFilter("Pending")}>
    Pending
  </button>

  <button onClick={() => setFilter("Preparing")}>
    Preparing
  </button>

  <button onClick={() => setFilter("Out for Delivery")}>
    Out for Delivery
  </button>

  <button onClick={() => setFilter("Delivered")}>
    Delivered
  </button>

  <button onClick={() => setFilter("Cancelled")}>
    Cancelled
  </button>

</div>
      <div className="dashboard-cards">

  <div className="dashboard-card">
    <h3>📦 Total Orders</h3>
    <h2>{totalOrders}</h2>
  </div>

  <div className="dashboard-card">
    <h3>💰 Revenue</h3>
    <h2>₹{totalRevenue}</h2>
  </div>

  <div className="dashboard-card">
    <h3>🟡 Pending</h3>
    <h2>{pendingOrders}</h2>
  </div>

  <div className="dashboard-card">
    <h3>✅ Delivered</h3>
    <h2>{deliveredOrders}</h2>
  </div>

</div>
      <input
  type="text"
  placeholder="Search by Name or Mobile..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "350px",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
  }}
/>

   {orders
  .filter((order) => {

    const statusMatch =
      filter === "All" ||
      order.order_status === filter;

    const orderMatch =
      searchOrder === "" ||
      order.order_number
        .toLowerCase()
        .includes(searchOrder.toLowerCase());

    const mobileMatch =
      searchMobile === "" ||
      order.mobile.includes(searchMobile);

    return statusMatch && orderMatch && mobileMatch;

  })
  .map((order) => (

        <div className="order-summary" key={order.id}>

          <h3>{order.order_number}</h3>

          <p><b>Name:</b> {order.customer_name}</p>

          <p><b>Mobile:</b> {order.mobile}</p>

          <p><b>Total:</b> ₹{order.total}</p>

          <p><b>Payment:</b> {order.payment_method}</p>
           <p><b>Ordered Items:</b></p>

<ul style={{ textAlign: "left", margin: "10px 0" }}>
  {Object.entries(order.products)
    .filter(([key, value]) => value > 0)
    .map(([key, value]) => (
     <li key={key}>
  {productNames[key] || key} × {value}
</li>
    ))}
</ul>
<button
  onClick={() => {
    setSelectedOrder(order);
    setShowDetails(true);
  }}
>
  👁 View Details
</button>
{orders
  .filter((order) => {

    const statusMatch =
      filter === "All" ||
      order.order_status === filter;

    const orderMatch =
      searchOrder === "" ||
      order.order_number
        .toLowerCase()
        .includes(searchOrder.toLowerCase());

    const mobileMatch =
      searchMobile === "" ||
      order.mobile.includes(searchMobile);

    return statusMatch && orderMatch && mobileMatch;

  }).length === 0 && (

    <h2 style={{ textAlign: "center" }}>
      No Orders Found 😕
    </h2>

)}
         <label><b>Status:</b></label>
<div
  className={`status-badge ${
    order.order_status
      .replace(/\s/g, "")
      .toLowerCase()
  }`}
>
  {order.order_status}
</div>
<select
  value={order.order_status || "Pending"}
  onChange={(e) => {
    alert("Changed: " + e.target.value);
    updateStatus(order.id, e.target.value);
  }}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    fontSize: "16px"
  }}
>
  <option value="Pending">
    Pending
  </option>

  <option value="Preparing">
    Preparing
  </option>

  <option value="Out for Delivery">
    Out for Delivery
  </option>

  <option value="Delivered">
    Delivered
  </option>

  <option value="Cancelled">
    Cancelled
  </option>

</select>

        </div>

      ))}

    </div>
  );
}

export default Admin;