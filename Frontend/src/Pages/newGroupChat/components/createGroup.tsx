import axios from "axios";
import { useState } from "react"
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


const CreatingGroup = () => {
	const groupName : string	= document.getElementById('name_field')?.value;
	const choice : number		= document.getElementById("default_privacy")?.value;
	const password : string		= document.getElementById("password_field")?.value;
	const groupAvatar : string	= document.querySelector('[name="avatarUpload1"]').files[0];
	
	const regEx = /^[A-Za-z0-9_ ]{5,15}$/;
	if (regEx.test(groupName) && groupAvatar && choice) {
		const data = new FormData();
		data.append('file', groupAvatar);
		console.log("Created Avatar -> ", groupAvatar);

		console.log("Avatar -> ", data);
		let groupType = "PUBLIC";
		if (choice == 1) {groupType = "PRIVATE";}
		else if (choice == 2) {groupType = "PROTECTED";}
		const groupData = {
			namegb: groupName,
			grouptype: groupType,
			password: (choice == 2) ? password : undefined
		};
		console.log(" --== Create =====--> ", groupData);
		toast.promise(
			axios.post("http://localhost:3000/groupchat", groupData, { withCredentials: true })
			.then((response) => {
				axios.post(`http://localhost:3000/groupchat/${response.data.id}/uploadimage`, data, { withCredentials: true })
				.then((response) => {
					console.log("Creating Group Response -> ", response);
				})
				console.log("Creating Group Response -> ", response);
			}),
			{
				loading: "Sending data...",
				success: "Success Settings!",
				error: "An error occurred",
			}
			,{ duration: 5000, position: 'top-right' });

	}
	else if (choice == 2 && password.length < 8) {
		toast.error("Password Too Short	", {style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'white'}, position: "top-right"});
	}

	else if (!regEx.test(groupName)) {
		if (!groupName)
			toast("Please Provide Name", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
		else
			toast.error("Invalid Group Name", {style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'white'}, position: "top-right"});
	}
	else if (!choice) {
		toast("Please Choose Privacy", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
	}
	else if (choice == 2 && !password) {
		toast("Password Missed", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
	}
	else if (!groupAvatar) {
		toast("Please Upload Avatar", {icon: 'ℹ️' ,style: {textAlign: "center", width: '300px' ,background: '#91CCEC', color: 'white'}, position: "top-right"});
	}
}

const CreateGroup = () => {
	const privacy = ["Limited to Members","Only Members Allowed","Password-Protected Group"]
	const [groupName , setGroupName] = useState("");
	const [isProtected , setProtected] = useState<boolean>(false);
	const [update , setUpdate] = useState("");
	console.log("Typing -> ", update);
	console.log(" update ", update);
	return (
		<div className="chatDmDiv" style={{border: "1px solid", background: "#e5f0ff" ,borderRadius: "10px"}}>
			<Toaster/>
			<div className="groupSettings" style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
				<div className="nes-field" style={{margin: '10px', width: '300px'}} >
					<input style={{background: '#E9E9ED'}} onChange={(e) => setUpdate(e.target.value)}	type="text" id="name_field" placeholder='Group Name' maxLength={18} className="nes-input"/>
				</div>
				<label>Select Privacy</label>
				<div className="nes-select" style={{ marginLeft: '10px', width:' 300px'}}>
					<select required id="default_privacy" onChange={(e) => setProtected(e.target.value == "2")} >
						<option value="" disabled selected hidden>Choose Privacy</option>
						<option value="0" title={privacy[0]}>Public</option>
						<option value="1" title={privacy[1]}>Private</option>
						<option value="2" title={privacy[2]}>Protected</option>
					</select>     
				</div>
				{isProtected && (
					<div style={{margin: '10px'}} className="nes-field">
						<input  style={{background: '#E9E9ED'}} type="password" id="password_field" placeholder="P@55w0rd" maxLength={18} required className="nes-input" />
					</div>
				)}
				<label style={{margin: '10px'}}>Group Avatar</label>
				<label style={{margin: '10px'}} className="nes-btn">
					<span>Click to upload</span>
					<input formMethod="post" type="file" name="avatarUpload1" accept="image/*"/>
				</label>
			<button style={{margin: '10px'}} disabled={update ? false : true} className={`nes-btn  ${update ? "is-success" : "is-disabled"}`}   onClick={CreatingGroup} href="#">Create</button>
			</div>
		</div>
	)
}

export default CreateGroup