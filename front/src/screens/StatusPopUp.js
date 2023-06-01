import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faFaceSmileWink,faClose,faUsers,faHouseChimneyUser,faTree,faFaceSadTear}from '@fortawesome/free-solid-svg-icons';
import "../styles/PopUp.css";
import { DropDown } from "./DropDown";
export function StatusPopUp () {
    const [popup,setpop]=useState(false)
    const handleClickOpen=()=>{
        setpop(!popup);
    }
    const closepopup=()=>{
        setpop(false);
    }
    
    
    return(
    <div className="status ">
        <div className=" Status_icon" > 
        <FontAwesomeIcon icon={faFaceSmileWink} onClick={handleClickOpen} 
        style={{
            color:'white',
            fontSize:'20px',
            float:'right',
          marginRight:'-220%'
        }}/>
       {/* <p>Status</p> */}
      <div>
        {popup?
        <div className="mainn">
            <div className="popup">
               
                <div className="popup-body">
                <h3>Set a status</h3>
              <p><FontAwesomeIcon icon={faClose}onClick={closepopup}/></p>
                 </div>
               
                <div className="popup-header">
                     <input type="text" placeholder="What's your Status?"/>
                     
                     
                       </div>
                       
     <div className="listofstatus ">
     <ul>
        <li> <FontAwesomeIcon icon={faUsers} style={{color:'blue',fontSize:'20px'}}/>
        In a meeting <p>- 1 hour</p>  </li>
                <li> <FontAwesomeIcon icon={faTree}style={{color:'green',fontSize:'20px'}}/>
       Vacationing <p>- Don't Clear</p> </li>
       <li> <FontAwesomeIcon icon={faFaceSadTear} style={{color:'yellow',fontSize:'20px'}}/>
        Out of Sick <p>- Today</p>  </li>
        <li><FontAwesomeIcon icon={faHouseChimneyUser} style={{color:'chocolate',fontSize:'20px'}}/>
            working remotely  <p>- Today</p> </li>

     </ul> 
     <div className="btn">
        <p>Clear after: <DropDown/></p>
    <button>Save</button>
     </div>
      </div>
     
  

</div>
    </div>:""}
    </div>
    </div>
    </div>
    );
}


