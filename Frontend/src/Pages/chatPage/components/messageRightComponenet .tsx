//This conponenet is responsible of displaying a message in a conversation
//on the left side, with it's properties like picture, timestamps etc...

const messageRightComponenet = (props: any) => {
  return (
    <div className="messageRightComponent">
        <div className="messageRightInfo">
            <img src={props.pic} alt="message-fromRight" />
            <span>10:30</span>
        </div>
        <div className="messageRightContent">
            <div className="nes-balloon from-right">
                <p className='message'>{props.content}</p>
            </div>
        </div>
    </div>
  )
}

export default messageRightComponenet