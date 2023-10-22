import { useContext, useEffect, useState } from 'react'
import { chatSocketContext } from '../components/socketContext'
import { useMap } from "@uidotdev/usehooks";
import axios from 'axios'
import ChatUser from '../components/ChatUser'
import DmChatUser from './dmChatUser'
import ChatSearch from './chatSearch'

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
            <div className="userProfileAndMessages"><ChatUser pcurrentUserId={currentUserId}/></div>
        </div>
  )
}

const Dms = (props:any) => {    

    const conversationsSocket = useContext(chatSocketContext)
    
    //Dms map
    let map = useMap();

    useEffect(() => {  
        
        //Recieving message from socket
        conversationsSocket.emit('getOldCnv');
        conversationsSocket.on('postOldCnv', (conversations) => {
            handleNewConversations(conversations);
        });

        //cleanup function
        return() => {
            conversationsSocket.off('getOldCnv');
            conversationsSocket.off('postOldCnv');
        }
    }, [])


    const handleNewConversations = (conversations:any) => {

        let tmpObj:chatUser;

        for (let i: number = 0; i < conversations.length; i++)
        {
            axios.get(`http://localhost:3000/users/profile/${conversations[i]}`, { withCredentials: true })
                .then((res) => {
                    tmpObj = {userName: res.data.username, pic: `http://localhost:3000/auth/avatar/${conversations[i]}`, id: conversations[i]}
                    map.set(conversations[i], tmpObj);
                })
                .catch(Error)
                    console.log('%cAn error happened in : ', 'color: red')
                    console.log('%cDms: Dms:handleNewConversations', 'color: blue');
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
            {
                Array.from(map.values()).map((user, index) => (
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