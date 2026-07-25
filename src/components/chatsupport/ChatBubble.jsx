import React from "react";

const ChatBubble = ({ onClick }) => {
  return (
    <button className="chat-bubble" onClick={onClick}>
      💬
    </button>
  );
};

export default ChatBubble;