import '../chatPage.scss'
import { useRef, useEffect, useContext, useState } from 'react'
import { chatSocketContext } from './socketContext'
import { useMap, useScript } from "@uidotdev/usehooks";
import Send from '../../../assets/images/send.svg'
import axios from 'axios';
import MessageComponent from './messageComponenet'
import MessageRightComponenet from './messageRightComponenet ';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import '@dmester/sffjs'


//<*-----------------------------------------------< Common Funcion and definitions >--------------------------------------------------*>
// Class chatAgent responsible for defining the properties of each person onthe conversation
interface chatAgent
{
    id: string;
    senderid:string;
    username: string;
    pic: string;
    side: number;
    message: string;
    timestamp: string;
}

//function to generate message id in the map
function makeid(length: number) :string {
    
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

//<*-----------------------------------------------------------------------------------------------------------------------------------*>

//This componenet is responsible for displaying a conversation, it take an array of messages  
const Conversation = (props: any) =>
{
    const mesaageEndRef = useRef<null | HTMLDivElement>(null);

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
                        ? <MessageComponent key={index} content={message.message} pic={message.pic} time={message.timestamp}/>
                        : <MessageRightComponenet key={index} content={message.message} pic={message.pic} time={message.timestamp}/>
                    ))
                }
            <div ref={mesaageEndRef}/>
        </div>
    );
}

//<*-----------------------------------------------------------------------------------------------------------------------------------*>

