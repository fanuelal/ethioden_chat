import React, { useState } from "react";
import "../styles/chatList.css"
import { style } from "@mui/system";


export function RecentChat(prop) {
  const [clicked, setClicked] = useState(false);

  const buttonClickHandler = () => {
    prop.onClick(prop.userId);
    setClicked(true);
  }
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
        <div className={prop.status === 'online' ? "chatListActiveStatusOnline" : "chatListActiveStatusOffline"}></div>
        <div className="recentMessageContent"><p >{prop.recentChat}</p></div>
        <div className="recentSentAt">{prop.lastMessageD}</div>      
      </button>
      {/* {clickedUser !== null ? <ActiveData userId = {prop.userId}/>: <div> hello clicked user null</div>} */}
    </>
  );
}