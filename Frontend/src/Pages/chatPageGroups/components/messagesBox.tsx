import HeaderInfo from './groupHeader';
import MessagingBody from './MessagingBody';
import MessageLowerRibbon from './MessageLowerRibbon';
import {socketContext } from './socket.client';
import { useContext, useState} from 'react';

interface groupInfo {
	name : string,
	avatar : string
}

const Messages = (props : groupInfo) => {
  const socket = useContext(socketContext);
  const [clicked, isClicked] = useState(true);
  console.log("Socket Connected");
  
  return (
    <div className="messagesDiv">
      <socketContext.Provider value = {socket}>
        {
          clicked ? (
            <>
              <HeaderInfo name={props.name} avatar={props.avatar}/>
              <MessagingBody psocket = {socket} />
            </>
            ) 
            :
          (<></>) 
        }
        <MessageLowerRibbon />
      </socketContext.Provider>
    </div>
  )
}

export default Messages