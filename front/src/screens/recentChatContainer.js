import React, { useState, useEffect } from "react";
import "../styles/chatList.css";
import "../styles/search.css";
import axiosInstance from "../config/axiosConfig";
import { RecentChat } from "../components/recentChat";
import { currentUser } from "../model/currentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { formatDates } from "../common/Common";
import { Bot } from "../model/Bot";
import { routeId } from "../model/currentUserData";
import SearchComp from "../components/searchComp.js";
import Ably from "ably";
import { useScrollTrigger } from "@mui/material";

export function ChatList(props) {
  const [lastMessages, setLastMessages] = useState({});
  const [issearch, setIssearch] = useState(false);
  const [userList, setUserList] = useState([]);
  const channel = props.ably.channels.get("status-channels");
  const [isactive, setIsactive] = useState(false);
  const [routeTo, setRouteTo] = useState("");
  const [channe, setChannel] = useState(null);
  props.ably.connection.on("connected", function () {
    // Update the variable to indicate that the connection is active
    // console.log(currentUser.userId)
    axiosInstance
      .patch(`/employee/${currentUser.userId}`, { isActive: 1 })
      .then((value) => console.log(value));
    // isActive = true;
    console.log("frontend connected");
  });
  props.ably.connection.on("disconnected", function () {
    axiosInstance
      .patch(`/employee/${currentUser.userId}`, { isActive: 0 })
      .then((value) => console.log(value));
    console.log("frontend disconnected");
  });

  const recentEmployee = () => {
    axiosInstance.get(`/employee/recent/${currentUser.userId}`).then((res) => {
      setUserList(res.data.data);
      console.log(res.data.data);
    });
  };
  useEffect(() => {
    recentEmployee();
  }, []);
  // useEffect(() => {
  //   // Code to execute when routeId changes
  //   console.log("routeId has changed:", routeId);
  // }, []);
  // useEffect(() => {
  //   const fetchLastMessages = async () => {
  //     if (userList.length > 0) {
  //       const Users = userList.map((user) =>
  //         axiosInstance.get(
  //           `/chat/last?senderId=${currentUser.userId}&reciverId=${user.id}`
  //         )
  //       );

  //       const responses = await Promise.all(Users);

  //       const lastMessagesData = responses.map((response, index) => {
  //         const lastMessage = response.data.data;
  //         return { userId: userList[index].id, lastMessage };
  //       });

  //       const lastMessageData = lastMessagesData.reduce((obj, item) => {
  //         obj[item.userId] = item.lastMessage;
  //         return obj;
  //       }, {});

  //       setLastMessages((prevLastMessages) => ({
  //         ...prevLastMessages,
  //         ...lastMessageData,
  //       }));
  //     }
  //   };

  //   userList.forEach((user) => {
  //     const ids = [currentUser.userId, user.id];
  //     const sortedId = ids.sort();

  //     const newChannel = props.ably.channels.get(
  //       `private_chat:${sortedId[0]}${sortedId[1]}`
  //     );
  //     setChannel(newChannel);
  //     newChannel.subscribe("private_chat", (message) => {
  //       console.log("New message received:", message);
  //       if (message.data.senderId !== currentUser.userId) {
  //         setLastMessages((prevLastMessages) => ({
  //           ...prevLastMessages,
  //           [user.id]: message.data,
  //         }));
  //       }
  //     });
  //   });

  //   fetchLastMessages();

  //   return () => {
  //     if (channe) {
  //       channe.unsubscribe();
  //     }
  //   };
  // }, [userList, channe]);

  const recentClickHandler = (userId) => {
    props.onChatClick(userId);
  };

  const searchHandler = () => {
    setUserList([]);
    setIssearch(true);
  };

  const arrowclickHandler = () => {
    setIssearch(false);
    recentEmployee();
  };

  const ListRecent = userList.map((user) => {
    if (user.id !== currentUser.userId) {
      const lastMessage = lastMessages[user.id];
      const lastMessageDate =
        lastMessage && formatDates(new Date(user.last_message_time));
      const isSelected = routeId === user.id;

      return (
        <RecentChat
          isSelected={isSelected}
          name={props.name}
          sele={props.sele}
          key={user.id}
          onClick={() => recentClickHandler(user.id)}
          userId={user.id}
          profileImg={user.profileImage}
          recentChat={user.last_message}
          lastMessageD={formatDates(new Date(user.last_message_time))}
          status={true}
          username={user.first_name}
          isActive={user.isActive}
          ably={props.ably}
        />
      );
    }
  });

  return (
    <div className=" font-bold  text-base md:text-sm h-full border-r border-#bdbaba overflow-y-scroll ">
      <div
        className={
          issearch
            ? " flex-row-reverse justify-around  items-center h-14 w-full bg-profile"
            : "flex justify-around items-center h-14 w -full bg-profile"
        }
      >
        {issearch ? (
          ""
        ) : (
          <div className="text-white lg:text-xl">{props.name}</div>
        )}

        <div className="">
          {issearch ? (
            <div className=" items-start align-baseline -ml-72 pt-4 text-white ">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className=" "
                onClick={arrowclickHandler}
              />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faSearch}
              className="text-white h-5 w-4 cursor-pointer"
              onClick={searchHandler}
            />
          )}
        </div>
      </div>
      {issearch ? (
        <SearchComp sele={props.sele} onChatClick={props.onChatClick} />
      ) : (
        ListRecent
      )}
    </div>
  );
}
