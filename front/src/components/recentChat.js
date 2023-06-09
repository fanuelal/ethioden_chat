import React from "react";
import "../styles/chatList.css"

export function RecentChat(prop) {
    // const [clickedUser, setClickedUser] = useState();
    const buttonClickHandler = () => {
        prop.onClick(prop.userId);
    }

    return(
        <>
        <button className="recentChatBox" onClick={buttonClickHandler} key={prop.userId}>
            <div className="recentChatuserName">{prop.username}</div>
            <img 
            width={50}
            height={50}
            className="recentChatProfile" src={prop.profileImg} alt="recent chat"/>
            <div className={prop.status === 'online' ? "chatListActiveStatusOnline" : "chatListActiveStatusOffline"}></div>
            <div className="recentMessageContent"><p >{prop.recentChat}</p>  </div>
            <div className="recentSentAt">2 min</div>      
        </button>
        {/* {clickedUser !== null ? <ActiveData userId = {prop.userId}/>: <div> hello clicked user null</div>} */}
        </>
    );
}