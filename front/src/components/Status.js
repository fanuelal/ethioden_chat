import { Userstatus } from "../model/Status";
import '../styles/chatList.css';

const Status = ({ showAll, setShowAll }) => {
  let notificationsToDisplay =  Userstatus

  return (
    <ul className="notificationPanel">
      {notificationsToDisplay.map(notification => (
        <li className="notification" >
          <div className="notificationContent">
            <span className="notificationSender">{notification.sender}</span>
            <p className="StatusText">{notification.content}</p>
          </div>
        </li>
      ))}
     
    </ul>
  );
};

export default Status;
