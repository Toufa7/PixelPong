import { useState } from 'react';
import ChatSearch from './chatSearch'
import CreateGroup from './createGroup';
import ManageGroup from './mangeGroup';
import avatarGroup from '../assets/images/fans_2.jpg';

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
			{	data.label ?
				(
					data.createOrmanage ?
					(<ManageGroup/>)
					:
					(<CreateGroup/>)) : ""
			}
			<GroupsList />
		</div>
		<div className="chatLowerRibbon"></div>
	</div>
  )
}


const GroupsList = () => {
	const groups = [
		"Pesky InnerCity",
		"Orange Tractors",
		"The Sprinters",
		"Brown Razors",
		"El Grass Sensation",
		"Brick Kittens"
	]
	const setOpenBox = (groupName : string) => {
		console.log(groupName)
	}
	return (
		<div className="chatGroupesDiv">
		<i>GROUPES</i>
		<div className="userChatGroupes">
			{
				groups.map((name) => {
				return (
					<div onClick={() => setOpenBox(name)} className="userChatGroup" key={name}>
					<img src={avatarGroup} alt="user-photo" />
					<div className="userChatGroupinfo">
						<span>{name}</span>
					</div>
					</div>
				);})
			}
		</div>
		</div>
	);
}



export default ChatNavBar
