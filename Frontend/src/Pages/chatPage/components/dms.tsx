import React from 'react'

import DmChatUser from './dmChatUser'
import mamella from '../assets/images/mamellal.jpg'
import otoufah from '../assets/images/otoufah.jpg'
import mnaqqad from '../assets/images/mnaqqad.jpg'
import abensgui from '../assets/images/abensgui.jpg'
import ibnada from '../assets/images/ibnada.jpg'
import uknownUser from '../assets/images/nonprofile.png'

const dms = () => {

  interface chatUser {
    userName: string;
    pic: string;
  }

  let usersArr: chatUser[] = [];
  let user:chatUser = {userName: "abass", pic: uknownUser}

  usersArr.push(user);

  return (
    <div className="chatDmDiv">
      <i>CHATS</i>
      <div className="userDms">
        {
          usersArr.map((Object, index) => (
          <DmChatUser key={index} userName={Object.userName} pic={Object.pic}/>
          ))
        }
          <DmChatUser userName={"Omar Toufah"} pic={otoufah}/>
      </div>
    </div>
  )
}

export default dms