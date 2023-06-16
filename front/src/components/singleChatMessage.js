import React from 'react'
import '../styles/chatList.css'
export function MessageView(props){
    const date = new Date(props.created_at);
    const messageTime =date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return(
    <div>
        <div className={props.isSenders ? 'messageViewSender': 'messageViewReciver'}>
            
          <div className='whole-message'> 
            <p className='message-text'>{props.message}</p>
            <div className='message-time'>{messageTime}</div>
            </div>
        </div></div>

    )
}