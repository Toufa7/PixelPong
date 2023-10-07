import ChatSearch from './chatSearch'
import DmChatUser from './dmChatUser'
import uknownUser from '../assets/images/nonprofile.png'
import ChatUser from '../components/ChatUser'
import { useState } from 'react'


const chatNavBar = () => {
    
    const [currentUserId, setCurrentUserId] = useState('');
    
    const getCurentUserDms = (data: any) => {
        setCurrentUserId(data);
    }
    
    return (
        <div className="chatMessage">
            <div className="chatNavBarDiv">
                <ChatSearch/>
                <div className="chatsContainer"><Dms cu={getCurentUserDms}/></div>
                <div className="chatLowerRibbon"></div>
            </div>
                <div className="userProfileAndMessages"><ChatUser pcurrentUserId={currentUserId}/></div>
        </div>
  )
}

const Dms = (props) => {
    interface chatUser {
      userName: string;
      pic: string;
    }

    let usersArr: chatUser[] = [];
    let user:chatUser = {userName: "abass", pic: uknownUser}
    let ade:chatUser = {userName: "abc", pic: uknownUser}
    let abc:chatUser = {userName: "ibnada", pic: uknownUser}

    usersArr.push(user);
    usersArr.push(ade);
    usersArr.push(abc);

    const updateSharedString = (newString: string) => {
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
            />
          ))}
        </div>
      </div>
    );
}

export default chatNavBar