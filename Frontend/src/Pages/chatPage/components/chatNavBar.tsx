import ChatSearch from './chatSearch'
import Dms from './dms'


const chatNavBar = () => {
  return (
    <div className="chatNavBarDiv">
        <ChatSearch/>
        <div className="chatsContainer">
            <Dms/>
        </div>
        <div className="chatLowerRibbon"></div>
    </div>
  )
}

export default chatNavBar