import ChatSearch from './chatSearch'
// import CreateGroup from './createGroup';
import Groupes from './groupes'
import ManageGroup from './mangeGroup';

const chatNavBar = () => {
  return (
    <div className="chatNavBarDiv">
        <ChatSearch/>
        <div className="chatsContainer">
            {/* <CreateGroup/> */}
            <ManageGroup/>
            <Groupes/>
        </div>
        <div className="chatLowerRibbon"></div>
    </div>
  )
}

export default chatNavBar