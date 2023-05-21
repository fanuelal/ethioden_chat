import {React, useState}  from "react";
import "../styles/chatList.css";
import { RecentChat } from "../components/recentChat";
import { users } from "../model/users";

// import { ActiveData } from "../controller/activeChatData";

export function ChatList(props){
    // const [value, setValue] = useState()
    function recentClickHandler(userId) {
        props.onChatClick(userId);
        
    }
     const ListRecent = users.map(user =>
        <RecentChat onClick={recentClickHandler} userId={user.userId} profileImg={user.profileImg} recentChat={user.recentChat} status={user.userState} username={user.username} />
             )
             
    return(
        <div className="chatList">
            <div className="roomHeader"> 
<h2> Private Chat</h2>
</ div>
            {ListRecent}

        </div>
    );
}