import React from "react";
import '../styles/chatList.css'
import '../screens/chatScreens'
export default function Suggestionbox(props){
// const clickeventhandler=() =>{
//     props.onsend()
//     onClick={clickeventhandler}
// }
        return( <p className="suggest"  >{props.text}</p>);

}