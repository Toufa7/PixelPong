import ChatUser from './ChatUser'
import MessagingBody from './MessagingBody'
import MessageLowerRibbon from './MessageLowerRibbon'


const messages = () => {
  // const socket = useContext(socketContext);
  
  return (
    <div className="messagesDiv">
      {/* <socketContext.Provider value = {socket}> */}
        <ChatUser />
        <MessagingBody/>
      {/* </socketContext.Provider> */}
        <MessageLowerRibbon />
    </div>
  )
}

export default messages