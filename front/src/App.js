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
import Ably from 'ably'
import { currentUser } from './model/currentUserData';
// import SearchComp from "./components/searchComp.js";
import {MiniDrawer} from './screens/burgerMenu'

const ably = new Ably.Realtime('nGSxiw.f53CMg:CYsWsQva-8G9j4njChYzhgnSYA8sJacA-EytCqL6JJ0');
// const channel = ably.channels.get('private_chat');
ably.connection.once('connected');
console.log('Connected to Ably!');

function App() {

  const [selected, setSelected] = useState(-1);
  const [messagesData, setMessageData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const isLogin = () => {
    const token = getToken();
    if (!token) {
      return false;
    }
    return true;
  };




  const chatSelectHandler = async (userId) => {
    try {
      axiosInstance.get(`/chat?senderId=${ currentUser.userId}&reciverId=${userId}`).then((value) => {
        setMessageData(value.data.data);
      });
      axiosInstance.get(`/employee/${userId}`).then((value) => {
        // console.log(value.data.data.first_name);
        setSelectedUser(value.data.data);
        //  console.log(`selectedUser.id: ${selectedUser.id}`)
        // console.log(`userId: ${userId}`)

        axiosInstance.get(`/status/${userId}`).then((resStatus) => {
          // console.log(resStatus.data.data);
          if (resStatus.data.data.length > 0) {
            Userstatus[0].content = resStatus.data.data[0].label;
          } else {
            Userstatus[0].content = "No status!";
          }
        });
       
      });
    
     const ids = [currentUser.userId, userId];
     const sortedIds = ids.sort()
console.log(ids)
const channel = ably.channels.get(`${sortedIds[0]}${sortedIds[1]}`);
console.log(channel)
channel.history({ limit: 1 }, (err, result) => {
  if (err) {
    throw err;
  }

  const lastMessage = result.items[0];
 
  console.log(lastMessage);
});
     channel.subscribe(`${sortedIds[0]}${sortedIds[1]}`, (message) => {
        
       if(message.data.senderId!==currentUser.userId){
        setMessageData((prev) => [...prev, message.data]);
        console.log('Received chat message:', message.data);
       }
      
     });


      // Do something with the last message
    

      setSelected(userId);
    } catch (error) {
      console.log(error);
    }
  
  };
  

  return (
    <div className="App">
      <Routes>
        <Route  element ={<PrivateRoutes isLogin= {isLogin} />}>
            {/* <Route path='/' element={<Home onChatClick={chatSelectHandler} selected={selected} selectedUser={selectedUser.first_name} messagesData={messagesData}/>}  /> */}
            <Route path='/' element={<Home sele={selectedUser.id} onChatClick={chatSelectHandler} selected={selected} selectedUser={selectedUser.first_name} messagesData={messagesData}/>}  />

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
    
        <CatagoryList ably={ably} /> 
        {/* <MiniDrawer/>  */}
      <ChatList sele={props.sele} onChatClick={props.onChatClick} ably={ably}/>
      
      {/* <SearchComp onChatClick={props.onChatClick}/> */}
      {props.selected !== -1 ? (
        <ActiveData
          ably = {ably}
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
