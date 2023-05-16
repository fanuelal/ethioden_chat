import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
export default function ChatSend(props) {
    return (
      <div className='sendBtn'>
        <IconButton color="white" className="sendBtnIcon" aria-label="Send Message" component="label" onClick={props.onClick}>
        <SendIcon style={{
          color: 'white',
          width: 20,
          height: 20}}/>
        </IconButton>
      </div>
    );
  }