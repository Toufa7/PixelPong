import './profilPage.scss'
/******************* Packages  *******************/
import { useEffect, useState } from "react";
import axios from "axios";
/******************* Includes  *******************/
import medal from './assets/medaille.svg';
import savage from './assets/savage.svg';
import knife from './assets/siif.svg';
import flag from './assets/endpoint.svg';
import key from './assets/key.svg';
import dpad from './assets/d-pad.svg';
import fire from './assets/firelogo.svg';
import bomb from './assets/bomblogo.svg';
import joystick from './assets/joystic.svg';
import handshake from './assets/handshake.png';

const States = (props : {winRate: number, wins: number, loses: number, streak: number}) => {

	const [states, setStates] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/users/history` , {withCredentials: true})
		.then((response) => {
			console.log("Response Histroy -> ", response.data);
			setStates(response.data);
		})
		.catch((error) => {
			console.log("Error -> ", error);
		})
    },[])





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

    return (
        <div className="profilRectangle">
          <div className="avatar">
            <div className="left">
              <img src={`http://localhost:3000/auth/avatar/${userInfo.id}`} style={{width: '100px',height: '100px',marginRight: '10px',marginLeft: '10px',borderRadius: '50px'}} className="playerAvatar"/>
            <div>
              <span className="playerName" style={{marginBottom: '10px'}}>{userInfo.username}</span>
              <div>
                <progress style={{width: '300px', height: '20px'}} className="nes-progress" value="30" max="100"/>
              </div>
              <span style={{textAlign: 'right'}}>32/100</span>
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
                console.log("Resp _> ", response);
                setGroups(response.data);
            });
    }, []);

    const removeFriend = (removeId: string) => {
        const remote = removeId;
        const endpoint = `http://localhost:3000/users/remove/`;
        axios.patch(endpoint, {friendId: remote}, {withCredentials: true})
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
    achivements.set(handshake, "Welcome");
    achivements.set(medal, "First Win");
    achivements.set(bomb, "FIRSTLOSE");
    achivements.set(savage, "WINSTRIKE");
    achivements.set(key, "WIN5");
    achivements.set(joystick, "WIN10");






    // achivements.set(flag, "Win a match against different players");
    // achivements.set(knife, "Never conceding a damage in a full match");
    // achivements.set(dpad, "Win a match without losing a single point");
    // achivements.set(fire, "Score 10 consecutive points with powerful smashes");
    // achivements.set(shield, "Block 50 opponent shots with a perfect defensive block");
    // achivements.set(box, "Hit the ball with exceptional spin 50 times");
    // achivements.set(mail, "Chat with a friend");
    // achivements.set(caution, "Win a match without committing any fouls");
    // achivements.set(folder, "Unlock all hidden paddle designs");

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


function ProfilPage() {
  return (
    <div style={{height: '100h'}}>
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

export default ProfilPage