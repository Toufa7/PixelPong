import './userProfilPage.scss'

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
    const [userData, setUserData] = useState({
        avatar: '',
        username: '',
        check: true,
        userId: ''
    });
    const path = window.location.pathname;
    useEffect(() => {
        async function fetchData() {
            const endpoint = `http://localhost:3000/users${path}`;
            // try {
                const response = await axios.get(endpoint, { withCredentials: true });
                console.log("User ID ", response.data.id);
                
                const avatarURL = `http://localhost:3000/auth/avatar/${response.data.id}`;
                console.log("Avatar URL  alocodee  ", avatarURL);
                // Check if the avatar URL exists and is accessible
                try {
                    await axios.get(avatarURL, { withCredentials: true });
                    setUserData(() => ({
                        avatar: avatarURL,
                        username: response.data.username,
                        check: false,
                        userId : response.data.id
                    }));
                } catch (avatarError) {
                    // Avatar URL failed, set another value
                    setUserData(() => ({
                        avatar: response.data.profileImage,
                        username: response.data.username,
                        check: false,
                        userId : response.data.id

                    }));
                }
             
        }
        fetchData();
    }, []);


    const [friendRequest, setFriendRequest] = useState();

    const [isFriend, setIsFriend] = useState(false);
    return (
            <div className="profilRectangle">
                <div className="avatar">
                    <div className="left">
                        <img  src={userData.avatar} style={{width: '100px', height: '100px', marginRight: '10px', marginLeft: '10px', borderRadius: '50px'}} className="playerAvatar"/>
                    <div>
                        <span className="playerName" style={{marginBottom: '10px'}}>{userData.username}</span>
                    <div>
                        <progress style={{width: '300px', height: '20px'}} className="nes-progress" value="30" max="100"/>
                    </div>
                        <span style={{textAlign: 'right'}}>78/100</span>
                    </div>
                </div>
            </div>
            <div className='buttonat'>
                <a>
                    {isFriend ? (
                        <>
                            <a  className="nes-btn" href="#" onClick={() => setIsFriend(false)}>Unfriend</a>
                            <a  href="/chat" className="nes-btn">Chat</a>
                        </>
                        ) : (
                            <a className="nes-btn" href="#" onClick={() => 
                                {
                                    setIsFriend(true)
                                    axios.post("http://localhost:3000/relation/sendFriendRequest",userData.userId, { withCredentials: true })
                                    .then((res) => {
                                        console.log("This Dat -> ", res);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })
                                }
                            }>Add Friend</a>
                            )}
                </a>
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
      const [userData, setAvataStatus] = useState({
          avatar: '',
          check: true
      });
      const cookie = new Cookies();
      const token = jwt_decode(cookie.get('jwt'));
      console.log("Token ", token);
      useEffect(() => {
          async function checking() {
            await axios.get(`http://localhost:3000/auth/avatar/${token.id}`, {withCredentials: true})
            .then((response) => {
                console.log("Res ", response)
                setAvataStatus(() => ({
                    avatar: `http://localhost:3000/auth/avatar/${token.id}`,
                    check: false
                  }));
            })
            .catch(erro => {
              console.log(`Error ${erro}`);
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
                    console.log("Groups")
                }}>Groups</button>
              <button className='B' onClick={() => {
                setlabel(false)
                console.log("Friends")
                }}>Friends</button>
            </div>
            <div className="gAndFContent">
                <div className="listParent">
                    {label ? (
                        friends.map((friend, index) => (
                        <>
                            <div className='list' key={index}>
                                <img className="avatar" src={userData.check ? token.image : userData.avatar}/>
                                <span className='name'>{friend}</span>
                                <img className='ico' src={message}/>
                            </div>

                        </>
                  ))
                    ) : (
                        groups.map((group, index) => (
                            <>
                            <div className='list' key={index}>
                                <img className="avatar" src={groupt}/>
                                <span className='name' >{group}</span>
                                <img className='ico' src={message}/>
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


function OtherProfilPage() {
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

export default OtherProfilPage
