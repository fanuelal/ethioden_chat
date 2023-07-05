import React, { useState } from "react";
import "../styles/chatList.css";
import { style } from "@mui/system";

export function RecentChat(prop) {
  const [clicked, setClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const buttonClickHandler = () => {
    if (prop.type === "bot") {
      return;
    }
    prop.onClick(prop.userId);
    setClicked(true);
  };

  const channel = prop.ably.channels.get("chat-status");
  channel.subscribe("chat-status", (message) => {
    console.log("message.data");
    setIsActive(message.data);
  });

  const cc = prop.sele === prop.userId ? clicked : false;
  const chatBoxClass = cc ? "recentChatBox clicked" : "recentChatBox";
  console.log(isActive);

  return (
    <div
      className={chatBoxClass}
      onClick={buttonClickHandler}
      key={prop.userId}
    >
      {/* <button className={chatBoxClass} onClick={buttonClickHandler} key={prop.userId}> */}
      <div className=" flex w-2/12">
        <img
          width={50}
          height={50}
          className="rounded-full h-12 w-12 "
          src={prop.name === "Channels"? "https://static.vecteezy.com/system/resources/thumbnails/001/760/457/small/megaphone-loudspeaker-making-announcement-vector.jpg":
          prop.profileImg}
          alt="recent chat"
        />
        <div
          className={
            prop.isActive
              ? "chatListActiveStatusOnline"
              : "chatListActiveStatusOffline"
          }
        ></div>
      </div>
      <div className="flex flex-col w-10/12  ">
        <div className=" flex justify-between">
          <div className="text-xs lg:text-base font-semibold ml-1 ">
            {prop.username}
          </div>
          <div className="text-xs mr-2">{prop.lastMessageD}</div>
        </div>
        <div className="self-start mt-2 text-xs truncate ml-1">
          {prop.recentChat}
        </div>
      </div>

      {/* </button> */}
      {/* {clickedUser !== null ? <ActiveData userId = {prop.userId}/>: <div> hello clicked user null</div>} */}
    </div>
  );
}
