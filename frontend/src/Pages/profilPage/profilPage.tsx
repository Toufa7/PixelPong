import './profilPage.scss'

/******************* Packages  *******************/
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import axios from "axios";
/******************* Includes  *******************/
import medaille from './assets/medaille.svg';
import savage from './assets/savage.svg';
import siif from './assets/siif.svg';
import endpoint from './assets/endpoint.svg';
import key from './assets/key.svg';
import message from './assets/msgLogo.svg';
import groupe from './../otoufah.jpg'

const States = () => {
    return (
        <div>
        <div className="StatesBox">
            <div className="headStatesBox">
                <div style={{textAlign: 'center', fontSize: 'x-large'}} className="statesBoxHeader">States</div>
                <div className="statesBoxContent">
                    <div>
                        <span className="key">Win Rate</span>
                        <span className="value">X</span>
                    </div>
                    <div>
                        <span className="key">Wins</span>
                        <span className="value">X</span>
                    </div>
                    <div>
                        <span className="key">Win Streak Record</span>
                        <span className="value">X</span>
                    </div>
                    <div>
                        <span className="key">Loses</span>
                        <span className="value">X</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

const Profil = () => {

    const cookie = new Cookies();
    const token = jwt_decode(cookie.get('jwt'));
    const myAvatar = `http://localhost:3000/auth/avatar/${token.id}`;

    const [userData, setUserData] = useState({
        avatar: '',
        username: 'Unknown'
      });
      
      useEffect(() => {
        async function fetchData() {
          const cookie = new Cookies();
          const token = jwt_decode(cookie.get('jwt'));
          if (token) {
            const endpoint = `http://localhost:3000/users/${token.id}`;
            const response = await axios.get(endpoint, { withCredentials: true });
            console.log("Data -> ", response);
            setUserData(() => ({
              avatar: response.data.profileImage,
              username: response.data.username
            }));
          }
        }
        fetchData();
      }, []);
    const [isFriend, setIsFriend] = useState(false);
    return (
        <div className="profilBox">
            <div className="profilRectangle">
                <div className="avatar">
                    <div className="left">
                        <img src={myAvatar} style={{width: '100px', height: '100px', marginRight: '10px', marginLeft: '10px', borderRadius: '50px'}} className="playerAvatar"/>
                    <div>
                        <span className="playerName" style={{marginBottom: '10px'}}>{userData.username}</span>
                    <div>
                        <progress style={{width: '300px', height: '20px'}} className="nes-progress" value="35" max="100"/>
                    </div>
                        <span style={{textAlign: 'right'}}>78/100</span>
                    </div>
                </div>
            </div>
            <div className='buttonat'>
                <a>
                    {isFriend ? (
                        <>
                            <a  className="nes-btn" href="#" onClick={() => setIsFriend(false)}>Friends</a>
                            <a  href="/chat" className="nes-btn">Chat</a>
                        </>
                        ) : (
                        <a className="nes-btn" href="#" onClick={() => setIsFriend(true)}>Add Friend</a>
                    )}
                </a>
                </div>
            </div>
        </div>
    );
}

const GroupsAndFriends = () => {
      const friends = [
        "Helena Atkins",
        "Cristina Singleton",
        "Caleb Brady",
        "Edward Colon",
        "Saige Boyd",
        "Damarion Wilkerson",
        "Jaylah Nicholson",
        "Jamir Escobar",
        "Marissa Glass",
        "Jaylen Goodwin",
        "Akira Calderon"
      ];

      const groups = [
        "Atkins",
        "Wilkerson",
        "Brady",
        "Edward Colon",
        "Cristina",
        "Saige"
      ];


      const [label, setlabel] = useState(true);
      const cookie = new Cookies();
      const token = jwt_decode(cookie.get('jwt'));
      const myAvatar = `http://localhost:3000/auth/avatar/${token.id}`;
      return (
        <div className="groupsAndFriendsBox">
          <div className="gAndFBox">
            <div className="gAndFHeader">Groups & Friends</div>
            <div className="gAndFTabs">
              <button className='A' onChange={() => setlabel(true)} >Groups</button>
              <button className='B' onChange={() => setlabel(false)} >Friends</button>
            </div>
            <div className="gAndFContent">
                <div className="listParent">
                    <div className="list">
                        <>
                        {
                            label ? (
                            friends.map((idx) => {
                                <>
                                <img className="avatar" src={myAvatar}/>
                                <span className='name'>{idx}</span>
                                <img className='ico' src={message}/>
                                </>
                            })
                        ) : (
                            friends.map((idx) => {
                                <>
                                <img className="avatar" src={myAvatar}/>
                                <span className='name'>{idx}</span>
                                <img className='ico' src={message}/>
                                </>
                            }))
                            }
                        </>
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
                            <img src={medaille} />
                            <span>{awards[0]}</span>
                        </div>
                        <div>
                            <img src={savage} />
                            <span>{awards[1]}</span>
                        </div>
                        <div>
                            <img src={siif} />
                            <span>{awards[2]}</span>
                        </div>
                        <div>
                            <img src={endpoint} />
                            <span>{awards[2]}</span>
                        </div>
                        <div>
                            <img style={{transform: 'rotate(45deg)'}} src={key} />
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
        <div className="topContainer">
            <Profil/>
            <States/>
        </div>
        <div className="downContainer">
            <GroupsAndFriends/>
            <Achivements/>
        </div>
        </>
  )
}

export default ProfilPage
