import React from "react";
import {currentUser} from '../model/currentUserData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUsers, faBullhorn, faCog, faInfoCircle, faQuestionCircle, faRobot } from '@fortawesome/free-solid-svg-icons';


import '../styles/chatList.css'
export function CatagoryList() {
    return(
      <div className="catagoryNav">

        <img className="chatProfile" alt='profileImage' src={currentUser.profileImg} />
        <h3>{currentUser.username}</h3>
        <ul className="vertical-nav">
      <li className="active">

          <FontAwesomeIcon icon={faCommentDots} />
          <p>Private Chat</p>
        
      </li>
      <li>

          <FontAwesomeIcon icon={faUsers} />
          <p>Group Chat</p>
        
      </li>
      <li>

          <FontAwesomeIcon icon={faBullhorn} />
          <p>Announcement</p>
        
      </li>
      <li>

<FontAwesomeIcon icon={faRobot} />
<p>Bot</p>

</li>
      <li>

          <FontAwesomeIcon icon={faCog} />
          <p>Settings</p>
        
      </li>
      <li>

          <FontAwesomeIcon icon={faInfoCircle} />
          <p>About</p>
        
      </li>
      <li>

          <FontAwesomeIcon icon={faQuestionCircle} />
          <p>Help</p>
        
      </li>
    </ul>
      </div>  
    );
}