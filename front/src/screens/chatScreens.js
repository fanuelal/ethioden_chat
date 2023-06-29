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
import { Bot } from '../model/Bot'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
// import Suggestionbox from '../components/suggestionbox'
export function ChatUI(props) {
  // console.log(props.copiedtext)
  const [deleted, setDeleted ] = useState(null)
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const [editedMessage, setEditedMessage] = useState(null);
  // const channel = props.ably.channels.get('private_chat');
  useEffect(() => {
    setMessages([]);
  }, [props.user]);

  useEffect(() => {
    const ids = [currentUser.userId, props.user];
    const sortedId = ids.sort();

    const newChannel = props.ably.channels.get(
      `private_chat:${sortedId[0]}${sortedId[1]}`
    );
    setChannel(newChannel);

    newChannel.subscribe('private_chat',(message) => {
      if (message.data.senderId !== currentUser.userId) {
        setMessages([...messages, message.data]);
      }
    });

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [messages, props.user, props.ably.channels, channel]);
  const onMessageAdd = (message) => {
    const messageUUID = uuid();

    const newMessage = {
      messageId: messageUUID,
      text: message,
      reciverId: props.user,
      senderId: currentUser.userId,
      created_at: new Date(),
    };

    axiosConfig
      .post("/chat/", {
        text: message,
        inRoom: 0,
        roomId: null,
        reciverId: props.user,
        senderId: currentUser.userId,
      })
      .then((response) => {
        console.log(response.data);
        setMessages([...props.messages, newMessage]);
      })
      .catch((error) => {
        throw error;
      });
  };
  const onUpdateMessage = (messageID, updatedText) => {
    const body = {
      text: updatedText,
    };
  



    axiosConfig
    .patch(`/chat/${messageID}`, body)
    .then((response) => {
      const updatedMessages = props.messages.map((msg) => {
        console.log(msg.messageId === messageID);
        console.log(messageID);
        console.log(msg.id);
        if (msg.id === messageID) {
          return { ...msg, text: updatedText };
        }
        return msg;
      });
      console.log(updatedMessages);
      setMessages(updatedMessages);
    })
    .catch((error) => {
      console.log("Error updating chat:", error);
    });
};
const onMessageSend = () => {
  if (message.trim() !== "") {
    if (editedMessage) {
      onUpdateMessage(editedMessage.messageID, message);
      setEditedMessage(null);
    } else {
      onMessageAdd(message);
    }

    setMessage("");
  }
};

const handleInputChange = (event) => {
  setMessage(event.target.value);
};
const onkeyPressHandler = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    onMessageSend();
  }
};
const handleEdit = (messageID, message) => {
  setEditedMessage({ messageID, message });
  setMessage(message);
};
const handleDelete = (messageID) => {
  axiosConfig.delete(`/chat/${messageID}`)
    .then((response) => {
      const notDeletedMessages = props.messages.filter((msg) => msg.id !== messageID);
      setMessages(notDeletedMessages);
    })
    .catch((error) => {
      console.log("Error deleting message:", error);
    });
}
 return(
        <div className='h-screen'   onContextMenu={(e) => {
            e.preventDefault(); 
            console.log("Right Click");
            // console.log(props.isedited)
          }}>
             <div className='w-full
                h-14
             bg-profile
               flex
              items-center
              rounded-0
              border-b
            border-white
              border-1'>
             <div className='w-1/12'> {props.user.profileImg ? 
            <img alt='user profile' className='chatProfile' src={props.user.profileImg} />:
            
             <img alt='user profile' className='chatProfile' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU" />}</div>
            <div className='flex flex-col w-10/12 items-start'>
              <div className='profilename'>{props.username }</div>
              <div class="recentSentAt1">last seen recently</div>
            </div>
            
             <div className='w-2/12'>
                 <StatusPopUp/>  
             </div>
            </div>  
              <ChatListContainer onEdit={handleEdit} onDelete={handleDelete} messages={messages.length === 0? props.messages : messages} />
             <div> 
            
           <div className='flex w-full bottom-2  '>
           <input type="text" className="w-10/12 rounded-2xl h-12 mt-6" value={message} placeholder='Type something here ...' onChange={handleInputChange} onKeyDown={onkeyPressHandler}/>
           <div className='w-1/12 bg-profile rounded-full shadow-md pt-1 mt-5 '>
        <IconButton color="white" className="sendBtnIcon" aria-label="Send Message" component="label" onClick={onMessageSend}>
        <SendIcon style={{
          color: 'white',
          width: 20,
          height: 20}}/>
        </IconButton>
      </div>
           
           {/* <ChatSend onClick={onMessageSend}/> */}
            
                   </div>
           
            </div>
         </div>
    )
}
