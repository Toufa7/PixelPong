import { useState } from 'react';
import ChatSearch from './chatSearch'
import CreateGroup from './createGroup';
import ManageGroup from './mangeGroup';
import avatarGroup from '../assets/saka.jpeg'
import publicGroup from '../assets/public.svg'
import protectedGroup from '../assets/protected.svg'
import privateGroup from '../assets/private.svg'
import './chatNavBar.scss'
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
	const [groupName, setGroupName] = useState('Group Name')
	const groups = [
		"Pesky InnerCity",
		"Orange Tractors",
		"The Sprinters",
		"Brown Razors",
		"El Grass Sensation",
		"Pesky InnerCity",
		"Orange Tractors",
		"The Sprinters",
		"Brown Razors",
		"El Grass Sensation",
		"Orange Tractors",
		"The Sprinters",
		"Brown Razors",
		"El Grass Sensation",
		"Pesky InnerCity",
		"Orange Tractors",
		"The Sprinters",
		"Brown Razors",
		"El Grass Sensation",
		"Brick Kittens"
	]
	const setOpenBox = (groupName : string) => {
		document.getElementById('groupJoin').showModal();
		setGroupName(groupName);
	}
	return (
		<div className="chatGroupesDiv">
		<i>GROUPES</i>
		<div className="userChatGroupes">
			{
				groups.map((name) => {
					return (
						<div style={{ display: 'flex', alignItems: 'center' ,overflow: "auto" }} onClick={() => setOpenBox(name)} className="userChatGroup" key={name}>
						<img src={avatarGroup} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
						<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{name}</span>
						<img src={privateGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }}></img>
						</div>
				);})
			}
			<dialog className="nes-container is-rounded" id="groupJoin">
				<h2 className="groupName">{groupName}</h2>
				<img className="groupAvatar" src={avatarGroup} alt="Group Avatar" />
				<p className="group-members">Total Members: 245</p>
				<button className="nes-btn">Join Group</button>
			</dialog>
		</div>
		</div>
	);
}

export default ChatNavBar
