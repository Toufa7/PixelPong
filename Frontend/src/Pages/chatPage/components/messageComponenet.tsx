//This conponenet is responsible of displaying a message in a conversation
//on the left side, with it's properties like picture, timestamps etc...

const messageComponenet = (props: any) => {
    return (
        <div className="messageComponent">
            <div className="messageInfo">
                <img src={props.pic} alt="message-fromLeft" />
                <span>10:30 AM</span>
            </div>
            <div className="messageContent">
                <div className="nes-balloon from-left">
                    <p className='message'>{props.content}</p>
                </div>
            </div>
        </div>
    )
}

export default messageComponenet