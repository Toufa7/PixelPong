import './chatNavBar.scss'
/******************* Packages  *******************/
import { useState } from 'react';
import axios from 'axios';
/******************* Includes  *******************/
import avatarGroup from '../assets/saka.jpeg'
import publicGroup from '../assets/public.svg'
import protectedGroup from '../assets/protected.svg'
import privateGroup from '../assets/private.svg'
import ChatSearch from './chatSearch'
import CreateGroup from './createGroup';
import ManageGroup from './mangeGroup';


const ChatNavBar = () => {
  const [data, setLabel] = useState({
		label : false,
		createOrmanage : false
	}
  );
  return (
	<div className="chatNavBarDivGroup">
		<ChatSearch/>
		<div className="chatsContainerGroup">
			<div className="choice" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<button className={data.createOrmanage ? 'selected' : ''} onClick={() => setLabel({label: true, createOrmanage: true})}>Group Settings</button>
				<button className={!data.createOrmanage ? 'selected' : ''}  onClick={() => setLabel({label: true, createOrmanage: false})}>Create Group</button>
			</div>
			{	data.label ?
				(
					data.createOrmanage ?
					(<ManageGroup/>)
					:
					(<CreateGroup/>)
				)
				:
				""
			}
			{/* Listing the groups your in or own */}
			{/* <GroupsList /> */}
		</div>
		<div className="chatLowerRibbonGroup"></div>
	</div>
  )
}


const GroupsList = () => {
	const [groups, getGroups] = useState([]);
	axios.get("http://localhost:3000/groupchat/", {withCredentials: true})
	.then((response) => {
		console.log("Response User Groups -> ", response.data);
		getGroups(response.data);
	})
	.catch((erro) => {
		console.log("Error User Groups -> ", erro);
	})

	return (
		<div className="chatGroupesDiv">
		<i>GROUPES</i>
		<div className="userChatGroupes">
			{
				groups.map((name) => {
					return (
						<div style={{ display: 'flex', alignItems: 'center' ,overflow: "auto" }} className="userChatGroup" key={name}>
							<img src={avatarGroup} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
							<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{name}</span>
							<img src={privateGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }}></img>
						</div>
				);})
			}
		</div>
		</div>
	);
}

export default ChatNavBar



// {

	// const [groupName, setGroupName] = useState('Group Name');
	// const setOpenBox = (groupName : string) => {
	// 	document.getElementById('groupJoin')?.showModal();
	// 	setGroupName(groupName);
	// }
				{/* <dialog className="nes-container" id="groupJoin">
				<h2 className="groupName">{groupName}</h2>
				<img className="groupAvatar" src={avatarGroup} />
				<p className="group-members">Total Members: 245</p>
				{
					joinGroup ? (
						<button onClick={() => setJoinGroup(false)} className="nes-btn">Join Group</button>
					)
					: 
					(
						joinGroup ? (
							<button onClick={() => setJoinGroup(true)} className="nes-btn">Pending</button>
						)
						: 
						(
							<button onClick={() => setJoinGroup(true)} className="nes-btn">Exit</button>
						)
					)
				}
			</dialog> */}
// }