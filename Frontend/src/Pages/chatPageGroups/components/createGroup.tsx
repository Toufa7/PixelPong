import { useState } from "react"

const CreateGroup = () => {
	const privacy = [
		"Group Chat Visibility: Limited to Members",
		"Exclusive Access: Only Members Allowed",
		"Enhanced Security: Password-Protected Group"
	]

	const [isProtected , setProtected] = useState(false);
	const [groupName , setGroupName] = useState("");

	// console.log(groupName);
	
	const isCreateDisabled = groupName === "";


	return (
	<div className="chatDmDiv">
		<div className="settingss">
		<div className="nes-field">
		<input type="text" id="name_field" placeholder='Group Name' onChange={(e) => setGroupName(e.target.value)} className="nes-input"/>
		</div>
		<label>Select Privacy</label>
		<div className="nes-select">
			<select required id="default_select" onChange={(e) => setProtected(e.target.value == "2")} >
				<option value="" disabled selected hidden>Choose Privacy</option>
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

		<label>Group Avatar</label>
		<label className="nes-btn">
			<span>click to upload</span>
			<input type="file"/>
		</label>


        <a className={`nes-btn ${isCreateDisabled ? "is-disabled" : ""}`} href="#">
          Create
        </a>
		</div>
	</div>
	)
}

export default CreateGroup
