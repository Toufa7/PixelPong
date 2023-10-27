import {useEffect, useState } from "react";
import crown from '../assets/crown.svg'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import erase from '../assets/delete.svg';
import HorizontalScroll from 'react-scroll-horizontal'

/*
	TODO: Receiving the ID of the Selected Group to be updated
    namegb : string;
    usersgb : string;
    admins : string;
    grouptype: string;
    password? : string;
    image : string;
*/

const UpdateGroup = (id : string) => {
	const choice	: number	= document.getElementById("default_select")?.value;
	const groupName : string	= document.getElementById('name_field')?.value;
	const groupAvatar : string	= document.querySelector('[name="avatarUpload"]')?.files[0];
	const password	: string	= document.getElementById("password_field")?.value;
	const usernameCheck			= /^[A-Za-z0-9_]{5,15}$/;
	
	if (usernameCheck.test(groupName) || groupAvatar || choice || password) {
		console.log("THE ID IS -> ", id);
		// console.log("update Avatar -> ", groupAvatar);
		// console.log("update data  Avatar -> ", data);

		interface groupTypes {
			namegb : string;
			usersgb : string;
			admins : string;
			grouptype: string;
			password? : string;
			image : string;
		}
		
		const groupData : groupTypes = {};
		if (groupName) {groupData.namegb = groupName;}
		let groupType = "PUBLIC";
		if (choice == 1) {groupType = "PRIVATE";}
		else if (choice == 2) {groupType = "PROTECTED";}
		groupData.grouptype = groupType;
	  
		if (choice == 2) {groupData.password = password;}
		console.log(" --===Update ====--> ", groupData);

		if (id)
		{
			toast.promise(
				axios.patch(`http://localhost:3000/groupchat/${id}`, groupData, { withCredentials: true })
				.then(() => {
					if (groupAvatar) {

						const data = new FormData();
						data.append('file', groupAvatar);
						axios.post(`http://localhost:3000/groupchat/${id}/uploadimage`, data, { withCredentials: true })
						.then(() => {})
					}
				}),
				{
					loading: "Sending data...",
					success: "Success Settings!",
					error: "An error occurred",
				},
				{ duration: 5000, position: 'top-right' }
			);
		}
	}
	else if (password && password.length < 8) {
		toast.error("Password Too Short	", {style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'white'}, position: "top-right"});
	}
	else if (!usernameCheck.test(groupName)) {
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
		toast.error("Please Upload Avatar", { style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'white'}, position: "top-right"});
	}
}

