import ChatUser from './GrpChatUser'
// import MessagingBody from './MessagingBody'
import Diamond from '../../../assets/images/diamond.svg'
import Sparkle from '../../../assets/images/sparkles.gif'
import React from 'react';

const messages = (props:any) => {
  
  return (
    <div className="messagesDiv">
        <ChatUser />
        <div className="MessageLowerRibbonDiv">
            <img className='leftDiamond' src={Diamond} alt="Bottom diamond" />
            <img className='rightSparkle' src={Sparkle} alt="Bottom diamond" />
        </div>
    </div>
  )
}

export default messages