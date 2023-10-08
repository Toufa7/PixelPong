import { useEffect, useState } from 'react'
import ChatSearch from './chatSearch'
import DmChatUser from './dmChatUser'
import uknownUser from '../assets/images/nonprofile.png'
import ChatUser from '../components/ChatUser'
import axios from 'axios'


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
    let user:chatUser = {userName: "mamella", pic: "https://cdn.intra.42.fr/users/197a70ba79da6fe509bf37fad4b0b0fb/mamellal.jpg", id: "5ec73896-c9f1-48cc-9f64-be90ace0ab55"}
    let user1:chatUser = {userName: "ibnada", pic: "https://cdn.intra.42.fr/users/694c3817bb51281e259c9b77f2788851/ibnada.jpg", id: "715b4f0f-5d40-4a99-927e-48d93cf4e713"}
    
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











//Mamamia