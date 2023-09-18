import React from 'react'
import Send from '../../../assets/images/send.svg'

const messageInput = () => {
  return (
    <div className="messageInput">
        <input className='messageInputBox' placeholder='Type your message here ...' ></input>
        <button className='sendButton'><img src={Send}></img></button>
    </div>
  )
}

export default messageInput