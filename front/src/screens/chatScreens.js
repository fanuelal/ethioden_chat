import React from 'react'
import '../styles/chatList.css'
import '../components/chatTextField'
import '../components/activeMessageScreen'
import ChatSend from '../components/chatTextField'
import {ChatListContainer}  from '../components/activeMessageScreen'
import { useState, useEffect } from 'react'
import { currentUser } from '../model/currentUserData'
import { v4 as uuid } from 'uuid';
import axiosConfig from '../config/axiosConfig'
export function ChatUI(props){
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        setMessages([])
    }, [props.user])
     const onMessageAdd = (message) => {
        const messageUUid = uuid();
        // console.log(props.user)

        const newmessage={
            messageId: messageUUid,
            text:message,
            reciverId: props.user,
            senderId: currentUser.userId,
        }

        axiosConfig.post("/chat/",
        {
            "text": message,
            "inRoom": false,
            "roomId": null,
            "reciverId": props.user,
            "senderId": currentUser.userId
        }).then((response) => {
            console.log(response.data);
            setMessages([...props.messages, newmessage]);
        }).catch((error) => {
            throw(error)});
        }
  
    const onMessageSend = () =>{
        if(message.trim() !== ''){
            onMessageAdd(message)
            setMessage('')
        }
    }

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    }
    const onkeyPressHandler = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            onMessageSend();
        }
    }

    return(
        <div className='ChatRoom'>
        <div className='profileNav'>
            {props.user.profileImg ? <img alt='user profile' className='chatProfile' src={props.user.profileImg} />: <img alt='user profile' className='chatProfile' src="https://thumbs.dreamstime.com/b/icon-profile-color-red-not-shadow-icon-profile-color-red-circle-color-dark-red-background-color-white-194702104.jpg" />}
            <h2>{props.user.username}</h2>
            </div> 
        <ChatListContainer messages={messages.length === 0? props.messages : messages} />
        <div> 
        <div className='chatInputDiv'>
            <ChatSend onClick={onMessageSend}/>
            <input type="text" className="chatInputField" value={message} placeholder='Type something here ...' onChange={handleInputChange} onKeyDown={onkeyPressHandler}/>
            
        </div>

        </div>
        </div>
    )
}