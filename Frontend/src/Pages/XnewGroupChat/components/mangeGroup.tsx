import {useState } from "react";
import avatar from '../../otoufah.jpg';
import crown from '../assets/crown.svg'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

/*
	TODO: Receiving the ID of the Selected Group to be updated
    namegb : string;
    usersgb : string;
    admins : string;
    grouptype: string;
    password? : string;
    image : string;
*/

const UpdateGroup = () => {
	const choice	= document.getElementById("default_select")?.value;
	const groupName	= document.getElementById('name_field')?.value;
	const groupAvatar	= document.querySelector('[name="avatarUpload"]')?.files[0];
	const password	= document.getElementById("password_field")?.value;
	const usernameCheck = /^[A-Za-z0-9_]{5,15}$/;
	const endpoint = "http://localhost:3000/groupchat";
	// const endpoint = `http://localhost:3000/groupchat/${groupId}`;
	if (usernameCheck.test(groupName) || groupAvatar || choice || password)
	{
		const avatar = new FormData();
		avatar.append('files', groupAvatar);
		if (choice == 0) {
			axios.patch(endpoint, {groupname: groupName, avatar: groupAvatar, privacy: "PUBLIC"}, {withCredentials: true})
			.then((response) => {
				console.log(" Updating Group " ,response);
			})
			.catch((erro) => {
				console.log(" Updating Group " ,erro);
			})
		}
		else if (choice == 1)
		{
			axios.patch(endpoint, {groupname: groupName, avatar: groupAvatar,  privacy: "PRIVATE"}, {withCredentials: true})
		}
		else if (choice == 2 || password)
		{
			if (!password)
				toast.error("Password Missed", {position: "top-right"})
			else if (password.length < 8)
				toast.error("Password Length", {position: "top-right"})
			axios.patch(endpoint, {groupname: groupName, avatar: groupAvatar, groupPassword: password, privacy: "PROTECTED"}, {withCredentials: true})
		}
	}
	else if (!usernameCheck.test(groupName))
	{
		toast.error("Invalid Name", {position: "top-right"})
	}

}


const ListFriends = () => {

	let choice : number		= document.getElementById('muteSelect')?.value
	const [muteTime , muteUser] = useState("");
	


	const [admins, isAdmin] = useState([
		"Delaney Harris","Kamari Mahoney","Mohamed Delacruz","Marlene Knapp","Darion Horne"
	]);
	const [members, isMember] = useState([
		"Jacqueline Hoover",
		"Farhan Cisneros",
		"Talia Wu",
		"Jacqueline Hoover",
		"Farhan Cisneros",
		"Talia Wu",
		"Jacqueline Hoover",
		"Farhan Cisneros",
		"Talia Wu",
		"Jacqueline Hoover",
		"Farhan Cisneros",
		"Talia Wu",
		"Yahya Dawson"
	]);
	
	const kickMember = (status: boolean, index: number) => {
		if (status){
			isAdmin((prevAdmin) => {
				const updateAdmins = [...prevAdmin];
				updateAdmins.splice(index, 1);
				return (updateAdmins);
			});
		}
		else {
			isMember((prevMember) => {
				const updateMember = [...prevMember];
				updateMember.splice(index, 1);
				const endpoint = `http://localhost:3000/groupchat/${groupID}/${userId}`;
				axios.delete(endpoint, {withCredentials: true})
				.then((response) => {
					console.log("Respone Deleting Member -> ", response);
				})
				.catch((error) => {
					console.log("Error Deleting Member -> ", error);
				})
				return (updateMember);
			});
		}
	} 
	
	const openMembersDialog = () => {
		document.getElementById('dialog_members')?.showModal();
	} 
	return (
		<section>
		<button style={{marginTop: '20px'}} type="button" className="nes-btn" onClick={openMembersDialog}>Manage Members</button>
		<dialog style={{height: "600px", width: "800px", background: "#e4f0ff"}} className="nes-dialog" id="dialog_members">
			<form method="dialog">
				<menu className="dialog-menu">
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<label style={{fontSize: 'large'}}>
						Admins
						<img style={{ height: '30px',   position: "relative", marginLeft: "5px" , top: '-3px',width: '30px'}}src={crown}></img>
					</label>
				</div>
				<div style={{ height: 'fit-content'}}>
				<div style={{borderBottom: "1px solid" }}></div>
				{
					admins.map((name, index) => {
						return (
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
							<div>
								<img src={avatar} style={{ borderRadius: '30px', width: '50px', height: '50px', marginTop: '10px' }} alt="avatar" />
							</div>
							<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{name}</span>
							<div className="nes-select" style={{ marginRight: '10px', width: '80px'}}>
								<select style={{ marginLeft: '10px'}} required id="muteSelect" onChange={muteUser}>	
									<option disabled selected hidden>Mute</option>
									<option value="0">5min</option>
									<option value="1">15min</option>
								</select>
							</div>
							<button  className="nes-btn is-warning" style={{ marginLeft: '10px', width: '100px'  }} onClick={() => kickMember(true, index)}>Kick</button>
							<button className="nes-btn is-error" style={{ marginLeft: '10px', width: '80px' }}>Ban</button>
						</div>
						)
					;})
				}
					</div>
					<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<label style={{fontSize: 'large'}}>Members</label>
				</div>
					<div style={{borderBottom: "1px solid" }}></div>

					<div style={{ height: 'fit-content', overflow: 'auto' }}>
					{
						members.map((name, index) => {
							return (
								<div style={{ display: 'flex', alignItems: 'center' ,overflow: "auto" }}>
									<img src={avatar} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
									<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{name}</span>
									<button style={{ marginLeft: '10px' }}>Mute</button>
									<button style={{ marginLeft: '10px' }}>Ban</button>
									<button style={{ marginLeft: '10px' }} onClick={() => kickMember(true, index)}>Kick</button>
								</div>
							)
							;})
					}
					</div>

				</menu>
			</form>
		</dialog>
		</section>
	);
};
  
