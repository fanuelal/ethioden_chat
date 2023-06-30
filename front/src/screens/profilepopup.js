import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{ faUser}from '@fortawesome/free-solid-svg-icons';
import "../styles/PopUp.css";
// import Notification from '../components/Notification';
import Popup from 'reactjs-popup';


export function ProfilePopUp () {
    const [showProfile, setShowProfile] = useState(false);
    const [showAllProfile, setShowAllProfile] = useState(false);
    
    const toggleProfile = () => {
        setShowProfile(!showProfile);
      };
    return(
    <div className="Profile ">
      <img src={currentUser.profileImg} alt="profile" className="profile-image" />
      <h2 className="profile-name">{currentUser.username}</h2>
      <p className="profile-status">{currentUser.status}</p>
      <p className="profile-phone">{currentUser.phoneNumber}</p>
      <p className="profile-bio">{currentUser.bio}</p>
    
      <Popup className='popup'
          trigger={
            <FontAwesomeIcon
              icon={faUser}
              className="StausIcon"
            />
          }
          open={showProfile}
          onClose={toggleProfile}
          closeOnDocumentClick={true}
          position="bottom right"
        >
      
          <ProfilePopUp showAll={showAllProfile} setShowAll={setShowAllProfile} />
        </Popup>
    </div>
    );
}



