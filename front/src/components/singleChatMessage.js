import React from 'react'
import '../styles/chatList.css'
export function MessageView(props){
     
    return(
        <div className={props.isSenders ? 'messageViewSender': 'messageViewReciver'}>
            <p>{props.message}</p>
        </div>
    )
}