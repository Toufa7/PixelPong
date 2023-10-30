import React from 'react';
import publicGroup from '../assets/public.svg'
import privateGroup from '../assets/private.svg'
import protectedGroup from '../assets/protected.svg'

//This component is used to display the conversation
//of a user in a conversation

const dmChatUser = ({userName, pic, userId, id, privacy}: any) => {
    // userName: Name of the user
    // pic: it's picture
    // id: it's id in the database
    // userId: callback function to return the id to the parent componenet
    // privacy: group privacy
    
    const handleOnClick = () => {
        userId(id);
    };

    return (
        <div className="GrpuserChat" style={{justifyContent: 'space-between',}} onClick={handleOnClick}>
            <div className="GrpuserChatinfo">
                <img src={pic} alt="user-photo" style={{marginRight: '20px'}} />
                <span>{userName}</span>
            </div>
            <div>
				{   
                    privacy == "PUBLIC" ? (<img src={publicGroup} style={{borderRadius: '0px', height: '30px', width: '30px', marginLeft: '10px' }} alt="Public Group" />)
                    : privacy == "PRIVATE" ? (<img src={privateGroup} style={{borderRadius: '0px', height: '30px', width: '30px', marginLeft: '10px' }} alt="Private Group" />)
                    : (<img src={protectedGroup} style={{borderRadius: '0px', height: '30px', width: '30px', marginLeft: '10px' }} alt="Protected Group" />)
                }
            </div>
        </div>
    )
};

export default dmChatUser