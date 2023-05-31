import './styles/App.css';
import {ChatList} from './screens/recentChatContainer'
import { ActiveData } from './controller/activeChatData';
import { useState } from 'react';
import { messages } from './model/message';
import {EmptyScreen} from './screens/emptyChat'
import Login from './screens/loginScreen';
import {Route, Routes, Navigate} from 'react-router-dom'
import {CatagoryList} from './screens/catagoryList'
import axiosInstance from 'axios'

function App() {
  const [selected, setSelected] = useState(-1);
  const [messagesData, setMessageData] = useState([])
 
  // const [user, setUser] = useState();
  function chatSelectHandler(userId) {
    axiosInstance.get(`/chat?userId=${userId}`).then((value)=>{
     console.log(value.data.data)
     setMessageData(value.data.data)
    })

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
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home onChatClick={chatSelectHandler} selected={selected} messagesData={messagesData}/>} />
      </Routes>

      
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

