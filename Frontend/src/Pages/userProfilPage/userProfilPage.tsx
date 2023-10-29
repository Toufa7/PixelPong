import './userProfilPage.scss'
/******************* Packages  *******************/
import { lazy, useEffect, useState } from "react";
import axios from "axios";
/******************* Includes  *******************/
import { useLocation, useParams } from 'react-router-dom';
const ErrorPage = lazy(() => import('../errorPage/errorPage'))
import Stars from '../addons/Stars';
import NavBar from '../addons/NavBar';
import medal from './assets/medaille.svg';
import key from './assets/key.svg';
import bomb from './assets/bomblogo.svg';
import joystick from './assets/joystic.svg';
import handshake from './assets/handshake.png';

const States = (props : {winRate: number, wins: number, loses: number, matchplayed: number}) => {
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
                    <span className="key">Total Matches</span>
                    <span className="value">{props.matchplayed}</span>
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
        status: string,
        inGame: string,
    }
    const [userData, setUserData] = useState<dataTypes>({
        avatar : '',
        username: '',
        check: true,
        userId: '',
        status: '',
        inGame: '',
    });
    const location = useLocation();    
    useEffect(() => {
        async function fetchData() {
            const endpoint = `http://localhost:3000/users${location.pathname}`;
            const response = await axios.get(endpoint, {withCredentials: true});
                const avatarURL = `http://localhost:3000/auth/avatar/${response.data.id}`;
                try {
                    await axios.get(avatarURL, { withCredentials: true });
                    setUserData(() => ({
                        avatar: avatarURL,
                        username: response.data.username,
                        check: false,
                        userId : response.data.id,
                        status: response.data.status,
                        inGame: response.data.ingame,
                    }));
                }
                catch (avatarError) {
                    setUserData(() => ({
                        avatar: response.data.profileImage,
                        username: response.data.username,
                        check: false,
                        userId : response.data.id,
                        status: response.data.status,
                        inGame: response.data.ingame,
                    }));
                }
        }
        fetchData();
    }, [location]);

    const [isFriend, setIsFriend] = useState<boolean>(false);
    useEffect(() => {
        axios.post("http://localhost:3000/users/checkfriend", {to: userData.userId}, { withCredentials: true })
        .then((response) => {
            setIsFriend(response.data)
        })
        .catch(() => {})
    }, [userData])


    const [isBlocked, setisBlocked] = useState<boolean>(false);
    useEffect(() => {
        axios.post("http://localhost:3000/users/checkblock", {to: userData.userId}, { withCredentials: true })
        .then((response) => {
            setisBlocked(response.data)
        })
        .catch(() => {})
    }, [userData])

    const [pending, setPending] = useState<boolean>(true);
    const [states, setStates] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:3000/users/stats/${userData.userId}` , {withCredentials: true})
		.then((response) => {
            setStates(response.data);
		})
		.catch((error) => {
            console.log("Error stats -> ", error);
		})
    },[userData])
    
    const BlockUser = () => {
        axios.patch("http://localhost:3000/users/blocked", {to: userData.userId}, { withCredentials: true })
        .then(() => {})
        .catch(() => {})
    }
    const UnBlockUser = () => {
        // useEffect(() => {
            axios.patch(`http://localhost:3000/users/unblocked/`, {to: userData.userId}, {withCredentials: true})
            .then(() => {
            })
            .catch((error) => {
                console.log("Error While Removing Friends -> ",error );
            })
        // }, [userData])
    }
    const AddFriend = () => {
        setPending(false);
        axios.post("http://localhost:3000/users/sendFriendRequest", {to: userData.userId}, { withCredentials: true })
        .then(() => {})
        .catch(() => {})
    }
    const UnfriendUser = () => {
        setIsFriend(false);
        axios.patch(`http://localhost:3000/users/remove/`, {to: userData.userId}, {withCredentials: true})
        .then(() => {
        })
        .catch((error) => {
            console.log("Error While Removing Friends -> ",error );
        })
    }
    return (
        <div className="profilRectangle">
          <div className="avatar">
            <div className="left">
                <img src={`http://localhost:3000/auth/avatar/${userData.userId}`} style={{width: '100px', height: '100px', marginRight: '10px', marginLeft: '10px', borderRadius: '50px'}} className="playerAvatar"/>
                {
                    userData.status == "ONLINE" ?
                    (
                        <>
                        {
                            userData.inGame ? 
                            (<div title='In Game' style={{borderRadius: '50%', width: '20px', height: '20px', margin: '10px', background: '#63C163'}}/>)
                            :
                            (<div title='Not In Game' style={{borderRadius: '50%', width: '20px', height: '20px', margin: '10px', background: '#63C163'}}/>)
                        }
                        </>
                    )
                    :
                    userData.status != "ONLINE" ?
                    (<><div style={{borderRadius: '50%', width: '20px', height: '20px', margin: '10px' ,background: '#F2202B'}}></div></>)
                        :
                    (<></>)
                }            
            <div>
              <span className="playerName" style={{marginBottom: '10px'}}>{userData.username}</span>
              <div>
                <progress style={{width: '300px', height: '20px'}} className="nes-progress" value="30" max="100"/>
              </div>
              <span style={{textAlign: 'right'}}>{states.level}/100</span>
            </div>
            </div>
            <div>
              <div>
                    {
                        isFriend ?
                        (
                            <div>
                                <a className="nes-btn" href="#" onClick={() => UnfriendUser()}>Unfriend</a>
                                <a className="nes-btn is-error" href="#" onClick={() => BlockUser()}>Block</a>
                            </div>
                        )
                        :
                        (
                            isBlocked ?
                                (<a className="nes-btn is-error" href="#" onClick={() => UnBlockUser()}>Unblock</a>)
                                :
                                (
                                    pending ?
                                    (
                                        <>
                                            <a className="nes-btn" href="#" onClick={() => AddFriend()}>Add Friend</a>
                                            <a className="nes-btn is-error" href="#" onClick={() => BlockUser()}>Block</a>
                                        </>
                                    ) 
                                    :
                                    (
                                        <a className="nes-btn" href="#">Pending</a>
                                    )

                                )
                        )

                    }
              </div>
            </div>
          </div>
        </div>
      );
}


