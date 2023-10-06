import Messages from '../components/messages'
//This component is used to display the conversation
//of a user in a conversation

const dmChatUser = ({userName, pic, userId}: any) => {
    
    const handleOnClick = () => {
        userId(userName);
    };
  
    return (
      <div className="userChat" onClick={handleOnClick}>
        <img src={pic} alt="user-photo" />
        <div className="userChatinfo">
          <span>{userName}</span>
        </div>
      </div>
    );
  };

export default dmChatUser