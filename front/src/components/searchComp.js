import {React, useState, useEffect}  from "react";
import { RecentChat } from "../components/recentChat";
import axiosConfig from '../config/axiosConfig';
import {currentUser} from "../model/currentUserData"


function SearchComp(props) {
  const [userList, setUserList]= useState([])
  const [searchedlist, setSearchedlist] = useState(userList);

  
  function recentClickHandler(userId) {
    props.onChatClick(userId);
}

const filteredUser = (event) => {
  const search = event.target.value;
  console.log(search)
  const filteredUser = userList.filter((user) =>
  user.first_name.includes(search)
  );
  console.log(filteredUser)
  setSearchedlist(filteredUser);
};

  useEffect(()=>{
    axiosConfig.get('/employee')
    .then(res => {
        setUserList(res.data.data)
    
    })
},[]) 

const ListRecent = (searchedlist.length === 0? userList: searchedlist).map((user) => {
  if(user.id !== currentUser.userId){
      return  <RecentChat  onClick={recentClickHandler} userId={user.id} profileImg={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"} recentChat={"hello there"} status={true} username={user.first_name} />
  }

});

return(
<div>
<label>
  <input
  type="search"
  placeholder="&#61442;"
  className="search"
  onChange={(event) => filteredUser(event)}
  
  />
  
  
</label>
{ListRecent}

</div>

);

    }
  export default SearchComp;