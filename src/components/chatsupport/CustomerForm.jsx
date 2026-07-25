import { useState } from "react";
import supabase from "../../lib/supabase";

const CustomerForm = ({ onSave }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Enter valid mobile number");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("support_conversations")
      .insert([
        {
          customer_name: name,
          phone: phone,
          order_id: orderId,
          status: "Open",
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Save conversation id
    localStorage.setItem("conversation_id", data.id);

    // Save customer info
    localStorage.setItem(
      "nano_customer",
      JSON.stringify({
        name,
        phone,
        orderId,
      })
    );

    onSave({
      name,
      phone,
      orderId,
      conversationId: data.id,
    });
  };

  return (
    <div className="customer-form">
      <h3>👋 Welcome</h3>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Mobile Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Order ID (Optional)"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <button onClick={handleContinue} disabled={loading}>
        {loading ? "Please Wait..." : "Continue"}
      </button>
    </div>
  );
};

export default CustomerForm;