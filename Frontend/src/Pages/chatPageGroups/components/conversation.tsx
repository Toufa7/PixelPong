import { useEffect, useRef } from 'react'
import MessageComponent from './messageComponenet'
import MessageRightComponent from './messageRightComponenet ';

const conversation = (props : any) => {
  const mesaageEndRef = useRef(null);
  // const chatbox = useRef(null);
  // useEffect(() => chatbox.current.scrollIntoView(false), [props.MessageArr]);
  
  // //console.log("MessaArr inside conversation ===> ", props.MessageArr);
  useEffect(() => {
    mesaageEndRef.current?.scrollIntoView();
  }, [props.MessageArr]);

  return (
    <div className="conversationDiv">
      <MessageRightComponent content={"This is a long and Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉"}/>
      {props.MessageArr.map((message, index) => (
        <MessageComponent content={message}/>
      ))}
      <div ref={mesaageEndRef}/>
    </div>
  );
}

export default conversation