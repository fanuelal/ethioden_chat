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
import { StatusPopUp } from './StatusPopUp'
// import Suggestionbox from '../components/suggestionbox'
export function ChatUI(props){
    // console.log(props.copiedtext)
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState(null);
    // const channel = props.ably.channels.get('private_chat');
    useEffect(()=>{
        setMessages([])
    }, [props.user])

  useEffect(() => {
    const ids = [currentUser.userId, props.user];
    const sortedId = ids.sort();

    const newChannel = props.ably.channels.get(`private_chat:${sortedId[0]}${sortedId[1]}`);
    setChannel(newChannel);

    newChannel.subscribe((message) => {
      if (message.data.senderId !== currentUser.userId) {
        setMessages((prevMessages) => [...prevMessages, message.data]);
      }
    });

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [props.user, props.ably.channels, channel]);

        const onMessageAdd = (message) => {
        const messageUUid = uuid();
        // console.log(props.user)

        const newmessage={
            messageId: messageUUid,
            text:message,
            reciverId: props.user,
            senderId: currentUser.userId,
            created_at:new Date()
            
        }

        axiosConfig.post("/chat/",
        {
            "text": message,
            "inRoom": 0,
            "roomId": null,
            "reciverId": props.user,
            "senderId": currentUser.userId
            
        }).then((response) => {
            console.log(response.data);
            setMessages([...props.messages, newmessage]);
            // setMessages((prevMessages) => [...prevMessages, newmessage]);
        }).catch((error) => {
            throw(error)});
            const ids = [currentUser.userId, props.user];
            const sortedId = ids.sort()
            console.log(`currentUser: ${currentUser.userId}, selected User: ${props.user}`)
          // console.log(sortedId);
             channel.publish({ name: `private_chat:${sortedId[0]}${sortedId[1]}`, data: newmessage });

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
        <div className='ChatRoom'   onContextMenu={(e) => {
            e.preventDefault(); // prevent the default behaviour when right clicked
            console.log("Right Click");
            // console.log(props.isedited)
          }}>
        <div className='profileNav'>
            {props.user.profileImg ? <img alt='user profile' className='chatProfile' src={props.user.profileImg} />: <img alt='user profile' className='chatProfile' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU" />}
            <p className='profilename'>{props.username }</p>
            <div class="recentSentAt1">lastseen recently</div>
            <div className='setstatus'>
                 <StatusPopUp/>  
                

            </div>
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