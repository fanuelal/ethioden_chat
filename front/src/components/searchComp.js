import { React, useState, useEffect } from "react";
import { RecentChat } from "../components/recentChat";
import axiosConfig from "../config/axiosConfig";
import { currentUser } from "../model/currentUserData";
import InputAdornment from "@mui/material/InputAdornment";
// import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import '../styles/chatList.css'
import { baseImagePath, formatDates } from "../common/Common";
import axiosInstance from "../config/axiosConfig";
function SearchComp(props) {
  const [userList, setUserList] = useState([]);
  const [searchedlist, setSearchedlist] = useState(userList);
  const [lastMessages, setLastMessages] = useState({});

  function recentClickHandler(userId) {
    props.onChatClick(userId);
  }

  const filteredUser = (event) => {
    const search = event.target.value.toLowerCase();
    console.log(search);
    const filteredUser = userList.filter((user) =>
      user.first_name.toLowerCase().includes(search)
    );

    console.log(filteredUser);
    setSearchedlist(filteredUser);
  };

  useEffect(() => {
    axiosConfig.get("/employee").then((res) => {
      setUserList(res.data.data);
    });
  }, []);
  useEffect(() => {
    const fetchLastMessages = async () => {
      if (userList.length > 0) {
        const Users = userList.map((user) =>
          axiosInstance.get(
            `/chat/last?senderId=${currentUser.userId}&reciverId=${user.id}`
          )
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

        setLastMessages((prevLastMessages) => ({
          ...prevLastMessages,
          ...lastMessageData,
        }));
      }
    };

    fetchLastMessages();
  }, [userList]);


  const ListRecent = (searchedlist.length === 0 ? userList : searchedlist).map(
    (user) => {
      if (user.id !== currentUser.userId) {
        const lastMessage = lastMessages[user.id];
        const lastMessageDate =
          lastMessage && formatDates(new Date(lastMessage.created_at));
        return (
          <RecentChat
          ably={props.ably}
            onClick={recentClickHandler}
            userId={user.id}
            profileImg={user.profileImage}
            recentChat={
              (user.id === lastMessage?.senderId ||
                lastMessage?.reciverId === user.id) &&
              lastMessage?.text
            }
            lastMessageD={lastMessageDate}
            status={true}
            username={user.first_name}
          />
        );
      }
    }
  );

  return (
    <div>
      <FormControl>
        <OutlinedInput

          autoFocus
          className="search"
          endAdornment={
            <InputAdornment  position="end">
              
            </InputAdornment>
          }
          onChange={(event) => filteredUser(event)}
          
        />
      </FormControl>
          <div className="searchlist">
          {ListRecent}
          </div>
      
    </div>
  );
}
export default SearchComp;
