import React from 'react';
import Messages from './Grpmessages'

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
        <div className="GrpuserChat" onClick={handleOnClick}>
            <img src={pic} alt="user-photo" />
            <div className="GrpuserChatinfo">
                <span>{userName}</span>
            </div>
        </div>
    )
};

export default dmChatUser