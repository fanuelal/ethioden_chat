import {React, useRef, useEffect, useState} from 'react'
import '../styles/chatList.css'
import {MessageView} from './singleChatMessage'
import {currentUser} from '../model/currentUserData'

export function ChatListContainer({ messages }){
    const messageDisplayRef = useRef(null);
    const [message,setMessage]=useState([])
    const scrollToBottom = () => {
      messageDisplayRef.current.scrollTop = messageDisplayRef.current.scrollHeight;
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    


    return(
        <div className='MessageDisplay' ref={messageDisplayRef}>
            {messages.map((message, index) => (

        <MessageView key={index} message={message.text} isSenders={currentUser.userId === message.senderId} />
      ))}
        </div>
    );
}