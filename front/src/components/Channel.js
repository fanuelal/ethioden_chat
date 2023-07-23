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
import { formatDates } from "../common/Common";

const Channel = (props) => {
  const [channels, setChannels] = useState([]);
  const [issearch, setIssearch] = useState(false);
  const [showpopup, setShowpopup] = useState(false);
  const [showuserlist, setShowuserlist] = useState(false);
  const [userList, setUserList] = useState([]);
  const [useradded, setUseradded] = useState([]);
  const [dictionary, setDictionary] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [groupname, setGroupname] = useState("");
 const [isSmallDevice, setIsSmallDevice] = React.useState(false);
  const channelFetch = async () => {
    await axiosInstance
      .get(`/room?type=channel&userId=${currentUser.userId}`)
      .then((res) => {
        setChannels(res.data.data);
        console.log(res.data.data);
      });
  };
  React.useEffect(() => {
    function handleResize() {
      setIsSmallDevice(window.innerWidth < 550); // Change 768 to your desired breakpoint
    }

    handleResize(); // Set initial state on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    channelFetch();
  }, []);
  function recentClickHandler(botId) {
    props.onChatClick(botId);
  }

  const chatBots = channels.map((user) => {
    if (channels !== null) {
      return (
        <RecentChat
          name={props.name}
          sele={props.sele}
          members={user.membersDetail}
          onClick={recentClickHandler}
          // onClick={recentClickHandler}
          userId={user.id}
          profileImg={user.image}
          recentChat={user.last_message}
          lastMessageD={formatDates(new Date(user.last_message_time))}
          status={true}
          username={user.name}
          ably={props.ably}
        />
      );
    } else {
      return null;
    }
  });
  useEffect(() => {
    axiosInstance.get("/employee").then((res) => {
      setUserList(res.data.data);
    });
  }, []);

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
        onClick={() => {
          useraddHandler(user.id, user.membersDetail);
          console.log(user.id);
        }}
        ably={props.ably}
        key={user.id}
        userId={user.id}
        // profileImg={

        // }
        recentChat={""}
        status={true}
        username={user.first_name}
      />
    ));

  return (
    <>
      <div className=" font-bold  text-base md:text-sm  border-r border-#bdbaba">
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
        </div>
        {issearch ? (
          <SearchComp sele={props.sele} onChatClick={props.onChatClick} />
        ) : (
          chatBots
        )}
      </div>
      {currentUser.role === "admin" ? (
        <Popup
          trigger={
            <div
              class=" bg-[#1d1f34] h-[30px] w-[30px]  md:h-[40px] md:w-[40px] 
          lg:h-[45px] lg:w-[45px] xl:h-[50px] xl:w-[50px] ml-[21%] xl:ml-[28%] md:ml-[25%] lg:ml-[27%] 
          rounded-full fixed bottom-2  "
            >
              <FontAwesomeIcon
                icon={faPlus}
                class="text-[aliceblue] h-[25px] w-[30px] md:h-[35px] md:w-[40px] 
            lg:h-[40px] lg:w-[45px] xl:h-[40px] xl:w-[45px]  pt-[20%] xl:pt-[30%] md:pt-[25%] lg:pt-[28%]"
                onClick={handlePopup}
              />
            </div>
          }
          content={
            <div className="popuppage">
              <p>channel name</p>
            </div>
          }
          position="right center"
          modal
          closeOnEscape
          closeOnDocumentClick
        />
      ) : (
        ""
      )}

      <div>
        <div>
          <div>
          {showpopup && (
     <div className="fixed left-0 top-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] z-30">
       <div className={`relative  max-w-md mx-auto mt-16 bg-white rounded-lg shadow-lg ${isSmallDevice ? "w-43 ml-10 mt-10 ":"w-full"}`}>
        <div className={`flex items-center px-4 py-2 bg-profile justify-end`}>
          <button
            className="text-white rounded-lg hover:bg-gray-600 focus:outline-none focus: bg-profile"
            onClick={() => setShowpopup(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label className={`block mb-2 text-sm font-bold text-gray-700 ${isSmallDevice ? "-ml-30":""}`}>
            channel name
            </label>
            <input
              required={true}
              className={`block  px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:outline-none focus:ring ${isSmallDevice ? "w-200 ":"w-full"}`}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
            />
          </div>
          <div className={`flex justify-end`}>
            <button
              className="px-4 py-2 mr-2 font-bold text-white bg-profile rounded-lg  focus:outline-none "
              onClick={() => {
                setShowpopup(false);
                setShowuserlist(true);
                handleNextButtonClick();
              }}
            >
              Next
            </button>
          </div>
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
    <div className="fixed left-0 top-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] z-50">
      <div className={`relative  max-w-md mx-auto mt-16 bg-white rounded-lg shadow-lg ${isSmallDevice ? "w-43 ml-10 mt-10 ":"w-full"}`}>
        <div className="flex items-center justify-between px-4 py-2 bg-profile">
          <h3 className="text-lg font-medium text-white">Choose a user</h3>
          <button
            className="text-white rounded-lg  bg-profile focus:outline-none focus:bg-gray-300"
            onClick={() => setShowuserlist(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
            choose a user
            </label>
            <div className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md max-h-80 overflow-auto no-scrollbar">
              {ListRecent}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 mr-2 font-bold text-white bg-profile rounded-lg  focus:outline-none"
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
    </div>
  )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Channel;
