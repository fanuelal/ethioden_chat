import {ChatUI} from '../screens/chatScreens'
import React, { useState, useEffect } from 'react';
import { users } from '../model/users';


export function ActiveData (props) {
    const [user, setUser] = useState();
    // useEffect(() => {
    //     const selectedUser = users.find(user => user.userId === props.userId);
    //     chatScreenUser = selectedUser;
    //     if (selectedUser) setUser(selectedUser);
    //     // console.log(user);
    // }, [props.userId]);
    console.log(props.userId.toString());
    return (
         <ChatUI user={props.userId} messages={props.messages}/>
    );
}

