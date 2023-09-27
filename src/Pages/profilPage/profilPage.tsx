import { useState } from 'react'

/******************* Includes  *******************/
import './profilPage.scss'
import medaille from './assets/medaille.svg';
import savage from './assets/savage.svg';
import siif from './assets/siif.svg';
import axios from 'axios';
import otoufah from '../otoufah.jpg'
const States = () => {
    return (
        <div>
        <div className="StatesBox">
            <div className="headStatesBox">
                <div style={{textAlign: 'center', fontSize: 'x-large'}} className="statesBoxHeader">States</div>
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


const Settings = () => {
    const [isChecked, set2FAStatus] = useState(false);
    const enablingEndpoint  = "http://localhost:3000/auth/2fa/enable";
    const disablingEndpoint = "http://localhost:3000/auth/2fa/disable";
    if (isChecked)
    {
        axios.put(enablingEndpoint, {twoFaStatus : 0} ,{ withCredentials: true }) 
        .then ((response) => {
            console.log(response)
            console.log("Status " , response.data.status)
        }).catch((error) => 
        console.log(error));
        console.log("Enable");
        console.log("Enable");
    }
    else
    {
        axios.put(disablingEndpoint, {twoFaStatus : 1} ,{ withCredentials: true }) 
        .then ((response) => {
            console.log(response)
            console.log("Status " , response.data.status)

        }).catch((error) => 
        console.log(error));
        console.log("Disable");
    }
    return (
        <div className="SettingsBox">
            <div className="SettingsRectangle">
                <div style={{textAlign: 'center', fontSize: 'x-large'}}  className="SettingsBoxHeader">Settings</div>
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
                    <div className="left">
                        <img src={otoufah} style={{width: '100px', height: '100px', marginRight: '10px', marginLeft: '10px', borderRadius: '50px'}} className="player1"/>
                        <span>Omar Toufah</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


const Achivements = () => {
    // let awards = new Map<string, string>(
    //     [, ]);

    return (
        <div className="achivementsBox">
            <div className="fullAchivementsBox">
                <div style={{textAlign: 'center', fontSize: 'x-large'}} className="headAchivementsBox">Achivements</div>
                <div className="contentAchivementsBox">
                <div className="icons">
                    <div>
                    <img className='icao' style={{width: '70px', height: '70px', marginTop: '5px',  marginRight: '20px', marginLeft: '5px'}} src={medaille} />
                        <span>1st victory in a ping pong match</span>
                    </div>
                    <div>
                        <img className='icao' style={{width: '70px', height: '70px',  marginRight: '20px', marginLeft: '5px'}} src={savage} />
                            <span>Remarkable score against a bot</span>
                        </div>
                    </div>
                    <div>
                        <img className='icao' style={{width: '70px', height: '70px',  marginRight: '20px', marginLeft: '5px'}} src={siif} />
                            <span>Awarded for defeating a highly skilled opponent in a challenging ping pong match.</span>
                        </div>
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
