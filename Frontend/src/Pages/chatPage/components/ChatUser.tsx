import { useState, useEffect } from 'react'
import axios from 'axios'
import MessageInput from './messageInput'
import play from '../assets/images/playgame.svg'
import block from '../assets/images/block.svg'
import info from '../assets/info.svg'
import tree from '../assets/giblyTree.gif'
import { Link } from 'react-router-dom'

interface localUserClass
{
    id: string,
    email: string,
    profileImage: string,
    status: string,
    username: string,
}

const ChatUser = (props:any) => {

    //Fetching current user (Receiver) data each time the prop gets new value
    const [remoteUser, setRemoteUser] = useState<localUserClass>({ id: '', email: '', profileImage: '', status: '', username: '' });
    const [localUser, setLocalUser] = useState<localUserClass>({ id: '', email: '', profileImage: '', status: '', username: '' });
    
    //Fetching local user info
    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/profil`, { withCredentials: true })
            .then((res:any) =>  {
                setLocalUser(res.data);
            })
            .catch(Error)
                console.log("Error happened when feching local user data");
    }, [])
    
    //Fetching remote user info
    useEffect(() => {
        if (props.pcurrentUserId != '')
        {
            axios
                .get(`http://localhost:3000/users/profile/${props.pcurrentUserId}`, { withCredentials: true })
                .then((res:any) =>  {
                    setRemoteUser(res.data)
                })
                .catch(Error)
                    console.log("Error happened when feching local user data");
        }
    }, [props.pcurrentUserId]);

    const onClickHandler = () => {
        axios
            .get(`http://localhost:3000/chat/${remoteUser.id}/requestjoingame`, { withCredentials: true })
            .then((res:any) => {
                console.log(" joingame on click handler",res.data);
            })
            .catch(Error)
                console.log("Error happened when requesting to join the game", Error);

    }

    const blockOnClickHandler = () => {
        axios
            .patch(`http://localhost:3000/users/blocked`, {to: remoteUser.id}, { withCredentials: true })
            .then(() => {
                console.log("im here");
            })
            .catch(Error)
                console.log("Error hapened when blocking the user")
    }

    return (
        <div className='usrProfileConversation'>
                <div className="chatUserDiv">
                    <div className="playerPicProfile">
                        <div className="chatUser">
                            {
                                //Conditional rendring to display the profile image or not based on the presence of remoteUser.profileImage
                                remoteUser.profileImage ?   <img style={{border: '3px solid'}} src={`http://localhost:3000/auth/avatar/${remoteUser.id}`} alt="user-photo"/>
                                                        :   <img src={info} alt="user-photo" />
                            }
                            <div className="chatUserName">
                                <span>
                                    {
                                        //Conditional rendring to display the profile username or not based on the presence of remoteUser.username
                                        remoteUser.username ?   remoteUser.username
                                                            :   'Start a conversation'
                                    }
                                </span>
                            </div>
                        </div>
                    <div className='chatUserControls'>
                    {
                        //Conditional rendring to display the control buttons or not based on the presence of remoteUser.profileImage
                        remoteUser.profileImage ?  (<div className="chatControlButtons">
                                                    {/* <Link to={'/game'}> */}
                                                        <button className='userControlButtons' onClick={onClickHandler}><img src={play} width={50} height={50}></img></button>
                                                    {/* </Link> */}
                                                        <button className='userControlButtons' onClick={blockOnClickHandler} ><img src={block} width={50} height={50}></img></button>
                                                    </div>)
                                                :   (<></>)
                    }
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
        {/* Passing Parent props to the child <MessageInput> (localUser and remoteUser) */}
        {
            props.remoteUser.profileImage   ? (<MessageInput Sender={props.localUser} Receiver={props.remoteUser}/>)
                                            : <img className='imagePlaceHolder' src={tree} width={650} height={870} alt="user-photo" />
        }
    </div>
    )
}

export default ChatUser