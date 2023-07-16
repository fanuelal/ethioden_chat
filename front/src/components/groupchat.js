import React from "react";
import { useState, useEffect } from "react";
import { RecentChat } from "./recentChat";
import "../styles/groupchat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faArrowLeft,faPlus,faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchComp from "./searchComp";
import Popup from "reactjs-popup";
import axiosConfig from "../config/axiosConfig";
import { currentUser } from "../model/currentUserData";

const GroupChat = (props) => {
  const [issearch, setIssearch] = useState(false);
  const [showpopup, setShowpopup] = useState(false);
  const [showuserlist, setShowuserlist] = useState(false);
  const [userList, setUserList] = useState([]);
  const [useradded, setUseradded] = useState([]);
  const [dictionary, setDictionary] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [grouplist, setGrouplist] = useState([]);
  const [groupname, setGroupname] = useState("");

  function recentClickHandler(botId, members) {
    props.onChatClick(botId, members);
  }
  useEffect(() => {
    axiosConfig.get(`/room?type=group&userId=${currentUser.userId}`).then((res) => {
      // console.log(res.data.data[0].membersDetail);
      setGrouplist(res.data.data);
    });
  }, []);
  // console.log(grouplist);
  const ListRecentgroup = grouplist.map(
    (user) => {
      // console.log(grouplist[0])
     if(grouplist !== null){
        // console.log(user.id);
       return (
           <RecentChat
           name= {props.name}
            //  userId={user.id}
             members={user.membersDetail}
             profileImg={
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"
             }
             recentChat={""}
             status={undefined}
             username={user.name}
             ably={props.ably}
             sele={props.sele}
         onClick={recentClickHandler}
         // onClick={recentClickHandler}
           />
         );
     }else{
      return null;
     }
      }
    // }
  );
useEffect(() => {
  axiosConfig.get("/employee").then((res) => {
     setUserList(res.data.data);
   });
}, [])
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleNextButtonClick = () => {
    setDictionary({ ...dictionary, [inputValue]: "some value" });
    setInputValue("");
    setGroupname([inputValue]);
    // console.log(groupname)
  };

  // useEffect(() => {
  //   console.log(dictionary);
  // }, [dictionary]);

  const handleAddButtonClick = () => {
    setDictionary({ ...dictionary, [useradded]: "some value" });
    setInputValue("");

    // axiosConfig.post(`/room?name=${groupname}&type={"group"}&created_by=${ currentUser.userId}&members=${useradded}`).then((value) => {
    //   // setMessageData(value.data.data);
    // });
    const type = "group";
    const params = {
      name: groupname,
      type: type,
      created_by: currentUser.userId,
      members: JSON.stringify(useradded),
    };

    axiosConfig
      .post("/room", params)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
    const useraddHandler = (id) => {
      if (!useradded.includes(id)) {
        setUseradded([...useradded, id]);
      }
    };
    // useEffect(() => {
    //   console.log(useradded);
    // }, [useradded]);
  
 
  const handlePopup = () => {
    setShowpopup(true);
  };
  const searchHandler = () => {
    setIssearch(true);
  };

  const arrowclickHandler = () => {
    setIssearch(false);
  };
  const ListRecent = userList
    .filter((user) => user.id !== currentUser.userId)
    .map((user) => (
      <RecentChat
        onClick={() => 
          {useraddHandler(user.id, user.membersDetail);
          // console.log(user.id)
          }
        }
        
        ably={props.ably}
        key={user.id}
        userId={user.id}
        profileImg={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"
        }
        recentChat={""}
        status={true}
        username={user.first_name}
      />
    ));

  return (
    <>
      <div className=" font-bold  text-base md:text-sm shadow-md">
        <div
          className={
            // issearch
            //   ? " flex-row-reverse justify-around  items-center h-14 w-full bg-profile"
              "flex justify-around items-center h-14 w -full bg-profile"
          }
        >
            <div className="text-white lg:text-xl"> Group Chat</div>
          

</div>
      </div>
      <div class="max-h-[75vh] overflow-auto no-scrollbar">
        {ListRecentgroup}
      </div>
      <Popup
        trigger={
          <div class="bg-[#1d1f34] mt-[22ch] h-[50px] w-[50px] ml-[83%] rounded-full ">
            <FontAwesomeIcon
              icon={faPlus}
              // class="text-[#fa8072] h-8 w-8 "
              class="text-[aliceblue] pt-[25%] h-[40px] w-[45px]"
              onClick={handlePopup}
            />
          </div>
        }
        content={
          <div className="popuppage">
            <p>creat a group</p>
          </div>
        }
        position="right center"
        modal
        closeOnEscape
        closeOnDocumentClick
      />

      <div>
        <div>
          <div>
            {showpopup && (
              <div className="w-[100%] h-[120vh] fixed left-0 top-[-10px] flex justify-center items-center z-[9999] bg-[rgba(0, 0, 0, 0.5)]">
                <div className="p-[80px] pb-[50px] mb-[80px] max-w-[500px] bg-[white] rounded-lg">
                  <div className=" mt-[-60px] bg-[white] ml-[-70px] float-left">
                    <div
                      className="close-icon"
                      onClick={() => setShowpopup(false)}
                    >
                      <FontAwesomeIcon className="pl-[180%]" icon={faTimes} />
                    </div>
                    <h3 className="pb-[15%] pl-[5%] w-[250px]">
                      create a group
                    </h3>
                  </div>
                  <div className="float-left mt-[-9px] mb-[3px] bg-[black]">
                    {/* <input className="p-[15px] ml-[-50px] h-[10px] mt-[-20px] w-[400px] rounded-[2px] border-[lightskyblue]" type="text" /> */}
                    {/* <input className="groupname" type="text" /> */}
                    <input
                      className="groupname"
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    {/* <button className="nextbutton" onClick={() => {setShowpopup(false),setShowuserlist(true)}}>next</button> */}
                    <button
                      className="mt-[5vh] mb-[-10vh] ml-[95%] rounded-lg "
                      onClick={() => {
                        setShowpopup(false);
                        setShowuserlist(true);
                        handleNextButtonClick();
                      }}
                    >
                      next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            {showuserlist && (
              <div className="w-[100%] h-[120vh] fixed left-0 top-0 flex justify-center items-center z-[9999] bg-[rgba(0, 0, 0, 0.5)]">
                <div className="p-[80px] pb-[50px] mb-[80px] max-w-[500px] bg-[white] rounded-lg mt-[-10px] h-[75%]">
                  <div className="mt-[-60px] float-left bg-[white] ml-[-70px]">
                    <div
                      className="close-icon"
                      onClick={() => setShowuserlist(false)}
                    >
                      <FontAwesomeIcon className="pl-[115%]" icon={faTimes} />
                    </div>
                    <h3 className="header1">choose a user</h3>
                    <div className="w-[250px] pl-[10%] max-h-[60vh] overflow-auto no-scrollbar">
                      {ListRecent}
                    </div>
                  </div>

                  <div>
                    <button
                      className="rounded-lg ml-[100%] mt-[25%] "
                      onClick={() => {
                        setShowuserlist(false);
                        handleAddButtonClick();
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChat;
