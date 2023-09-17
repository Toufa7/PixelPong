import ChatUser from '../chatPageComponents/ChatUser.tsx'
import MessagingBody from '../chatPageComponents/MessagingBody.tsx'
import MessageLowerRibbon from '../chatPageComponents/MessageLowerRibbon.tsx'

const messages = () => {
  return (
    <div className="messagesDiv">
        <ChatUser />
        <MessagingBody />
        <MessageLowerRibbon />
    </div>
  )
}

export default messages