//This componenet is responsible for getting a sending a message
//getting old messages, and preparing messages array to be displayed
const messageInput = (props: any) => {

    //Refering to the dummy div
    const firstRef = useRef<HTMLInputElement>(null);

    //Check blocked state
    const [isBlocked, setIsBlocked] = useState(false);
    const [localUserBlocksRemote, setLocalUserBlocksRemote] = useState(false);

    useEffect(() => {
        axios
            .post(`http://localhost:3000/users/checkblockme`, props.Receiver.id , { withCredentials: true })
            .then((res:any) => {
                console.log(res.data);
            })
            .catch(Error)
                console.log('Error happened when checking for the error');
    },[]);

    
    //Our chat socket
    const conversationsSocket = useContext(chatSocketContext);
    
    //Creating the messages map to be rendred
    let map = useMap();

    //Getting the old converstion
    useEffect(() => {
        if (props.Receiver.id != undefined)
        {
            axios
                .get(`http://localhost:3000/chat/getOldMessages/${props.Receiver.id}`, { withCredentials: true })
                .then((res) => {
                    fillMap(res.data);
                })
                .catch(Error)
                    console.log('%cAn error happened in : Conversation: messageInput(): 72', 'color: red')
        }
    }, [props.Receiver.id])
    
    
    const fillMap = (axiosResponse: any) => {

        map.clear();
        
        let molLmessageId: any = 'n/a';
        let molLmessage: any = 'n/a';
        let molMsgPic: any = 'n/a';
        let molMsgSide: number = 0;
        
        
        for (let i: number = 0; i < axiosResponse.length; i++)
        {
            
            if (axiosResponse[i].senderId == props.Sender.id)
            {
                molLmessageId = axiosResponse[i].senderId;
                molLmessage = props.Sender.username;
                molMsgPic = `http://localhost:3000/auth/avatar/${props.Sender.id}`;
                molMsgSide = 0;
            }
            else
            {
                molLmessageId = axiosResponse[i].receiverId;
                molLmessage = props.Receiver.username;
                molMsgPic = `http://localhost:3000/auth/avatar/${props.Receiver.id}`;
                molMsgSide = 1;
            }

            const   messageDate = new Date(axiosResponse[i].createdAt)
            
            const tmpMsgObj: chatAgent = {
                id: molLmessageId,
                senderid: axiosResponse[i].senderId, 
                username: molLmessage,
                pic: molMsgPic,
                side: molMsgSide,
                message: axiosResponse[i].messageDMs,
                timestamp: `${messageDate.getHours()}:${messageDate.format("mm")}`,
            }
            map.set(axiosResponse[i].id, tmpMsgObj);
        }
        
    };

    useEffect(() => {

        conversationsSocket.on('requestjoingame', (payload:any) => {
            toast.custom(
                <div style={{ display: 'flex', alignItems: 'center', background: "#F2ECFF", color: 'black', borderRadius: '10px', zIndex: '-1'}}>
                <div className="nes-container with-title">
                    <p style={{ background: '#ffc7b2', transform: 'translateY(-5px)', border: '2px solid black' }} className="title">Game Request</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <img src={`http://localhost:3000/auth/avatar/${payload.idsender}`} style={{ borderRadius: '30px', width: '50px', height: '50px' }} alt="avatar"/>
                    <span style={{ marginLeft: '10px', marginRight: 'auto' }}>{payload.from}</span>	
                        <div>
                            <Link to={'/game'}>
                                <button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small' }} className="nes-btn is-success" onClick={() => {
                                    axios
                                        .patch(`http://localhost:3000/chat/${payload.idsender}/acceptrequestjoingame`, {token: payload.token}, { withCredentials: true });
                                    toast.remove();
                                }}>Accept</button>
                            </Link>
                            <button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small' }} className="nes-btn is-error"
                            onClick={() => {
                                axios
                                    .patch(`http://localhost:3000/chat/${payload.idsender}/refuserequestjoingame`, {}, { withCredentials: true });
                                toast.remove();
                            }}>Deny</button>
                        </div>
                </div>
                </div>
            </div>,
            { duration: 9000, position: 'top-right'});
        });

        return () => {
            conversationsSocket.off('requestjoingame');
        }
    }, [props.Receiver.username])

    useEffect(() => {
        //Recieving message from socket
        conversationsSocket.on('msgToClient', (payload: chatAgent) => {
            // conversationsSocket.emit('getOldCnv')
            receiveMessage(payload);
        });

        //cleanup function
        return () => {
            conversationsSocket.off('msgToClient');
        }
    }, [props.Receiver.username])

    const navigate = useNavigate();

    useEffect(() => {
        //Recieving message from socket
        conversationsSocket.on('acceptrequestjoingame', () => {
            navigate('/game');
        });

        //cleanup function
        return () => {
            conversationsSocket.off('acceptrequestjoingame');
        }
    }, [props.Receiver.username])

    //Handling newly received message 
    const receiveMessage = (newMessage: any) => {

        const currentTime:Date = new Date(newMessage.timestamp);

        const tmpMsgObj: chatAgent = {
            id: newMessage.id,
            senderid: newMessage.idsender,
            username: newMessage.username,
            pic: `http://localhost:3000/auth/avatar/${newMessage.idsender}`,
            side: 1,
            message: newMessage.message,
            timestamp: `${currentTime.getHours()}:${currentTime.format("mm")}`,
        }

        if (props.Receiver.id == tmpMsgObj.senderid)
        {
            map.set(makeid(37), tmpMsgObj);
        }
    }
    

    //On submit Handler adds the new message the messagesArr and 
    //sends it to messagesArr 
    const onSubmitHandler = (e: any) => {
        
        //Prevent browser from refreshing each time we hit enter on the from input
        e.preventDefault();
        
        //Getting the message from input box
        //https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
        const inputMessage = (document.querySelector('.messageInputBox') as HTMLInputElement).value;

        //Emtting the newly typed message in the socket
        const handleNewMessage = (newMessage: chatAgent) => {
            conversationsSocket.emit('msgToServer', newMessage)
        };
        
        if (inputMessage != '')
        {
            
            const currentTime:Date = new Date();
            
            const tmpMsgObj: chatAgent = {
                id: props.Receiver.id,
                senderid: props.Sender.id,
                username: props.Sender.username,
                pic: `http://localhost:3000/auth/avatar/${props.Sender.id}`,
                side: 0,
                message: inputMessage,
                timestamp: `${currentTime.getHours()}:${currentTime.format("mm")}`,
            }

            if (firstRef.current != null) {
                firstRef.current.value = '';
            }
            handleNewMessage(tmpMsgObj);
            map.set(makeid(37), tmpMsgObj);
        }
    }

    return  (
                <>
                    <Conversation MessagesArr={Array.from(map.values())}/>
                    <Toaster/>
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