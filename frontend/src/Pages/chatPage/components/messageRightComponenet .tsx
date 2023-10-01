import mamella from '../assets/images/mamellal.jpg'

const messageRightComponenet = (props: any) => {
  return (
    <div className="messageRightComponent">
        <div className="messageRightInfo">
            <img src={mamella} alt="message-fromRight" />
            <span>10:30 AM</span>
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