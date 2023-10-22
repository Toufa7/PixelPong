import Messages from '../components/messages'
//This component is used to display the conversation
//of a user in a conversation

const dmChatUser = ({userName ,pic ,userId , id}: any) => {
    //userName: Name of the user
    //pic: it's picture
    //id: it's id in the database
    //userId: callback function to return the id to the parent componenet
    
    const handleOnClick = () => {
        userId(id);
    };

    return (
        <div className="userChat" onClick={handleOnClick}>
            <img src={`http://localhost:3000/auth/avatar/${id}`} alt="user-photo" />
            <div className="userChatinfo">
                <span>{userName}</span>
            </div>
        </div>
    )
};

export default dmChatUser