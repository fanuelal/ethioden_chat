import React, { useState, useEffect } from "react";
import "../styles/chatList.css";
import Ably from "ably";
import { routeId } from "../model/currentUserData";
import { setRouteId } from "../model/currentUserData";
import { baseImagePath } from "../common/Common";
import Avatar from "react-avatar";
const ably = new Ably.Realtime("nGSxiw.f53CMg:CYsWsQva-8G9j4njChYzhgnSYA8sJacA-EytCqL6JJ0");

export function RecentChat(prop) {
  const [clicked, setClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [route, setRoute] = useState("")
  useEffect(() => {
    setClicked(prop.sele === prop.userId);
  }, [prop.sele, prop.userId]);

  const buttonClickHandler = () => {

    setRouteId(prop.userId)
    console.log("routeId");
    console.log(routeId);
    setRoute(routeId)
    if (prop.type === "bot") {
      return;
    }
    if (prop.type === "room") {
      return;
    }
    prop.onClick(prop.userId, prop.members);
    console.log("recentChild console will be printed");
    console.log(prop.sele);
    console.log(prop.userId);
    setClicked(prop.sele === prop.userId);
  };

  const channel = ably.channels.get("chat-status");
  channel.subscribe("chat-status", (message) => {
    console.log("message.data");
    setIsActive(message.data);
  });
  console.log(prop.isSelected)
  const chatBoxClass = prop.isSelected ? "recentChatBox clicked" : "recentChatBox";
   
const user =  prop.username.substring(0, 2)
console.log(user)
  return (
 <div className={chatBoxClass} onClick={buttonClickHandler} key={prop.userId}>
      {/* <button className={chatBoxClass} onClick={buttonClickHandler} key={prop.userId}> */}
      <div className=" flex w-2/12">

<Avatar
  size={45}
  className="rounded-full h-12 w-12 "
  round={true}
  src={
    prop.profileImg
        ? baseImagePath + prop.profileImg
        : null
  }
  alt="recent chat"
  name={user}
/>



       {prop.name === "Group Chat" || prop.name === "Channels" ? "" : 
        <div
          className={
            prop.isActive
              ? "chatListActiveStatusOnline"
              : "chatListActiveStatusOffline"
          }
        ></div>}
      </div>
      <div className="flex flex-col w-10/12  ">
        <div className=" flex justify-between">
          <div className="text-xs lg:text-base font-semibold ml-1 ">
            {prop.username}
          </div>
          <div className="text-xs mr-2">{prop.lastMessageD}</div>
        </div>
        <div className="self-start mt-2 text-xs truncate ml-1 max-w-[170px]" >
          {prop.recentChat}
        </div>
      </div>

      {/* </button> */}
      {/* {clickedUser !== null ? <ActiveData userId = {prop.userId}/>: <div> hello clicked user null</div>} */}
    </div>
  );
}
