import './styles/App.css';
import {ChatList} from './screens/recentChatContainer'
import { ActiveData } from './controller/activeChatData';
import { useState } from 'react';
import { messages } from './model/message';
import {EmptyScreen} from './screens/emptyChat'
import Login from './screens/loginScreen';
import {Route, Routes, Navigate} from 'react-router-dom'
import {CatagoryList} from './screens/catagoryList'
import axiosInstance from './config/axiosConfig'
import PrivateRoutes from './components/privateRoutes';
function App() {

  const [selected, setSelected] = useState(-1);
  const [messagesData, setMessageData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function chatSelectHandler(userId) {
    axiosInstance.get(`/chat?userId=${userId}`).then((value)=>{
     console.log(value.data.data)
     setMessageData(value.data.data)
    })


    var userMessages = messages.filter(message => message.senderId === userId || message.reciverId === userId);
        
        setMessageData((prev) => [...userMessages]);
        
      
    setSelected(userId);
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login setIsLoggedIn= {setIsLoggedIn}/>} />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route  element ={<PrivateRoutes isLoggedIn= {isLoggedIn} />}>
            <Route path='/home' element={<Home onChatClick={chatSelectHandler} selected={selected} messagesData={messagesData}/>}  />
        </Route>
          
            </Routes>
console.log(isLoggedIn)
      
    </div>
  );
}
function Home(props){
  return (
    <>
          <CatagoryList />
      <ChatList onChatClick={props.onChatClick}/>
      {props.selected !== -1 ? <ActiveData userId={props.selected} messages={props.messagesData}/>: <EmptyScreen />}
    </>
  )
}

export default App;

