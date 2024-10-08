import React from "react";
import "../styles/chatList.css";
import "../components/chatTextField";
import "../components/activeMessageScreen";
import ChatSend from "../components/chatTextField";
import { ChatListContainer } from "../components/activeMessageScreen";
import { useState, useEffect } from "react";
import { currentUser } from "../model/currentUserData";
import { v4 as uuid } from "uuid";
import axiosConfig from "../config/axiosConfig";
import { StatusPopUp } from "./StatusPopUp";
import { Bot } from "../model/Bot";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import axiosInstance from "../config/axiosConfig";
// import Suggestionbox from '../components/suggestionbox'
export function ChatUI(props) {
  // console.log(props.copiedtext)

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const [editedMessage, setEditedMessage] = useState(null);
  const [joined, setJoin] = useState(false);
  // const channel = props.ably.channels.get('private_chat');

  useEffect(() => {
    setMessages([]);
  }, [props.user]);

  useEffect(() => {
    const ids = [currentUser.userId, props.user];
    const sortedId = ids.sort();

    const newChannel = props.ably.channels.get(
      `private_chat:${sortedId[0]}${sortedId[1]}`
    );
    setChannel(newChannel);

    newChannel.subscribe("private_chat", (message) => {
      if (message.data.senderId !== currentUser.userId) {
        setMessages([...props.messages, message.data]);
      }
    });

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [props.user, props.ably.channels, channel]);
  const onMessageAdd = (message) => {
    const messageUUID = uuid();

    let newMessage = {};
    props.name === "Channels"
      ? (newMessage = {
          messageId: messageUUID,
          text: message,
          reciverId: null,
          inRoom: 1,
          roomId: props.user,
          senderId: currentUser.userId,
          created_at: new Date(),
        })
      : (newMessage = {
          messageId: messageUUID,
          text: message,
          reciverId: props.user,
          inRoom: 0,
          roomId: null,
          senderId: currentUser.userId,
          created_at: new Date(),
        });

    axiosConfig
      .post("/chat/", newMessage)
      .then((response) => {
        console.log(response.data);
        setMessages([...props.messages, newMessage]);
      })
      .catch((error) => {
        throw error;
      });
  };
  const onUpdateMessage = (messageID, updatedText) => {
    const body = {
      text: updatedText,
    };
    axiosConfig
      .patch(`/chat/${messageID}`, body)
      .then((response) => {
        console.log("Chat updated successfully:", response.data);
        const updatedMessages = props.messages.map((msg) => {
          if (msg.id === messageID) {
            return { ...msg, text: updatedText };
          }
          return msg;
        });
        setMessages(updatedMessages);
      })
      .catch((error) => {
        console.log("Error updating chat:", error);
      });
  };

  const onMessageSend = () => {
    if (message.trim() !== "") {
      if (editedMessage) {
        onUpdateMessage(editedMessage.messageID, message);
        setEditedMessage(null);
      } else {
        onMessageAdd(message);
      }

      setMessage("");
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const joinHandler = () => {
    setJoin(true);
  };
  const onkeyPressHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onMessageSend();
    }
  };
  const handleEdit = (messageID, message) => {
    setEditedMessage({ messageID, message });
    setMessage(message);
  };
  const handleDelete = (messageID) => {
    axiosConfig
      .delete(`/chat/${messageID}`)
      .then((response) => {
        const notDeletedMessages = props.messages.filter(
          (msg) => msg.id !== messageID
        );
        setMessages(notDeletedMessages);
      })
      .catch((error) => {
        console.log("Error deleting message:", error);
      });
  };

  return (
    <div
      className="h-screen"
      onContextMenu={(e) => {
        e.preventDefault();
        console.log("Right Click");
        // console.log(props.isedited)
      }}
    >
      <div
        className="w-full
                h-14
             bg-profile
               flex
              items-center
              rounded-0
              border-b
            border-white
              border-1"
      >
        <div className="w-1/12">
          {props.user.profileImg ? (
            <img
              alt="user profile"
              className="chatProfile"
              src={props.user.profileImg}
            />
          ) : (
            <img
              alt="user profile"
              className="chatProfile"
              src={props.name === "Channels"? "https://static.vecteezy.com/system/resources/thumbnails/001/760/457/small/megaphone-loudspeaker-making-announcement-vector.jpg":
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"}
            />
          )}
        </div>
        <div className="flex flex-col w-10/12 items-start">
          <div className="profilename">{props.username}</div>
          <div class="recentSentAt1">
            {props.name === "Channels"
              ? "10 subscribers"
              : "last seen recently"}
          </div>
        </div>

        <div className="w-2/12">
          {props.name === "Channels" ? "" : <StatusPopUp />}
        </div>
      </div>
      <ChatListContainer
        onEdit={handleEdit}
        onDelete={handleDelete}
        name={props.name}
        messages={messages.length === 0 ? props.messages : messages}
      />

      <div className="flex justify-center w-full bottom-2">
        {props.name !== "Channels" ||
        props.selectedChannel.created_by === currentUser.userId ? (
          <>
            <input
              type="text"
              className="w-11/12 rounded-2xl h-12 border-4 border-white-500/100  mt-6 outline-none"
              value={message}
              placeholder="Type something here ..."
              onChange={handleInputChange}
              onKeyDown={onkeyPressHandler}
            />
            <div className="w-1/13 bg-profile rounded-full shadow-md pt-1  -ml-11 mt-6 ">
              <IconButton
                color="white"
                className="sendBtnIcon"
                aria-label="Send Message"
                component="label"
                onClick={onMessageSend}
              >
                <SendIcon
                  style={{
                    color: "white",
                    width: 20,
                    height: 20,
                  }}
                />
              </IconButton>
            </div>
          </>
        ) : (""
          // <>
          //   {joined ? null : (
          //     <div
          //       onClick={joinHandler}
          //       className="cursor-pointer p-2 rounded-lg w-52 text-white bg-blue-400 hover:-translate-y-2"
          //     >
          //       join Channel
          //     </div>
          //   )}
          // </>
        )}
      </div>
    </div>
  );
}