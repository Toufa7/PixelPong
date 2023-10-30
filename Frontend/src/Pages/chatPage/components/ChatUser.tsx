import { useState, useEffect } from 'react'
import axios from 'axios'
import MessageInput from './messageInput'
import play from '../assets/images/playgame.svg'
import info from '../assets/info.svg'
import tree from '../assets/giblyTree.gif'
import kirby from '../assets/kirby-hit-the-screen.gif'
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
    const [localUser, setLocalUser] = useState<localUserClass>({ id: '', email: '', profileImage: '', status: '', username: '' });
    const [remoteUser, setRemoteUser] = useState<localUserClass>({ id: '', email: '', profileImage: '', status: '', username: '' });

    //Block checks
    const [isBlocked, setIsBlocked] = useState(false);
    const [localUserBlocksRemote, setLocalUserBlocksRemote] = useState(false);
    
    //Fetching local user info
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/users/profil`, { withCredentials: true })
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
                .get(`http://localhost:3000/api/users/profile/${props.pcurrentUserId}`, { withCredentials: true })
                .then((res:any) =>  {
                    setRemoteUser(res.data)
                })
                .catch(Error)
                    console.log("Error happened on block check");
        }
    }, [props.pcurrentUserId]);

    //Check if remote user blocked me
    useEffect(() => {
        if (remoteUser.id != '')
        {
            axios
                .post(`http://localhost:3000/api/users/checkblockme`, { to: remoteUser.id } , { withCredentials: true })
                .then((res:any) => {
                    console.log('Check if remote user blocked me ->', res.data)
                    setIsBlocked(res.data);
                })
                .catch(Error)
                    console.log('Error happened on block check 2');
        }
    },[remoteUser.id]);

    //Check if local user blocked me
    useEffect(() => {
        if (remoteUser.id != '')
        {
            axios
                .post(`http://localhost:3000/api/users/checkblock`, { to: remoteUser.id } , { withCredentials: true })
                .then((res:any) => {
                    console.log('Check if local user blocked me ->', res.data)
                    setLocalUserBlocksRemote(res.data);
                })
                .catch(Error)
                    console.log('Error happened when checking for the error');
        }
    },[remoteUser.id]);

    const onClickHandler = () => {
        axios
            .get(`http://localhost:3000/api/chat/${remoteUser.id}/requestjoingame`, { withCredentials: true })
            .catch(Error)
                console.log("Error happened when requesting to join the game", Error);
    }

    return (
        <div className='usrProfileConversation'>
                <div className="chatUserDiv">
                    <div className="playerPicProfile">
                        <div className="chatUser">
                            {
                                //Conditional rendring to display the profile image or not based on the presence of remoteUser.profileImage
                                //Changing a tag to div
                                remoteUser.profileImage ?   (<Link to={`/profil/${remoteUser.username}`}>
                                                                <div style={{color: 'black', textDecoration: 'none'}}>
                                                                    <img style={{border: '3px solid'}} src={`http://localhost:3000/api/auth/avatar/${remoteUser.id}`} alt="user-photo"/>
                                                                </div>
                                                            </Link>)
                                                        :   (<img src={info} alt="user-photo" />)
                            }
                            <div className="chatUserName">
                                <span>
                                    {
                                        //Conditional rendring to display the profile username or not based on the presence of remoteUser.username
                                        remoteUser.username ?   (<Link to={`/profil/${remoteUser.username}`}><span style={{color: 'black', textDecoration: 'none'}}>{remoteUser.username}</span></Link>)
                                                            :   ('Start a conversation')
                                    }
                                </span>
                            </div>
                        </div>
                    <div className='chatUserControls'>
                    {
                        //Conditional rendring to display the control buttons or not based on the presence of remoteUser.profileImage
                        remoteUser.profileImage ?  (    isBlocked ? (<></>) :
                                                        localUserBlocksRemote ? (<></>) :
                                                        (<div className="chatControlButtons">
                                                            <button className='userControlButtons' onClick={onClickHandler}><img src={play} width={50} height={50}></img></button>
                                                        </div>)
                                                    )   :   (<></>)
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
                                            : <img className='imagePlaceHolder' src={kirby} width={664} height={622} alt="user-photo" />
        }
    </div>
    )
}

export default ChatUser