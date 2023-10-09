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
import groupt from './../otoufah.jpg'

const States = () => {
    return (
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
    );
}

const Profil = () => {

    const cookie = new Cookies();
    const token = jwt_decode(cookie.get('jwt'));

    const [userData, setUserData] = useState({
        avatar: '',
        username: token.username,
        check: true
    });
    
    useEffect(() => {
        async function fetchData() {
            const cookie = new Cookies();
            const token = jwt_decode(cookie.get('jwt'));
            let endpoints = [
                `http://localhost:3000/auth/avatar/${token.id}`,
                `http://localhost:3000/users/${token.id}`
            ]
            if (token) {

                await axios.all(endpoints.map((idx) =>
                axios.get(idx, {withCredentials: true})))
                .then(axios.spread((avatarRes, userRes) => 
                {
                    //console.log("AVATAR " ,avatarRes);
                    setUserData(() => ({
                        avatar: `http://localhost:3000/auth/avatar/${token.id}`,
                        username: userRes.data.username,
                        check: false
                    }))
                }))
            }
        }
        fetchData();
    }, [])

    const [isFriend, setIsFriend] = useState(false);
    return (
            <div className="profilRectangle">
                <div className="avatar">
                    <div className="left">
                        <img  src={userData.check ? token.image : userData.avatar} style={{width: '100px', height: '100px', marginRight: '10px', marginLeft: '10px', borderRadius: '50px'}} className="playerAvatar"/>
                    <div>
                        <span className="playerName" style={{marginBottom: '10px'}}>{userData.username}</span>
                    <div>
                        <progress style={{width: '300px', height: '20px'}} className="nes-progress" value="30" max="100"/>
                    </div>
                        <span style={{textAlign: 'right'}}>78/100</span>
                    </div>
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
        "Colon",
        "Cristina",
        "Saige"
      ];
      const [label, setlabel] = useState(true);
      const [Stausss, setAvataStatus] = useState({
          avatar: '',
          check: true
      });
      const cookie = new Cookies();
      const token = jwt_decode(cookie.get('jwt'));
      //console.log("Token ", token);
      useEffect(() => {
          async function checking() {
            await axios.get(`http://localhost:3000/auth/avatar/${token.id}`, {withCredentials: true})
            .then((response) => {
                //console.log("Res ", response)
                setAvataStatus(() => ({
                    avatar: `http://localhost:3000/auth/avatar/${token.id}`,
                    check: false
                  }));
            })
            .catch(erro => {
              //console.log(`Error ${erro}`);
            })
        }
        checking(); 
      }, []);
      return (
          <div className="gAndFBox">
            <div className="gAndFHeader">Groups & Friends</div>
            <div className="gAndFTabs">
              <button className='A' onClick={() => {
                    setlabel(true)
                    //console.log("Groups")
                }}>Groups</button>
              <button className='B' onClick={() => {
                setlabel(false)
                //console.log("Friends")
                }}>Friends</button>
            </div>
            <div className="gAndFContent">
                <div className="listParent">
                    {label ? (
                        friends.map((friend, index) => (
                        <>
                            <div className='list'>
                            <img  className="avatar" src={Stausss.check ? token.image : Stausss.avatar} alt="avatar" />
                            <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center',marginLeft: '10px'}}>
                                <span className='name' key={index}>{friend}</span>
                                <button style={{ marginLeft: '10px' }}>Exit</button>
                                </div>
                            </div>

                        </>
                  ))
                    ) : (
                        groups.map((group, index) => (
                            <>
                            <div className='list'>
                                <img  className="avatar" src={groupt} alt="avatar" />
                                <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center',marginLeft: '10px'}}>

                                <span className='name' key={index}>{group}</span>
								<button style={{ marginLeft: '10px' }}>Unifriend</button>
                                </div>
                            </div>
                            </>
                  ))
                )}
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
