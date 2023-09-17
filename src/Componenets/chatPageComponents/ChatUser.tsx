import React from 'react'
import omar from '../../assets/images/otoufah.jpg'

const ChatUser = () => {
  return (
    <div className="chatUserDiv">
      <span>Player Profile</span>
      <div className="palyerPicProfile">
        <div className="chatUser">
          <img src={omar} alt="user-photo" />
          <div className="chatUserName">
            <span>Omar Toufah</span>
          </div>
        </div>
        </div>
      </div>
  )
}

export default ChatUser