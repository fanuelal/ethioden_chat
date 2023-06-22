import { React, useState, useEffect } from "react";
import "../styles/chatList.css";
import "../styles/search.css";
import axiosInstance from "../config/axiosConfig";
import { RecentChat } from "../components/recentChat";
import { currentUser } from "../model/currentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import axiosInstance from './config/axiosConfig';
import SearchComp from "../components/searchComp.js";
// import { currentUser } from "../model/currentUserData";
import { useScrollTrigger } from "@mui/material";

export function ChatList(props) {
  const [lastMessages, setLastMessages] = useState({});
  const [issearch, setIssearch] = useState(false);
  const [userList, setUserList] = useState([]);
  const channel = props.ably.channels.get('status-channels');
  const [isactive, setIsactive]= useState(false);





  // let isActive = false;
  // dotenv.config({ path: '../../.env' })
  // const ably = new Ably.Realtime(process.env.ABLY_API_KEY);
  // await ably.connection.once('connected');
  props.ably.connection.on('connected', function() {
      // Update the variable to indicate that the connection is active
      console.log(currentUser.userId)
     axiosInstance.patch(`/employee/${currentUser.userId}`,{isActive: 1}).then((value)=> console.log(value))
      // isActive = true;
      console.log("frontend connected")
      // console.log(channel)
      
      // channel.subscribe('status-message', (message) =>{
      //   console.log("subscribing the channel")
      //   setIsactive(message.data === 1 ? true: false)
      // })
      // console.log('Connected to Ably!');
    });
  
  props.ably.connection.on('disconnected', function() {
      // Update the variable to indicate that the connection is no longer active
     axiosInstance.patch(`/employee/${currentUser.userId}`,{isActive: 0}).then((value)=> console.log(value))
     console.log("frontend disconnected")
      
      // isActive = false;
    });



  useEffect(() => {
    axiosInstance.get(`/employee/recent/${currentUser.userId}`).then((res) => {
      setUserList(res.data.data);

      const fetchLastMessages = async () => {
        const Users = userList.map((user) =>
          axiosInstance.get(`/chat/last?senderId=${currentUser.userId}&reciverId=${user.id}`)
        );

        const responses = await Promise.all(Users);

        const lastMessagesData = responses.map((response, index) => {
          const lastMessage = response.data.data;
          return { userId: userList[index].id, lastMessage };
        });

        const lastMessageData = lastMessagesData.reduce((obj, item) => {
          obj[item.userId] = item.lastMessage;
          return obj;
        }, {});

        setLastMessages(lastMessageData);
      };

      fetchLastMessages();
    });
  }, []);

  function recentClickHandler(userId) {
    props.onChatClick(userId);
  }
  function recentEmployee() {
    axiosInstance.get(`/employee/recent/${currentUser.userId}`).then((res) => {
      setUserList(res.data.data);
    });
  }
  function searchHandler() {
    setUserList((prev) => []);
    setIssearch(true);
  }

  function arrowclickHandler() {
    setIssearch(false);
    recentEmployee()
  }


  useEffect(() => {
    recentEmployee()
  }, []);
  // }

  const ListRecent = userList.map((user) => {
    if (user.id !== currentUser.userId) {
      const lastMessage = lastMessages[user.id];
      console.log(user)
      return (
        <RecentChat
        sele={props.sele}
          key={user.id}
          onClick={recentClickHandler}
          userId={user.id}
          profileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"
          recentChat={(user.id === lastMessage?.senderId || lastMessage?.reciverId === user.id) && lastMessage?.text}
          lastMessageD={(user.id === lastMessage?.senderId || lastMessage?.reciverId === user.id) && new Date(lastMessage?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          status={true}
          username={user.first_name}
          isActive = {user.isActive}
          ably={props.ably}
        />
      );
    }
  });

  return (
    <div className="chatList">
      <div className="header">
        <div className="roomHeader">
          {issearch ? "" : <h2>Private Chat</h2>}
        </div>
        <div>
          {issearch ? (
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="backarrow"
              onClick={arrowclickHandler}
            />
          ) : (
            <FontAwesomeIcon
              icon={faSearch}
              className="searchicon"
              onClick={searchHandler}
            />
          )}
        </div>
      </div >
      {issearch ? <SearchComp sele={props.sele} onChatClick={props.onChatClick} /> : ListRecent}
    </div>
  );
}
