import arsenal from '../assets/saka.jpeg'
import exit from '../assets/logoutGroup.svg';

const ChatUser = () => {
  return (
    <div className="chatUserDiv">
      {/* <span>Player Profile</span> */}
        <div className="playerPicProfile">
          <div className="chatUser">
            <img src={arsenal} alt="user-photo" />
            <div className="chatUserName"><span>Arsenal Supporters</span></div>
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

export default ChatUser