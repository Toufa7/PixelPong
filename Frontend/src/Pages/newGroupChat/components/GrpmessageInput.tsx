import React from 'react';
import { useState, useRef, useEffect, useContext } from 'react'
import { grpSocketContext } from './GrpsocketContext'
import { useMap } from "@uidotdev/usehooks";
import Send from '../../../assets/images/send.svg';
import axios from 'axios';
// import '../GrpchatPage.scss'
import MessageComponent from './GrpmessageComponenet'
import MessageRightComponenet from './GrpmessageRightComponenet ';


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
    const mesaageEndRef = useRef(null);

    //Handle scroll to bottom
    useEffect(() => {
        mesaageEndRef.current?.scrollIntoView();
    }, [props.MessagesArr]);
    
    //Side 0 (Right) for sender Side 1 (Left) for groupInfo
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
    const roomSocket = useContext(grpSocketContext);
    
    //Creating the messages map to be rendred
    let map = useMap();

    //Our group users
    let groupUsers = useMap();

    //Keeping track of the entered groups
    // const [roomsHistory, setRoomsHistory] = useState<string[]>([]);

    // setRoomsHistory(props.groupInfo.id);
    // console.log("Rooms hisory is : ", roomsHistory);

    //Join the room
    if (props.groupInfo.id != undefined)
    {
        useEffect(() => {
            roomSocket.emit('joinRoom', {roomid : props.groupInfo.id})
        }, [props.groupInfo.id])
    }
    
    //Get group users and fill them in the map
    useEffect(() => {
        axios
            .get(`http://localhost:3000/groupchat/${props.groupInfo.id}/users`, { withCredentials: true })
            .then((res: any) => {
                for (let i: number = 0; i < res.data.usersgb.length; i++) {
                    groupUsers.set(res.data.usersgb[i].id, res.data.usersgb[i]);
                }
            })
            .catch(Error)
            console.log('%cAn error happened in : Conversation: messageInput(): 63', 'color: red')
    }, [props.groupInfo.id])

    // console.log("Group user are : ", groupUsers);
    
    //Getting the old conversation
    useEffect(() => {
        axios
            .get(`http://localhost:3000/groupchat/${props.groupInfo.id}/messages`, { withCredentials: true })
        
            .then((res:any) => {
                fillMap(res.data.messagesgb);
            })
            .catch(Error)
                console.log('%cAn error happened in : Conversation: messageInput(): 63', 'color: red')
    }, [props.groupInfo.id])
    
    const fillMap = (axiosResponse: any) => {

        map.clear();
        console.log("Axios response is : ", axiosResponse);

        let molLmessageId: any = 'n/a';
        let molLmessage: any = 'n/a';
        let molMsgPic: any = 'n/a';
        let molMsgSide: number = 0;
        
        
        for (let i: number = 0; i < axiosResponse.length; i++)
        {

            if (axiosResponse[i].senderid == props.Sender.id)
            {
                molLmessageId = axiosResponse[i].senderId;
                molLmessage = props.Sender.username;
                molMsgPic = props.Sender.image;
                molMsgSide = 0;
            }
            else
            {
                molLmessageId = axiosResponse[i].receiverId;
                molLmessage = props.groupInfo.username;
                molMsgPic = groupUsers.get(axiosResponse[i].senderid).profileImage;
                molMsgSide = 1;
            }
            
            const tmpMsgObj: chatAgent = {
                id: molLmessageId,
                senderid: axiosResponse[i].senderId, 
                username: molLmessage,
                pic: molMsgPic,
                side: molMsgSide,
                message: axiosResponse[i].message,
                timestamp: axiosResponse[i].createdAt,
            }
            map.set(axiosResponse[i].id, tmpMsgObj);
        }
    };
    
    useEffect(() => {
        //Recieving message from socket
        roomSocket.on(`${props.groupInfo.id}`, (payload) => {
            receiveMessage(payload);
        });

        //cleanup function
        return () => {
            roomSocket.off(`${props.groupInfo.id}`);
        }

    }, [props.groupInfo.id])

    //Handling newly received message 
    const receiveMessage = (newMessage: any) => {

        let messageSide: number = 1;
        
        if (newMessage.idsender == props.Sender.id)
            messageSide = 0;

        const tmpMsgObj: chatAgent = {
            id: newMessage.roomid,
            senderid: newMessage.idsender,
            username: newMessage.username,
            pic: newMessage.pic,
            side: messageSide,
            message: newMessage.message,
            timestamp: "n/a",
        }
        
        map.set(makeid(37), tmpMsgObj);
    }
    


    const onSubmitHandler = (e: any) => {
        //Prevent browser from refreshing each time we hit enter on the from input
        e.preventDefault();
        
        //Getting the message from input box
        const inputMessage = document.querySelector('.GrpmessageInputBox')?.value;
        
        //Emtting the newly typed message in the socket
        const handleNewMessage = (newMessage: chatAgent) => {
            console.log("I sent a message.")
            roomSocket.emit('msgToRoom', {
                roomid :  props.groupInfo.id,
                messageid : `${makeid(37)}`,
                message : newMessage.message,
                timestamp: "n/a",
                side: 0,
            })
        };
        
        if (inputMessage != '')
        {
            const tmpMsgObj: chatAgent = {
                id: props.groupInfo.id,
                senderid: props.Sender.id,
                username: props.Sender.username,
                pic: props.Sender.image,
                side: 0,
                message: inputMessage,
                timestamp: "n/a",
            }
            firstRef.current.value = '';
            handleNewMessage(tmpMsgObj);
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