import React from "react";
import { useState, useEffect } from "react";
import { RecentChat } from "./recentChat";
import "../styles/groupchat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchComp from "./searchComp";
import Popup from "reactjs-popup";
import axiosConfig from "../config/axiosConfig";
import { currentUser } from "../model/currentUserData";

const GroupChat = (props) => {
  const [issearch, setIssearch] = useState(false);
  const [showpopup, setShowpopup] = useState(false);
  const [showuserlist, setShowuserlist] = useState(false);
  const [userList, setUserList] = useState([]);

  axiosConfig.get("/employee").then((res) => {
    setUserList(res.data.data);
  });

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
        ably={props.ably}
        key={user.id}
        userId={user.id}
        profileImg={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrq9rrEZy6VUsQmoeIPh6gYzS_2JqKe1i9A&usqp=CAU"
        }
        recentChat={" "}
        status={true}
        username={user.first_name}
      />
    ));

  return (
    <>
      <div className=" font-bold  text-base md:text-sm shadow-md">
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
            <div className="text-white lg:text-xl"> Group Chat</div>
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
          ""
        )}
      </div>

      <Popup
        trigger={
          <div className="add-group1">
            <FontAwesomeIcon
              icon={faPlus}
              className="add-group"
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

      <div className="status ">
        <div className=" Status_icon">
          <div>
            {showpopup && (
              <div className="mainn">
                <div className="popup">
                  <div className="popup-body">
                    <div
                      className="close-icon"
                      onClick={() => setShowpopup(false)}
                    >
                      <FontAwesomeIcon className="clear" icon={faTimes} />
                    </div>
                    <h3 className="header1">create a group</h3>
                  </div>
                  <div className="popup-header">
                    <input type="text" />
                  </div>

                  <div>
                    {/* <button className="nextbutton" onClick={() => {setShowpopup(false),setShowuserlist(true)}}>next</button> */}
                    <button
                      className="nextbutton"
                      onClick={() => {
                        setShowpopup(false);
                        setShowuserlist(true);
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

      <div className="status ">
        <div className=" Status_icon">
          <div>
            {showuserlist && (
              <div className="mainn">
                <div className="popup">
                  <div className="popup-body">
                    <div
                      className="close-icon"
                      onClick={() => setShowuserlist(false)}
                    >
                      <FontAwesomeIcon className="clear" icon={faTimes} />
                    </div>
                    <h3 className="header1">choose a user</h3>
                    {/* <div className="searchlist"> */}
                    {ListRecent}
                    {/* </div> */}
                  </div>

                  <div>
                    <button
                      className="nextbutton"
                      onClick={() => setShowuserlist(false)}
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
