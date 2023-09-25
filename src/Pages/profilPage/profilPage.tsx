import React, { useState } from 'react'

/******************* Includes  *******************/
import './profilPage.scss'
import medaille from './assets/medaille.svg';
import savage from './assets/savage.svg';
import siif from './assets/siif.svg';
import axios from 'axios';

const States = () => {
    return (
        <div>
        <div className="StatesBox">
            <div className="headStatesBox">
                <div className="statesBoxHeader">States</div>
                <div className="statesBoxContent">
                    <div>
                        <span className="key">WIN RATE</span>
                        <span className="value">0</span>
                    </div>
                    <div>
                        <span className="key">WINS</span>
                        <span className="value">0</span>
                    </div>
                    <div>
                        <span className="key">WIN STREAK RECORD</span>
                        <span className="value">0</span>
                    </div>
                    <div>
                        <span className="key">LOSES</span>
                        <span className="value">0</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

const twoFAClicked = () => {
    const endpoint = "http://localhost";
axios
    axios.put(endpoint, {a : 1} ,{ withCredentials: true }) 
    .then ((response) => {
        console.log(response)
    }).catch((error) => 
    console.log(error));
}

const Settings = () => {
    const [isChecked, set2FAStatus] = useState(false);
    console.log(isChecked)
    return (
        <div className="SettingsBox">
            <div className="SettingsRectangle">
                <div style={{textAlign: 'center'}}  className="SettingsBoxHeader">Settings</div>
                <div className="SettingsBoxContent">
                <div className="twoFa" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label style={{ textAlign: 'left' }}>2FA</label>
                    <label style={{ textAlign: 'right' }}>
                        <input type="checkbox" className="nes-checkbox" onChange={() => set2FAStatus(!isChecked)}
                        />
                        <span>{isChecked ? 'Enabled' : 'Disabled'}</span>
                    </label>
                    </div>
                    <div>
                </div>

                        {/* <div className="nes-field">
                            <input type="text" name="nickname" className="nes-input" required placeholder='Choose Nickname'/>
                        </div>
                        <div className="uploadContainer">
                            <input formMethod="post" type="file" name="avatarUpload" accept=".png, .jpg, .jpeg" />
                        </div>
                        <div className="startContainer">
                            <a  className="nes-btn">Confirm</a>
                        </div> */}
                </div>
                </div>
            </div>
    );
}


const Profil = () => {
    return (
        <div className="profilBox">
            <div className="profilRectangle">
                <div className="avatar">
                    Omar Toufah
                </div>
            </div>
        </div>
    );
}


const Achivements = () => {
    return (
        <div className="achivementsBox">
            <div className="fullAchivementsBox">
                <div style={{textAlign: 'center'}} className="headAchivementsBox">Achivements</div>
                <div className="contentAchivementsBox">
                <div className="icons">
                </div>
                    <img className='ico' src={medaille} />
                    <img className='ico' src={savage} />
                    <img className='ico' src={siif} />
                    <img className='ico' src={savage} />
                    <img className='ico' src={medaille} />
                    <img className='ico' src={siif} />
                
                </div>

            </div>
        </div>
    );
}   
  

function ProfilPage() {
  return (
    <>
        <Profil/>
        <States/>
        <Achivements/>
        <Settings/>
    </>
  )
}

export default ProfilPage
