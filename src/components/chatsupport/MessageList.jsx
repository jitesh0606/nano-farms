const MessageList = ({ messages }) => {
  return (
    <div className="chat-body">

      {messages.map((msg) => (

        <div
          key={msg.id}
          className={
            msg.sender === "customer"
              ? "customer-message"
              : "support-message"
          }
        >
          {msg.text}
        </div>

      ))}

    </div>
  );
};

export default MessageList;