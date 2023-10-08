import { useState, useRef, useEffect } from 'react'
import MessageComponent from './messageComponenet'
import io from 'socket.io-client';
import '../chatPage.scss'
import Send from '../../../assets/images/send.svg'

const Conversation = (props: any) => {
    const mesaageEndRef = useRef(null);

    useEffect(() => {
        mesaageEndRef.current?.scrollIntoView();
    }, [props.MessageArr]);

    //Side 0 (Right) for sender Side 1 (Left) for receiver
    return (
        <div className="conversationDiv">
        {props.MessagesArr.map((message: string, index:number) => (
          <MessageComponent key={index} content={message}/>
        ))}
        <div ref={mesaageEndRef}/>
      </div>
    );
  }

const messageInput = (props: any) => {

    interface chatAgent
    {
        id: string;
        username: string;
        pic: string;
        side: number;
        message: string;
        timestamp: string;
    }
    

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
                <button className='sendButton'><img src={Send}></img></button>
            </form>
        </div>
    </>
  )
}

export default messageInput