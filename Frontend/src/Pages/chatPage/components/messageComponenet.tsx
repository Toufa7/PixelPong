import omar from '../assets/images/otoufah.jpg'

const messageComponenet = (props: any) => {
  return (
    <div className="messageComponent">
        <div className="messageInfo">
            <img src={omar} alt="message-fromLeft" />
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