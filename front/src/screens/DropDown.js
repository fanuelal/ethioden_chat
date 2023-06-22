import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faAngleDown}from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/PopUp.css";

export function DropDown (props) {
    const[open,setOpen]=useState(false);
    const [selected, setSelected] = useState("choose");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const Menus=["1 hour","4 hours","One day","One week","Choose date and time"];

    const handleMenuItemClick = (menu) => {
        setSelected(menu);
        setShowDatePicker(menu === "Choose date and time");
        setOpen(false);
      
        let currentDate = new Date(); 
      
        if (menu === "1 hour") {
          currentDate.setHours(currentDate.getHours() + 1); 
        } else if (menu === "4 hours") {
          currentDate.setHours(currentDate.getHours() + 4);
        } else if (menu === "Today") {
          currentDate.setHours(23, 59, 59, 999);
        } else if (menu === "This week") {
             currentDate.setDate(currentDate.getDate() + 7);
            currentDate.setHours(23, 59, 59, 999);
          }
      
        setSelectedDate(currentDate);
        props.onDateSelection(currentDate);
      };
      
      const handleDateChange = (date) => {
        setSelectedDate(date);
        props.onDateSelection(date);
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




  


              