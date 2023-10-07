import exit from '../assets/logoutGroup.svg';

interface groupInfo {
	name : string,
	avatar : string
}

const GroupHeaderInfo = (props: groupInfo) => {
  return (
	<div className="chatUserDivGroup">
		<div className="groupPicProfile">
			<div className="chatGroup">
			<img src={props.avatar} alt="user-photo" />
			<div className="chatGroupName"><span>{props.name}</span></div>
			</div>
			<div className='chatGroupControls'>
			<button className='groupControlButtons'>
				<img src={exit} width={50} height={50}></img>
			</button>
			</div>
		</div>
	</div>
  );
}

export default GroupHeaderInfo