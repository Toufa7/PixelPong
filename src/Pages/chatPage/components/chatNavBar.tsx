import ChatSearch from './chatSearch'
import Dms from './dms'
import Groupes from './groupes'

const chatNavBar = () => {
  return (
    <div className="chatNavBarDiv">
        <ChatSearch/>
        <div className="chatsContainer">
            <Dms/>
            <Groupes/>
        </div>
        <div className="chatLowerRibbon"></div>
    </div>
  )
}

export default chatNavBar