import React from 'react'
import search from '../assets/search.svg';
import './chatSearch.scss';

const chatSearch = () => {
  return (
    <div className="chatSearchDiv">
      <span>CHAT</span>
      <div className="searchForm">
        {/* <input type='text' placeholder='Search' className='searchBar'/> */}
      </div>
      <div className="userChat"></div>
    </div>
  )
}
export default chatSearch