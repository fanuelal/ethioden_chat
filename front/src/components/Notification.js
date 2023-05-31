// Notification.js
import React from 'react';
import { notifications } from '../model/Notification';
import '../styles/chatList.css';

const Notification = ({ showAll, setShowAll }) => {
  let notificationsToDisplay = showAll ? notifications : notifications.slice(0, 2);

  return (
    <ul className="notificationPanel">
      {notificationsToDisplay.map(notification => (
        <li className="notification" key={notification.id}>
          <img className="userImage" src={notification.userImage} alt="User" />
          <div className="notificationContent">
            <span className="notificationSender">{notification.sender}</span>
            <p className="notificationText">{notification.content}</p>
          </div>
        </li>
      ))}
      {!showAll && (
        <li className="seeMore" onClick={() => setShowAll(true)}>
          See More
        </li>
      )}
      {showAll && (
        <li className="seeMore" onClick={() => setShowAll(false)}>
          See Less
        </li>
      )}
    </ul>
  );
};

export default Notification;
