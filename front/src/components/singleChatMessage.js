import React, { useState, useEffect } from 'react';
import '../styles/chatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCopy } from '@fortawesome/free-solid-svg-icons';
import { ChatUI } from '../screens/chatScreens.js';
import { ActiveData } from '../controller/activeChatData';
import axiosInstance from '../config/axiosConfig';

export function MessageView(props) {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  function DeleteclickHandler() {
    axiosInstance.delete(`/chat/${props.messageID}`);
    console.log('edit');
    console.log(props.messageID);
  }

  function EditclickHandler() {
    props.onEdit(props.messageID, props.message);
  }

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className='flex flex-col' >
         <div
      className={props.isSenders ? ' self-end mt-1 mr-1 p-2  rounded-tr-xl rounded-tl-xl rounded-bl-xl bg-messagesender text-white max-w-xl text-base ' : 'messageViewReciver'}
      onContextMenu={(e) => {
        e.preventDefault();
        setClicked(true);
        setPoints({
          x: e.pageX,
          y: e.pageY,
        });
        console.log('Right Click', e.pageX, e.pageY);
      }}
    >
      <div className="whole-message">
        <div className="message-text">{props.message}</div>
        <div className="message-time">{props.created_at}</div>
      </div>

      {clicked && (
        <div className="contextmenu">
          <ul>
            {props.isSenders && (
              <li onClick={EditclickHandler}>
                <FontAwesomeIcon icon={faPen} /> Edit
              </li>
            )}
            <li>
              <FontAwesomeIcon icon={faCopy} /> Copy
            </li>
            <li onClick={DeleteclickHandler}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </li>
          </ul>
        </div>
      )}
    </div>
    </div>
    
  );
}
