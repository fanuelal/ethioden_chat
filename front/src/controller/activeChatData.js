import {ChatUI} from '../screens/chatScreens'



export function ActiveData (props) {

    // console.log(props.username);
    if(props.username !== undefined){
        return (
             <ChatUI user={props.userId} username={props.username} messages={props.messages}/>
        );
    }
}

