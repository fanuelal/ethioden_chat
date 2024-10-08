import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{ faFaceSmileWink}from '@fortawesome/free-solid-svg-icons';
import "../styles/PopUp.css";
// import Notification from '../components/Notification';
import Popup from 'reactjs-popup';
import Status from "../components/Status";

export function StatusPopUp () {
    const [showStatus, setShowStatus] = useState(false);
    const [showAllStatus, setShowAllStatus] = useState(false);
    
    const toggleStatus = () => {
        setShowStatus(!showStatus);
      };
    return(
    <div className="status ">
        {/* <img className="chatProfile" alt="profileImage" src={currentUser.profileImg} />
      <h3 className='username' >{currentUser.username}</h3> */}
      <Popup className='popup'
          trigger={
            <FontAwesomeIcon
              icon={faFaceSmileWink}
              className="StausIcon"
            />
          }
          open={showStatus}
          onClose={toggleStatus}
          closeOnDocumentClick={true}
          position="bottom right"
        >
          
          <Status showAll={showAllStatus} setShowAll={setShowAllStatus} />
        </Popup>
    </div>
    );
}


