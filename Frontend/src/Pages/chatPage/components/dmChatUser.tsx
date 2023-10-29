//This component is used to display the conversation
//of a user in a conversation

// const dmChatUser = ({userName ,pic ,userId , id}: any) => {
const dmChatUser = (props: any) => {

    const handleOnClick = () => {
        props.userId(props.id);
    };

    return (
        <div className="userChat" onClick={handleOnClick}>
            <img src={props.pic} alt="user-photo" />
            <div className="userChatinfo">
                <span>{props.userName}</span>
            </div>
        </div>
    )
};

export default dmChatUser