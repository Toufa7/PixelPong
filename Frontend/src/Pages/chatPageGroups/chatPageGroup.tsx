import MainNavBar from './components/mainNavBar'
import ChatNavBar from './components/chatNavBar'
// import Messages from './components/messages'
import './chatPageGroups.scss'

const chatPageGroup = () => {
  return (
    <>
    <div className="chatPage">
      <MainNavBar/>
      <ChatNavBar/>
      {/* <Messages/> */}
    </div>
    </>
  )
}

export default chatPageGroup