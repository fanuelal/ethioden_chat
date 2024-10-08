import React, { useEffect } from "react";
import { useState } from "react";
import { RecentChat } from "./recentChat";
import { Bot } from "../model/Bot";
import {
  faSearch,
  faArrowLeft,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchComp from "./searchComp";
import Popup from "reactjs-popup";
import axiosInstance from "../config/axiosConfig";
import { currentUser } from "../model/currentUserData";

const Channel = (props) => {
  const [channels, setChannels] = useState([]);
  const [issearch, setIssearch] = useState(false);
  const [showpopup, setShowpopup] = useState(false);
  const [showuserlist, setShowuserlist] = useState(false);
  const [userList, setUserList] = useState([]);
  const [useradded, setUseradded] = useState([]);
  const [dictionary, setDictionary] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [grouplist, setGrouplist] = useState([]);
  const [groupname, setGroupname] = useState("");

  const channelFetch = async () => {
    await axiosInstance.get("/room?type=channel").then((res) => {
      setChannels(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    channelFetch();
  }, []);
  function recentClickHandler(botId) {
    props.onChatClick(botId);
  }

  const chatBots = channels.map((bot) => {
    return (
      <RecentChat
        name={props.name}
        sele={props.sele}
        key={bot.id}
        onClick={recentClickHandler}
        // onClick={recentClickHandler}
        userId={bot.id}
        profileImg={bot.image}
        recentChat={bot.type}
        status={true}
        username={bot.name}
        ably={props.ably}
      />
    );
  });

  axiosInstance.get("/employee").then((res) => {
    setUserList(res.data.data);
  });
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleNextButtonClick = () => {
    setDictionary({ ...dictionary, [inputValue]: "some value" });
    setInputValue("");
    setGroupname([inputValue]);
    // console.log(groupname)
  };

  useEffect(() => {
    console.log(dictionary);
  }, [dictionary]);

  const handleAddButtonClick = () => {
    setDictionary({ ...dictionary, [useradded]: "some value" });
    setInputValue("");

    // axiosInstance.post(`/room?name=${groupname}&type={"group"}&created_by=${ currentUser.userId}&members=${useradded}`).then((value) => {
    //   // setMessageData(value.data.data);
    // });
    const type = "channel";
    const params = {
      name: groupname,
      type: type,
      created_by: currentUser.userId,
      members: JSON.stringify(useradded),
    };

    axiosInstance
      .post("/room", params)
      .then((response) => {
        console.log(response.data);
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
  useEffect(() => {
    console.log(useradded);
  }, [useradded]);

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
        onClick={() => {
          useraddHandler(user.id);
          console.log(user.id);
        }}
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
      <div className=" font-bold  text-base md:text-sm h-full border-r border-#bdbaba">
        <div
          className={
            issearch
              ? " flex-row-reverse justify-around  items-center h-14 w-full bg-profile"
              : "flex justify-around items-center h-14 w -full bg-profile"
          }
        >
          {issearch ? (
            ""
          ) : (
            <div className="text-white lg:text-xl"> {props.name}</div>
          )}

          <div className="">
            {issearch ? (
              <div className=" items-start align-baseline -ml-72 pt-4 text-white ">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className=" "
                  onClick={arrowclickHandler}
                />
              </div>
            ) : (
              <FontAwesomeIcon
                icon={faSearch}
                className="text-white h-5 w-4 cursor-pointer"
                onClick={searchHandler}
              />
            )}
          </div>
        </div>
        {issearch ? (
          <SearchComp sele={props.sele} onChatClick={props.onChatClick} />
        ) : (
          chatBots
        )}
      </div>
      {currentUser.role==="admin"?
      <Popup
        trigger={
          <div class="bg-[#1d1f34] mt-[2ch] h-[50px] w-[50px] ml-[83%] rounded-full">
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
      />:""}

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

export default Channel;
