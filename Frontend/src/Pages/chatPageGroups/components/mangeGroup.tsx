import {useState } from "react";
import avatar from '../../otoufah.jpg';
import crown from '../assets/crown.svg';

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
	
	const handleKick = (status: boolean, index: number) => {
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
		document.getElementById('dialog-default').showModal();
	} 
	return (
		<section>
		<button type="button" className="nes-btn" onClick={openDialog}>Manage Members</button>
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
										<button style={{ marginLeft: '10px' }} onClick={() => handleKick(true, index)}>Kick</button>									</div>
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
	const [groupName , setGroupName] = useState("");

	console.log("Groupe Name ", groupName);
	const isCreateDisabled = groupName === "";

	return (
	<div className="chatDmDiv">
		<div className="settingss">
		<div className="nes-field">
		<input type="text" id="name_field" placeholder='Group Name' onChange={(e) => setGroupName(e.target.value)} className="nes-input"/>
		</div>
		<div className="nes-select">
			<select required id="default_select" onChange={(e) => setProtected(e.target.value == "2")} >
				<option value="" disabled selected hidden>Change Privacy</option>
				<option value="0" title={privacy[0]}>Public</option>
				<option value="1" title={privacy[1]}>Private</option>
				<option value="2" title={privacy[2]}>Protected</option>
			</select>     
		</div>

        {isProtected && (
          <div style={{marginTop: '10px'}} className="nes-field">
            <input type="password" id="password_field" placeholder="Password" className="nes-input" />
          </div>
        )}
        <ListFriends/>
		<label className="nes-btn">
			<span>Change Avatar</span>
			<input type="file"/>
		</label>


        <a className={`nes-btn ${isCreateDisabled ? "is-disabled" : ""}`} href="#">
          Update
        </a>
		</div>
	</div>
	)
}

export default ManageGroup

