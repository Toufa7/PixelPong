//This conponenet is responsible of displaying a message in a conversation
//on the left side, with it's properties like picture, timestamps etc...

import React from 'react';


const messageComponenet = (props: any) => {
    return (
        <div className="GrpmessageComponent">
            <div className="GrpmessageInfo">
                <img src={props.pic} alt="message-fromLeft" />
                <span>10:30 AM</span>
            </div>
            <div className="GrpmessageContent">
                <div className="nes-balloon from-left">
                    <p className='Grpmessage'>{props.content}</p>
                </div>
            </div>
        </div>
    )
}

export default messageComponenet