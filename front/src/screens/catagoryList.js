// CatagoryList.js
import React, { useState } from 'react';
import { currentUser } from '../model/currentUserData';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faUsers, faBullhorn, faCog, faInfoCircle, faQuestionCircle, faRobot, faSignOut, faBell,faFaceSmileWink,faClose,faHouseChimneyUser,faTree,faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import Notification from '../components/Notification';
import '../styles/chatList.css';
import Popup from 'reactjs-popup';
import { DropDown } from "./DropDown";
import axiosInstance from '../config/axiosConfig';
import { format } from 'date-fns';
export function CatagoryList(props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(" ");
  const [statusContent, setStatusContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const logoutHandler = async() =>{
    // Remove user-related data from localStorage
    // props.ably.connection.close();
    // console.log('i am logging out');
     await axiosInstance.patch(`/employee/${currentUser.userId}`,{"isActive": false});
    // console.log(value)
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const [popup,setpop]=useState(false)
  const handleClickOpen=()=>{
      setpop(!popup);
  }
  const closepopup=()=>{
      setpop(false);
  }

  const handleMenuItemClick = (menu) => {
    setSelected(menu.Status);
  }
   const Status=[
    { 
      Status:"In a meeting",
      icon:<FontAwesomeIcon icon={faUsers} style={{color:'blue',fontSize:'20px'}}/>,
      time: "- 1 hour"
     },

     { 
      Status:"Vacationing",
     icon:<FontAwesomeIcon icon={faTree}style={{color:'green',fontSize:'20px'}}/>,
     time:"- 4 hours"
    },

    { 
      Status:"Out of Sick",
     icon:<FontAwesomeIcon icon={faFaceSadTear} style={{color:'yellow',fontSize:'20px'}}/>,
     time:"- Today"
    },

    { 
      Status:"working remotely  ",
     icon:<FontAwesomeIcon icon={faHouseChimneyUser} style={{color:'chocolate',fontSize:'20px'}}/>,
     time:"- This week"
    },

  ]
  const setStatus =()=>{
    const body = {
      "userId":currentUser.userId,
      "label":statusContent,
      "ends_at":selectedDate
     }
     axiosInstance.post('/status',body)

  }
  const handleInputChange = (event) => {
    setStatusContent(event.target.value);

  };

  const handleDateSelection = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
  console.log(formattedDate);
    setSelectedDate(formattedDate);
  };
  console.log(selectedDate);

  console.log(statusContent)
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
          closeOnDocumentClick={true}
          position="bottom right"
        >
          <Notification showAll={showAllNotifications} setShowAll={setShowAllNotifications} />
        </Popup>
      
        <div className="status ">
        <div className=" Status_icon" > 
      <div>
        {popup?
          <div className="mainn">
            <div className="popup">
              <div className="popup-body">
                <h3>Set a status</h3> 
                <p><FontAwesomeIcon icon={faClose}onClick={closepopup}  /></p>
              </div>
              <div className="popup-header">
                <input type="text"  onChange={handleInputChange} />
              </div>
              <div className="listofstatus ">
        <ul>
         {Status.map((menu)=>(
          <li className=""  onClick={() => handleMenuItemClick(menu)}
            key={menu}> {menu.icon} <span>   </span> {menu.Status}<p  className='ppp'>{menu.time}</p></li>))}
        </ul> 
       <div className="btn">
        <p>Clear after: <DropDown onDateSelection={handleDateSelection} />
</p>
        <button  onClick={setStatus}>Save</button>
      </div>
    </div>
  </div> 
  </div>:""}
    </div>
    </div>
    </div>

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
        </li><li>
          <FontAwesomeIcon icon={faFaceSmileWink}  />
          <p onClick={handleClickOpen}>Status</p>
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
      
        <li onClick={logoutHandler}>
          <FontAwesomeIcon icon={faSignOut}  />
          <p >Logout</p>
        </li>
      </ul>
    </div>
  );
}
