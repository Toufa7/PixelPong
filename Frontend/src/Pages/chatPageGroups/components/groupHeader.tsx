import exit from '../assets/logoutGroup.svg';

interface groupInfo {
	name : string,
	avatar : string
}

const GroupHeaderInfo = (props: groupInfo) => {
  return (
	<div className="chatUserDiv">
		<div className="playerPicProfile">
			<div className="chatUser">
			<img src={props.avatar} alt="user-photo" />
			<div className="chatUserName"><span>{props.name}</span></div>
			</div>
			<div className='chatUserControls'>
			<button className='userControlButtons'>
				<img src={exit} width={50} height={50}></img>
			</button>
			</div>
		</div>
	</div>
  );
}

export default GroupHeaderInfo