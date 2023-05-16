import {ChatUI} from '../screens/chatScreens'
import React, { useState, useEffect } from 'react';
import { users } from '../model/users';
export var chatScreenUser = {
        userId: 5,
        username: "",
        profileImg: "",
        recentChat: "",
        userState: "online"
};

export function ActiveData (props) {
    const [user, setUser] = useState();
    useEffect(() => {
        const selectedUser = users.find(user => user.userId === props.userId);
        chatScreenUser = selectedUser;
        if (selectedUser) setUser(selectedUser);
        // console.log(user);
    }, [props.userId]);
    return (
         <ChatUI user={chatScreenUser} messages={props.messages}/>
    );
}

