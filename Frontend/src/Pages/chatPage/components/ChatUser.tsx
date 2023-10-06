import MessageInput from './messageInput'
import omar from '../assets/images/ibnada.jpg'
import play from '../assets/images/playgame.svg'
import mute from '../assets/images/notification-off.svg'
import block from '../assets/images/block.svg'

const MessagingBody = (props: any) => {
	return (
	<div className="MessagingBodyDiv">
		<MessageInput/>
	</div>
	)
}

const ChatUser = (props:any) => {

  return (
    <div className='usrProfileConversation'>
      <div className="chatUserDiv">
          <div className="playerPicProfile">
            <div className="chatUser">
              <img src={omar} alt="user-photo" />
              <div className="chatUserName"><span>{props.pcurrentUserId}</span></div>
            </div>
            <div className='chatUserControls'>
                <button className='userControlButtons'><img src={play} width={50} height={50}></img></button>
                <button className='userControlButtons'><img src={mute} width={50} height={50}></img></button>
                <button className='userControlButtons'><img src={block} width={50} height={50}></img></button>
            </div>
          </div>
      </div>
      <MessagingBody/>
    </div>
  );
}

export default ChatUser