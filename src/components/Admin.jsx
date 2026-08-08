import { useEffect, useMemo, useState } from "react";
import supabase from "../lib/supabase";
import "../styles/Admin.css";
import Support from "./admin/Support";

function Admin({ goHome }) {
  const productNames = {
    rawMilk: "🥛 Raw Milk",
    CowMilk: "🥛 Raw Milk",
    buffaloMilk: "🐃 Buffalo Milk",
    paneer: "🧀 Paneer",
    ghee: "🫙 Ghee",
    curd: "🥣 Curd",
    butter: "🧈 White Butter",
    potato: "🥔 Potato",
    onion: "🧅 Onion",
    tomato: "🍅 Tomato",
    ginger: "🫚 Ginger",
    vermicompost: "🌱 Vermicompost",
    cowDung: "🐄 Cow Dung",
    neemCake: "🌿 Neem Cake",
    compost: "🍂 Organic Compost",
  };

  const statusOptions = [
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const [orders, setOrders] = useState([]);
  const [supportMessages, setSupportMessages] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [reply, setReply] = useState({});

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const [searchOrder, setSearchOrder] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
    fetchSupportMessages();
  }, []);

  async function fetchOrders() {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Orders error:", error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  async function fetchSupportMessages() {
    const { data, error } = await supabase
      .from("support_messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Support messages error:", error);
      return;
    }

    const messages = data || [];
    setSupportMessages(messages);

    const ids = [
      ...new Set(
        messages
          .filter((msg) => msg.customer_id)
          .map((msg) => msg.customer_id)
      ),
    ];

    setCustomers(ids);

    if (!selectedCustomer && ids.length > 0) {
      setSelectedCustomer(ids[0]);
    }
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("orders")
      .update({ order_status: status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, order_status: status } : order
      )
    );

    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => ({ ...prev, order_status: status }));
    }
  }

  async function sendReply(messageId) {
    const text = reply[messageId];

    if (!text?.trim()) {
      alert("Enter a reply");
      return;
    }

    if (!selectedCustomer) {
      alert("No customer selected");
      return;
    }

    const { error } = await supabase.from("support_messages").insert([
      {
        customer_id: selectedCustomer,
        sender: "admin",
        message: text.trim(),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setReply((prev) => ({
      ...prev,
      [messageId]: "",
    }));

    fetchSupportMessages();
  }

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.order_status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.order_status === "Delivered"
  ).length;

  // =========================
// DATE HELPERS
// =========================

const getDateKey = (date) => {
  if (!date) return "";

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getTodayKey = () => {
  return getDateKey(new Date());
};

const getYesterdayKey = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return getDateKey(date);
};

const formatDayLabel = (dateKey, index) => {
  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";

  const date = new Date(`${dateKey}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};


// =========================
// AVAILABLE ORDER DATES
// =========================

const availableDates = useMemo(() => {
  const dateMap = {};

  orders.forEach((order) => {
    if (!order.created_at) return;

    const dateKey = getDateKey(order.created_at);

    if (!dateKey) return;

    dateMap[dateKey] = (dateMap[dateKey] || 0) + 1;
  });

  return Object.entries(dateMap)
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([date, count]) => ({
      date,
      count,
    }));
}, [orders]);
 const filteredOrders = useMemo(() => {
  return orders.filter((order) => {

    // STATUS FILTER
    const statusMatch =
      filter === "All" ||
      order.order_status === filter;


    // ORDER NUMBER SEARCH
    const orderNumber = String(
      order.order_number || ""
    ).toLowerCase();

    const orderMatch =
      searchOrder.trim() === "" ||
      orderNumber.includes(
        searchOrder.trim().toLowerCase()
      );


    // MOBILE SEARCH
    const mobile = String(
      order.mobile || ""
    );

    const mobileMatch =
      searchMobile.trim() === "" ||
      mobile.includes(
        searchMobile.trim()
      );


    // DATE FILTER
    const orderDate = getDateKey(
      order.created_at
    );

    const dateMatch =
      dateFilter === "all" ||
      orderDate === dateFilter;


    return (
      statusMatch &&
      orderMatch &&
      mobileMatch &&
      dateMatch
    );
  });

}, [
  orders,
  filter,
  searchOrder,
  searchMobile,
  dateFilter
]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    if (!status) return "pending";

    return status
      .toLowerCase()
      .replaceAll(" ", "")
      .replaceAll("-", "");
  };

  const getOrderItems = (products) => {
    if (!products || typeof products !== "object") {
      return [];
    }

    return Object.entries(products)
      .filter(([, quantity]) => Number(quantity) > 0)
      .map(([key, quantity]) => ({
        name: productNames[key] || key,
        quantity: Number(quantity),
      }));
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

 const clearFilters = () => {
  setSearchOrder("");
  setSearchMobile("");
  setFilter("All");
  setDateFilter("all");
};
  return (
    <div className="admin-page">
      {/* TOP NAVIGATION */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-brand-icon">🌿</div>

          <div>
            <span>NANO FARMS</span>
            <small>Admin Control Center</small>
          </div>
        </div>

        <div className="admin-top-actions">
          <button className="admin-btn ghost-btn" onClick={fetchOrders}>
            ↻ Refresh
          </button>

          <button className="admin-btn home-btn" onClick={goHome}>
            🏠 Back Home
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
      </header>

      {/* HEADER */}
      <section className="admin-header">
        <div>
          <span className="eyebrow">CONTROL PANEL</span>
          <h1>Admin Dashboard</h1>
          <p>
            Manage orders, monitor delivery status and handle customer
            support from one place.
          </p>
        </div>

        <div className="live-indicator">
          <span></span>
          System Online
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="dashboard-cards">
        <div className="dashboard-card revenue-card">
          <div className="dashboard-icon">💰</div>
          <div>
            <span>Total Revenue</span>
            <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
            <small>Across all orders</small>
          </div>
        </div>

        <div className="dashboard-card orders-card">
          <div className="dashboard-icon">📦</div>
          <div>
            <span>Total Orders</span>
            <h2>{totalOrders}</h2>
            <small>All placed orders</small>
          </div>
        </div>

        <div className="dashboard-card pending-card">
          <div className="dashboard-icon">⏳</div>
          <div>
            <span>Pending Orders</span>
            <h2>{pendingOrders}</h2>
            <small>Need attention</small>
          </div>
        </div>

        <div className="dashboard-card delivered-card">
          <div className="dashboard-icon">✅</div>
          <div>
            <span>Delivered</span>
            <h2>{deliveredOrders}</h2>
            <small>Successfully completed</small>
          </div>
        </div>
      </section>

      {/* SUPPORT / QUICK ACTIONS */}
      <section className="admin-toolbar">
        <div>
          <h2>Order Management</h2>
          <p>Search, filter and update customer orders.</p>
        </div>

        <button
          className="support-open-btn"
          onClick={() => setShowSupport(true)}
        >
          💬 Customer Support
          {customers.length > 0 && (
            <span className="support-count">{customers.length}</span>
          )}
        </button>
      </section>

      {/* SEARCH */}
      <section className="search-panel">
        <div className="search-heading">
          <span>🔎</span>
          <div>
            <h3>Find an Order</h3>
            <p>Search by order number or customer's mobile number.</p>
          </div>
        </div>

        <div className="search-boxes">
          <div className="input-wrap">
            <span>🆔</span>
            <input
              type="text"
              placeholder="Search Order Number"
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
            />
          </div>

          <div className="input-wrap">
            <span>📱</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Search Mobile Number"
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
            />
          </div>

          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </section>
    {/* =========================
    DATE FILTER
========================= */}

<section className="date-filter-section">

  <div className="date-filter-heading">

    <div className="date-filter-icon">
      📅
    </div>

    <div>

      <span className="eyebrow">
        ORDER TIMELINE
      </span>

      <h3>
        Orders by Date
      </h3>

      <p>
        Click a date to see all orders placed that day.
      </p>

    </div>

  </div>


  <div className="date-filter-buttons">

    {/* ALL DATES */}

    <button
      type="button"
      className={
        dateFilter === "all"
          ? "date-filter-card active"
          : "date-filter-card"
      }
      onClick={() => setDateFilter("all")}
    >

      <div className="date-card-icon">
        🗂️
      </div>

      <div className="date-card-content">

        <strong>
          All Dates
        </strong>

        <span>
          {orders.length}{" "}
          {orders.length === 1 ? "order" : "orders"}
        </span>

      </div>

      <div className="date-card-arrow">
        →
      </div>

    </button>


    {/* ACTUAL DATES */}

    {availableDates.map((item, index) => (

      <button
        type="button"
        key={item.date}
        className={
          dateFilter === item.date
            ? "date-filter-card active"
            : "date-filter-card"
        }
        onClick={() => setDateFilter(item.date)}
      >

        <div className="date-card-icon">

          {index === 0
            ? "🟢"
            : index === 1
            ? "🟡"
            : "📅"}

        </div>


        <div className="date-card-content">

          <strong>
            {formatDayLabel(item.date, index)}
          </strong>

          <span>
            {item.count}{" "}
            {item.count === 1 ? "order" : "orders"}
          </span>

        </div>


        <div className="date-card-arrow">
          →
        </div>

      </button>

    ))}

  </div>

</section>
      {/* FILTERS */}
      <section className="filter-section">
        <div className="filter-title">
          <span>📊</span>
          <strong>Order Status</strong>
        </div>

        <div className="filter-buttons">
          {["All", ...statusOptions].map((status) => (
            <button
              key={status}
              className={filter === status ? "active" : ""}
              onClick={() => setFilter(status)}
            >
              {status === "All" ? "All Orders" : status}
            </button>
          ))}
        </div>
      </section>

      {/* ORDERS */}
      <section className="orders-section">
        <div className="section-title-row">
          <div>
            <span className="eyebrow">LIVE ORDERS</span>
            <h2>Customer Orders</h2>
          </div>

          <span className="result-count">
            {filteredOrders.length} result
            {filteredOrders.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="loading-orb">⏳</div>
            <h3>Loading orders...</h3>
            <p>Fetching the latest order data.</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">😕</div>
            <h3>No Orders Found</h3>
            <p>Try changing your search or status filter.</p>
            <button onClick={clearFilters}>Reset Filters</button>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => {
              const items = getOrderItems(order.products);
              const status = order.order_status || "Pending";

              return (
                <article className="order-summary" key={order.id}>
                  <div className="order-card-top">
                    <div>
                      <span className="order-label">ORDER</span>
                      <h3>{order.order_number || "No Order ID"}</h3>
                    </div>

                    <span
                      className={`status-badge ${getStatusClass(status)}`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="customer-mini">
                    <div className="avatar">
                      {(order.customer_name || "C").charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <strong>{order.customer_name || "Unknown Customer"}</strong>
                      <span>📱 {order.mobile || "No mobile"}</span>
                    </div>
                  </div>

                  <div className="order-meta">
                    <div>
                      <span>Payment</span>
                      <strong>
                        {String(order.payment_method || "COD").toUpperCase()}
                      </strong>
                    </div>

                    <div>
                      <span>Total</span>
                      <strong>₹{Number(order.total || 0).toLocaleString("en-IN")}</strong>
                    </div>

                    <div>
                      <span>Placed</span>
                      <strong>{formatDate(order.created_at)}</strong>
                    </div>
                  </div>

                  <div className="items-box">
                    <div className="items-heading">
                      <span>🛍️ Ordered Items</span>
                      <span>{items.length} types</span>
                    </div>

                    {items.length > 0 ? (
                      <ul>
                        {items.map((item) => (
                          <li key={item.name}>
                            <span>{item.name}</span>
                            <b>×{item.quantity}</b>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-items">No product information.</p>
                    )}
                  </div>

                  <div className="status-control">
                    <label htmlFor={`status-${order.id}`}>
                      Update Status
                    </label>

                    <select
                      id={`status-${order.id}`}
                      value={status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="details-btn"
                    onClick={() => openDetails(order)}
                  >
                    View Full Details →
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ORDER DETAILS POPUP */}
      {showDetails && selectedOrder && (
        <div
          className="popup-overlay"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="popup-close"
              onClick={() => setShowDetails(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="popup-icon">📦</div>

            <span className="eyebrow">ORDER DETAILS</span>
            <h2>{selectedOrder.order_number || "Order"}</h2>

            <div className="popup-status-row">
              <span
                className={`status-badge ${getStatusClass(
                  selectedOrder.order_status || "Pending"
                )}`}
              >
                {selectedOrder.order_status || "Pending"}
              </span>

              <strong>
                ₹{Number(selectedOrder.total || 0).toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="details-list">
              <div>
                <span>👤 Name</span>
                <strong>{selectedOrder.customer_name || "—"}</strong>
              </div>

              <div>
                <span>📱 Mobile</span>
                <strong>{selectedOrder.mobile || "—"}</strong>
              </div>

              <div>
                <span>💳 Payment</span>
                <strong>
                  {String(selectedOrder.payment_method || "COD").toUpperCase()}
                </strong>
              </div>

              <div className="address-detail">
                <span>📍 Address</span>
                <strong>{selectedOrder.address || "—"}</strong>
              </div>
            </div>

            <div className="popup-items">
              <h3>Ordered Items</h3>

              {getOrderItems(selectedOrder.products).map((item) => (
                <div key={item.name}>
                  <span>{item.name}</span>
                  <b>×{item.quantity}</b>
                </div>
              ))}
            </div>

            <button
              className="popup-main-btn"
              onClick={() => setShowDetails(false)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* SUPPORT MODAL */}
      {showSupport && (
        <div
          className="support-modal"
          onClick={() => setShowSupport(false)}
        >
          <div
            className="support-window"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="support-close"
              onClick={() => setShowSupport(false)}
              aria-label="Close support"
            >
              ✕
            </button>

            <Support />
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;