import React, { useState, useEffect, useRef } from "react";
import { ChatList } from "./recentChatContainer";
import { ActiveData } from "../controller/activeChatData";
import { EmptyScreen } from "./emptyChat";
import { styled, useTheme } from "@mui/material/styles";
import About from "./About";
import Box from "@mui/material/Box";
import GroupChat from "../components/groupchat";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { currentUser } from "../model/currentUserData";
import { DropDown } from "./DropDown";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "react-avatar";
import {
  faEyeSlash,
  faEye,
  faUserPlus,
  faCommentDots,
  faUsers,
  faBullhorn,
  faUser,
  faInfoCircle,
  faRobot,
  faSignOut,
  faFaceSmileWink,
  faClose,
  faHouseChimneyUser,
  faTree,
  faFaceSadTear,
  faPhone,
  faEnvelope,
  faSmile,
  faKey,
  faStar,
  faChain,
  faKitMedical,
  faHSquare,
  faHandBackFist,
  faChampagneGlasses,
  faCamera
} from "@fortawesome/free-solid-svg-icons";
// import { faEyeSlash,faEye,faCommentDots, faUsers, faBullhorn, faUser, faInfoCircle, faQuestionCircle, faRobot, faSignOut,faFaceSmileWink,faClose,faHouseChimneyUser,faTree,faFaceSadTear, faPhone, faEnvelope, faSmile, faKey, faBook, faStar } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from "../config/axiosConfig";
import { format } from "date-fns";
import Bots from "../components/Bot";
import { AddMember } from "../components/createMember";
import Channel from "../components/Channel";
import { baseImagePath } from "../common/Common";
const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#1d1f34",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#1d1f34",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#1d1f34",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
var listIcon = [
  <FontAwesomeIcon icon={faCommentDots} />,
  <FontAwesomeIcon icon={faUsers} />,
  <FontAwesomeIcon icon={faBullhorn} />,
  <FontAwesomeIcon icon={faFaceSmileWink} />,
  <FontAwesomeIcon icon={faRobot} />,
  <FontAwesomeIcon icon={faUserPlus} />,
  <FontAwesomeIcon icon={faUser} />,
  <FontAwesomeIcon icon={faInfoCircle} />,
  <FontAwesomeIcon icon={faSignOut} />,
];
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  backgroundColor: "white",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  // }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [statusContent, setStatusContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [component, setComponent] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentP, setcurrentP] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [updatePasswordError, setUpdatePasswordError] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [chatClick, setChatClick] = useState(true)

  
  const user =  currentUser.username.substring(0, 2)

  const [emailed, setEmailed] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(0);
  const renderComponent = () => {
    switch (activeMenu) {
      case "Private Chat":
        return (
          <ChatList
            name={activeMenu}
            sele={props.sele}
            onChatClick={props.onChatClick}
            ably={props.ably}
          />
        );
      case "Group Chat":
        return (
          <GroupChat
            name={activeMenu}
            sele={props.selected}
            onChatClick={props.onChatClick}
            ably={props.ably}
          />
        );
      case "Channels":
        return (
          <Channel
            name={activeMenu}
            sele={props.selected}
            onChatClick={props.onChatClick}
            ably={props.ably}
          />
        );
      case "Bot":
        return <Bots 
        name={activeMenu} 
        ably={props.ably} />;
      case "Add Members":
        return <AddMember />;
      case "Settings":
        return null;
      case "About":
        return (
          <About
            name={props.name}
            sele={props.sele}
            onChatClick={props.onChatClick}
            ably={props.ably}
          />
        );
      
      case "Logout":
        return null;
      default:
        return (
          <ChatList
            name={activeMenu}
            sele={props.sele}
            onChatClick={props.onChatClick}
            ably={props.ably}
          />
        );
    }
  };
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [popup, setpop] = useState(false);
  const handleClickOpen = () => {
    setpop(!popup);
  };
  const closepopup = () => {
    setpop(false);
  };

  const [Profilepopup, Profilesetpop] = useState(false);
  const handleClickProfileOpen = () => {
    Profilesetpop(!Profilepopup);
  };
  const closeProfilepopup = () => {
    Profilesetpop(false);
  };

  const [showPasswordChangePopup, setShowPasswordChangePopup] = useState(false);
  const closePasswordChangePopup = () => {
    setShowPasswordChangePopup(false);
  };

  const handleMenuItemClick = (menu) => {
    setStatusContent(menu.Status);
  };
  const handleMenuListClick = (menu, index) => {
    setActiveMenu(menu, index);
    setSelectedMenu(index)
  };

  const handleProfileImage = (event) => {
    setProfilePic(event.target.files[0]);
  };

  const handleSaveProfilePic = async () => {
    try {
      const formData = new FormData();
      formData.append("file", profilePic);
      for (const [name, file] of formData.entries()) {
        if (file instanceof File) {
          console.log(`Filename for field '${name}': ${file.name}`);
        }
      }
      await axiosInstance
        .patch(`/employee/${currentUser.userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res.data)
        );

      console.log("Image patch request successful");
    } catch (error) {
      console.error("Error occurred while sending image patch request:", error);
    }
  };

  useEffect(() => {
    setComponent(renderComponent());
  }, [activeMenu]);

  const menuLists = [
    "Private Chat",
    "Group Chat",
    "Channels",
    "Status",
    "Bot",
    "Add Members",
    "Profile",
    "About",
    "Logout",
  ];
  const Status = [
    {
      Status: "In a meeting",
      icon: (
        <FontAwesomeIcon
          icon={faUsers}
          style={{ color: "blue", fontSize: "20px" }}
        />
      ),
    
    },

    {
      Status: "Vacationing",
      icon: (
        <FontAwesomeIcon
          icon={faTree}
          style={{ color: "green", fontSize: "20px" }}
        />
      ),
      
    },


    {
      Status: "Out of Sick",
      icon: (
        <FontAwesomeIcon
          icon={faFaceSadTear}
          style={{ color: "yellow", fontSize: "20px" }}
        />
      ),
     
    },

    {
      Status: "working remotely  ",
      icon: (
        <FontAwesomeIcon
          icon={faHouseChimneyUser}
          style={{ color: "chocolate", fontSize: "20px" }}
        />
      ),
    
    },
  ];
  const setStatus = async() => {
    const body = {
      userId: currentUser.userId,
      label: statusContent,
      ends_at: selectedDate,
    };
     axiosInstance.post("/status", body);
    closepopup()
  //  console.log(rs.data)
  };
  const handleInputChange = (event) => {
    setStatusContent(event.target.value);
  };
  const handleNewP = (event) => {
    setnewPassword(event.target.value);
  };
  const handleCurrentP = (event) => {
    setcurrentP(event.target.value);
  };
  const handleConfirmP = (event) => {
    setconfirmNewPassword(event.target.value);
  };
  // console.log(currentP)
  // console.log(newPassword)
  // console.log(confirmNewPassword)

  const handleDateSelection = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
    setSelectedDate(formattedDate);
  };
  // console.log(selectedDate);

  // console.log(statusContent);

  const navigate = useNavigate();
  const logoutHandler = async () => {
    axiosInstance.patch(`/employee/${currentUser.userId}`, {
      isActive: 0,
    });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/");
  };

  const iconLister = (index) => {
    // console.log(index)
    if(currentUser.role !== 'admin' && index === 5 ){
      return;
    } else {
      return listIcon[index];
    }
  };

  console.log(currentP);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth", {
        email: currentUser.email,
        password: currentP,
      });

      if (response.data.success) {
        const res = await axiosInstance.patch(
          `/employee/${currentUser.userId}`,
          {
            password: newPassword,
          }
        );
        if (res.data.success) {
          closePasswordChangePopup();
        }
        console.log("Password updated successfully");
        if (res.data.success){
closePasswordChangePopup()
        }
      } else {
        setUpdatePasswordError(true);
        alert("Failed to verify user");
      }
    } catch (err) {
      console.log(err);
      setUpdatePasswordError(true);
      alert("An error occurred");
    }
  };
  

  return (
    <>
      <div className="profile ">
        <div className=" profile_icon">
          <div>
            {Profilepopup ? (
              <div className="mainnn p-6 fixed flex   justify-start  items-center w-full h-screen ">
                <div className=" p-4 ml-24 mb-10   rounded-md bg-white">
                <div class="popup-bodyy flex flex-col items-center sm:flex-row sm:justify-center sm:items-start">
  <div class="w-1/3 flex flex-col items-center mb-4 sm:mr-4 sm:mb-0">
    <img class="w-full h-full object-cover rounded-full" alt="profileImage" src={currentUser.profileImg} />
    <h1 class="mt-4 font-bold text-xl">{currentUser.username}</h1>
  </div>
  </div>
                  <div className="bg-lightgrey w-full p-0.5"></div>
                  <div className="flex flex-col mt-7 ml-1 pr-10 ">
                    
                    <span className="flex items-center mb-2">
                      <div className="bg-green-300 rounded-md p-1 mr-2">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-white"
                        />
                      </div>

                      <h2 className="">Phone</h2>
                      <h4 className="ml-10 text-left text-sky-400">
                        {currentUser.phone}
                      </h4>
                    </span>
                    <span className="flex items-center mb-2">
                      <div className="bg-orange-200 rounded-md p-1 mr-2">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-white"
                        />
                      </div>

                      <h2 className="">Email</h2>
                      <h4 className="ml-10 text-right text-sky-400">
                        {currentUser.email}
                      </h4>
                    </span>
                    <span className="flex items-center mb-2">
                      <div className="bg-red-400 rounded-md p-1 mr-2">
                        <FontAwesomeIcon icon={faKey} className="text-white" />
                      </div>
                      <h2 className="">Role</h2>
                      <h4 className="ml-10 text-right text-sky-400">
                        {currentUser.role}
                      </h4>
                    </span>
                    <span className="flex items-center mr-15 mb-2">
                      <div className="bg-orange-300 rounded-md p-1 mr-2">
                        <FontAwesomeIcon
                          icon={faSmile}
                          className="text-white"
                        />
                      </div>

                      <h2 className="">Status</h2>
                      <h4 className="ml-10 text-left text-sky-400">
                        {currentUser.Status}
                      </h4>
                    </span>

                    <span className="flex items-center mr-15 mb-2">
                      <div className="bg-blue-300 rounded-md p-1 mr-2">
                        <FontAwesomeIcon icon={faChain} className="text-white" />
                      </div>
                      <button
                        className="bg-white -ml-1 p-1"
                        onClick={() => setShowPasswordChangePopup(true)}
                      >
                        <h2 className="">Reset Password</h2>
                      </button>
                      <h4 className="ml-10 text-left">{currentUser.Status}</h4>
                    </span>
                  </div>

                  <h1>
                    <FontAwesomeIcon
                      icon={faClose}
                      onClick={closeProfilepopup}
                      className=" bg-lightgrey rounded-full p-1 mt-3 mr-2  "
                    />
                  </h1>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {showPasswordChangePopup && (
        <div className="mainnn  fixed  flex justify-around items-center w-full h-screen">
          <div className="p-4 mr-[30vh] mb-[20vh]  rounded-md bg-white">
            <div className="popup-bodyy">
              <h1 className="w-15 h-15 mr-[15vh]  font-bold  decoration-8 text-xl">
                Reset Password
              </h1>
            </div>

            <div className="flex flex-col mt-7 ml-1 pr-5">
              {/* Password change form */}
              <form onSubmit={submitFormHandler}>
                <div className="flex flex-col mb-2 relative">
                  <label
                    htmlFor="current-password"
                    className="font-semibold mb-1 mr-[15vh] text-sm"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleCurrentP}
                      className="border-2 outline-none pr-10"
                      type={showCurrentPassword ? "text" : "password"}
                      id="current-password"
                      name="current-password"
                      required
                    />
                    <FontAwesomeIcon
                      icon={showCurrentPassword ? faEye : faEyeSlash}
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="rounded-full p-1 mt-0.5 mr-0.3 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2 relative">
                  <label
                    htmlFor="new-password"
                    className="font-semibold mb-1 mr-[19vh] text-sm"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleNewP}
                      className="border-2 outline-none pr-10"
                      type={showNewPassword ? "text" : "password"}
                      id="new-password"
                      name="new-password"
                      required
                    />
                    <FontAwesomeIcon
                      icon={showNewPassword ? faEye : faEyeSlash}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className=" rounded-full p-1 mt-0.5 mr-0.3 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-4 relative">
                  <label
                    htmlFor="confirm-password"
                    className="font-semibold mb-1 mr-[10vh] text-sm"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleConfirmP}
                      className="border-2 outline-none pr-10"
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      name="confirm-password"
                      required
                    />
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className=" rounded-full p-1 mt-0.5 mr-0.3 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>
                <div>
                  {updatePasswordError && <div>wrong current password</div>}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-lightgrey font-bold py-1 px-3 rounded"
                >
                  Save Change
                </button>
              </form>
              <h1>
                <FontAwesomeIcon
                  icon={faClose}
                  onClick={closePasswordChangePopup}
                  className="bg-lightgrey rounded-full p-1 mt-3 mr-2 cursor-pointer"
                />
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="status ">
        <div className=" Status_icon">
          <div>
            {popup ? (
              <div className="mainn">
                <div className="popup">
                  <div className="popup-body">
                    <h3>Set a status</h3>
                    <p>
                      <FontAwesomeIcon
                        icon={faClose}
                        onClick={closepopup}
                        className="bg-lightgrey rounded-full p-1  "
                      />
                    </p>
                  </div>

                  <div className="popup-header">
                    <input
                      autoFocus
                      type="text"
                      value={statusContent}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="listofstatus ">
                    <ul>
                      {Status.map((menu) => (
                        <li
                          className=""
                          onClick={() => handleMenuItemClick(menu)}
                        >
                          {" "}
                          {menu.icon} <span> </span> {menu.Status}
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-around align-baseline">
                      <div>
                        Clear after:{" "}
                        <DropDown onDateSelection={handleDateSelection} />
                      </div>
                      <button
                        className="transition ease-in-out hover:-translate-y-3 rounded-lg ml-4"
                        onClick={setStatus}
                      >
                        Save
                      </button>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            {open && (
              <div className="flex flex-col mt-3 ">
                <div className="relative">
  <label htmlFor="profileImageInputTrigger">
    <img
      className="chatProfile mt-4"
      alt="profileImage"
      src={baseImagePath + currentUser.profileImage}
      onClick={handleImageClick}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <FontAwesomeIcon icon={faCamera} className="text-white text-l" />
    </div>
    <div className="text-white mr-20 pt-2">{currentUser.username}</div>
  </label>
  <input
    id="profileImageInputTrigger"
    ref={fileInputRef}
    className="mr-20 h-0 w-0 bg-transparent"
    type="file"
    onChange={handleProfileImage}
  />
</div>
                <div
                  className="text-white mr-20 text-xs cursor-pointer"
                  onClick={handleSaveProfilePic}
                >
                upload 
                </div>
              
              </div>
            )}
            {!open ? (
              <MenuIcon
                onClick={handleDrawerOpen}
                className="mr-4"
                style={{ color: "white", cursor: "pointer" }}
              />
            ) : (
              <IconButton
                onClick={handleDrawerClose}
                style={{ color: "white" }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            )}
          </DrawerHeader>
          {/* {open ? <img className="chatProfile" alt="profileImage" src={currentUser.profileImg} />:<MenuIcon  onClick={handleDrawerOpen} style={{color:'white'}} />} */}

          <Divider />
          <List>
            {menuLists.map((text, index) => {
              if (currentUser.role !== "admin" && index === 5) {
                return null;
              }
              const isActiveMenu =  index === selectedMenu;
              return (
                <ListItem key={text} disablePadding sx={{ 
                  display: "block",
                  backgroundColor: isActiveMenu ? "#EE1f34" : "transparent",
                 }}>
                  <ListItemButton
                    sx={{
                      minHeight: 40,
                      color: "whiteSmoke",
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => {
                      props.onListItemButtonClick();
                      text === "Status"
                        ? handleClickOpen()
                        : text === "Profile"
                        ? handleClickProfileOpen()
                        : text === "Logout"
                        ? logoutHandler()
                        : handleMenuListClick(text, index);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        color: "white",
                        fontSize: "20px",
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {iconLister(index)}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                      button
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, flexShrink: 1 }}>
          <div className="flex shrink h-screen">
            <div className="w-2/6 ">{component}</div>
            <div className="w-4/6">
              {props.selected !== -1 && props.chatClick  ? (
                <ActiveData
                  image={props.image}
                  members={props.members}
                  selectedChannel={props.selectedChannel}
                  name={activeMenu}
                  ably={props.ably}
                  userId={props.selected}
                  username={props.selectedUser}
                  messages={
                    activeMenu === "Channels" || activeMenu === "Group Chat"
                      ? props.channelmessagesData
                      : props.messagesData
                  }
                />
              ) : (
                <EmptyScreen />
              )}
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}