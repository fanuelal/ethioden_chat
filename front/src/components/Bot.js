import React from 'react'
import { useState } from 'react';
import { RecentChat } from './recentChat'
import { Bot } from '../model/Bot'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SearchComp from './searchComp';

const Bots = (props) => {
  
  const [issearch, setIssearch] = useState(false);

function recentClickHandler(botId) {
    props.onChatClick(botId);
  }

  const searchHandler = () => {
    setIssearch(true);
  };

  const arrowclickHandler = () => {
    setIssearch(false);
  };
  const chatBots = Bot.map((bot)=>{

  return (<RecentChat
  name={props.name}
  type={"bot"}
    // onClick={recentClickHandler}
    userId={bot.id}
    profileImg={bot.image }
    recentChat={"ask me"}
    status={true}
    username={bot.name}
    ably={props.ably}
  />
  )
})
return(
  <div className=" font-bold  text-base md:text-sm shadow-md">
  <div className={issearch ? " flex-row-reverse justify-around  items-center h-14 w-full bg-profile":"flex justify-around items-center h-14 w -full bg-profile"}>
    
      {issearch ? "" : <div className="text-white lg:text-xl"> {props.name}</div>}
    
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
  {issearch ? <SearchComp sele={props.sele} onChatClick={props.onChatClick} /> : chatBots}
</div>
)
}

export default Bots