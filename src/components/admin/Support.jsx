import { useEffect, useRef, useState } from "react";
import supabase from "../../lib/supabase";
import "./Support.css";

function Support() {
  const [messages, setMessages] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [reply, setReply] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("admin-support")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "support_messages",
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, selectedCustomer]);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("support_messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    setMessages(data || []);

    const ids = [
      ...new Set(
        (data || [])
          .filter((m) => m.customer_id)
          .map((m) => m.customer_id)
      ),
    ];

    setCustomers(ids);

    if (!selectedCustomer && ids.length > 0) {
      setSelectedCustomer(ids[0]);
    }
  }

  async function sendReply() {
    if (!reply.trim() || !selectedCustomer) return;

    const { error } = await supabase
      .from("support_messages")
      .insert([
        {
          customer_id: selectedCustomer,
          sender: "admin",
          message: reply.trim(),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setReply("");
  }

  const chat = messages.filter(
    (m) => m.customer_id === selectedCustomer
  );

  return (
    <div className="support-container">

      {/* LEFT SIDEBAR */}

      <div className="support-sidebar">

        <div className="sidebar-header">
          <h2>Customers</h2>
        </div>

        <div className="customer-list">

          {customers.length === 0 ? (

            <div className="empty-customers">
              No Customers
            </div>

          ) : (

            customers.map((id, index) => (

              <div
                key={id}
                className={`customer-item ${
                  selectedCustomer === id ? "active" : ""
                }`}
                onClick={() => setSelectedCustomer(id)}
              >

                <div className="customer-avatar">
                  👤
                </div>

                <div className="customer-info">

                  <div className="customer-name">
                    Customer #{index + 1}
                  </div>

                  <div className="customer-id">
                    {id.slice(0, 10)}...
                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* RIGHT CHAT */}

      <div className="support-chat">

        <div className="chat-header">

          {selectedCustomer ? (
            <>
              <div className="chat-title">
                Customer
              </div>

              <div className="chat-subtitle">
                {selectedCustomer.slice(0, 15)}...
              </div>
            </>
          ) : (
            <div className="chat-title">
              Select Customer
            </div>
          )}

        </div>

        <div className="chat-body">

          {selectedCustomer ? (

            chat.length === 0 ? (

              <div className="empty-chat">
                No Messages
              </div>

            ) : (

              chat.map((msg) => (

                <div
                  key={msg.id}
                  className={`message-row ${
                    msg.sender === "admin"
                      ? "right"
                      : "left"
                  }`}
                >

                  <div
                    className={
                      msg.sender === "admin"
                        ? "admin-msg"
                        : "customer-msg"
                    }
                  >
                    {msg.message}
                  </div>

                </div>

              ))

            )

          ) : (

            <div className="empty-chat">
              Select a customer
            </div>

          )}

          <div ref={bottomRef}></div>

        </div>

        {selectedCustomer && (

          <div className="chat-footer">

            <input
              type="text"
              placeholder="Type your reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendReply();
                }
              }}
            />

            <button onClick={sendReply}>
              Send
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Support;