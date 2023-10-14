import { useState } from 'react';
import ChatSearch from './chatSearch'
import CreateGroup from './createGroup';
import ManageGroup from './mangeGroup';
import avatarGroup from '../assets/saka.jpeg'
// import publicGroup from '../assets/public.svg'
// import protectedGroup from '../assets/protected.svg'
import privateGroup from '../assets/private.svg'
import './chatNavBar.scss'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
					(<CreateGroup/>)) : ""
			}
			<GroupsList />
		</div>
		<div className="chatLowerRibbonGroup"></div>
	</div>
  )
}


const GroupsList = () => {
	console.log("GroupsList   GroupsList");
	const [groupId, setGroupId] = useState("");

	// axios.get(`http://localhost:3000/groupchat/getimage/${id}`, {withCredentials: true})
	axios.get(`http://localhost:3000/groupchat`, {withCredentials: true})
	.then((response) => {
		console.log("*********** Groups -> ", response.data[0].id);
		setGroupId(response.data[0].id);
	})
	.catch((erro) => {
		console.log("Error List Groups -> ", erro);
	})


	axios.get(`http://localhost:3000/groupchat/getimage/${groupId}`, {withCredentials: true})
	.then((response) => {
		console.log("Image  Groups -> ", response.data);
	})
	.catch((erro) => {
		console.log("Error Image Groups -> ", erro);
	})
	return (
<>
							<img src={`http://localhost:3000/groupchat/getimage/${groupId}`} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
							<span style={{ marginLeft: '10px', marginRight: 'auto' }}>Omar</span>
							<img src={privateGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }}></img>
						</>
		)



	// const [groups]
	// .then((response) => {
	// 	console.log("Reseponse List Groups -> ", response.data);
	// })
	// .catch((erro) => {
	// 	console.log("Error List Groups -> ", erro);
	// })
	// const setOpenBox = (groupName : string) => {
	// 	document.getElementById('groupJoin')?.showModal();
	// 	setGroupName(groupName);
	// }
	// const location = useLocation();
	// console.log("Location => ", location);
	// const [joinGroup, setJoinGroup] = useState(true);
	// return (
	// 	<div className="chatGroupesDiv">
	// 	<i>GROUPES</i>
	// 	<div className="userChatGroupes">
	// 		{
	// 			groups.map((name) => {
	// 				return (
	// 					<div style={{ display: 'flex', alignItems: 'center' ,overflow: "auto" }} onClick={() => setOpenBox(name)} className="userChatGroup" key={name}>
	// 						<img src={avatarGroup} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
	// 						<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{name}</span>
	// 						<img src={privateGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }}></img>
	// 					</div>
	// 			);})
	// 		}
	// 		<dialog className="nes-container" id="groupJoin">
	// 			<h2 className="groupName">{groupName}</h2>
	// 			<img className="groupAvatar" src={avatarGroup} />
	// 			<p className="group-members">Total Members: 245</p>
	// 			{
	// 				joinGroup ? (
	// 					<button onClick={() => setJoinGroup(false)} className="nes-btn">Join Group</button>
	// 				)
	// 				: 
	// 				(
	// 					joinGroup ? (
	// 						<button onClick={() => setJoinGroup(true)} className="nes-btn">Pending</button>
	// 					)
	// 					: 
	// 					(
	// 						<button onClick={() => setJoinGroup(true)} className="nes-btn">Exit</button>
	// 					)
	// 				)
	// 			}
	// 		</dialog>
	// 	</div>
	// 	</div>
	// );
}

export default ChatNavBar
