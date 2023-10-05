import { useState } from 'react';
import ChatSearch from './chatSearch'
import CreateGroup from './createGroup';
import Groupes from './groupes'
import ManageGroup from './mangeGroup';

const chatNavBar = () => {
  const [label, setLabel] = useState(false);

  return (
    <div className="chatNavBarDiv">
        <ChatSearch/>
        <div className="chatsContainer">
          <div className="choice">
          <button onClick={() => setLabel(true)}>Group Settings</button>
          <button onClick={() => setLabel(true)}>Create Group</button>
          </div>
              {
                label ? (<CreateGroup/>) : (<ManageGroup/>)
              }
            <Groupes/>
        </div>
        <div className="chatLowerRibbon"></div>
    </div>
  )
}

export default chatNavBar