const ListingUsersAdmins = ({group}) => {
	let choice : number		= document.getElementById('muteSelect')?.value
	const [users, setUsers] = useState([]);
	const [admins, setAdmins] = useState([]);
	const [options, setOptions] = useState<boolean>(false);
	console.log("Group IIDDDD -> ", group.id);

	const [selectedMember , setSelectedMember] = useState("ID-XXXX");
	if (group) {
		useEffect(() => {
			axios.get(`http://localhost:3000/groupchat/${group.id}/users`, { withCredentials: true })
			.then((response) => {
				console.log("Users Response -> ", response.data);
				setUsers(response.data);
			})
			.catch((error) => {
				console.log("Error fetching users:", error);
			});
		}, [group]); 
		
		useEffect(() => {
			axios.get(`http://localhost:3000/groupchat/${group.id}/admins`, { withCredentials: true })
			.then((response) => {
				console.log("Admins Response -> ", response.data);
				setAdmins(response.data);
			})
			.catch((error) => {
				console.log("Error fetching admins:", error);
			});
		}, [group]);
	}
  
	
	const kickingMember = (memberId : string, groupId : string) => {
		axios.delete(`http://localhost:3000/groupchat/${groupId}/${memberId}/user`, { withCredentials: true })
		.then((reseponse) => {
			console.log("KICKING USER -> ", reseponse.data);
		})
		.catch((err) => {
			console.error("KICKING Error -> ", err);
		})
	}

	const baningMember = (memberId : string, groupId : string) => {
		axios.patch(`http://localhost:3000/groupchat/${groupId}/${memberId}/ban`, {}, { withCredentials: true })
		.then((reseponse) => {
			console.log("BANING USER -> ", reseponse);
		})
		.catch((err) => {
			console.error("BANING Error -> ", err);
		})
	}

	function handleMuteSelect(event , memberId : string, groupId : string ) {
		const duration = event.target.value;
		if (duration && duration != 'Mute') { 
			let timeer : number = 0;
			duration == 0 ? timeer = (5 * 60000) : timeer = (15 * 60000);
			console.log('Duration -> Time ', duration, timeer);
			axios.post(`http://localhost:3000/groupchat/${groupId}/${memberId}/mute`,{ time: timeer },{ withCredentials: true })
			.then((response) => {
				console.log('MUTING USER -> ', response.data);
			})
			.catch((error) => {
				console.error('MUTING Error -> ', error);
			});
		}
	}

	function handleSetAdmin(event , memberId : string, groupId : string ) {
		const choice = event.target.value;
		if (choice && choice != 'Role') { 
			let role : string = "";
			choice == 0 ? role = "member" : role = "admin";
			console.log("Role is -> ", role);
			if (role == "member") {
				axios.delete(`http://localhost:3000/groupchat/${groupId}/${memberId}/admin`,{ withCredentials: true })
				.then((response) => {
					console.log('Setting Admin USER -> ', response.data);
				})
				.catch((error) => {
					console.error('Settting Admin Error -> ', error);
				});
			}
			else
			{
				axios.patch(`http://localhost:3000/groupchat/${groupId}/${memberId}/admin`,{}, { withCredentials: true })
				.then((response) => {
					console.log('Setting Admin USER -> ', response.data);
				})
				.catch((error) => {
					console.error('Settting Admin Error -> ', error);
				});
			}
		}
	}


	const [isSuperAdmin, setSuperAdmin] = useState<boolean>(false);
	axios.get(`http://localhost:3000/groupchat/${group.id}/checksuperuser`,{ withCredentials: true })
	.then((respo) => {
		console.log("Success SuperUser -> ", respo.data);
		setSuperAdmin(respo.data);
	})
	.catch((erro) => {
		console.log("Error in SueprAdmin ", erro);
	})

	console.log(" ==> ", isSuperAdmin);





	const openMembersDialog = () => {
		const dialog = document.getElementById('dialog_members');
		dialog?.showModal();
	}
	return (
		<section>
		<button style={{margin: '10px', width: 'auto'}} type="button" className="nes-btn" onClick={openMembersDialog}>Manage Members</button>
		<dialog style={{height: "600px", width: "800px", background: "#e4f0ff"}} className="nes-dialog" id="dialog_members">
			<form method="dialog">
			<button onClick={() => {document.getElementById('dialog_members').close();}}>X</button>
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
					admins && Object.keys(admins).map((idx) => {
						return (
							<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}} key={idx}>
								<div>
									<a>
										<img src={`http://localhost:3000/auth/avatar/${admins[idx].id}`} style={{ borderRadius: '30px', width: '50px', height: '50px', marginTop: '10px' }} alt="avatar" />
									</a>
								</div>
								<span style={{ marginLeft: '10px', marginRight: 'auto'}}>{admins[idx].username}</span>
							</div>
						)})
				}
				</div>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<label style={{fontSize: 'large'}}>Members</label>
				</div>
				<div style={{borderBottom: "1px solid" }}></div>
				<div style={{ height: 'fit-content', overflow: 'auto' }}>
				{
					users && Object.keys(users).map((idx) => {
						return (
							<div onClick={() => {setSelectedMember(users[idx].id); setOptions(true)}} style={{ display: 'flex', alignItems: 'center' ,overflow: "auto",justifyContent: "space-between", gap: '5px', marginTop: '5px'}} key={idx}>
								<a>
									<img src={`http://localhost:3000/auth/avatar/${users[idx].id}`} style={{ borderRadius: '20px', width: '40px', height: '40px', marginTop: '10px'}} alt="avatar" />
									<span style={{marginLeft: '10px'}}>{users[idx].username}</span>
								</a>
								{
									options ?
									(
										<>
											<div className="nes-select" style={{ width: '140px', height: 'auto' }}>
												<select style={{}} required id="muteSelect" onChange={(event) => handleMuteSelect(event, selectedMember, group.id)}>
													<option disabled selected hidden>Mute</option>
													<option value="0">5min</option>
													<option value="1">15min</option>
												</select>
											</div>
											{
												isSuperAdmin ? (
													<div className="nes-select" style={{ width: '140px', height: 'auto' }}>
														<select style={{}} required id="setAdmin" onChange={(event) => handleSetAdmin(event, selectedMember, group.id)}>
															<option disabled selected hidden>Role</option>
															<option value="0">Member</option>
															<option value="1">Admin</option>
														</select>
													</div>
												)
												:
												(<></>)
											}
												<button  className="nes-btn is-warning" style={{width: '100px'}} onClick={() => kickingMember(selectedMember,group.id)}>Kick</button>
												<button className="nes-btn is-error" style={{width: '80px' }}onClick={() => baningMember(selectedMember, group.id)}>Ban</button>
											</>
										)
										:
										(<></>)
									}
								</div>
								);
							})
					}
					</div>
				</menu>
			</form>
		</dialog>
		</section>
	);
};
  
