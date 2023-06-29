import React from 'react'
import { RecentChat } from './recentChat'
import { Bot } from '../model/Bot'
const Bots = (props) => {

function recentClickHandler(botId) {
    props.onChatClick(botId);
  }

  const chatBots = Bot.map((bot)=>{

  return (<RecentChat
  name={props.name}
    onClick={recentClickHandler}
    userId={bot.id}
    profileImg={bot.image }
    recentChat={"ask me"}
    status={true}
    username={bot.name}
  />
  )
})
return(
    <div>
        {chatBots}
    </div>
)
}

export default Bots