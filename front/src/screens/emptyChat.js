import React from "react";
import '../styles/chatList.css'
export function EmptyScreen(){
    return (
        <div className="emptyScreenCont">
                    <div className="logoContainer">
                        <img 
            style={{height: "40px", width: "200px"}}
            src="http://ethioden.com/images/nicepage-images/PNG512x2960.png"
            className=""
            alt="recent chat"
            />
        </div>
                <h2>
                    select chat to start messaging
                </h2>
        </div>
    )
}