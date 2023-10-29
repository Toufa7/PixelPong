import { useContext, useEffect, useState } from 'react'
import { chatSocketContext } from '../components/socketContext'
import { useMap } from "@uidotdev/usehooks";
import axios from 'axios'
import ChatUser from '../components/ChatUser'
import DmChatUser from './dmChatUser'
import ChatSearch from './chatSearch'
import { useMediaPredicate } from 'react-media-hook'

interface chatUser {
    userName: string;
    pic: string;
    id: string;
}

const chatNavBar = () => {
    
    const [currentUserId, setCurrentUserId] = useState('');
    
    const getCurentUserDms = (data: any) => {
        setCurrentUserId(data);
    }
    
    return (
        <div className="chatMessage">
            <div className="chatNavBarDiv">
                <ChatSearch userFound={getCurentUserDms} />
                <div className="chatsContainer"><Dms cu={getCurentUserDms}/></div>
                <div className="chatLowerRibbon"></div>
            </div>
            <div className="userProfileAndMessages">
                <ChatUser pcurrentUserId={currentUserId}/>
            </div>
        </div>
  )
}

const Dms = (props:any) => {    
    
    const conversationsSocket = useContext(chatSocketContext);


    const isDesktop: boolean = useMediaPredicate('(min-width: 700px)');

   //On mobile, should list all friends
    
    //Dms map
    let map = useMap();
    let friendsMap = useMap();

    useEffect(() => {
        if (isDesktop == true)
        {
            //Getting converations from socket
            conversationsSocket.emit('getOldCnv');
            conversationsSocket.on('postOldCnv', (conversations) => {
                handleNewConversations(conversations);
            });
            //Cleanup function
            return() => {
                conversationsSocket.off('getOldCnv');
                conversationsSocket.off('postOldCnv');
            }
        }
        else
        {
            let tmpObj:chatUser;

            axios
                .get(`http://localhost:3000/users/Friends/`, { withCredentials: true })
                .then((res:any) =>  {
                    for (let i: number = 0; i < res.data.length; i++)
                    {
                        tmpObj = {userName: res.data[i].username, pic: `http://localhost:3000/auth/avatar/${res.data[i].id}`, id: res.data[i].id}
                        friendsMap.set(res.data[i].id, tmpObj);
                    }
                })
                .catch(Error)
                    console.log("Error happened when feching local user friends (chatSearch Componenet)")
        }
    }, [isDesktop])


    const handleNewConversations = (conversations:any) => {

        let tmpObj:chatUser;

        for (let i: number = 0; i < conversations.length; i++)
        {
            axios.get(`http://localhost:3000/users/profile/${conversations[i]}`, { withCredentials: true })
                .then((res) => {
                    tmpObj = { userName: res.data.username, pic: `http://localhost:3000/auth/avatar/${conversations[i]}`, id: conversations[i] }
                    map.set(conversations[i], tmpObj);
                })
                .catch((error) => {
                    console.log(`MyError -> ${error.response.data.message}, ${error.response.data.error}, ${error.response.data.statusCode}`);
                });
        }   
    };
        
    const updateSharedString = (newString: string) =>
    {
        props.cu(newString);
    };

    return (
      <div className="chatDmDiv">
        <i>CHATS</i>
        <div className="userDms">
            {isDesktop ?
                Array.from(map.values()).map((user, index) => (
                    <DmChatUser
                        key={index}
                        userName={user.userName}
                        pic={user.pic}
                        userId={updateSharedString}
                        id={user.id}
                    />
                ))
                :
                Array.from(friendsMap.values()).map((user, index) => (
                    <DmChatUser
                        key={index}
                        userName={user.userName}
                        pic={user.pic}
                        userId={updateSharedString}
                        id={user.id}
                    />
                ))
            }
        </div>
      </div>
    );
}

export default chatNavBar