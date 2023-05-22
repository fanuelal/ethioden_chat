import './styles/App.css';
import {ChatList} from './screens/recentChatContainer'
import { ActiveData } from './controller/activeChatData';
import { useState } from 'react';
import { messages } from './model/message';
import {EmptyScreen} from './screens/emptyChat'
import Login from './screens/loginScreen';
import ProtectedRoute from './components/protectedRoute';
import {Route, Routes} from 'react-router-dom'
import {CatagoryList} from './screens/catagoryList'

import axios from 'axios'
function App() {
  const [selected, setSelected] = useState(-1);
  const [messagesData, setMessageData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [user, setUser] = useState();
  function chatSelectHandler(userId) {
    

    var userMessages = messages.filter(message => message.senderId === userId || message.reciverId === userId);
        
        setMessageData((prev) => [...userMessages]);
        
      
    setSelected(userId);
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login setLoggedIn={setIsLoggedIn}/>} />
        <Route path='/home' element={<Home onChatClick={chatSelectHandler} selected={selected} messagesData={messagesData}/>} /> </Routes>

      
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

