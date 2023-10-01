import { useEffect, useRef } from 'react'
import MessageComponent from './messageComponenet'
import messages from './messages';


const conversation = (props : any) => {
  const mesaageEndRef = useRef(null);
  // const chatbox = useRef(null);
  // useEffect(() => chatbox.current.scrollIntoView(false), [props.MessageArr]);
  
  // console.log("MessaArr inside conversation ===> ", props.MessageArr);
  useEffect(() => {
    mesaageEndRef.current?.scrollIntoView();
  }, [props.MessageArr]);
  return (
    <div className="conversationDiv">
      {props.MessageArr.map((message, index) => (
        <MessageComponent content={message}/>
      ))}
      <div ref={mesaageEndRef}/>
    </div>
  );
}

export default conversation