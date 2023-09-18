import ChatUser from './ChatUser'
import MessagingBody from './MessagingBody'
import MessageLowerRibbon from './MessageLowerRibbon'


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