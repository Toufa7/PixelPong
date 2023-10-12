import { useContext, useEffect, useState } from 'react'
import ChatSearch from './chatSearch'
import DmChatUser from './dmChatUser'
import uknownUser from '../assets/images/nonprofile.png'
import ChatUser from '../components/ChatUser'
import axios from 'axios'
import { chatSocketContext } from '../components/socketContext'

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
    const [usersArr, setUsersArr] = useState<chatUser[]>([]);
    
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
        for (let i: number = 0; i < conversations.length; i++) {
            const tmpObj:chatUser = {userName: "someUserName", pic: "somepic", id: conversations[i]}
            setUsersArr(prevMessagesArr => [...prevMessagesArr, tmpObj]);
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
          {usersArr.map((user, index) => (
            <DmChatUser
              key={index}
              userName={user.userName}
              pic={user.pic}
              userId={updateSharedString}
              id={user.id}
            />
          ))}
        </div>
      </div>
    );
          }

export default chatNavBar
