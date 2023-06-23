import React, { useState, useEffect, useRef} from "react";
import "../styles/chatList.css"
import { style } from "@mui/system";
import Ably from 'ably'
import { currentUser } from '../../src/model/currentUserData';
// import dotenv from 'dotenv'
export function RecentChat(prop) {
  console.log(`${prop.username} ${prop.isActive}`)
  const [clicked, setClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);

const buttonClickHandler = () => {
    prop.onClick(prop.userId);
    setClicked(true);
  }

 const channel = prop.ably.channels.get('chat-status');
 channel.subscribe((message) => {
    console.log(message.data);
    setIsActive(message.data);
  
});

const cc = prop.sele===prop.userId?clicked:false
  const chatBoxClass = cc ? "recentChatBox clicked" : "recentChatBox";
   
  return (
    <>
      <button className={chatBoxClass} onClick={buttonClickHandler} key={prop.userId}>
        <div className="recentChatuserName">{prop.username}</div>
        <img 
          width={50}
          height={50}
          className="recentChatProfile" src={prop.profileImg} alt="recent chat"/>
        <div className={prop.isActive ? "chatListActiveStatusOnline" : "chatListActiveStatusOffline"}></div>
        <div className="recentMessageContent"><p >{prop.recentChat}</p></div>
        <div className="recentSentAt">{prop.lastMessageD}</div>      
      </button>
      {/* {clickedUser !== null ? <ActiveData userId = {prop.userId}/>: <div> hello clicked user null</div>} */}
    </>
  );
}