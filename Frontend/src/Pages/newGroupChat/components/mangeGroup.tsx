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
		const data = new FormData();
		data.append('file', groupAvatar);
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
	  
		toast.promise(
			axios.patch(`http://localhost:3000/groupchat/${id}`, groupData, { withCredentials: true })
			.then(() => {
				axios.post(`http://localhost:3000/groupchat/${id}/uploadimage`, data, { withCredentials: true })
				.then(() => {})
			}),
			{
			loading: "Sending data...",
			success: "Success Settings!",
			error: "An error occurred",
			},
			{ duration: 5000, position: 'top-right' }
		);
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


	const [selectedMember , setSelectedMember] = useState("ID-XXXX");
	console.log("Admins Are =====> ", admins);
	console.log("Users Are =====> ", users);
	if (group) {
		useEffect(() => {
			axios.get(`http://localhost:3000/groupchat/${group.id}/users`, { withCredentials: true })
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.log("Error fetching users:", error);
			});
		}, [group]);
		
		useEffect(() => {
			axios.get(`http://localhost:3000/groupchat/${group.id}/admins`, { withCredentials: true })
			.then((response) => {
				setAdmins(response.data);
			})
			.catch((error) => {
				console.log("Error fetching admins:", error);
			});
		}, [group]);
	}
  
	
	const openMembersDialog = () => {
		const dialog = document.getElementById('dialog_members');
		dialog?.showModal();
	}

	return (
		<section>
		<button style={{margin: '10px', width: 'auto'}} type="button" className="nes-btn" onClick={openMembersDialog}>Manage Members</button>
		<dialog style={{height: "600px", width: "800px", background: "#e4f0ff"}} className="nes-dialog" id="dialog_members">
			<form method="dialog">
				{/* <button>X</button> */}
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
					// Listing Admins and Owner
					Object.keys(admins).map((idx) => {
						return (
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}} key={idx}>
							<div>
								<img src={admins[idx].profileImage} style={{ borderRadius: '30px', width: '50px', height: '50px', marginTop: '10px' }} alt="avatar" />
							</div>
							<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{admins[idx].username}</span>

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
						// Listing Members
						Object.keys(users).map((idx) => {
							return (
								<div onClick={() => {setSelectedMember(users[idx].id); setOptions(true)}} style={{ display: 'flex', alignItems: 'center' ,overflow: "auto" }} key={idx}>
									<img src={users[idx].profileImage} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
									<span style={{ marginLeft: '30px', marginRight: 'auto' }}>{users[idx].username}</span>
									{
										options ? 
										(
											<>
												<div className="nes-select" style={{ width: '140px', height: 'auto'}}>
													<select style={{ marginRight: '30px'}} required id="muteSelect">	
														<option disabled selected hidden>Mute</option>
														<option value="0">5min</option>
														<option value="1">15min</option>
													</select>
												</div>
												<button  className="nes-btn is-warning" style={{ margin: '10px', width: '100px'}}
													onClick={() => {
														axios.delete(`http://localhost:3000/groupchat/${group.id}/${selectedMember}/user`, { withCredentials: true })
														.then((reseponse) => {
															console.log("Response Deleting user -> ", reseponse);
														})
														.catch((err) => {
															console.log("Error -> ", err);
														})
													}}
													>Kick
												</button>
												<button className="nes-btn is-error" style={{ margin: '10px', width: '80px' }}
													onClick={() => {
														axios.patch(`http://localhost:3000/groupchat/${selectedMember}/userban`, { withCredentials: true })
														.then((reseponse) => {
															toast.success("Delete Success", {style: {textAlign: "center", width: '300px'}, position: "top-right"});
															console.log("Response Deleting user -> ", reseponse);
														})
														.catch((err) => {
															console.log("Error -> ", err);
														})
													}}
													>Ban
												</button>
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
	const [update , setUpdate] = useState("");
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
	// grouptype:
	// id:
	// idsuperadmin:
	// image:
	// namegb:
	// password:


	return (
	<div className="chatDmDiv" style={{border: "1px solid",overflow: 'auto', background: "#e5f0ff" ,borderRadius: "10px"}}>
		{
			amIAdmin ? 
			(
				<div className="groupSettings" style={{display: 'flex',flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>

					<div style={{display: 'flex', justifyContent: "space-around"}}>
						{
							groupsList.map((group : any, index : number) => {
								return (
									<a>
										<img onClick={() => {setSelecting(group); setFlag(true)}} src={`http://localhost:3000/groupchat/getimage/${group.id}`} title={group.namegb} style={{ borderRadius: '50%', width: '60px', height: '60px', margin: '10px' }} className="GroupAvataraa" alt="avatar" key={index} />
									</a>
								)})
						}
					</div>
					{
					flag ? (
					<>
						<div className="nes-field" style={{margin: '10px', width: 'auto'}} >
							<input  style={{background: '#E9E9ED'}} type="text" id="name_field" placeholder={selecting.namegb} onChange={(e) => setUpdate(e.target.value)} className="nes-input"/>
						</div>
						<div style={{ margin: '10px', width:'auto'}} className="nes-select">
							<select required id="default_select"  onChange={(e) => {setProtected(e.target.value == "2"); setUpdate(e.target.value)}}>
								<option value=""  disabled selected hidden>Change Privacy</option>
								<option value="0" title={privacy[0]}>Public</option>
								<option value="1" title={privacy[1]}>Private</option>
								<option value="2" title={privacy[2]}>Protected</option>
							</select>     
						</div>
							
        				{isProtected && (
							<div style={{margin: '10px', width: 'auto'}} className="nes-field">
        				    <input  style={{background: '#E9E9ED'}} type="password" id="password_field" placeholder="P@55w0rd" maxLength={18} className="nes-input" />
        				  </div>
        				)}
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
								})}}
							></img>Delete Group</a>
        				<button style={{marginBottom: '10px', width: 'auto'}} disabled={update ? false : true} className={`nes-btn  ${update ? "is-success" : "is-disabled"}`} onClick={() => UpdateGroup(selecting.id)}>Update</button>
						<Toaster/>
						</>
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
