import React from 'react'
import omar from '../assets/images/otoufah.jpg'
import Sparkle from '../assets/images/sparkles.gif'
import play from '../assets/images/playgame.svg'
import mute from '../assets/images/notification-off.svg'
import block from '../assets/images/block.svg'

const ChatUser = () => {
  return (
    <div className="chatUserDiv">
      {/* <span>Player Profile</span> */}
      {/* <img className='chatUserDivSparkle' src={Sparkle} alt="Upper sparkle" width={47.53} height={42}/> */}
        <div className="playerPicProfile">
          <div className="chatUser">
            <img src={omar} alt="user-photo" />
            <div className="chatUserName"><span>Omar Toufah</span></div>
          </div>
          <div className='chatUserControls'>
              <button className='userControlButtons'><img src={play} width={50} height={50}></img></button>
              <button className='userControlButtons'><img src={mute} width={50} height={50}></img></button>
              <button className='userControlButtons'><img src={block} width={50} height={50}></img></button>
          </div>
        </div>
    </div>
  );
}

export default ChatUser