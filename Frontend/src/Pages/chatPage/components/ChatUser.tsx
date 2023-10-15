import { useState, useEffect } from 'react'
import axios from 'axios'
import MessageInput from './messageInput'
import play from '../assets/images/playgame.svg'
import mute from '../assets/images/notification-off.svg'
import block from '../assets/images/block.svg'
import jwtDecode from 'jwt-decode'


const ChatUser = (props:any) => {

    //Fetching current user (Receiver) data each time the prop gets new value
    const [remoteUser, setRemoteUser] = useState({});
    
    useEffect(() => {
        async function fetchCurrentUserInfo(id: any) {
            try
            {
                const response = await axios.get(`http://localhost:3000/users/profil`, { withCredentials: true });
                setRemoteUser(response.data);
            }
            catch (error) {
                console.log("ERROR : fetchCurrentUserInfo() : ", error);
            }
        }
        fetchCurrentUserInfo(props.pcurrentUserId);
    }, [props.pcurrentUserId]); //props.pcurrentUserId could be null or undefined

    //Identifying local user (Sender)
    const cookieJwt = document.cookie;
    const jwtArr:string[] =  cookieJwt.split("=");
    let localUser: any = jwtDecode(jwtArr[1]);


    return (
        <div className='usrProfileConversation'>
                <div className="chatUserDiv">
                    <div className="playerPicProfile">
                        <div className="chatUser">
                            <img src={remoteUser.profileImage} alt="user-photo" />
                            <div className="chatUserName"><span>{remoteUser.username}</span></div>
                        </div>
                    <div className='chatUserControls'>
                        <button className='userControlButtons'><img src={play} width={50} height={50}></img></button>
                        <button className='userControlButtons'><img src={mute} width={50} height={50}></img></button>
                        <button className='userControlButtons'><img src={block} width={50} height={50}></img></button>
                    </div>
                </div>
            </div>

            {/* Sending LocalUser (Sender) and RemoteUser (Receiver) objects to Messaging Body component */}
            <MessagingBody localUser={localUser} remoteUser={remoteUser}/>
            <div className='chatBodyLowerRibbon'></div>
        </div>
    );
}

const MessagingBody = (props: any) => {

    return (
    <div className="MessagingBodyDiv">
        {/* Passing Parent props to the child (localUser and remoteUser) */}
        <MessageInput Sender={props.localUser} Receiver={props.remoteUser}/>
    </div>
    )
}

export default ChatUser