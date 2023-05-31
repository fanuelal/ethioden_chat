// CatagoryList.js
import React, { useState } from 'react';
import { currentUser } from '../model/currentUserData';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUsers, faBullhorn, faCog, faInfoCircle, faQuestionCircle, faRobot, faSignOut, faBell } from '@fortawesome/free-solid-svg-icons';
import Notification from '../components/Notification';
import '../styles/chatList.css';
import Popup from 'reactjs-popup';

export function CatagoryList() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    
    navigate('/');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="catagoryNav">
      <img className="chatProfile" alt="profileImage" src={currentUser.profileImg} />
      <h3 className='username' >{currentUser.username}</h3>
      <Popup className='popup'
          trigger={
            <FontAwesomeIcon
              icon={faBell}
              className="notificationIcon"
            />
          }
          open={showNotifications}
          onClose={toggleNotifications}
          closeOnDocumentClick={true} // Add this line to close on outside click once
          position="bottom right"
        >
          <Notification showAll={showAllNotifications} setShowAll={setShowAllNotifications} />
        </Popup>
      

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
        <li>
          <FontAwesomeIcon icon={faSignOut} onClick={logoutHandler} />
          <p>Logout</p>
        </li>
      </ul>
    </div>
  );
}
