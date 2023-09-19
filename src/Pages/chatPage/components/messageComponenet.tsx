import React from 'react'
import omar from '../assets/images/otoufah.jpg'
import mamella from '../assets/images/mamella.jpg'

const messageComponenet = () => {
  return (
    <div className="messageComponent">
        <div className="messageInfo">
            <img src={omar} alt="message-fromLeft" />
            <span>10:30 AM</span>
        </div>
        <div className="messageContent">
            <div className="nes-balloon from-left">
                <p>Hello NES.css</p>
            </div>
        </div>
    </div>

    
  )
}

export default messageComponenet