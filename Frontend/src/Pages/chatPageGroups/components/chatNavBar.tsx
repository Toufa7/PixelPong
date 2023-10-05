import { useState } from 'react';
import ChatSearch from './chatSearch'
import CreateGroup from './createGroup';
import Groupes from './groupes'
import ManageGroup from './mangeGroup';

const ChatNavBar = () => {
  const [data, setLabel] = useState({
		label : false,
		createOrmanage : false
	}
  );

  return (
	<div className="chatNavBarDiv">
		<ChatSearch/>
		<div className="chatsContainer">
			<div className="choice" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<button className={data.createOrmanage ? 'selected' : ''} onClick={() => setLabel({label: true, createOrmanage: true})}>Group Settings</button>
				<button className={!data.createOrmanage ? 'selected' : ''}  onClick={() => setLabel({label: true, createOrmanage: false})}>Create Group</button>
			</div>
				{
				data.label ? (data.createOrmanage ? (<ManageGroup/>) : (<CreateGroup/>)) : ""
				}
				<Groupes/>
		</div>
		<div className="chatLowerRibbon"></div>
	</div>
  )
}

export default ChatNavBar
