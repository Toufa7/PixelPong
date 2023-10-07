import axios from "axios";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import publicGroup from '../assets/public.svg'
const CreatingGroup = () => {
	const groupName : string	= document.getElementById('name_field')?.value;
	const choice : number		= document.getElementById("default_select")?.value;
	const password : string		= document.getElementById("password_field")?.value;
	const groupAvatar : string	= document.querySelector('[name="avatarUpload"]')?.files[0];
	const regEx 				= /^[A-Za-z0-9_]{5,15}$/;
	console.log("Choice => ", choice)
	/**
	 * TODO: Need en endpoint for creating group
	*/
	const endpoint = "";
	// const myStyle = {
	// 	textAlign: "center",
	// 	width: '300px',
	// }
	console.log("Privacy -> ", choice)
	if (regEx.test(groupName) && groupAvatar && choice)
	{
		const data = new FormData();
		data.append('files', groupAvatar);
		if (choice == 0) {
			console.log(`Group Name ${groupName} | Privacy Public`)
			axios.post(endpoint, {groupname: groupName, avatar: groupAvatar,  privacy: "public"}, {withCredentials: true});
		}
		else if (choice == 1) {
			console.log(`Group Name ${groupName} | Privacy Private`)
			axios.post(endpoint, {groupname: groupName, avatar: groupAvatar,  privacy: "private"}, {withCredentials: true});
		}
		else {
			console.log(`Group Name ${groupName} | Group Password ${password} | Privacy Protected`)			
			axios.post(endpoint, {groupname: groupName, groupPassword: password, avatar: groupAvatar, privacy: "protected"}, {withCredentials: true});
		}
	}
	else if (!regEx.test(groupName))
	{
		if (!groupName)
			toast("Please Provide Name", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
		else
			toast.error("Invalid Group Name", { style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'white'}, position: "top-right"});
	}
	else if (!choice)
	{
		toast("Please Choose Privacy", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
	}
	else if (choice == 2 && !password)
	{
		toast("Password Missed", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
	}
	else if (!groupAvatar)
	{
		toast.error("Please Upload Avatar", { style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'white'}, position: "top-right"});
	}
}

const CreateGroup = () => {
	const privacy = [
		"Group Chat Visibility: Limited to Members",
		"Exclusive Access: Only Members Allowed",
		"Enhanced Security: Password-Protected Group"
	]

	const [password, setPassword] = useState('');

	const handlePasswordChange = (event : string) => {
		console.log("Event ", event);
		const maskedValue = event.replace(/./g, '*');
		setPassword(maskedValue);
	};

	const [groupName , setGroupName] = useState("");

	const [isProtected , setProtected] = useState(false);
	const isCreateDisabled = groupName === "";
	return (
		<div style={{border: '1px solid', background: '#e5f0ff', borderRadius: '10px'}}className="chatDmDiv">
			<div  className="settingss">
				<div className="nes-field">
					<input style={{background: '#E9E9ED'}} type="text" id="name_field" placeholder='Group Name' maxLength={18} className="nes-input"/>
				</div>
				<label style={{marginTop: '10px'}}>Select Privacy</label>
				<div className="nes-select">
					<select  required id="default_select" onChange={(e) => setProtected(e.target.value == "2")} >
						<option value="" disabled selected hidden>Choose Privacy</option>

						<option value="0" title={privacy[0]}>Public</option>
						<option value="1" title={privacy[1]}>Private</option>
						<option value="2" title={privacy[2]}>Protected</option>
					</select>     
				</div>

				{isProtected && (
					<div style={{marginTop: '10px'}} className="nes-field">
						<input  style={{background: '#E9E9ED'}} type="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} id="password_field" placeholder="P@55w0rd" maxLength={18} className="nes-input" />
					</div>
				)}
				<label style={{marginTop: '10px'}}>Group Avatar</label>
				<label style={{marginBottom: '10px'}} className="nes-btn">
					<span >click to upload</span>
					<input formMethod="post" type="file" name="avatarUpload" accept=".png .jpg .jpeg"/>
				</label>
			<a onClick={CreatingGroup} className='nes-btn' href="#">Create</a>
			<Toaster/>
			</div>
		</div>
	)
}

export default CreateGroup
