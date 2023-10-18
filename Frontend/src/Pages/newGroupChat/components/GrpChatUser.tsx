import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MessageInput from './GrpmessageInput'
import exit from '../assets/exit.svg'
import mute from '../assets/images/notification-off.svg'
import block from '../assets/images/block.svg'
import jwtDecode from 'jwt-decode'
import info from '../assets/info.svg'
import oldcomputer from '../assets/oldComputer.png'
import popCat from '../assets/pop-cat.gif'
import dogo from '../assets/dogo.gif'


const ChatUser = (props:any) => {

    //Fetching current user (Receiver) data each time the prop gets new value
    const [remoteUser, setRemoteUser] = useState({});
    
    useEffect(() => {
        const fetchCurrentUserInfo = (id: any) => {
            axios.get(`http://localhost:3000/groupchat/${id}/groupinfo`, { withCredentials: true })
            .then((response) => {
                setRemoteUser(response.data);
                console.log("rese -> ", response.data);
            })
            .catch((erro) => {
                console.log("erro -> ", erro);
            })
        }
        fetchCurrentUserInfo(props.pcurrentUserId);
    }, [props.pcurrentUserId]); //props.pcurrentUserId could be null or undefined

    //Identifying local user (Sender)
    const cookieJwt = document.cookie;
    const jwtArr:string[] =  cookieJwt.split("=");
    let localUser: any = jwtDecode(jwtArr[1]);

    return (
        <div className='GrpusrProfileConversation'>
                <div className="GrpchatUserDiv">
                    <div className="GrpplayerPicProfile">
                        <div className="GrpchatUser">
                            {
                                //Conditional rendring to display the profile image or not based on the presence of remoteUser.profileImage
                                remoteUser.image ?   <img src={`http://localhost:3000/groupchat/getimage/${remoteUser.id}`} alt="user-photo"/>
                                                        :   <img src={info} alt="user-photo" />
                            }
                            <div className="GrpchatUserName">
                                <span>
                                    {
                                        //Conditional rendring to display the profile username or not based on the presence of remoteUser.username
                                        remoteUser.namegb ?   remoteUser.namegb
                                                            :   'Start a conversation   '
                                    }
                                </span>
                            </div>
                        </div>
                    <div className='GrpchatUserControls'>
                    {
                        //Conditional rendring to display the control buttons or not based on the presence of remoteUser.profileImage
                        remoteUser.namegb ?  (<div className="GrpchatControlButtons">
                                                        <button className='GrpuserControlButtons'><img src={exit} width={50} height={50}></img></button>
                                                    </div>)
                                                :   (<></>)
                    }
                    </div>
                </div>
            </div>

            {/* Sending LocalUser (Sender) and RemoteUser (Receiver) objects to Messaging Body component */}
            <MessagingBody localUser={localUser} remoteUser={remoteUser}/>
            <div className='GrpchatBodyLowerRibbon'></div>
        </div>
    );
}

const MessagingBody = (props: any) => {




    return (
    <div className="GrpMessagingBodyDiv">
        {/* Passing Parent props to the child (localUser and remoteUser) */}
        {
            props.remoteUser.profileImage   ? (<MessageInput Sender={props.localUser} Receiver={props.remoteUser}/>)
                                            : <img style={{alignSelf: 'center', justifySelf: 'center', position: 'relative', bottom: '-20%'}} src={dogo} width={500} height={500} alt="user-photo" />
        }
    </div>
    )
}

export default ChatUser