import React from 'react'
import Conversation from '../../Componenets/chatPageComponents/conversation.tsx'
import MessageInput from '../../Componenets/chatPageComponents/messageInput.tsx'

const MessagingBody = () => {
  return (
    <div className="MessagingBodyDiv">
      <Conversation/>
      <MessageInput/>
    </div>
  )
}

export default MessagingBody