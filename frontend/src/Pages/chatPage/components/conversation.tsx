import { useEffect, useRef } from 'react'
import MessageComponent from './messageComponenet'
import messages from './messages';


const conversation = (props : any) => {
  
  // const chatbox = useRef(null);
  // useEffect(() => chatbox.current.scrollIntoView(false), [props.MessageArr]);
  
  // console.log("MessaArr inside conversation ===> ", props.MessageArr);

  return (
    <div className="conversationDiv">
      {props.MessageArr.map((message, index) => (
        <MessageComponent content={message}/>
      ))}
    </div>
  );
}

export default conversation