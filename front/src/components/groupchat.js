import React from "react";
import {useState, useEffect } from "react";
import { RecentChat } from "./recentChat";
import "../styles/groupchat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faPlus,
  faTimes,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import SearchComp from "./searchComp";
import Popup from "reactjs-popup";
import axiosConfig from "../config/axiosConfig";
import { currentUser } from "../model/currentUserData";
import { colors } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Margin } from "@mui/icons-material";
import { formatDates } from "../common/Common";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
  const [openErr, setOpenErr] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isSmallDevice, setIsSmallDevice] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErr(false);
    setOpen(false);
  };
  React.useEffect(() => {
    function handleResize() {
      setIsSmallDevice(window.innerWidth < 550); // Change 768 to your desired breakpoint
    }

    handleResize(); // Set initial state on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function recentClickHandler(botId, members) {
    props.onChatClick(botId, members);
  }
  useEffect(() => {
    axiosConfig
      .get(`/room?type=group&userId=${currentUser.userId}`)
      .then((res) => {
        // console.log(res.data.data[0].membersDetail);
        setGrouplist(res.data.data);
      });
  }, []);
  // console.log(grouplist);
  const ListRecentgroup = grouplist.map(
    (user) => {
      // console.log(grouplist[0])
      if (grouplist !== null) {
        // console.log(user.id);
        return (
          <RecentChat
            name={props.name}
            userId={user.id}
            members={user.membersDetail}
            profileImg={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"
            }
            recentChat={user.last_message}
          lastMessageD={formatDates(new Date(user.last_message_time))}
            status={undefined}
            username={user.name}
            ably={props.ably}
            sele={props.sele}
            onClick={recentClickHandler}
            // onClick={recentClickHandler}
          />
        );
      } else {
        return null;
      }
    }
    // }
  );
  useEffect(() => {
    axiosConfig.get("/employee").then((res) => {
      setUserList(res.data.data);
    });
  }, []);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleNextButtonClick = () => {
    if (inputValue === "") {
      setOpenErr(true);
      return;
    }
    setShowpopup(false);
    setShowuserlist(true);
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
    setOpen(true);

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

    setOpen(true);
    return;
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
          // console.log(user.id)
        }}
        recentChat={user.department}
        isSelected={useradded.includes(user.id)}
        ably={props.ably}
        key={user.id}
        userId={user.id}
        profileImg={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"
        }
        status={true}
        username={user.first_name}
      />
    ));

  return <>
  <div className="font-bold text-base md:text-sm border-r border-gray-400 md:border-0">
    <div className="flex justify-around items-center h-10 md:h-12 bg-profile">
      <div className="text-white md:text-xl">{props.name}</div>
    </div>
  </div>
  <div className="max-h-[75vh] overflow-auto no-scrollbar">
    {ListRecentgroup}
  </div>
  <Popup
    trigger={
      <div class=" bg-[#1d1f34] h-[30px] w-[30px]  md:h-[40px] md:w-[40px] 
      lg:h-[45px] lg:w-[45px] xl:h-[50px] xl:w-[50px] ml-[21%] xl:ml-[28%] md:ml-[25%] lg:ml-[27%] 
      rounded-full fixed bottom-2  ">
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
        <p>create a group</p>
      </div>
    }
    // position="right center"
    // modal
    // closeOnEscape
    // closeOnDocumentClick
  />

  {showpopup && (
     <div className="mainnn fixed left-0 top-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] z-30">
       <div className={`relative  max-w-md mx-auto mt-16 bg-white rounded-lg shadow-lg ${isSmallDevice ? "w-43 ml-10 mt-10 ":"w-full"}`}>
        <div className={`flex items-center px-4 py-2 bg-profile ${isSmallDevice ? " ": " justify-between"}`}>
          <h3 className="text-lg font-medium text-white">Create a group</h3>
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
              Group Name
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
          <div className={`flex ${isSmallDevice ? "justify-start ":"justify-end"}`}>
            <button
              className="px-4 py-2 mr-2 font-bold text-white bg-profile rounded-lg  focus:outline-none "
              onClick={handleNextButtonClick}
            >
              Next
            </button>
          </div>
        </div>
        </div> 
     </div>
  )}

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
              Users
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

  <Snackbar open={openErr} autoHideDuration={3000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity="error"
      sx={{ width: "100%", ml: "510px", mt: "-470px" }}
    >
      Group Name required!
    </Alert>
  </Snackbar>

  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity="success"
      sx={{ width: "100%", ml: "470px", mt: "-360px" }}
    >
      Group created successfully!
    </Alert>
  </Snackbar>
</>
};

export default GroupChat;
