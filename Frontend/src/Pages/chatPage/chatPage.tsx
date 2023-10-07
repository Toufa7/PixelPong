import './chatPage.scss'
import MainNavBar from './components/mainNavBar'
import ChatNavBar from './components/chatNavBar'

const chatPage = () => {
  return (
      <div className="chatPage">
        <MainNavBar/>
        <ChatNavBar/>
      </div>
  )
}

export default chatPage