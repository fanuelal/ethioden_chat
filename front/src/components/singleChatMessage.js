import React from "react";
import { useState, useEffect } from "react";
import "../styles/chatList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
// import { ChatUI } from "../screens/chatScreens.js";
// import { ActiveData } from "../controller/activeChatData";
// import axiosInstance from "../config/axiosConfig";
import Avatar from "react-avatar";
export function MessageView(props) {
  const [name, setName] = useState("John");
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  function DeleteclickHandler() {
    props.onDelete(props.messageID);
    console.log(props.messageID);
  }
  function EditclickHandler() {
    props.onEdit(props.messageID, props.message);
  }
  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div
        className={
          props.isSenders
            ? `self-end mt-1 mr-1 p-2 rounded-tr-xl rounded-tl-xl rounded-bl-xl bg-messagesender text-white text-sm relative
       ${props.name === "Channels" ? "w-full self-center" : "max-w-xl"}`
            : `${props.name === "Channels" ? "w-full" : ""} messageViewReciver`
        }
        onContextMenu={(e) => {
          e.preventDefault();
          setClicked(true);
          setPoints({
            x: e.pageX,
            y: e.pageY,
          });
          console.log("Right Click", e.pageX, e.pageY);
        }}
      >
        <div className="whole-message">
          {props.name === "Group Chat" ? (
            props.isSenders ? (
              ""
            ) : (
              <div className="-ml-[60px] mx-2">
                <Avatar name={props.senderId} size={35} round={true} />
                {/* <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU" /> */}
              </div>
            )
          ) : (
            ""
          )}

          <div className="message-text">{props.message}</div>
          <div className="message-time">{props.created_at}</div>
        </div>

        {clicked && (
          <div className="contextmenu">
            <ul>
              {props.isSenders && (
                <li onClick={EditclickHandler}>
                  <FontAwesomeIcon icon={faPen} /> Edit
                </li>
              )}
              <li>
                <FontAwesomeIcon icon={faCopy} /> Copy
              </li>
              <li onClick={DeleteclickHandler}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