const ManageGroup = () => {
	const privacy = ["Group Chat Visibility: Limited to Members","Exclusive Access: Only Members Allowed","Enhanced Security: Password-Protected Group"]
	const [isProtected , setProtected] = useState<boolean>(false);
	const [update , setUpdate] = useState<string>("");
    const [groupsList, setGroupsList] = useState<string[]>([]);
	const [amIAdmin, setamIAdmin] = useState<boolean>(false);
    useEffect(() => {   
		axios.get(`http://localhost:3000/groupchat/lifihomanaadmin`, {withCredentials: true})
		.then((response) => {
			console.log("Groups List " ,response.data);
			setGroupsList(response.data);
			if (response.data.length != 0)
				setamIAdmin(true);
		})
		.catch((erro) => {
			console.log("Error Image -> ", erro);
		});
    }, []);
	
	const [selecting , setSelecting] = useState({
		namegb: "Group Name",
	});
	const [flag, setFlag] = useState<boolean>(false);
	console.log("Group List Map -> ", groupsList);

	console.log("selecting.id => ", selecting.id);

	const [isSuperAdmin, setSuperAdmin] = useState<boolean>(false);
	axios.get(`http://localhost:3000/groupchat/${selecting.id}/checksuperuser`,{ withCredentials: true })
	.then((respo) => {
		console.log("Success SuperUser -> ", respo.data);
		setSuperAdmin(respo.data);
	})
	.catch((erro) => {
		console.log("Error in SueprAdmin ", erro);
	})



	return (
	<div className="chatDmDiv" style={{border: "1px solid", background: "#e5f0ff",borderRadius: "10px"}}>
		{
			amIAdmin ? 
			(
				<div className="groupSettings" style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', alignItems: 'center'}}>

					<div>
						{
							groupsList.map((group, idx) => {
								return (
									<a key={idx}>
										<img onClick={() => {setSelecting(group);setFlag(true)}} src={`http://localhost:3000/groupchat/getimage/${group.id}`} title={group.namegb} style={{borderRadius: '50%', width: '55px', height: '55px', margin: '10px' }} className="GroupAvataraa" alt="avatar"  />
									</a>
								)})
						}
					</div>
					{
						flag ?
						(
							isSuperAdmin ? 
							(
								<>
									<div className="nes-field" style={{margin: '10px', width: 'auto'}} >
										<input  style={{background: '#E9E9ED',width: '300px'}} type="text" id="name_field" placeholder={selecting.namegb} onChange={(e) => setUpdate(e.target.value)} className="nes-input"/>
									</div>
									<div style={{ margin: '10px', width:'auto'}} className="nes-select">
										<select required id="default_select"  onChange={(e) => {setProtected(e.target.value == "2"); setUpdate(e.target.value)}}>
											<option value=""  disabled selected hidden>Change Privacy</option>
											<option value="0" title={privacy[0]}>Public</option>
											<option value="1" title={privacy[1]}>Private</option>
											<option value="2" title={privacy[2]}>Protected</option>
										</select>     
									</div>

        							{
										isProtected &&
										(
											<div style={{margin: '10px', width: 'auto'}} className="nes-field">
												<input  style={{background: '#E9E9ED',width: '300px'}} type="password" id="password_field" placeholder="P@55w0rd" maxLength={18} className="nes-input" />
											</div>
        								)
									} 
									<label onChange={(e) => setUpdate(e)} style={{margin: '10px', width: 'auto'}}  className="nes-btn">
										<span>Change Avatar</span>
										<input formMethod="post" type="file" name="avatarUpload" accept="image/*"/>
									</label>
											<ListingUsersAdmins group={selecting} />
									<a style={{color: '#333C54', margin: '10px'} }>
										<img src={erase} style={{width: '40px', height: '40px', marginRight: '10px'}}  onClick={() => {
											axios.delete(`http://localhost:3000/groupchat/${selecting.id}`, {withCredentials: true})
											.then(() => {
												toast.success("Delete Success", {style: {textAlign: "center", width: '300px'}, position: "top-right"});
											})
											.catch(() => {
												toast.error("Delete Failed", {style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'white'}, position: "top-right"});
											})}}>
										</img>Delete Group</a>
        							<button style={{marginBottom: '10px', width: 'auto'}} disabled={update ? false : true} className={`nes-btn  ${update ? "is-success" : "is-disabled"}`} onClick={() => UpdateGroup(selecting.id)}>Update</button>
									<Toaster/>
									</>
							)
								:
							(
								<ListingUsersAdmins group={selecting} />
							)
							
						)
						:
						(<></>)
					}
					</div>
				)
			:
			(<></>)
		}
	</div>
	)
}

export default ManageGroup
