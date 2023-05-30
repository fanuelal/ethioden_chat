import {ChatUI} from '../screens/chatScreens'
<<<<<<< Updated upstream
// import React, { useState, useEffect } from 'react';
// import { users } from '../model/users';
=======
import React, { useState, useEffect } from 'react';
import { users } from '../model/users';
>>>>>>> Stashed changes


export function ActiveData (props) {
    // const [user, setUser] = useState();
    // const [username, serUsername] = useState();
    // useEffect(() => {
    //     const selectedUser = users.find(user => user.userId === props.userId);
    //     chatScreenUser = selectedUser;
    //     if (selectedUser) setUser(selectedUser);
    //     // console.log(user);
    // }, [props.userId]);
<<<<<<< Updated upstream
    // console.log(props.userId);
    console.log(props.username);
    return (
         <ChatUI user={props.userId} username={props.username} messages={props.messages}/>
=======
    console.log(props.userId.toString());
    return (
         <ChatUI user={props.userId} messages={props.messages}/>
>>>>>>> Stashed changes
    );
}

