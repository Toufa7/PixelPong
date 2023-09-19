import React from 'react'

/******************* Includes  *******************/
import './profilPage.scss'
import medaille from './assets/medaille.svg';
import savage from './assets/savage.svg';
import siif from './assets/siif.svg';

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
                <div className="headAchivementsBox">Achivements</div>
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
    </>
  )
}

export default ProfilPage