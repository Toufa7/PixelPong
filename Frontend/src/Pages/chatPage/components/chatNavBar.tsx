import { useContext, useEffect, useState } from 'react'
import ChatSearch from './chatSearch'
import DmChatUser from './dmChatUser'
import uknownUser from '../assets/images/nonprofile.png'
import ChatUser from '../components/ChatUser'
import axios from 'axios'
import { chatSocketContext } from '../components/socketContext'


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

const Dms = (props:any) => {
    
    const conversationsSocket = useContext(chatSocketContext);
    console.log(conversationsSocket);
    
    conversationsSocket.emit('getOldCnv');
    conversationsSocket.on('postOldCnv', (conversations) => {
        console.log("Dms -------->", conversationsSocket);
        console.log("Mel3oba -->", conversations);
    });

    interface chatUser {
        userName: string;
        pic: string;
        id: string;
    }

    
    // const fetchUserData = () => {
    //     const [data, setData] = useState({})
        
    //     useEffect(() => {
    //         function getInfo () {
    //             axios.get("http://localhost:3000/users/5ec73896-c9f1-48cc-9f64-be90ace0ab55", {withCredentials: true})
    //             .then((rese) => {
    //                 setData(rese.data);
    //             })
    //             return (data);
    //         }
            
    //         getInfo();
    //     }, [])
    // }

    // const dataUser = fetchUserData();

    // console.log("dataUser -> ", dataUser);
    // let obj: chatUser = {userName: dataUser.userName, pic: dataUser.pic, id: dataUser.id};
    
    let usersArr: chatUser[] = [];
    let user:chatUser = {userName: "mamella", pic: "https://cdn.intra.42.fr/users/197a70ba79da6fe509bf37fad4b0b0fb/mamellal.jpg", id: "cdb272fa-d1e9-4105-b2cf-eb23aa2f9fa0"}
    let user1:chatUser = {userName: "ibnada", pic: "https://cdn.intra.42.fr/users/694c3817bb51281e259c9b77f2788851/ibnada.jpg", id: "32f775de-c030-49ba-bd79-276f7f56666c"}
    
    usersArr.push(user);
    usersArr.push(user1);

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
              id={user.id}
            />
          ))}
        </div>
      </div>
    );
          }

export default chatNavBar
