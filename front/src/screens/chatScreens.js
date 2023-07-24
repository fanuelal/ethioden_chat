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
import { RecentChat } from "../components/recentChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { baseImagePath } from "../common/Common";
import Avatar from "react-avatar";
// import Suggestionbox from '../components/suggestionbox'
export function ChatUI(props) {
  // console.log(props.copiedtext)
  const [showuserlist, setShowuserlist] = useState(false);
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const [editedMessage, setEditedMessage] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Private Chat");

  function recentClickHandler(userId) {
    return;
  }

  axiosConfig.get("/employee").then((res) => {});

  useEffect(() => {
    console.log("Chat UI");
    console.log(props.members);
    setMessages(props.messages);
    setActiveMenu(props.name);
    setUserList(props.members);
  }, [props.user, props.name,props.messages]);

  useEffect(() => {
    let newChannel = "";
    const ids = [currentUser.userId, props.user];
    const sortedId = ids.sort();
  
    if (activeMenu === "Private Chat") {
      newChannel = props.ably.channels.get(
        `private_chat:${sortedId[0]}${sortedId[1]}`
      );
      setChannel(newChannel);
      newChannel.subscribe("private_chat", (message) => {
        if (message.data.senderId !== currentUser.userId) {
          console.log(message)
          setMessages((prevMessages) => [...prevMessages, message.data]);
        }
      });
    } else {
      newChannel = props.ably.channels.get(
        `group_chat`
      );
      setChannel(newChannel);
      newChannel.subscribe("group_chat", (message) => {
        console.log(message)
        if (message.data.senderId !== currentUser.userId) {
          setMessages((prevMessages) => [...prevMessages, message.data]);
        }
      });
    }
  
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [props.user, props.ably.channels, props.messages, channel, messages, message]);
  
  const onMessageAdd = (message) => {
    const messageUUID = uuid();

    let newMessage = {};
    activeMenu === "Private Chat"
      ? (newMessage = {
          messageId: messageUUID,
          text: message,
          reciverId: props.user,
          inRoom: 0,
          roomId: null,
          senderId: currentUser.userId,
          created_at: new Date(),
        })
      : (newMessage = {
          messageId: messageUUID,
          text: message,
          reciverId: null,
          inRoom: 1,
          roomId: props.user,
          senderId: currentUser.userId,
          created_at: new Date(),
        });

    axiosConfig
      .post("/chat/", newMessage)
      .then((response) => {
        console.log(response.data);
        setMessages([...messages, newMessage]);
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
  const ongroupclickHandler = () => {
    setShowuserlist(true);
  };
  const otherclickHandler = () => {
    return;
  };
  const ListRecent = props.members
    .filter((user) => user.id !== currentUser.userId)
    .map((user) => (
      <RecentChat
        onClick={recentClickHandler}
        ably={props.ably}
        key={user.id}
        userId={user.id}
        profileImg={user.profileImage}
        recentChat={""}
        status={true}
        username={user.first_name}
      />
    ));
    const user =  props.username.substring(0, 2)

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
        <div
          className="w-1/12"
          onClick={
            activeMenu === "Group Chat"
              ? ongroupclickHandler
              : otherclickHandler
          }
        >

<Avatar
  size={45}
  className="rounded-full h-12 w-12 "
  round={true}
  src={
    props.image
        ? baseImagePath + props.image
        : null
  }
  alt="recent chat"
  name={user}
/>



        </div>
        <div className="flex flex-col w-10/12 items-start">
          <div className="profilename">{props.username}</div>
          <div class="recentSentAt1">
            {props.name === "Channels" || props.name === "Group Chat"
              ? `${props.members.length} subscribers`
              : "last seen recently"}
          </div>
        </div>

        <div className="w-2/12">
          {activeMenu === "Channels" || activeMenu === "Group Chat" ? (
            ""
          ) : (
            <StatusPopUp />
          )}
        </div>
      </div>
      <ChatListContainer
        onEdit={handleEdit}
        onDelete={handleDelete}
        name={activeMenu}
        messages={messages.length === 0 ? props.messages : messages}
      />

      <div className="flex justify-center w-full bottom-2">
        {activeMenu !== "Channels" ||
        props.selectedChannel.created_by === currentUser.userId ? (
          <>
            <input
              autoFocus
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
        ) : (
          ""
        )}
      </div>
      <div>
        <div>
          <div>
            {showuserlist && (
              <div className="w-[100%] h-[120vh] fixed left-0 top-0 flex justify-center items-center z-[9999] bg-[rgba(0, 0, 0, 0.5)]">
                <div className="p-[80px] pb-[50px] mb-[80px] max-w-[500px] bg-[white] rounded-lg mt-[-10px] h-[75%]">
                  <div className="mt-[-60px] float-left bg-[white] ml-[-70px]">
                    <div
                      className="close-icon"
                      onClick={() => setShowuserlist(false)}
                    >
                      <FontAwesomeIcon className="pl-[115%]" icon={faTimes} />
                    </div>
                    <h3 className="header1">Group members</h3>
                    <div className="w-[250px] pl-[10%] max-h-[60vh] overflow-auto no-scrollbar">
                      {ListRecent}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
