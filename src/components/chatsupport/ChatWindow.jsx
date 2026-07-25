import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import CustomerForm from "./CustomerForm";
const ChatWindow = ({ onClose, messages, onSend }) => {
  return (
    <div className="chat-window">

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