const GroupsAndFriends = () => {
    const [friendData, setFriendData] = useState<string[]>([]);
    const [groupData, setGroupsData] = useState<string[]>([]);
    const [label, setlabel] = useState<boolean>(true);
    
    const [thisId, setId] = useState();
    const info = useLocation();
    axios.get(`http://localhost:3000/users${info.pathname}`, {withCredentials: true})
    .then((res) => {
        setId(res.data.id);
    })

    useEffect(() => {
        axios.get(`http://localhost:3000/users/friends/${thisId}`, {withCredentials: true})
        .then((response) => {
            setFriendData(response.data);
        })
    },[thisId])

    useEffect(() => {
        axios.get(`http://localhost:3000/groupchat/${thisId}/allgpuser`, {withCredentials: true})
        .then((response) => {
            setGroupsData(response.data);
        })
    },[thisId])



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
                    groupData.map((group : string) => (
                        <div className='list' key={group.id}>
                            <img className="avatar" src={`http://localhost:3000/groupchat/getimage/${group.id}`} alt="avatar" />
                            <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px'}}>
                                <span className='name'>{group.namegb}</span>
                            </div>
                        </div>
                    ))
                    ) : (
                        friendData.map((friend : string) => (
                            <div className='list' key={friend.id}>
                                <img className="avatar" src={`http://localhost:3000/auth/avatar/${friend.id}`} alt="avatar" />
                                <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px'}}>
                                    <span className='name'>{friend.username}</span>
                                </div>
                            </div>
                        )
                    )
                )}
                </div>
            </div>
            </div>

    );
}

