import ChatSearch from '../chatPageComponents/chatSearch.tsx'
import Dms from '../chatPageComponents/dms.tsx'
import Groupes from '../chatPageComponents/groupes.tsx'

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