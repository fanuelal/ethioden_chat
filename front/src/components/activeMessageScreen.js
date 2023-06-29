import { React, useRef, useEffect, useState } from "react";
import "../styles/chatList.css";
import { MessageView } from "./singleChatMessage";
import { currentUser } from "../model/currentUserData";
import { formatMessageDate } from "../common/Common";

export function ChatListContainer({ messages,onEdit ,bot, onDelete}) {
  const messageDisplayRef = useRef(null);
  const [message, setMessage] = useState([]);

  const scrollToBottom = () => {
    messageDisplayRef.current.scrollTop =
      messageDisplayRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEditClick = (messageID, message) => {
    onEdit(messageID, message);
  };
  const hendleDeleteClick =(messageID) => {
    onDelete(messageID);
  };

  return (
    <div className="MessageDisplay" ref={messageDisplayRef}>
      {messages.length === 0 ? (
        <div className="emptyError"></div>
      ) : (
        messages.map((message, index) => (
          <MessageView 
            key={index}
            // created_at={formatMessageDate(new Date(message.created_at))}
            messageID={message.id}
            message={message.text}
            isSenders={currentUser.userId === message.senderId}
            onDelete={hendleDeleteClick}
            onEdit={handleEditClick}
          />
        ))
      )}
    </div>
  );
}