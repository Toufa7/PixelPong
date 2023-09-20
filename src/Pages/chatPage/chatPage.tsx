import React from 'react'
import './chatPage.scss'
import MainNavBar from './components/mainNavBar'
import ChatNavBar from './components/chatNavBar'
import Messages from './components/messages'

const chatPage = () => {
  return (
    <div className="chatPage">
      <MainNavBar/>
      <ChatNavBar/>
      <Messages/>
    </div>
  )
}

export default chatPage