const ManageGroup = () => {
	const privacy = [
		"Group Chat Visibility: Limited to Members",
		"Exclusive Access: Only Members Allowed",
		"Enhanced Security: Password-Protected Group"
	]
	const [isProtected , setProtected] = useState(false);
	const [update , setUpdate] = useState("");
	const oldName = "CurrentName";
	return (
	<div className="chatDmDiv" style={{border: "1px solid", background: "#e5f0ff" ,borderRadius: "10px"}}>
		<div className="groupSettings" style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
		<div className="nes-field" style={{marginTop: '20px', width: '300px'}} >
		<input  style={{background: '#E9E9ED'}} type="text" id="name_field" maxLength={18} placeholder={oldName} onChange={(e) => setUpdate(e.target.value)} className="nes-input"/>
		</div>
		<div style={{ marginLeft: '10px', width:' 300px'}} className="nes-select">
			<select required id="default_select"  onChange={(e) => {
				setProtected(e.target.value == "2")
				setUpdate(e.target.value)
			}}>
				<option value=""  disabled selected hidden>Change Privacy</option>
				<option value="0" title={privacy[0]}>Public</option>
				<option value="1" title={privacy[1]}>Private</option>
				<option value="2" title={privacy[2]}>Protected</option>
			</select>     
		</div>

        {isProtected && (
          <div style={{marginTop: '20px', width: '300px'}} className="nes-field">
            <input  style={{background: '#E9E9ED'}} type="password" id="password_field" placeholder="P@55w0rd" maxLength={18} className="nes-input" />
          </div>
        )}
        <ListFriends/>
		<label onChange={(e) => setUpdate(e)} style={{marginTop: '20px', width: '300px'}}  className="nes-btn">
			<span>Change Avatar</span>
			<input type="file"/>
		</label>
        <button style={{marginTop: '20px', width: '300px'}} disabled={update ? false : true} className={`nes-btn  ${update ? "is-success" : "is-disabled"}`} onClick={UpdateGroup}>Update</button>
		<Toaster/>
		</div>
	</div>
	)
}

export default ManageGroup

