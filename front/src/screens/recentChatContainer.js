import {React, useState, useEffect}  from "react";
import "../styles/chatList.css";
import axiosConfig from '../config/axiosConfig';
import { RecentChat } from "../components/recentChat";
// import { users } from "../model/users";

// import { ActiveData } from "../controller/activeChatData";

export function ChatList(props){
    // const [value, setValue] = useState()
    function recentClickHandler(userId) {
        props.onChatClick(userId);
    }

    // function Fetchuser(){
        const [userList, setUserList]= useState([])
        useEffect(()=>{
            axiosConfig.get('http://localhost:5000/api/v1/employee')
            .then(res => {
                setUserList(res.data.data)
                console.log(res.data.data)
            
            })
        },[]) 
    // }

 const ListRecent = userList.map((user) =>{
        console.log(user.id);
     return  <RecentChat onClick={recentClickHandler} userId={user.id} profileImg={"https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png"} recentChat={"hello there"} status={user.lastSeen} username={user.first_name} />
 
    });
    return(
        <div className="chatList">
            <div className="roomHeader"> 
<h2> Private Chat</h2>
</ div>
            {ListRecent}

        </div>
    );
}



// const [userList, setUserList]= useState([])

// useEffect(()=>{
//     const getuserlist =async ()=>{
//         const res = await fetch("http://localhost:5000/api/v1/employee");
//         const getuser = await res.json();
//         setUserList(getuser);
//     }
//     getuserlist();
// },[]);