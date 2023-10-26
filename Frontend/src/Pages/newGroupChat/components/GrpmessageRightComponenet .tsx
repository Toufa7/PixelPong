import React from 'react';

const messageRightComponenet = (props: any) => {
  return (
    
    <div className="GrpmessageRightComponent">
        <div className="GrpmessageRightInfo">
            <img src={props.pic} alt="message-fromRight" />
            <span>{props.time}</span>
        </div>
        <div className="GrpmessageRightContent">
            <div className="nes-balloon from-right">
                <p className='Grpmessage'>{props.content}</p>
            </div>
        </div>
    </div>
  )
}

export default messageRightComponenet