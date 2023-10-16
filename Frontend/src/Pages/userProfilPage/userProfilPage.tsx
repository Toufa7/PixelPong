import './userProfilPage.scss'

/******************* Packages  *******************/
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import axios from "axios";
/******************* Includes  *******************/
import { useLocation } from 'react-router-dom';


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
    // const path = window.location.pathname;
    const location = useLocation();
    useEffect(() => {
        async function fetchData() {
            const endpoint = `http://localhost:3000/users${location.pathname}`;
                const response = await axios.get(endpoint, { withCredentials: true });
                const avatarURL = `http://localhost:3000/auth/avatar/${response.data.id}`;
                try {
                    await axios.get(avatarURL, { withCredentials: true });
                    setUserData(() => ({
                        avatar: avatarURL,
                        username: response.data.username,
                        check: false,
                        userId : response.data.id
                    }));
                } catch (avatarError) {
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
                        <span style={{textAlign: 'right'}}>XX/XXX</span>
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
                                    axios.post("http://localhost:3000/users/sendFriendRequest",userData, { withCredentials: true })
                                    .then(() => {})
                                    .catch(() => {})
                                }
                            }>Add Friend</a>)
                        }
                </a>
                </div>
            </div>
    );
}

const GroupsAndFriends = () => {

    const info = useLocation();
    const [thisId, setId] = useState();
    const endpoint = `http://localhost:3000/users${info.pathname}`;
    axios.get(endpoint, {withCredentials: true})
    .then((res) => {
        setId(res.data.id);
    })
    const [friendData, setFriendData] = useState<string[]>([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/users/friends/${thisId}`, {withCredentials: true})
        .then((response) => {
            console.log("Friend List -> ",  response.data);
            setFriendData(response.data);
            console.log(" => " , response.data);
        })
    },[])

    const [label, setlabel] = useState(true);
    const [userData, setAvataStatus] = useState({
        avatar: '',
        check: true
    });
    const cookie = new Cookies();
    const token = jwt_decode(cookie.get('jwt'));
    useEffect(() => {
        async function checking() {
        await axios.get(`http://localhost:3000/auth/avatar/${token.id}`, {withCredentials: true})
        .then(() => {
            setAvataStatus(() => ({
                avatar: `http://localhost:3000/auth/avatar/${token.id}`,
                check: false
                }));
        })
        .catch(() => {})
    }
    checking(); 
    }, []);

      return (
          <div className="gAndFBox">
            <div className="gAndFHeader">Groups & Friends</div>
            <div className="gAndFTabs">
              <button className='A' onClick={() => {setlabel(true)}}>Groups</button>
              <button className='B' onClick={() => {setlabel(false)}}>Friends</button>
            </div>
            <div className="gAndFContent">
                <div className="listParent">
                {label ? (
                        (
                        <>
                        </>
                    )
                    ) : (
                        // Friends
                        Object.keys(friendData).map((idx) => (
                            <>
                                <div className='list'>
                                <img  className="avatar" src={friendData[idx].profileImage} alt="avatar" />
                                <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center',marginLeft: '10px'}}>
                                    <span className='name' key={idx}>{friendData[idx].username}</span>
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

    return (    
            <div className="fullAchivementsBox">
                <div style={{textAlign: 'center', fontSize: 'x-large'}} className="headAchivementsBox">Achivements</div>
                <div className="contentAchivementsBox">
                    <div className="icons">
                        <div>
                            <img src="image" />
                            <span>text</span>
                        </div>
                    </div>
                </div>
            </div>
    );
}   


function OtherProfilPage() {
  return (
    <div style={{height: '100vh'}}>
        <div className="topContainer">
            <Profil/>
            <States/>
        </div>
        <div className="downContainer">
            <GroupsAndFriends/>
            <Achivements/>
        </div>
    </div>
  )
}

export default OtherProfilPage