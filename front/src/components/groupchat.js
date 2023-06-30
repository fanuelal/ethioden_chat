import React from "react";
import { useState } from "react";
import { RecentChat } from "./recentChat";
import { Bot } from "../model/Bot";
import '../styles/groupchat.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import SearchComp from "./searchComp";
import Popup from 'reactjs-popup';

const GroupChat = (props) => {
  const [issearch, setIssearch] = useState(false);
  const [showpopup, setShowpopup] = useState(false)
  // function recentClickHandler(botId) {
  //     props.onChatClick(botId);
  //   }
  const handlePopup = () =>{
    setShowpopup(true)
  } 
  const searchHandler = () => {
    setIssearch(true);
  };

  const arrowclickHandler = () => {
    setIssearch(false);
  };
  //   const chatBots = Bot.map((bot)=>{

  //   return (<RecentChat
  //   name={props.name}
  //   type={"bot"}
  //     // onClick={recentClickHandler}
  //     userId={bot.id}
  //     profileImg={bot.image }
  //     recentChat={"ask me"}
  //     status={true}
  //     username={bot.name}
  //     ably={props.ably}
  //   />
  //   )
  // })
  return (
    <>
    <div className=" font-bold  text-base md:text-sm shadow-md">
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
          <div className="text-white lg:text-xl"> Group Chat</div>
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
        ""
      )}
    </div>


<Popup
        trigger={
          <div className="add-group1">
            <FontAwesomeIcon
              icon={faPlus}
              className="add-group"
              onClick={handlePopup}
            />
          </div>
        }
        content={<div className="popuppage"><p>creat a group</p></div>}
        position="right center"
        modal
        closeOnEscape
        closeOnDocumentClick
      />
      
      <div className="status ">
        <div className=" Status_icon" > 
      <div>
        {showpopup &&
          <div className="mainn">
            <div className="popup">
              <div className="popup-body">
              <div className="close-icon" onClick={() => setShowpopup(false)}>
              <FontAwesomeIcon className="clear" icon={faTimes} />
            </div>
                <h3 className="header1">create a group</h3> 
              </div>
              <div className="popup-header">
                <input type="text"  />
              </div>
            
       <div >
        <button className="nextbutton">next</button>
      </div>
    </div>
  </div> 
  }
    </div>
    </div>
    </div>
    </>    
    
  );
};

export default GroupChat;
