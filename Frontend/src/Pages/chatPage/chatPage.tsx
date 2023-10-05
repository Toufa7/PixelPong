import './chatPage.scss'
import MainNavBar from './components/mainNavBar'
import ChatNavBar from './components/chatNavBar'
import Messages from './components/messages'
import Start from '../../Pages/addons/Stars'

const chatPage = () => {
  return (
    <>
      <Start/>
      <div className="chatPage">
        <MainNavBar/>
        <ChatNavBar/>
        <Messages/>
      </div>
    </>
  )
}

export default chatPage