const Achivements = () => {
    const [thisId, setId] = useState();
    const info = useLocation();
    useEffect(() => {
      axios.get(`http://localhost:3000/users${info.pathname}`, { withCredentials: true })
        .then((res) => {setId(res.data.id);})
        .catch(() => {});
    }, [info.pathname]);

    const [achivements, setAchievements] = useState([]);
    useEffect(() => {
      const getAchievement = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/achievements/${thisId}`, { withCredentials: true });
            setAchievements(response.data.achievementType);
        }
        catch (error) {
            console.error("Error fetching achievements:", error);
        }
      };
      
      if (thisId) {
        getAchievement();
      }
    }, [thisId]);

    return (    
        <div className="fullAchivementsBox">
            <div style={{textAlign: 'center', fontSize: 'x-large'}} className="headAchivementsBox">Achivements</div>
            <div className="contentAchivementsBox">
                <div className="icons">
                    <div>
                    {
                        achivements.includes("WELCOME") ? (
                            <div>
                                <img style={{opacity: 1}} src={handshake}   />
                                <span style={{opacity: 1}}>{"Awarded to users upon joining the platform for the first time"}</span>
                            </div>
                        ) : (
                            <div >
                                <img style={{opacity: 0.2}} src={handshake}   />
                                <span style={{opacity: 0.2}}>{"Awarded to users upon joining the platform for the first time"}</span>
                            </div>
                        )
                    }
                    {
                        achivements.includes("FIRSTWIN") ? (
                            <div>
                                <img style={{opacity: 1}} src={medal}   />
                                <span style={{opacity: 1}}>{"Awarded to users upon achieving their first victory or milestone"}</span>
                            </div>
                        ) : (
                            <div >
                                <img style={{opacity: 0.2}} src={medal}   />
                                <span style={{opacity: 0.2}}>{"Awarded to users upon achieving their first victory or milestone"}</span>
                            </div>
                        )
                    }
                    {
                        achivements.includes("FIRSTLOSE") ? (
                            <div>
                                <img style={{opacity: 1}} src={bomb}   />
                                <span style={{opacity: 1}}>{"Awarded to users upon experiencing their first defeat"}</span>
                            </div>
                        ) : (
                            <div >
                                <img style={{opacity: 0.2}} src={bomb}   />
                                <span style={{opacity: 0.2}}>{"Awarded to users upon experiencing their first defeat"}</span>
                            </div>
                        )
                    }
                    {
                        achivements.includes("WIN5") ? (
                            <div>
                                <img style={{opacity: 1}} src={key}   />
                                <span style={{opacity: 1}}>{"Awarded to users upon reaching 5 victories"}</span>
                            </div>
                        ) : (
                            <div >
                                <img style={{opacity: 0.2}} src={key}   />
                                <span style={{opacity: 0.2}}>{"Awarded to users upon reaching 5 victories"}</span>
                            </div>
                        )
                    }
                    {
                        achivements.includes("WIN10") ? (
                            <div>
                                <img style={{opacity: 1}} src={joystick}   />
                                <span style={{opacity: 1}}>{"Awarded to users upon reaching 10 victories"}</span>
                            </div>
                        ) : (
                            <div >
                                <img style={{opacity: 0.2}} src={joystick}   />
                                <span style={{opacity: 0.2}}>{"Awarded to users upon reaching 10 victories"}</span>
                            </div>
                        )
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
    const currUser = useParams();
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

	const [states, setStates] = useState([]);
    const [thisId, setId] = useState();
    const info = useLocation();
    axios.get(`http://localhost:3000/users${info.pathname}`, {withCredentials: true})
    .then((res) => {
        setId(res.data.id);
    })

    useEffect(() => {
        axios.get(`http://localhost:3000/users/stats/${thisId}` , {withCredentials: true})
		.then((response) => {
			setStates(response.data);
		})
		.catch((error) => {
			console.log("Error -> ", error);
		})
    },[thisId])


    const [user, setUser] = useState<string>("");
    axios.get(`http://localhost:3000/users/profil`, { withCredentials: true })
    .then((res) => {
        setUser(res.data.username);
    })
    .catch((erro) => {
        console.error("Erro -> ", erro);
    })

    if (userExist == "NotFound") {
        return (<ErrorPage title={"User Not Found"} errorType={'Oops! The user you\'re looking \nfor couldn\'t be found'} msg={"Feel free to explore other features of our website or consider signing up if you haven't already"} />)
    }
    else if (userExist != "NotFound" && currUser.userId == user) {
        return (<ErrorPage title={"Localhost"} errorType={'Oops!couldn\'t found 127.0.0.1'} msg={"Feel free to explore other features of our website or consider signing up if you haven't already"} />)
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
                    {
                        states.length == 0 ?
                        (
                            <States winRate={0} wins={0} loses={0} matchplayed={0}/>
                        )
                        :
                        (
                            <States winRate={(states.wins / states.numberOfMatches) * 100} wins={states.wins} loses={states.loses} matchplayed={states.numberOfMatches}/>
                        )
                    }
                </div>
                <div className="downContainer">
                    <Achivements/>
                </div>
            </div>
        )
}

export default OtherProfilPage