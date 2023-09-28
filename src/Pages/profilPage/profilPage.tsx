import './profilPage.scss'

/******************* Packages  *******************/
/******************* Includes  *******************/
import medaille from './assets/medaille.svg';
import savage from './assets/savage.svg';
import siif from './assets/siif.svg';
import otoufah from '../otoufah.jpg'
import endpoint from './assets/endpoint.svg';
import key from './assets/key.svg';


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

const Profil = () => {
    return (
        <div className="profilBox">
            <div className="profilRectangle">
                <div className="avatar">
                    <div className="left">
                        <img src={otoufah} style={{width: '100px', height: '100px', marginRight: '10px', marginLeft: '10px', borderRadius: '50px'}} className="playerAvatar"/>
                    <div>
                    <div>
                        <span className="playerName" style={{marginBottom: '10px'}}>Omar Toufah</span>
                    </div>
                        <progress style={{width: '300px', height: '20px'}} className="nes-progress" value="35" max="100"/>
                        <span style={{textAlign: 'right'}}>78/100</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

const Achivements = () => {

    const awards = [
        "1st victory in a ping pong match",
        "Remarkable score against a bot",
        "Defeating a skilled opponent",
    ]

    return (
        <div className="achivementsBox">
            <div className="fullAchivementsBox">
                <div style={{textAlign: 'center', fontSize: 'x-large'}} className="headAchivementsBox">Achivements</div>
                <div className="contentAchivementsBox">
                    <div className="icons">
                        <div>
                            <img style={{width: '70px', height: '70px', marginTop: '5px',  marginRight: '20px', marginLeft: '5px'}} src={medaille} />
                                <span>{awards[0]}</span>
                        </div>
                        <div>
                            <img style={{width: '70px', height: '70px',  marginRight: '20px', marginLeft: '5px'}} src={savage} />
                                <span>{awards[1]}</span>
                        </div>
                        <div>
                            <img style={{width: '70px', height: '70px',  marginRight: '20px', marginLeft: '5px'}} src={siif} />
                                <span>{awards[2]}</span>
                        </div>
                        <div>
                            <img style={{width: '70px', height: '70px',  marginTop: '20px',  marginRight: '20px', marginLeft: '5px'}} src={endpoint} />
                                <span>{awards[2]}</span>
                        </div>
                        <div>
                            <img style={{width: '70px', transform: 'rotate(45deg)', height: '70px',  marginTop: '20px',  marginRight: '20px', marginLeft: '5px'}} src={key} />
                                <span>{awards[2]}</span>
                        </div>
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
    </>
  )
}

export default ProfilPage
