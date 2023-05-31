import {ChatUI} from '../screens/chatScreens'



export function ActiveData (props) {

    console.log(props.username);
    return (
         <ChatUI user={props.userId} messages={props.messages}/>
    );
}

