import { useEffect, useRef } from 'react'
import MessageComponent from './messageComponenet'
// import MessageRightComponent from './messageRightComponenet ';

const conversation = (props : any) => {
  const mesaageEndRef = useRef(null);
  
  useEffect(() => {
    mesaageEndRef.current?.scrollIntoView();
  }, [props.MessageArr]);

  console.log("MessageArr lenght", props.MessageArr.length);

  return (
    <div className="conversationDiv">
      {props.MessageArr.map((message: string, index:number) => (
        <MessageComponent key={index} content={message}/>
      ))}
      <div ref={mesaageEndRef}/>
    </div>
  );
}

export default conversation