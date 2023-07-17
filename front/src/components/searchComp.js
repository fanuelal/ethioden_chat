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
import { baseImagePath } from "../common/Common";

function SearchComp(props) {
  const [userList, setUserList] = useState([]);
  const [searchedlist, setSearchedlist] = useState(userList);

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

  const ListRecent = (searchedlist.length === 0 ? userList : searchedlist).map(
    (user) => {
      if (user.id !== currentUser.userId) {
        return (
          <RecentChat
          ably={props.ably}
            onClick={recentClickHandler}
            userId={user.id}
            profileImg={user.profileImage}
            recentChat={"hello there"}
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
