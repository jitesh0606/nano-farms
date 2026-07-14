import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import "../styles/TrackOrder.css";
function TrackOrder({ goHome }) {
  const [mobile, setMobile] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
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
  compost: "🍂 Organic Compost",
};
async function searchOrder() {

  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (mobile.trim() !== "") {
    query = query.eq("mobile", mobile.trim());
  } else if (orderId.trim() !== "") {
    query = query.eq("order_number", orderId.trim().toUpperCase());
  }

  const { data, error } = await query;

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }
async function cancelOrder(id) {

  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmCancel) return;

  const { error } = await supabase
    .from("orders")
    .update({ order_status: "Cancelled" })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  searchOrder();
}
  setOrders(data || []);
}
useEffect(() => {

  const channel = supabase
    .channel("orders")

    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "orders",
      },
      () => {
        if (mobile !== "") {
          searchOrder();
        }
      }
    )

    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };

}, [mobile]);
  return (
    <div className="product-page">

      <button onClick={goHome}>
        ⬅ Back Home
      </button>

      <h1>📦 Track Your Order</h1>

      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <br /><br />

<input
  type="text"
  placeholder="Or Enter Order ID (e.g. NF100003)"
  value={orderId}
  onChange={(e) => setOrderId(e.target.value)}
/>
      <br /><br />

      <button onClick={searchOrder}>
        Search
      </button>

      <br /><br />

      {orders.map((order) => (

        <div className="order-summary" key={order.id}>

          <h3>Order #{order.order_number}</h3>

          <p><b>Customer:</b> {order.customer_name}</p>

<p><b>Mobile:</b> {order.mobile}</p>

<p><b>Address:</b> {order.address}</p>

<p>
  <b>Order Date:</b>{" "}
  {new Date(order.created_at).toLocaleDateString("en-IN")}
</p>

<p>
  <b>Order Time:</b>{" "}
  {new Date(order.created_at).toLocaleTimeString("en-IN")}
</p>

          <h3>Status</h3>

<div className="progress-bar">
    <div
  className={`status-badge ${
    order.order_status
      .replace(/\s/g, "")
      .toLowerCase()
  }`}
>
  {order.order_status}
</div>

<br />

<p>
  <b>Estimated Delivery:</b>{" "}
  {order.order_status === "Delivered"
    ? "Delivered Successfully ✅"
    : "Within 24 Hours"}
</p>

  <div className={`
    step
    ${["Pending","Preparing","Out for Delivery","Delivered"]
      .indexOf(order.order_status) >= 0 ? "active" : ""}
  `}>
    ✔ Order Placed
  </div>

  <div className={`
    step
    ${["Preparing","Out for Delivery","Delivered"]
      .indexOf(order.order_status) >= 0 ? "active" : ""}
  `}>
    👨‍🍳 Preparing
  </div>

  <div className={`
    step
    ${["Out for Delivery","Delivered"]
      .indexOf(order.order_status) >= 0 ? "active" : ""}
  `}>
    🚚 Out for Delivery
  </div>

  <div className={`
    step
    ${order.order_status === "Delivered" ? "active" : ""}
  `}>
    📦 Delivered
  </div>

</div>

          <p><b>Payment:</b> {order.payment_method}</p>

          <p><b>Total:</b> ₹{order.total}</p>
        
        <p><b>Ordered Items:</b></p>
         
        <ul style={{ textAlign: "left" }}>
        {Object.entries(order.products)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => (
      <li key={key}>
        {productNames[key]} × {value}
      </li>
    ))}
</ul>
{(order.order_status === "Pending" ||
  order.order_status === "Preparing") && (

  <button
    onClick={() => cancelOrder(order.id)}
    style={{
      background: "#d32f2f",
      color: "white",
      marginTop: "15px",
    }}
  >
    ❌ Cancel Order
  </button>

)}
        </div>

      ))}

    </div>
  );
}

export default TrackOrder;