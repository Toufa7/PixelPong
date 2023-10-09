import { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client';
import MessageComponent from './messageComponenet'
import MessageRightComponenet from './messageRightComponenet ';
import '../chatPage.scss'
import Send from '../../../assets/images/send.svg'

// Class chatAgent responsible for defining the properties of each person onthe conversation
interface chatAgent
{
    id: string;
    username: string;
    pic: string;
    side: number;
    message: string;
    timestamp: string;
}

const Conversation = (props: any) =>
{
    const mesaageEndRef = useRef(null);

    useEffect(() => {
        mesaageEndRef.current?.scrollIntoView();
    }, [props.MessagesArr]);

    //Side 0 (Right) for sender Side 1 (Left) for receiver
    return (
        <div className="conversationDiv">
            {
                props.MessagesArr.map((message: chatAgent, index:number) => (
                    message.side == 0   ? <MessageComponent key={index} content={message.message} pic={message.pic} />
                                        : <MessageRightComponenet key={index} content={message.message} pic={message.pic} />
                ))
            }
            <div ref={mesaageEndRef}/>
        </div>
    );
  }

const messageInput = (props: any) => {

    const firstRef = useRef(null);
    // const [input, setInput] = useState('');
    // const [messaging, setMessaging] = useState<string[]>([]);

    //Creating 
    const [messagesArr, setNewMessage] = useState<chatAgent[]>([]);


  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    const inputMessage = document.querySelector('.messageInputBox')?.value;
    
    // if (inputMessage != '')
    // {
    //     // props.onMessageInput(message);
    //     firstRef.current.value = '';
    //     setMessaging(prevMessaging => [...prevMessaging, inputMessage]);
    // }

    if (inputMessage != '')
    {
        const tmpMsgObj: chatAgent = {
            id: props.Sender.id,
            username: props.Sender.username,
            pic: props.Sender.image,
            side: 1,
            message: inputMessage,
            timestamp: "",
        }
        firstRef.current.value = '';
        setNewMessage(prevMessagesArr => [...prevMessagesArr, tmpMsgObj]);
    }
    //N'oublier pas d'envoyer messagesArr a Conversation composant
  }

  return (
    <>
        <Conversation MessagesArr={messagesArr}/>
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