import React from 'react'

import Conversation from './conversation'
import MessageInput from './messageInput'

const MessagingBody = () => {
  return (
    <div className="MessagingBodyDiv">
      <Conversation/>
      <MessageInput/>
    </div>
  )
}

export default MessagingBody