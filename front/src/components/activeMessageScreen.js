import { React, useRef, useEffect, useState } from "react";
import "../styles/chatList.css";
import { MessageView } from "./singleChatMessage";
import { currentUser } from "../model/currentUserData";
import { formatMessageDate, formatDates } from "../common/Common";

export function ChatListContainer({ messages, onEdit, name, onDelete }) {
  const messageDisplayRef = useRef(null);

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

  const handleDeleteClick = (messageID) => {
    onDelete(messageID);
  };

  let previousDate = null;

  const formatDisplayDate = (date) => {
    const formattedDate = formatDates(date);
    return formattedDate;
  };

  return (
    <div className="MessageDisplay" ref={messageDisplayRef}>
      {messages.length === 0 ? (
        <div className="emptyError"></div>
      ) : (
        messages.map((message, index) => {
          const messageDate = formatDates(new Date(message.created_at));
          const showDate = previousDate !== messageDate;

          previousDate = messageDate;

          return (
            <>
              {showDate && (
                <div>{formatDisplayDate(new Date(message.created_at))}</div>
              )}
              <MessageView
                name={name}
                key={index}
                created_at={formatMessageDate(new Date(message.created_at))}
                messageID={message.id}
                message={message.text}
                isSenders={currentUser.userId === message.senderId}
                onDelete={handleDeleteClick}
                senderid={message.senderId}
                onEdit={handleEditClick}
              />
            </>
          );
        })
      )}
    </div>
  );
}
