import './userProfilPage.scss'
/******************* Packages  *******************/
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { lazy, useEffect, useState } from "react";
import axios from "axios";
/******************* Includes  *******************/
import { useLocation } from 'react-router-dom';
const ErrorPage = lazy(() => import('../errorPage/errorPage'))
import Stars from '../addons/Stars';
import NavBar from '../addons/NavBar';

const States = (props : {winRate: number, wins: number, loses: number, streak: number}) => {
    return (
        <div className="headStatesBox">
            <div style={{textAlign: 'center', fontSize: 'x-large'}} className="statesBoxHeader">States</div>
            <div className="statesBoxContent">
                <div>
                    <span className="key">Win Rate</span>
                    <span className="value">{props.winRate}%</span>
                </div>
                <div>
                    <span className="key">Wins</span>
                    <span className="value">{props.wins}</span>
                </div>
                <div>
                    <span className="key">Win Streak Record</span>
                    <span className="value">{props.streak}</span>
                </div>
                <div>
                    <span className="key">Loses</span>
                    <span className="value">{props.loses}</span>
                </div>
            </div>
        </div>
    );
}


const Profil = () => {
    interface dataTypes {
        avatar : string,
        username: string,
        check: boolean,
        userId: string,
        status: string
    }
    const [userData, setUserData] = useState<dataTypes>({
        avatar : '',
        username: '',
        check: true,
        userId: '',
        status: ''
    });
    const location = useLocation();    
    useEffect(() => {
        async function fetchData() {
            const endpoint = `http://localhost:3000/users${location.pathname}`;
            const response = await axios.get(endpoint, {withCredentials: true});
                const avatarURL = `http://localhost:3000/auth/avatar/${response.data.id}`;
                try {
                    await axios.get(avatarURL, { withCredentials: true });
                    console.log("Respoen ===> ", response.data);
                    setUserData(() => ({
                        avatar: avatarURL,
                        username: response.data.username,
                        check: false,
                        userId : response.data.id,
                        status: response.data.status
                    }));
                }
                catch (avatarError) {
                    setUserData(() => ({
                        avatar: response.data.profileImage,
                        username: response.data.username,
                        check: false,
                        userId : response.data.id,
                        status: response.data.status
                    }));
                }
        }
        fetchData();
    }, []);

    console.log("User Data -> ", userData);
    const [isFriend, setIsFriend] = useState<boolean>(false);
    return (
        <div className="profilRectangle">
          <div className="avatar">
            <div className="left">
                <img src={`http://localhost:3000/auth/avatar/${userData.userId}`} style={{width: '100px', height: '100px', marginRight: '10px', marginLeft: '10px', borderRadius: '50px'}} className="playerAvatar"/>
                {
                    userData.status == "ONLINE" ? (<>
                        <div style={{borderRadius: '50%', width: '20px', height: '20px', margin: '10px', background: '#63C163'}}></div>
                    </>)
                    :
                    userData.status != "ONLINE" ? (<>
                        <div style={{borderRadius: '50%', width: '20px', height: '20px', margin: '10px' ,background: '#F2202B'}}></div>
                    </>) : (<></>)
                }            
            <div>
              <span className="playerName" style={{marginBottom: '10px'}}>{userData.username}</span>
              <div>
                <progress style={{width: '300px', height: '20px'}} className="nes-progress" value="30" max="100"/>
              </div>
              <span style={{textAlign: 'right'}}>32/100</span>
            </div>
            </div>
            <div>
              <div>
                    {isFriend ? (
                                <div>
                                    <a className="nes-btn" href="#" onClick={() => setIsFriend(false)}>Unfriend</a>
                                    <a className="nes-btn is-error" href="#" onClick={() => {
                                        axios.post("http://localhost:3000/users/blocked", {from: userData.userId}, { withCredentials: true })
                                        .then(() => {})
                                        .catch(() => {})
                                    }}>Block</a>
                                    </div>
                            ) : (
                        <a className="nes-btn" href="#" onClick={() => {setIsFriend(true)}}>Add Friend</a>)
                    }
              </div>
            </div>
          </div>
        </div>
      );
}


const GroupsAndFriends = () => {
    const info = useLocation();

    console.log("Info Of User -> ", info);
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
            console.log("Friend List -> ", response.data);
            setFriendData(response.data);
        })
    },[])

    const [label, setlabel] = useState<boolean>(true);
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
    const achivements: Map<string, string> = new Map();
    achivements.set("", "Win a match against different players");
    achivements.set("", "Unlock a feature in the game");
    achivements.set("", "Win 5 games with confidence and flair");
    achivements.set("", "Claim the top spot on the leaderboard");
    achivements.set("", "Never conceding a damage in a full match");
    achivements.set("", "Win a match without losing a single point");
    achivements.set("", "Score 10 consecutive points with powerful smashes");
    achivements.set("", "Mer7ba");
    achivements.set("", "Reach a ranking of top 10 players");
    achivements.set("", "Block 50 opponent shots with a perfect defensive block");
    achivements.set("", "Hit the ball with exceptional spin 50 times");
    achivements.set("", "Chat with a friend");
    achivements.set("", "Win a match without committing any fouls");
    achivements.set("", "Unlock all hidden paddle designs");
    achivements.set("", "Perform a tricky serve that your opponent fails to return");

    return (    
            <div className="fullAchivementsBox">
                <div style={{textAlign: 'center', fontSize: 'x-large'}} className="headAchivementsBox">Achivements</div>
                <div className="contentAchivementsBox">
                    <div className="icons">
                        <div>
                        {
                            Array.from(achivements).map(([icon, achivText], idx) => (
                            <div key={idx}>
                                <img src={icon}   />
                                <span>{achivText}</span>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            </div>
    );
}   


function OtherProfilPage() {
    const location = useLocation();   
    const [userExist, isUserExist] = useState<string>(""); 

    useEffect(() => {
	const searchInFriends = async () => {
		try {
			const response = await axios.get("http://localhost:3000/users/all", {withCredentials: true});
			const friends = response.data;
			const foundFriend = friends.find(friend => friend.username == location.pathname.replace("/profil/",""));
			if (foundFriend) {
                isUserExist("Found");
			}
			else {
                isUserExist("NotFound");
			}
		}
		catch (error) {
			console.log("Error searching in friends:", error);
		}
	};
        searchInFriends();
    }, [])

    console.log("Is User Exist -> ", userExist);
    if (userExist == "NotFound") {
        return (<ErrorPage title={"User Not Found"} errorType={'Oops! The user you\'re looking \nfor couldn\'t be found'} msg={"Feel free to explore other features of our website or consider signing up if you haven't already"} />)
    }
    else
        return (
            <div style={{height: '100h'}}>
                <Stars/>
			    <NavBar/>
                <div className="topContainer">
                    <Profil/>
                </div>
                <div className="downContainer">
                    <GroupsAndFriends/>
                    <States winRate={0.00} wins={0} loses={0} streak={0}/>
                </div>
                <div className="downContainer">
                    <Achivements/>
                </div>
            </div>
        )
}

export default OtherProfilPage