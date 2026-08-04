import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import CustomerForm from "./CustomerForm";
import { useEffect, useRef } from "react";
const ChatWindow = ({ onClose, messages, onSend }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  return (
    <div className="chat-window" ref={chatRef}>
      <div className="chat-header">
        <h3>🌿 Nano Farms Support</h3>
        <button onClick={onClose}>✖</button>
      </div>

      <MessageList messages={messages} />
      <MessageInput onSend={onSend} />
    </div>
  );
};

export default ChatWindow;