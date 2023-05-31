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
import { getToken } from './config/tokenManager';

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

  useEffect(() => {
    let timeout;

    if (selected !== -1) {
      if (!fetchingMessages) {
        setFetchingMessages(true);
        fetchNewMessages();
      }}

      timeout = setTimeout(fetchNewMessages, 2000);
  function chatSelectHandler(userId) {
    try{
      setTimeout(async () =>{

         axiosInstance.get(`/chat?userId=${userId}`).then((value)=>{
           console.log(value.data.data.length)
          if(value.data.data.length > messagesData.length){
            setMessageData(value.data.data)
          }
          })
      
            axiosInstance.get(`/employee/${userId}`).then((value) => {
            // console.log(value.data.data)
            setSelectedUser(value.data.data);
            // console.log(selectedUser.first_name)
          })
          var userMessages = messages.filter(message => message.senderId === userId || message.reciverId === userId);
              
              setMessageData((prev) => [...userMessages]);
              
            
          setSelected(userId);
      } , 2000)

    }catch(error){
      console.log(error)
    }

    return () => clearTimeout(timeout);
  }}, [selected, messagesData, fetchingMessages]);

  const chatSelectHandler = (userId) => {
    setSelected(userId);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route element={<PrivateRoutes isLogin={isLogin} />}>
          <Route
            path="/home"
            element={
              <Home
                onChatClick={chatSelectHandler}
                selected={selected}
                selectedUser={selectedUser.first_name}
                messagesData={messagesData}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

function Home(props) {
  return (
    <>
      <CatagoryList />
      <ChatList onChatClick={props.onChatClick} />
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
