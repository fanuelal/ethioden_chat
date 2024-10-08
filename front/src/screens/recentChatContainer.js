import React, { useState, useEffect } from "react";
import "../styles/chatList.css";
import "../styles/search.css";
import axiosInstance from "../config/axiosConfig";
import { RecentChat } from "../components/recentChat";
import { currentUser } from "../model/currentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {formatDates} from '../common/Common'
import { Bot } from "../model/Bot";
import { routeId } from "../model/currentUserData";
import SearchComp from "../components/searchComp.js";
import Ably from "ably";
import { useScrollTrigger } from "@mui/material";

export function ChatList(props) {
  const [lastMessages, setLastMessages] = useState({});
  const [issearch, setIssearch] = useState(false);
  const [userList, setUserList] = useState([]);
  const channel = props.ably.channels.get('status-channels');
  const [isactive, setIsactive]= useState(false);
  const [routeTo, setRouteTo] = useState("")
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
  // useEffect(() => {
  //   // Code to execute when routeId changes
  //   console.log("routeId has changed:", routeId);
  // }, []);
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
    const lastMessageDate =
      lastMessage && formatDates(new Date(lastMessage.created_at));

    // Check if the current user is selected
    const isSelected =  routeId  === user.id;

    return (
      <RecentChat
        isSelected={isSelected}
        name={props.name}
        sele={props.sele}
        key={user.id}
        onClick={() => recentClickHandler(user.id)} // Pass the user.id to the click handler
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
        isActive={user.isActive}
        ably={props.ably}
      />
    );
  }
});


  return (
    <div className=" font-bold  text-base md:text-sm h-full border-r border-#bdbaba ">
      <div className={issearch ? " flex-row-reverse justify-around  items-center h-14 w-full bg-profile":"flex justify-around items-center h-14 w -full bg-profile"}>
        
          {issearch ? "" : <div className="text-white lg:text-xl"> Private Chat</div>}
        
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
      {issearch ? <SearchComp sele={props.sele} onChatClick={props.onChatClick} /> : ListRecent}
    </div>
  );
}
