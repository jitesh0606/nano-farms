import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";
import "./ChatSupport.css";
import supabase from "../../lib/supabase";

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: "support",
      text: "👋 Welcome to Nano Farms! How can we help you today?",
    },
  ]);

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("support-chat")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "support_messages",
        },
        (payload) => {
          console.log("Realtime Event:", payload);
          fetchMessages();
        }
      )
      .subscribe((status) => {
        console.log("Realtime Status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("support_messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Fetch Error:", error);
      return;
    }

    console.log("Fetched Messages:", data);

    const formatted = [
      {
        id: 0,
        sender: "support",
        text: "👋 Welcome to Nano Farms! How can we help you today?",
      },
      ...(data || []).map((msg) => ({
        id: msg.id,
        sender: msg.sender,
        text: msg.message,
      })),
    ];

    console.log("Formatted Messages:", formatted);

    setMessages(formatted);
  }

  async function handleSend(text) {
    if (!text.trim()) return;

    const { error } = await supabase
      .from("support_messages")
      .insert([
        {
          sender: "customer",
          message: text,
        },
      ]);

    if (error) {
      console.error("Insert Error:", error);
      alert(error.message);
      return;
    }

    fetchMessages();
  }

  console.log("Current Messages State:", messages);

  return (
    <>
      <ChatBubble onClick={() => setIsOpen(true)} />

      {isOpen && (
        <ChatWindow
          onClose={() => setIsOpen(false)}
          messages={messages}
          onSend={handleSend}
        />
      )}
    </>
  );
};

export default ChatSupport;