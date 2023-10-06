import { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client';
import MessageComponent from './messageComponenet'
import '../chatPage.scss'
import Send from '../../../assets/images/send.svg'

const Conversation = (props: any) => {    
    const mesaageEndRef = useRef(null);

    useEffect(() => {
        mesaageEndRef.current?.scrollIntoView();
    }, [props.MessageArr]);

    return (
        <div className="conversationDiv">
        {props.MessagesArr.map((message: string, index:number) => (
          <MessageComponent key={index} content={message}/>
        ))}
        <div ref={mesaageEndRef}/>
      </div>
    );
  }

const messageInput = () => {
    const firstRef = useRef(null);
    // const [input, setInput] = useState('');
    const [messaging, setMessaging] = useState<string[]>([]);


  const onSubmitHandler = (e: any) =>{
    e.preventDefault();
    const message = document.querySelector('.messageInputBox')?.value;
    if (message != '')
    {
        // props.onMessageInput(message);
        firstRef.current.value = '';
        setMessaging(prevMessaging => [...prevMessaging, message]);
    }
  }

  return (
    <>
        <Conversation MessagesArr={messaging}/>
        <div className="messageInput">
            <form className='messageform' onSubmit={onSubmitHandler}>
            <input className='messageInputBox' ref={firstRef} placeholder='Type your message here ...'></input>
            <button className='sendButton'><img src={Send} type="submit" ></img></button>
            </form>
        </div>
    </>
  )
}

export default messageInput