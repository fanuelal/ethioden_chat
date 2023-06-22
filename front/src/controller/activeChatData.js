import {ChatUI} from '../screens/chatScreens'



export function ActiveData (props) {
    // console.log(props.copiedtext)
    // console.log(props.username);
    if(props.username !== undefined){
        return (
             <ChatUI ably= {props.ably} user={props.userId} username={props.username} messages={props.messages}/>
        );
    }
}

