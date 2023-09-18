import React from 'react'
import mamella from '../../assets/images/mamellal.jpg'
import otoufah from '../../assets/images/otoufah.jpg'
import mnaqqad from '../../assets/images/mnaqqad.jpg'
import abensgui from '../../assets/images/abensgui.jpg'
import ibnada from '../../assets/images/ibnada.jpg'
import uknownUser from '../../assets/images/nonprofile.png'


const dms = () => {
  return (
    <div className="chatDmDiv">
      <i>CHATS</i>
      <div className="userDms">
        
        <div className="userChat">

            <img src={mamella} alt="user-photo" />
          <div className="userChatinfo">
            <span>Mohamed Amellal</span>
          </div>
        </div>

        <div className="userChat">
            <img src={otoufah} alt="user-photo" />
          <div className="userChatinfo">
            <span>Omar Touafah</span>
          </div>
        </div>

        <div className="userChat">
            <img src={mnaqqad} alt="user-photo" />
          <div className="userChatinfo">
            <span>Mohamed Khalil Naqqad</span>
          </div>
        </div>

        <div className="userChat">
            <img src={abensgui} alt="user-photo" />
          <div className="userChatinfo">
            <span>Ayoub Bensguia</span>
          </div>
        </div>

        <div className="userChat">
            <img src={ibnada} alt="user-photo" />
          <div className="userChatinfo">
            <span>Ibrahim Nada</span>
          </div>
        </div>

        <div className="userChat">
            <img src={uknownUser} alt="user-photo" />
          <div className="userChatinfo">
            <span>User</span>
          </div>
        </div>

        <div className="userChat">
            <img src={uknownUser} alt="user-photo" />
          <div className="userChatinfo">
            <span>User</span>
          </div>
        </div>

        <div className="userChat">
            <img src={uknownUser} alt="user-photo" />
          <div className="userChatinfo">
            <span>User</span>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default dms