import React, { useState, useEffect } from "react";
import "../styles/chatList.css";
import "../styles/search.css";
import axiosInstance from "../config/axiosConfig";
import { RecentChat } from "../components/recentChat";
import { currentUser } from "../model/currentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {formatMessageDate} from '../common/Common'

import SearchComp from "../components/searchComp.js";

import Ably from "ably";
import { useScrollTrigger } from "@mui/material";

export function ChatList(props) {
  const [lastMessages, setLastMessages] = useState({});
  const [issearch, setIssearch] = useState(false);
  const [userList, setUserList] = useState([]);
  const channel = props.ably.channels.get('status-channels');
  const [isactive, setIsactive]= useState(false);

  props.ably.connection.on('connected', function() {
      // Update the variable to indicate that the connection is active
      // console.log(currentUser.userId)
     axiosInstance.patch(`/employee/${currentUser.userId}`,{isActive: 1}).then((value)=> console.log(value))
      // isActive = true;
      console.log("frontend connected")

       });
props.ably.connection.on('disconnected', function() {
     axiosInstance.patch(`/employee/${currentUser.userId}`,{"isActive": 0}).then((value)=> console.log(value))
     console.log("frontend disconnected")
    });



  
  const recentEmployee = () => {
    axiosInstance.get(`/employee/recent/${currentUser.userId}`).then((res) => {
      setUserList(res.data.data);
    });
  };
  useEffect(() => {
   

    recentEmployee();
  }, []);

  useEffect(() => {
    const fetchLastMessages = async () => {
      if (userList.length > 0) {
        const Users = userList.map((user) =>
          axiosInstance.get(
            `/chat/last?senderId=${currentUser.userId}&reciverId=${user.id}`
          )
        );

        const responses = await Promise.all(Users);

        const lastMessagesData = responses.map((response, index) => {
          const lastMessage = response.data.data;
          return { userId: userList[index].id, lastMessage };
        });

        const lastMessageData = lastMessagesData.reduce((obj, item) => {
          obj[item.userId] = item.lastMessage;
          return obj;
        }, {});

        setLastMessages((prevLastMessages) => ({
          ...prevLastMessages,
          ...lastMessageData,
        }));
      }
    };

    fetchLastMessages();
  }, [userList]);

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
      // console.log(user)

      const lastMessageDate =
        lastMessage &&
        formatMessageDate(new Date(lastMessage.created_at));

      return (
        <RecentChat
          sele={props.sele}
          key={user.id}
          onClick={recentClickHandler}
          userId={user.id}
          profileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"
          recentChat={
            (user.id === lastMessage?.senderId ||
              lastMessage?.reciverId === user.id) &&
            lastMessage?.text
          }
          lastMessageD={lastMessageDate}
          status={true}
          username={user.first_name}
          isActive = {user.isActive}
          ably={props.ably}
        />
      );
    }
  });

  return (
    <div className="chatList">
      <div className="header">
        <div className="roomHeader">{issearch ? "" : <h2>Private Chat</h2>}</div>
        <div>
          {issearch ? (
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="backarrow"
              onClick={arrowclickHandler}
            />
          ) : (
            <FontAwesomeIcon
              icon={faSearch}
              className="searchicon"
              onClick={searchHandler}
            />
          )}
        </div>
      </div>
      {issearch ? <SearchComp sele={props.sele} onChatClick={props.onChatClick} /> : ListRecent}
    </div>
  );
}
