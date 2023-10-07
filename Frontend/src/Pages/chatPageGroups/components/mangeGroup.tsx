import {useState } from "react";
import avatar from '../../otoufah.jpg';
import crown from '../assets/crown.svg';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UpdateGroup = () => {
	const choice	= document.getElementById("default_select")?.value;
	const groupName	= document.getElementById('name_field')?.value;
	const groupAvatar	= document.querySelector('[name="avatarUpload"]')?.files[0];
	const password	= document.getElementById("password_field")?.value;
	const usernameCheck = /^[A-Za-z0-9_]{5,15}$/;
	const endpoint = "";
	if (usernameCheck.test(groupName) || groupAvatar || choice || password)
	{
		const avatar = new FormData();
		avatar.append('files', groupAvatar);
		if (choice == 0) {
			axios.put(endpoint, {groupname: groupName, avatar: groupAvatar, privacy: "public"}, {withCredentials: true})
			
		}
		else if (choice == 1)
		{
			axios.put(endpoint, {groupname: groupName, avatar: groupAvatar,  privacy: "private"}, {withCredentials: true})
		}
		else if (choice == 2 || password)
		{
			if (!password)
				toast.error("Password Missed", {position: "top-right"})
			else if (password.length < 8)
				toast.error("Password Length", {position: "top-right"})
			axios.put(endpoint, {groupname: groupName, avatar: groupAvatar, groupPassword: password, privacy: "protected"}, {withCredentials: true})

		}
	}
	else if (!usernameCheck.test(groupName))
	{
		toast.error("Invalid Name", {position: "top-right"})
	}

}


const ListFriends = () => {
	const [admins, isAdmin] = useState([
		"Delaney Harris",
		"Kamari Mahoney",
		"Mohamed Delacruz",
		"Marlene Knapp",
		"Darion Horne"
	]);
	const [members, isMember] = useState([
		"Jacqueline Hoover",
		"Farhan Cisneros",
		"Talia	 Wu",
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
				return (updateMember);
			});
		}
	} 
	
	const openDialog = () => {
		document.getElementById('dialog-default')?.showModal();
	} 
	return (
		<section>
		<button style={{marginTop: '20px'}} type="button" className="nes-btn" onClick={openDialog}>Manage Members</button>
		<dialog style={{height: "600px", width: "600px", background: "#e4f0ff"}} className="nes-dialog" id="dialog-default">
			<form method="dialog">
				<menu className="dialog-menu">
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<label style={{fontSize: 'large'}}>
						Admins
						<img style={{ height: '30px',   position: "relative", marginLeft: "5px" , top: '-3px',width: '30px'}}src={crown}></img>
					</label>
				</div>
				<div style={{ height: 'fit-content', overflow: 'auto'}}>
				<div style={{borderBottom: "1px solid" }}></div>
				{
					admins.map((name, index) => {
						return (
						<div style={{display: 'flex', alignItems: 'center'}}>
							<img src={avatar} style={{ borderRadius: '30px', width: '50px', height: '50px', marginTop: '10px' }} alt="avatar" />
							<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{name}</span>
							<button style={{ marginLeft: '10px' }}>Mute</button>
							<button style={{ marginLeft: '10px' }} onClick={() => kickMember(true, index)}>Kick</button>									</div>
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
									<button style={{ marginLeft: '10px' }} onClick={() => handleKick(true, index)}>Kick</button>
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
	<div className="chatDmDiv">
		<div className="groupSettings">
		<div className="nes-field">
		<input  style={{background: '#E9E9ED'}} type="text" id="name_field" maxLength={18} placeholder={oldName} onChange={(e) => setUpdate(e.target.value)} className="nes-input"/>
		</div>
		<div style={{marginTop: '20px'}} className="nes-select">
			<select required id="default_select"  onChange={(e) => {
				setProtected(e.target.value == "2")
				setUpdate(e.target.value)
			}}> 
				<option value="" disabled selected hidden>Change Privacy</option>
				<option value="0" title={privacy[0]}>Public</option>
				<option value="1" title={privacy[1]}>Private</option>
				<option value="2" title={privacy[2]}>Protected</option>
			</select>     
		</div>

        {isProtected && (
          <div style={{marginTop: '20px'}} className="nes-field">
            <input  style={{background: '#E9E9ED'}} type="password" id="password_field" placeholder="P@55w0rd" maxLength={18} className="nes-input" />
          </div>
        )}
        <ListFriends/>
		<label onChange={(e) => setUpdate(e)} style={{marginTop: '20px'}}  className="nes-btn">
			<span>Change Avatar</span>
			<input type="file"/>
		</label>
        <button style={{marginTop: '20px'}} disabled={update ? false : true} className={`nes-btn  ${update ? "is-success" : "is-disabled"}`} onClick={UpdateGroup}>Update</button>
		<Toaster/>
		</div>
	</div>
	)
}

export default ManageGroup

