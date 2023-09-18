import React from 'react'

const chatSearch = () => {
  return (
    <div className="chatSearchDiv">
      <span>CHAT</span>
      <div className="searchForm">
        <input type='text' placeholder='Search'/>
      </div>
      <div className="userChat"></div>
    </div>
  )
}

export default chatSearch