import './GrpChatNavBar.scss'
/******************* Packages  *******************/
import { useEffect, useState } from 'react';
import axios from 'axios';
/******************* Includes  *******************/
import publicGroup from '../assets/public.svg'
import protectedGroup from '../assets/protected.svg'
import privateGroup from '../assets/private.svg'
import CreateGroup from './createGroup';
import ManageGroup from './mangeGroup';


const GrpChatNavBar = () => {
  const [data, setLabel] = useState({
		label : false,
		createOrmanage : false
	}
  );
  return (
  	<div className="chatNavBarDivGroup"  style={{background: '#FFFFFF', flex:  '5', display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: '0'}}>
		<div className="chatsContainerGroup" style={{flex: '10', display: 'flex', flexDirection: 'column', zIndex: '0'}} >
			<div className="choice" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<button className={data.createOrmanage ? 'selected' : ''} onClick={() => setLabel({label: true, createOrmanage: true})}>Group Settings</button>
				<button className={!data.createOrmanage ? 'selected' : ''}  onClick={() => setLabel({label: true, createOrmanage: false})}>Create Group</button>
			</div>{	data.label ? (data.createOrmanage ? (<ManageGroup/>) : (<CreateGroup/>)) : "" }
			{/* Listing the groups your in or own */}
		</div>
			<GroupsList />
		<div className="chatLowerRibbonGroup"></div>
	</div>
  )
}


const GroupsList = () => {
	const [avatarGroup, setGroupAvatar] = useState();
    const [groupsList, setGroupsList] = useState<string[]>([]);
    useEffect(() => {   
        axios.get(`http://localhost:3000/groupchat`, {withCredentials: true})
            .then((response) => {
				console.log("Groups List " ,response.data);
				setGroupsList(response.data);
				const endpoint = `http://localhost:3000/groupchat/getimage/${group.id}`;
				axios.get(endpoint, {withCredentials: true})
				.then((response) => {
					console.log("Success Image Groups -> ", response.data);
				})
				.catch((Error))
            })
			.catch(Error)
    }, []);




	return (
        <div className="chatDmDiv" style={{border:' 1px solid', background: 'rgb(229, 240, 255)',borderRadius: '10px'}}>
		<div className="userChatGroupes"  style={{display: 'flex',alignItems: 'center',padding: '10px',gap: '15px',cursor: 'pointer',borderBottom: '2px solid'}} >
		{
			groupsList.map((group : any) => (
				<div  className="userChatGroup" style={{display: 'flex',alignItems: 'center',padding: '10px',gap: '15px',cursor: 'pointer',borderBottom: '2px solid'}} key={name}>
				<img src={`http://localhost:3000/groupchat/getimage/${group.id}`} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
				<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{group.namegb}</span>
				{
					group.grouptype == "PUBLIC" ? (
						<img src={publicGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Public Group" />
					) : group.grouptype == "PRIVATE" ? (
						<img src={privateGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Private Group" />
					) : (
						<img src={protectedGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Protected Group" />
					)
				}

				</div>
			))
		}
		</div>
		</div>
	);
}

export default GrpChatNavBar
