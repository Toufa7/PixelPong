import './profilPage.scss'
/******************* Packages  *******************/
import { useEffect, useState } from "react";
import axios from "axios";
/******************* Includes  *******************/
import medal from './assets/medaille.svg';
import savage from './assets/savage.svg';
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
    const [userInfo, setUserInfo] = useState("");
    useEffect(() => {
        const fetchData = () => {
            axios.get("http://localhost:3000/users/profil", { withCredentials: true })
            .then((response) => {
                setUserInfo(response.data)
            })
            .catch((error) => {
            console.log("Error -> ", error);
        })
    }
    fetchData();
    }, []);

    const [level, setLevel] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/users/stats` , {withCredentials: true})
		.then((response) => {
			setLevel(response.data[0].level);
		})
		.catch((error) => {
			console.log("Error -> ", error);
		})
    },[])

    return (
        <div className="profilRectangle">
          <div className="avatar">
            <div className="left">
              <img src={`http://localhost:3000/auth/avatar/${userInfo.id}`} style={{width: '100px',height: '100px',marginRight: '10px',marginLeft: '10px',borderRadius: '50px'}} className="playerAvatar"/>
            <div>
              <span className="playerName" style={{marginBottom: '10px'}}>{userInfo.username}</span>
              <div>
                <progress style={{width: '300px', height: '20px'}} className="nes-progress" value={level} max="100"/>
              </div>
              <span style={{textAlign: 'right'}}>{level}/100</span>
            </div>
            </div>
            <div>
              <div>
              </div>
            </div>
          </div>
        </div>
      );
}

const GroupsAndFriends = () => {
    const [friends, setFriends] = useState<string[]>([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/users/Friends`, {withCredentials: true})
            .then((response) => {
                setFriends(response.data);
            });
    }, []);

    const [groups, setGroups] = useState<string[]>([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/groupchat`, {withCredentials: true})
            .then((response) => {
                console.log("Resp groupchat -> ", response.data);
                setGroups(response.data);
            });
    }, []);

    const removeFriend = (removeId: string) => {
        const remote = removeId;
        const endpoint = `http://localhost:3000/users/remove/`;
        axios.patch(endpoint, {to: remote}, {withCredentials: true})
            .then((response) => {
                console.log("Removing Response", response);
                setFriends(prevFriendData => prevFriendData.filter(friend => friend.id !== removeId));
            });
    }

    const [label, setlabel] = useState(true);
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
                        groups.map((friend) => (
                            <div className='list' key={friend.id}>
                                <img className="avatar" src={`http://localhost:3000/groupchat/getimage/${friend.id}`} alt="avatar" />
                                <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px'}}>
                                    <span className='name'>{friend.namegb}</span>
                                </div>
                            </div>
                    ))
                    ) : (
                        friends.map((friend : string) => (
                            <div className='list' key={friend.id}>
                                <img className="avatar" src={`http://localhost:3000/auth/avatar/${friend.id}`} alt="avatar" />
                                <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginLeft: '10px'}}>
                                    <span className='name'>{friend.username}</span>
                                    <button style={{marginLeft: '10px'}} onClick={() => removeFriend(friend.id)}>Unfriend</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

const Achivements = () => {
    const achivements: Map<string, string> = new Map();
    achivements.set(handshake, "Awarded to users upon joining the platform for the first time");
    achivements.set(medal, "Awarded to users upon achieving their first victory or milestone");
    achivements.set(bomb, "Awarded to users upon experiencing their first defeat");
    achivements.set(savage, "Awarded to users who achieve a consecutive series of wins");
    achivements.set(key, "Awarded to users upon reaching 5 victories");
    achivements.set(joystick, "Awarded to users upon reaching 10 victories");

    return (    
            <div className="fullAchivementsBox">
                <div style={{textAlign: 'center', fontSize: 'x-large'}} className="headAchivementsBox">Achivements</div>
                <div className="contentAchivementsBox">
                    <div className="icons">
                        <div>
                        {
                            Array.from(achivements).map(([icon, achivText], idx) => (
                            <div key={idx}>
                                <img style={{opacity: 1}} src={icon}   />
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


function ProfilPage() {
	const [states, setStates] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/users/stats` , {withCredentials: true})
		.then((response) => {
			console.log("Response States -> ", response.data);
			setStates(response.data);
		})
		.catch((error) => {
			console.log("Error States -> ", error);
		})
    },[])




  return (
    <div style={{height: '100h'}}>
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
                    <States winRate={((states.wins / states.numberOfMatches) * 100).toFixed(2)} wins={states.wins} loses={states.loses} matchplayed={states.numberOfMatches}/>
                )
            }

        </div>
        <div className="downContainer">
            <Achivements/>
        </div>
    </div>
  )
}

export default ProfilPage