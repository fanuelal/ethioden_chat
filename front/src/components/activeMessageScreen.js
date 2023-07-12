import { React, useRef, useEffect, useState } from "react";
import "../styles/chatList.css";
import { MessageView } from "./singleChatMessage";
import { currentUser } from "../model/currentUserData";
import { formatMessageDate } from "../common/Common";

export function ChatListContainer({ messages, onEdit , name, onDelete}) {
  const messageDisplayRef = useRef(null);
  const [message, setMessage] = useState([]);
  const [currentDate, setCurrentDate] = useState(formatMessageDate(new Date()));

  const scrollToBottom = () => {
    messageDisplayRef.current.scrollTop = messageDisplayRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(formatMessageDate(new Date()));
    }, 1000 * 60 * 60 * 24); // Update date every day (24 hours)

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleEditClick = (messageID, message) => {
    onEdit(messageID, message);
  };

  const handleDeleteClick = (messageID) => {
    onDelete(messageID);
  };

  let previousDate = null;

  const formatDisplayDate = (date) => {
    const formattedDate = formatMessageDate(date);
    if (formattedDate === currentDate) {
      return "Today";
    }
    return formattedDate;
  };

  return (
    <div className="MessageDisplay" ref={messageDisplayRef}>
      {messages.length === 0 ? (
        <div className="emptyError"></div>
      ) : (
        messages.map((message, index) => {
          const messageDate = formatMessageDate(new Date(message.created_at));
          const showDate = previousDate !== messageDate;

          previousDate = messageDate;

          return (
            <>
              {showDate && <div>{formatDisplayDate(new Date(message.created_at))}</div>}
              <MessageView 
                name={name}
                key={index}
                created_at={formatDisplayDate(new Date(message.created_at))}
                messageID={message.id}
                message={message.text}
                isSenders={currentUser.userId === message.senderId}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
              />
            </>
          );
        })
      )}
    </div>
  );
}
