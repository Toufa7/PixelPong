import ChatUser from './ChatUser'
import MessagingBody from './MessagingBody'
import MessageLowerRibbon from './MessageLowerRibbon'
import { socket, socketContext } from './socket.client'
import { useContext } from 'react'


const messages = () => {
  const socket = useContext(socketContext);
  console.log("Socket Connected");
  
  return (
    <div className="messagesDiv">
      <socketContext.Provider value = {socket}>
        <ChatUser />
        <MessagingBody psocket = {socket} />
        <MessageLowerRibbon />
      </socketContext.Provider>
    </div>
  )
}

export default messages