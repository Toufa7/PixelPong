import './chatPage.scss'
import MainNavBar from '../Componenets/chatPageComponents/mainNavBar.tsx'
import ChatNavBar from '../Componenets/chatPageComponents/chatNavBar.tsx'
import Messages from '../Componenets/chatPageComponents/messages.tsx'

const chatPage = () => {
  return (
    <div className="chatPage">
      <MainNavBar/>
      <ChatNavBar/>
      <Messages/>
    </div>
  )
}

export default chatPage