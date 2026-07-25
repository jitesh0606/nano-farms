import { useState } from "react";

const MessageInput = ({ onSend }) => {

  const [text, setText] = useState("");

  const send = () => {

    if (!text.trim()) return;

    onSend(text);

    setText("");

  };

  return (
    <div className="chat-footer">

      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send();
          }
        }}
      />

      <button onClick={send}>
        Send
      </button>

    </div>
  );
};

export default MessageInput;