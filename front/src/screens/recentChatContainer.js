import { React, useState, useEffect } from "react";
import "../styles/chatList.css";
import "../styles/search.css";
import axiosConfig from "../config/axiosConfig";
import { RecentChat } from "../components/recentChat";
import { currentUser } from "../model/currentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import SearchComp from "../components/searchComp.js";
// import { ArrowBack } from "@mui/icons-material";

export function ChatList(props) {
  function recentClickHandler(userId) {
    props.onChatClick(userId);
    // console.log(props)
  }

  function searchHandler() {
    setUserList((prev) => []);
    setIssearch(true);
  }
  function arrowclickHandler() {
    setIssearch(false);

    axiosConfig.get(`/employee/recent/${currentUser.userId}`).then((res) => {
      setUserList(res.data.data);
    });
  }

  // function Fetchuser(){
  const [issearch, setIssearch] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axiosConfig.get(`/employee/recent/${currentUser.userId}`).then((res) => {
      console.log(userList);
      setUserList(res.data.data);
      // console.log(res.data.data)
    });
  }, []);
  // }

  const ListRecent = userList.map((user) => {
    console.log(user.id);
    if (user.id !== currentUser.userId) {
      return (
        <RecentChat
          onClick={recentClickHandler}
          userId={user.id}
          profileImg={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"
          }
          recentChat={"hello there"}
          status={true}
          username={user.first_name}
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
      </div>
      {issearch ? <SearchComp onChatClick={props.onChatClick} /> : ListRecent}
    </div>
  );
}
