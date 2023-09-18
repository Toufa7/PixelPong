import React from 'react'
import omar from '../assets/images/otoufah.jpg'
import Sparkle from '../assets/images/sparkles.gif'

const ChatUser = () => {
  return (
    <div className="chatUserDiv">
      <span>Player Profile</span>
      {/* <img className='chatUserDivSparkle' src={Sparkle} alt="Upper sparkle" width={47.53} height={42}/> */}
      <div className="playerPicProfile">
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