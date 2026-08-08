import { useEffect, useMemo, useState } from "react";
import supabase from "../lib/supabase";
import "../styles/Trackorder.css";

function TrackOrder({ goHome }) {
  const [mobile, setMobile] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const statusSteps = [
    { key: "Pending", icon: "🕐", label: "Order Placed" },
    { key: "Preparing", icon: "👨‍🍳", label: "Preparing" },
    { key: "Out for Delivery", icon: "🚚", label: "Out for Delivery" },
    { key: "Delivered", icon: "✓", label: "Delivered" },
  ];

  const getStatusClass = (status) =>
    String(status || "Pending")
      .toLowerCase()
      .replaceAll(" ", "")
      .replaceAll("-", "");

  const getStatusIndex = (status) => {
    if (status === "Cancelled") return -1;

    const index = statusSteps.findIndex((step) => step.key === status);
    return index === -1 ? 0 : index;
  };

  async function searchOrder() {
    if (!mobile.trim() && !orderId.trim()) {
      alert("Enter your mobile number or order ID.");
      return;
    }

    setLoading(true);

    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (mobile.trim()) {
      query = query.eq("mobile", mobile.trim());
    } else {
      query = query.eq(
        "order_number",
        orderId.trim().toUpperCase()
      );
    }

    const { data, error } = await query;

    setLoading(false);

    if (error) {
      alert(error.message);
      console.error(error);
      return;
    }

    setOrders(data || []);
    setExpandedOrder(null);
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

    await searchOrder();
  }

  useEffect(() => {
    const channel = supabase
      .channel("track-orders")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },
        () => {
          if (mobile.trim() || orderId.trim()) {
            searchOrder();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [mobile, orderId]);

  const hasSearch = useMemo(
    () => mobile.trim() || orderId.trim(),
    [mobile, orderId]
  );

  return (
    <main className="track-page">
      <div className="track-shell">
        {/* HERO */}
        <section className="track-hero">
          <div className="track-hero-glow"></div>

          <button className="track-back-btn" onClick={goHome}>
            ← Back Home
          </button>

          <div className="track-hero-content">
            <div className="track-icon-orb">📦</div>

            <div>
              <span className="track-eyebrow">NANO FARMS DELIVERY</span>
              <h1>Track Your Order</h1>
              <p>
                Check your order status and delivery progress in real time.
              </p>
            </div>
          </div>
        </section>

        {/* SEARCH PANEL */}
        <section className="track-search-card">
          <div className="track-search-title">
            <div className="search-icon-3d">🔎</div>

            <div>
              <span>ORDER LOOKUP</span>
              <h2>Find your order</h2>
              <p>
                Use your mobile number or your Nano Farms order ID.
              </p>
            </div>
          </div>

          <div className="track-input-grid">
            <label className="track-input">
              <span>📱</span>
              <div>
                <small>Mobile Number</small>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    if (e.target.value) setOrderId("");
                  }}
                />
              </div>
            </label>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <label className="track-input">
              <span>🆔</span>
              <div>
                <small>Order ID</small>
                <input
                  type="text"
                  placeholder="e.g. NF100003"
                  value={orderId}
                  onChange={(e) => {
                    setOrderId(e.target.value);
                    if (e.target.value) setMobile("");
                  }}
                />
              </div>
            </label>

            <button
              className="track-search-btn"
              onClick={searchOrder}
              disabled={loading}
            >
              {loading ? "Searching..." : "🔍 Search Order"}
            </button>
          </div>
        </section>

        {/* RESULTS */}
        <section className="track-results">
          <div className="results-heading">
            <div>
              <span className="track-eyebrow dark">YOUR ORDERS</span>
              <h2>
                {orders.length > 0
                  ? `${orders.length} Order${orders.length > 1 ? "s" : ""} Found`
                  : "Order Results"}
              </h2>
            </div>

            {hasSearch && orders.length > 0 && (
              <span className="result-pill">
                ✓ Live updates enabled
              </span>
            )}
          </div>

          {!loading && hasSearch && orders.length === 0 && (
            <div className="track-empty">
              <div className="empty-3d">📦</div>
              <h3>No order found</h3>
              <p>
                Check your mobile number or order ID and try again.
              </p>
            </div>
          )}

          {!hasSearch && (
            <div className="track-empty initial-empty">
              <div className="empty-3d">🚚</div>
              <h3>Ready to track?</h3>
              <p>
                Enter your mobile number or order ID above to see your delivery.
              </p>
            </div>
          )}

          <div className="tracked-orders-grid">
            {orders.map((order) => {
              const status = order.order_status || "Pending";
              const statusIndex = getStatusIndex(status);
              const items = order.products
                ? Object.entries(order.products)
                    .filter(([, value]) => Number(value) > 0)
                    .map(([key, value]) => ({
                      name: productNames[key] || key,
                      quantity: Number(value),
                    }))
                : [];

              const isExpanded = expandedOrder === order.id;

              return (
                <article
                  className={`track-order-card ${
                    isExpanded ? "expanded" : ""
                  }`}
                  key={order.id}
                >
                  <div className="track-card-top">
                    <div>
                      <span>ORDER</span>
                      <h3>#{order.order_number}</h3>
                    </div>

                    <span
                      className={`track-status ${getStatusClass(status)}`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="track-customer">
                    <div className="customer-avatar">
                      {(order.customer_name || "C")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>{order.customer_name || "Customer"}</strong>
                      <small>📱 {order.mobile || "—"}</small>
                    </div>
                  </div>

                  {/* PROGRESS */}
                  {status === "Cancelled" ? (
                    <div className="cancelled-track">
                      <div className="cancelled-icon">✕</div>
                      <div>
                        <strong>Order Cancelled</strong>
                        <small>
                          This order will not be processed for delivery.
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div className="track-progress">
                      {statusSteps.map((step, index) => {
                        const active = index <= statusIndex;
                        const current = index === statusIndex;

                        return (
                          <div
                            className={`progress-step ${
                              active ? "active" : ""
                            } ${current ? "current" : ""}`}
                            key={step.key}
                          >
                            <div className="step-node">
                              {active ? step.icon : index + 1}
                            </div>

                            <span>{step.label}</span>

                            {index < statusSteps.length - 1 && (
                              <div
                                className={`step-line ${
                                  index < statusIndex ? "filled" : ""
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="track-card-summary">
                    <div>
                      <span>Total</span>
                      <strong>
                        ₹{Number(order.total || 0).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div>
                      <span>Payment</span>
                      <strong>
                        {String(order.payment_method || "COD").toUpperCase()}
                      </strong>
                    </div>

                    <div>
                      <span>Items</span>
                      <strong>{items.length} types</strong>
                    </div>
                  </div>

                  <button
                    className="details-toggle"
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order.id)
                    }
                  >
                    {isExpanded ? "▲ Hide Details" : "▼ View Details"}
                  </button>

                  {isExpanded && (
                    <div className="expanded-details">
                      <div className="detail-row address-row">
                        <span>📍 Delivery Address</span>
                        <strong>{order.address || "—"}</strong>
                      </div>

                      <div className="detail-row">
                        <span>💳 Payment Method</span>
                        <strong>
                          {String(
                            order.payment_method || "COD"
                          ).toUpperCase()}
                        </strong>
                      </div>

                      <div className="detail-items">
                        <div className="detail-items-head">
                          <strong>🛍️ Ordered Items</strong>
                          <span>{items.length} types</span>
                        </div>

                        {items.length > 0 ? (
                          items.map((item) => (
                            <div className="detail-item" key={item.name}>
                              <span>{item.name}</span>
                              <b>×{item.quantity}</b>
                            </div>
                          ))
                        ) : (
                          <p>No product information available.</p>
                        )}
                      </div>

                      {status === "Pending" || status === "Preparing" ? (
                        <button
                          className="cancel-order-btn"
                          onClick={() => cancelOrder(order.id)}
                        >
                          ❌ Cancel Order
                        </button>
                      ) : null}
                    </div>
                  )}

                  {status !== "Pending" &&
                    status !== "Preparing" &&
                    status !== "Cancelled" && (
                      <div className="delivery-note">
                        {status === "Delivered"
                          ? "🎉 Your order has been delivered successfully."
                          : "🚚 Your order is on its way."}
                      </div>
                    )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default TrackOrder;
