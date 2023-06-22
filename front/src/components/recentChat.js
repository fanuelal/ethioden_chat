import React, { useState, useEffect, useRef} from "react";
import "../styles/chatList.css"
import { style } from "@mui/system";
import Ably from 'ably'
import { currentUser } from '../../src/model/currentUserData';
// import dotenv from 'dotenv'
export function RecentChat(prop) {
  const [clicked, setClicked] = useState(false);

 
  // useEffect(() => {

  // }, [])

const buttonClickHandler = () => {
    prop.onClick(prop.userId);
    setClicked(true);
  }





const cc = prop.sele===prop.userId?clicked:false
  const chatBoxClass = cc ? "recentChatBox clicked" : "recentChatBox";
  //  console.log(isOnline)
  //  console.log(isactive)
   
  return (
    <>
      <button className={chatBoxClass} onClick={buttonClickHandler} key={prop.userId}>
        <div className="recentChatuserName">{prop.username}</div>
        <img 
          width={50}
          height={50}
          className="recentChatProfile" src={prop.profileImg} alt="recent chat"/>
        <div className={true ? "chatListActiveStatusOnline" : "chatListActiveStatusOffline"}></div>
        <div className="recentMessageContent"><p >{prop.recentChat}</p></div>
        <div className="recentSentAt">{prop.lastMessageD}</div>      
      </button>
      {/* {clickedUser !== null ? <ActiveData userId = {prop.userId}/>: <div> hello clicked user null</div>} */}
    </>
  );
}