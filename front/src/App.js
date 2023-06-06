import './styles/App.css';
import { ChatList } from './screens/recentChatContainer';
import { ActiveData } from './controller/activeChatData';
import { useState, useEffect, useRef } from 'react';
import { messages } from './model/message';
import { EmptyScreen } from './screens/emptyChat';
import Login from './screens/loginScreen';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CatagoryList } from './screens/catagoryList';
import axiosInstance from './config/axiosConfig';
import PrivateRoutes from './components/privateRoutes';
import { getToken,refreshToken } from './config/tokenManager';
import {Userstatus} from './model/Status.js'
// import SearchComp from "./components/searchComp.js";
function App() {
  const [selected, setSelected] = useState(-1);
  const [messagesData, setMessageData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const [newMessage, setNewMessage] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(false);

  const isLogin = () => {
    const token = getToken();
    if (!token) {
      return false;
    }
    return true;
  };

  const fetchNewMessages = async () => {
    try {
      const response = await axiosInstance.get(`/chat?userId=${selected}`);
      const data = response.data.data;

      if (data.length > messagesData.length) {
        setMessageData(data);
        setNewMessage(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingMessages(false);
    }
  };


 
  const  chatSelectHandler = async (userId) => {
    try{
         axiosInstance.get(`/chat?userId=${userId}`).then((value)=>{
            setMessageData(value.data.data)
          // }
          })
      
            axiosInstance.get(`/employee/${userId}`).then((value) => {
              console.log(value.data.data.first_name)
              axiosInstance.get(`/status/${userId}`).then((resStatus) => {
                console.log(resStatus.data.data);
                if(resStatus.data.data.length > 0){
                  Userstatus[0].content = resStatus.data.data[0].label;
                }else{
                  Userstatus[0].content = "No status!";
                }
              });
            setSelectedUser(value.data.data);
          })

          var userMessages = messages.filter(message => message.senderId === userId || message.reciverId === userId);
              
              setMessageData((prev) => [...userMessages]);
              
            
          setSelected(userId);
      // } , 2000)
    }catch(error){
      console.log(error)
    }

  }

  return (
    <div className="App">
      <Routes>
        <Route  element ={<PrivateRoutes isLogin= {isLogin} />}>
            {/* <Route path='/' element={<Home onChatClick={chatSelectHandler} selected={selected} selectedUser={selectedUser.first_name} messagesData={messagesData}/>}  /> */}
            <Route path='/' element={<Home onChatClick={chatSelectHandler} selected={selected} selectedUser={selectedUser.first_name} messagesData={messagesData}/>}  />

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path="/*" element={<Navigate to="/" />} />
          
            </Routes>
    </div>
  );
}

function Home(props) {

  useEffect(() => {
    const refreshTokenInterval = setInterval(refreshToken, 55*60*1000); 
    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [])
  return (
    <>
      <CatagoryList />
      <ChatList onChatClick={props.onChatClick} />
      {/* <SearchComp onChatClick={props.onChatClick}/> */}
      {props.selected !== -1 ? (
        <ActiveData
          userId={props.selected}
          username={props.selectedUser}
          messages={props.messagesData}
          newMessage={props.newMessage}
          setNewMessage={props.setNewMessage}
        />
      ) : (
        <EmptyScreen />
      )}
    </>
  );
}

export default App;
