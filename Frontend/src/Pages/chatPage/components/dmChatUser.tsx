//This component is used to display the conversation
//of a user in a conversation

const dmChatUser = (props:any) => {
  return (
    <>
        <div className="userChat">
          <img src={props.pic} alt="user-photo" />
          <div className="userChatinfo">
            <span>{props.userName}</span>
          </div>
        </div>
    </>
  )
}

export default dmChatUser