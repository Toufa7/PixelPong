import '../GrpchatPage.scss'
import { useRef, useEffect, useContext } from 'react'
import { chatSocketContext } from './GrpsocketContext'
import { useMap } from "@uidotdev/usehooks";
import Send from '../../../assets/images/send.svg';
import axios from 'axios';
import MessageComponent from './GrpmessageComponenet'
import MessageRightComponenet from './GrpmessageRightComponenet ';
import React from 'react';


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

//<*-----------------------------------------------------------------------------------------------------------------------------------*>

//This componenet is responsible for displaying a conversation, it take an array of messages  
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

//<*-----------------------------------------------------------------------------------------------------------------------------------*>

//This componenet is responsible for getting a sending a message
//getting old messages, and preparing messages array to be displayed
const messageInput = (props: any) => {

    //Refering to the dummy div
    const firstRef = useRef(null);
    
    //Our chat socket
    const conversationsSocket = useContext(chatSocketContext);
    
    //Creating the messages map to be rendred
    let map = useMap();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/chat/getOldMessages/${props.Receiver.id}`, { withCredentials: true })
        
            .then((res) => {
                fillMap(res.data);
            })
            .catch(Error)
                console.log('%cAn error happened in : Conversation: messageInput(): 63', 'color: red')
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
                molMsgPic = props.Sender.image;
                molMsgSide = 0;
            }
            else
            {
                molLmessageId = axiosResponse[i].receiverId;
                molLmessage = props.Receiver.username;
                molMsgPic = props.Receiver.profileImage;
                molMsgSide = 1;
            }
            
            const tmpMsgObj: chatAgent = {
                id: molLmessageId,
                senderid: axiosResponse[i].senderId, 
                username: molLmessage,
                pic: molMsgPic,
                side: molMsgSide,
                message: axiosResponse[i].messageDMs,
                timestamp: axiosResponse[i].createdAt,
            }

            map.set(axiosResponse[i].id, tmpMsgObj);
        }
        
    };
    
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

    //Handling newly received message 
    const receiveMessage = (newMessage: any) => {

        const tmpMsgObj: chatAgent = {
            id: newMessage.id,
            senderid: newMessage.idsender,
            username: newMessage.username,
            pic: newMessage.pic,
            side: 1,
            message: newMessage.message,
            timestamp: "n/a",
        }

        //Don't forget to replace username with id
        // if (props.Receiver.username == tmpMsgObj.username)
        // {
        //     map.set(makeid(37), tmpMsgObj);
        // }

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
        const inputMessage = document.querySelector('.messageInputBox')?.value;

        //Emtting the newly typed message in the socket
        const handleNewMessage = (newMessage: chatAgent) => {
            conversationsSocket.emit('msgToServer', newMessage)
            // conversationsSocket.emit('getOldCnv')
        };
        
        if (inputMessage != '')
        {
            const tmpMsgObj: chatAgent = {
                id: props.Receiver.id,
                senderid: props.Sender.id,
                username: props.Sender.username,
                pic: props.Sender.image,
                side: 0,
                message: inputMessage,
                timestamp: "n/a",
            }
            firstRef.current.value = '';
            handleNewMessage(tmpMsgObj);
            map.set(makeid(37), tmpMsgObj);
        }
    }

    return (
    <>
        <Conversation MessagesArr={Array.from(map.values())}/>
        <div className="GrpmessageInput">
            <form className='Grpmessageform' onSubmit={onSubmitHandler}>
                <input className='GrpmessageInputBox' ref={firstRef} placeholder='Type your message here ...'></input>
                <button className='GrpsendButton'><img src={Send}></img></button>
            </form>
        </div>
    </>
    )
}

export default messageInput