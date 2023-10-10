import { useState, useRef, useEffect, useContext } from 'react'
import io from 'socket.io-client';
import MessageComponent from './messageComponenet'
import MessageRightComponenet from './messageRightComponenet ';
import '../chatPage.scss'
import Send from '../../../assets/images/send.svg'
import { chatSocketContext } from './socketContext'

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

    //Handle scroll to bottom
    useEffect(() => {
        mesaageEndRef.current?.scrollIntoView();
    }, [props.MessagesArr]);
    
    //Side 0 (Right) for sender Side 1 (Left) for receiver
    return (
        <div className="conversationDiv">
            {
                props.MessagesArr.map((message: chatAgent, index:number) => (
                    message.side == 1
                        ? <MessageComponent key={index} content={message.message} pic={message.pic} />
                        : <MessageRightComponenet key={index} content={message.message} pic={message.pic} />
                    ))
                }
            <div ref={mesaageEndRef}/>
        </div>
    );
}

const messageInput = (props: any) => {

    //Refering to the dummy div
    const firstRef = useRef(null);

    //Our chat socket
    const conversationsSocket = useContext(chatSocketContext);
    
    //Creating the messages array to be rendred
    const [messagesArr, setNewMessage] = useState<chatAgent[]>([]);
    
    useEffect(() => {

        //Recieving message from socket
        conversationsSocket.on('msgToClient', (payload: chatAgent) => {
            receiveMessage(payload);
        });

    }, [])

    //Handling newly received message 
    const receiveMessage = (newMessage: chatAgent) => {

        console.log("New message is --->", newMessage);
        const tmpMsgObj: chatAgent = {
            id: newMessage.id,
            username: newMessage.username,
            pic: newMessage.pic,
            side: 1,
            message: newMessage.message,
            timestamp: "n/a",
        }
        setNewMessage(prevMessagesArr => [...prevMessagesArr, tmpMsgObj]);
    }
    

    //On submit Handler adds the new message the messagesArr and 
    //sends it to messagesArr 
    const onSubmitHandler = (e: any) => {
        
        //Prevent browser from refreshing each time we hit enter on the from input
        e.preventDefault();
        
        //Getting the message from input box
        const inputMessage = document.querySelector('.messageInputBox')?.value;

        //Emtting the newly typed message in the socket
        const handleNewMessage = (newMessage: chatAgent) => {
            conversationsSocket.emit('msgToServer', newMessage)
        };
        
        if (inputMessage != '')
        {
            const tmpMsgObj: chatAgent = {
                id: props.Receiver.id,
                username: props.Sender.username,
                pic: props.Sender.image,
                side: 0,
                message: inputMessage,
                timestamp: "n/a",
            }
            firstRef.current.value = '';
            setNewMessage(prevMessagesArr => [...prevMessagesArr, tmpMsgObj]);
            handleNewMessage(tmpMsgObj);
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