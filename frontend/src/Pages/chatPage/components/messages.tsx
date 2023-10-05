import ChatUser from './ChatUser'
import MessagingBody from './MessagingBody'
import MessageLowerRibbon from './MessageLowerRibbon'
import { useContext } from 'react'
import { socketContext } from './socket.client'


const messages = () => {
  const socket = useContext(socketContext);
  
  return (
    <div className="messagesDiv">
      <socketContext.Provider value = {socket}>
        <ChatUser />
        <MessagingBody psocket={socket}/>
      </socketContext.Provider>
        <MessageLowerRibbon />
    </div>
  )
}

export default messages