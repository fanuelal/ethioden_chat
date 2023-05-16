import {React, useRef, useEffect} from 'react'
import '../styles/chatList.css'
import {MessageView} from './singleChatMessage'
export function ChatListContainer({ messages }){
    const messageDisplayRef = useRef(null);
    
    const scrollToBottom = () => {
      messageDisplayRef.current.scrollTop = messageDisplayRef.current.scrollHeight;
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    return(
        <div className='MessageDisplay' ref={messageDisplayRef}>
            <MessageView message="hi" isSenders={false}/>
            <MessageView message="hi team" isSenders={true}/>
            <MessageView message="hi" isSenders={false}/>
            <MessageView message="hi" isSenders={false}/>
            <MessageView message="hi team" isSenders={true}/>
            <MessageView message="hi" isSenders={false}/>
            <MessageView message="hi team" isSenders={true}/>
            {messages.map((message, index) => (
        <MessageView key={index} message={message.messageContent} isSenders={message.isSender} />
      ))}
        </div>
    )
}