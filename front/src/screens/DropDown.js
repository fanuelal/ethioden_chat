import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faAngleDown}from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/PopUp.css";

export function DropDown () {
    const[open,setOpen]=useState(false);
    const [selected, setSelected] = useState("Don't Clear");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const Menus=["Dont Clear","1 hour","4 hours","Today","This week","Choose date and time"];

    const handleMenuItemClick = (menu) => {
        setSelected(menu);
        setShowDatePicker(menu === "Choose date and time");
        setOpen(false);
      };
      const handleDateChange = (date) => {
        setSelectedDate(date);
      };


    return(
        <div className="DropDown">
            <div className="ll">
            <p className="selected-item">{selected}</p>
            <FontAwesomeIcon icon={faAngleDown} onClick={() => setOpen(!open)} />
           
            { open &&(
            
            <div className="">
                <ul className="menu">
                    {Menus.map((menu)=>(
                        <li className="list" 
                        onClick={() => handleMenuItemClick(menu)}
                        key={menu}>{menu}</li>

                    ))
                    }

                </ul>
            </div>
           )}
                {showDatePicker && (
            <div className="date-picker-container">
                 <DatePicker
               selected={selectedDate}
                 dateFormat={'dd/MM/yyyy'}
              onChange={handleDateChange}
                 />
                </div>
                 )}
            </div>
        </div>
    )
}




  


              