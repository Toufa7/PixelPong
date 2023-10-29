import "./Home.scss";
/******************* Packages  *******************/
import {useEffect, useRef, useState } from "react";
import axios from "axios";
import HorizontalScroll from 'react-scroll-horizontal'
import AnimatedText from 'react-animated-text-content';
import toast, { Toaster } from "react-hot-toast";
import { socket } from "../socket-client";
import Anime, { anime } from 'react-anime';
/******************* Includes  *******************/
import notification from './assets/notification.mp3';
import medal from './assets/medaille.svg';
import savage from './assets/savage.svg';
import flag from './assets/endpoint.svg';
import key from './assets/key.svg'
import bomb from './assets/bomblogo.svg';
import joystick from './assets/joystic.svg';
import handshake from './assets/handshake.png';
import { Link } from "react-router-dom";
import publicGroup from './assets/public.svg'
import protectedGroup from './assets/protected.svg'
import privateGroup from './assets/private.svg'

/*************************************************/

const GetUserData = () => {
    const [userInfo, setUserInfo] = useState(true);
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
	return (userInfo);
}

const TopContainer = () => {

	const userData = GetUserData();
	const textInfos = [
		"Perfecciona tus habilidades en nuestra área de práctica exclusiva",
		"Desafía a tus amigos a emocionantes partidos de ping pong"
	];
	interface theOneTypes {
		username : string,
		profileImage : string,
		namegb : string,
		grouptype: string,
		id: string
	}

	const [theOne, setTheOne] = useState<theOneTypes>({
		username: "",
		profileImage: "",
		namegb: "",
		grouptype: "",
		id: "",

	});
	const [users, setUsers] = useState([]);
	const [privacy, setPrivacy] = useState();
	const [isFound, setIsFound] = useState<boolean>(false);
	const [friendGroup, setFriendGroup] = useState<string>("");
	const [avatar, setAvatar] = useState("");
	const firstRef = useRef(null);
	const [visibility, setVisibility] = useState(true);

	const searchInGroups = async (query : string) => {
		try {
			const response = await axios.get("http://localhost:3000/groupchat/notmember", {withCredentials: true});
			const groups = response.data;
			const foundGroup = groups.find(group => group.namegb === query);
			if (foundGroup) {
				console.log("Group Found -> ", foundGroup);
				setPrivacy(foundGroup.grouptype)
				setTheOne(foundGroup);
				setFriendGroup("group");
				setUsers([]);
				const usersResponse = await axios.get(`http://localhost:3000/groupchat/${foundGroup.id}/numberuser`,{ withCredentials: true });
				setAvatar(`http://localhost:3000/groupchat/getimage/${foundGroup.id}`);
				setUsers(usersResponse.data);
				setIsFound(true);
				setVisibility(false);
			}
			else {
				setIsFound(false);
				setVisibility(false);
		  }
		} catch (error) {
		  console.log("Error searching in groups:", error);
		}
	};
	const searchInFriends = async (query : string) => {
		try {
			const response = await axios.get("http://localhost:3000/users/all", {withCredentials: true});
			const friends = response.data;
			const foundFriend = friends.find(friend => friend.username === query);
			if (foundFriend) {
				console.log("Friend Found -> ", foundFriend);
				setTheOne(foundFriend);
				setFriendGroup("friend");
				setIsFound(true);
				setVisibility(false);
			}
			else {
				setIsFound(false);
				setVisibility(false);
			}
		}
		catch (error) {
			console.log("Error searching in friends:", error);
		}
	};

	  const handleSubmit = (e) => {
			e.preventDefault();
			const searchQuery = firstRef.current.value;
			console.log("Searching for --> ", searchQuery);
			console.log("Looking in Groups");
			searchInGroups(searchQuery);
			console.log("Looking in Friends");
			searchInFriends(searchQuery);
	  };


	const removeElement = () => {
		setVisibility(true);
		setIsFound(false);
	};


	const handleJoinRequest = (privacy : string) => {
		if (privacy == "public") {
			axios.patch(`http://localhost:3000/groupchat/${theOne.id}/userpublic`, {}, { withCredentials: true })
			.then(() => {
				toast.success("Joined Successfully", {style: {textAlign: "center", width: '300px', color: 'black'}, position: "top-right"  , duration: 5000});
				document.getElementById('joinGroup').close();
			})
			.catch(() => {});
		}
		else if (privacy == "private")
		{
			axios.post(`http://localhost:3000/groupchat/${theOne.id}/request`, {}, { withCredentials: true })
			.then((res) => {
				toast.success("Request Sent", {style: {textAlign: "center", width: '300px', color: 'black'}, position: "top-right"  , duration: 5000});
				document.getElementById('joinGroup').close();
			})
			.catch(() => {})
		}
		else if (privacy == "protected") {
			const password = document.getElementById("password_join")?.value;
			console.log("Password Entered Is => ", password);
			axios.patch(`http://localhost:3000/groupchat/${theOne.id}/userprotected`, {pass :password} , { withCredentials: true })
			.then((res) => {
				if (res.data == "no")
					toast.error("Invalid Password", {style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'black'}, position: "top-right"});
				else {
					document.getElementById('joinGroup').close();
					toast.success("Joined Successfully", {style: {textAlign: "center", width: '300px', color: 'black'}, position: "top-right"});
				}
			})
			.catch((err) => {
				console.error("Error -> ", err);
			})
		}
		
	}

	return (
		<>
		<div className="search">
		<form onSubmit={handleSubmit}>

			<input ref={firstRef} type="text" id="name_field" placeholder='Search for a group or user' className="nes-input" />
			{!visibility && (
			<div onClick={removeElement} className="nes-container" style={{height: 'fitContent', padding: '5px', background: "#EDF2FA"}}>
				{isFound ? 
				(
					// the varibale friendGroup set whether we found a group or a freind
					(friendGroup == "friend") ?
						(<Link to={`/profil/${theOne.username}`}>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', textDecoration: 'none'}}>
								<div>
									<img src={`http://localhost:3000/auth/avatar/${theOne.id}`} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
									<span style={{ marginLeft: '20px', color: "black"}}>{theOne.username}</span>
								</div>
							</div>		
						</Link>)
					:
					(<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}} onClick={() => document.getElementById('joinGroup').showModal()}>
							<img src={avatar} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
							<span style={{ marginLeft: '20px' }}>{theOne.namegb}</span>
							{
								privacy == "PUBLIC" ? (
									<img src={publicGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Public Group" />
								) : privacy == "PRIVATE" ? (
									<img src={privateGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Private Group" />
								) : (
									<img src={protectedGroup} style={{ height: '30px', width: '30px', marginLeft: '10px' }} alt="Protected Group" />
								)
							}
					</div>)
				) :
				('0 results matched')}
			</div>
			)}
		</form>
		<section>
			<form method="dialog">
				<dialog style={{height: 'fitContent', width: '600px',background: "#e4f0ff"}} className="nes-container" id="joinGroup">
				<button style={{position: "absolute",left: "0%",marginLeft: "20px"}} onClick={() => {document.getElementById('joinGroup').close();}}>X</button>

				<h1 className="groupName">{theOne.namegb}</h1>
					<h5 className="grouptype">{theOne.grouptype}</h5>
					<img style={{borderRadius: '50%',width: '20%',height: '100px', marginBottom: '20px'}} className="groupAvatar" src={avatar} />
					<p className="group-members">Total Members: {users}</p>
					{
						privacy == "PUBLIC" ? (
							<button onClick={() => handleJoinRequest("public")} className="nes-btn" style={{width: 'fitContent', height: 'fitContent'}}>Join Immediately</button>
							) :
						privacy == "PRIVATE" ? (
							<button onClick={() => handleJoinRequest("private")} className="nes-btn" style={{width: 'fitContent', height: 'fitContent'}}>Request To Join</button>
						) :
						(
							<>
								<input type="password" style={{ background: '#E9E9ED', marginBottom: '10px' }} placeholder="P@55w0rd" maxLength={18} id="password_join" className="nes-input"/>
								<button onClick={() => handleJoinRequest("protected")} className="nes-btn" style={{width: 'fitContent', height: 'fitContent'}} >Join Group</button>
							</>
						)
					}
				</dialog>

			</form>
		</section>
		</div>

		<div className="headerBox">
		<div className="topLoginBox">
			<div className="loginBoxHeader">
				<>Bienvenido {userData.username}</>
			</div>
		<div className="loginBoxOutside">
			<div className="playRaw">
					<div style={{justifyContent: 'center',alignItems:'center', display: 'flex', margin: '10px', flexDirection: 'column'}} className="playWith Friend">
					<AnimatedText duration={2} animationType="bounce">
						{textInfos[1]}
					</AnimatedText>
					<a style={{width:'fitContent', marginTop: '30px'}} className="nes-btn" href="/game">Vamos</a>
				</div>
                    {/* <a style={{width:'fitContent', marginTop: '30px'}} className="nes-btn" onClick={() => {document.getElementById('howtoplay').showModal();}} >How To Play</a> */}
				{/* <section> */}
                    {/* <dialog class = 'example' style={{height: '700px', width: '700px', background: 'white' , borderRadius:"20px"}} id="howtoplay">

                    <button style={{display: 'flex', alignItems:'left'}} class="nes-btn is-error"  onClick={() => {
                        document.getElementById('howtoplay')?.close();
                    }} >X</button>
						<h1>Pixel Pong</h1>
						<div style = {{backgroundColor : "#e0a43d"}} class="nes-container is-dark with-title">
						Pixel Pong was originally founded in September 2023, it was the idea of Omar Toufah and was encouraged later by other members of our team who were Ayoub Bensguia, Mohamed Amellal,
						Ibrahim Nada, and Mohamed Khalil Naqqad.
						Our design was heavily inspired by Pixel art which is a form of digital art, our website is structured on the idea of foolishness that paid tribute to this
						kind of art as it is based on pixels and playing with colors to create a childish yet very artsy design,
						everything in this web site that you will experience and hope you'll enjoy was made from scratch using frameworks that facilitates the use of pixel art style in CSS and Html.
						Hadouken!!!
						</div>
						<h2 style={{marginTop : '50px'}}>How To Play</h2>
						<i class="snes-logo"></i>
						<div class="nes-container with-title is-centered">
							<img src= {handshake}></img>
							To move Your Paddle you can use eaither the up and down arrows , Or use your mouse.
						</div> 
                    </dialog>
                	</section> */}
				</div>
		</div>
		</div>
		</div>
		</>
	);
};

const TopLeft = () => {
	interface States {
		wins: number;
		loses: number;
		matchesPlayed: number;
		username: string;
	}
	
	const [leaderboards, setLeaderboards] = useState<Map<number, States>>(new Map());
	useEffect(() => {
		axios.get('http://localhost:3000/users/all', { withCredentials: true })
		.then((response) => {
			const leaderboardMap = new Map<number, States>();
			const fetchStatsPromises = response.data.map((user : any) =>
				axios.get(`http://localhost:3000/users/stats/${user.id}`, { withCredentials: true })
			);
			Promise.all(fetchStatsPromises)
			.then((responses) => {
				responses.forEach((respo, index) => {
					const userData = respo.data;
					if (userData) { 
						leaderboardMap.set(userData.wins, {
							wins: userData.wins,
							loses: userData.loses,
							matchesPlayed: userData.numberOfMatches,
							username: response.data[index].username
						});
					}
				});
				const sortedEntries = Array.from(leaderboardMap.entries()).sort((a, b) => b[0] - a[0]);
				setLeaderboards(new Map(sortedEntries));
			})
			.catch((error) => {
				console.error('Error -> ', error);
			});
		})
		.catch((error) => {
			console.error('Error -> ', error);
		});
	}, []);

	return (
	<div className="loginBox on-going-matches">
		<div className="loginBoxHeader on-going-matches1">TABLA DE LIDERES</div>
		<div className="loginBoxOutside on-going-matches2">
			{
				leaderboards.size == 0 ?
				(
					<p style={{ textAlign: 'center', margin: '20px' }}>
						Stay tuned! Once the matches begin, they will be displayed here.
				  	</p>
				)
				:
				(
					Array.from(leaderboards).map(([value, key], index) => {
						if (index == 0) {
							return (
								<div style={{ background: '#FDD43B' }} className="match1" key={value}>
								<span className="position">{index + 1}</span>
								<AnimatedText duration={5} className="name" animationType="float" threshold={0.9} rootMargin="20%">{key.username}</AnimatedText><span className="wins">{key.wins}</span>
								<span className="loses">{key.loses}</span>
								</div>
								);
							}
						if (index == 1) {
							return (
								<div style={{ background: '#BFBFBF' }} className="match1" key={value}>
								<span className="position">{index + 1}</span>
								<AnimatedText duration={2.5} className="name" animationType="float">{key.username}</AnimatedText>
								<span className="wins">{key.wins}</span>
								<span className="loses">{key.loses}</span>
								</div>
								);
							}
						if (index == 2) {
							return (
								<div style={{ background: '#CA7E40' }} className="match1" key={value}>
								<span className="position">{index + 1}</span>
								<AnimatedText duration={1} className="name" animationType="float">{key.username}</AnimatedText>
								<span className="wins">{key.wins}</span>
								<span className="loses">{key.loses}</span>
								</div>
								);
							}
						else {
							return (
								<div className="match1" key={value}>
								<span className="position">{index + 1}</span>
								<AnimatedText duration={1} className="name" animationType="float">{key.username}</AnimatedText>
								<span className="wins">{key.wins}</span>
								<span className="loses">{key.loses}</span>
								</div>
								);
							}
						})
				)
				}
		</div>
	</div>
	);
}

const TopRight = (props : {winRate: number, wins: number, loses: number}) => {
	return (
		<div className="loginBox states">
			<div className="loginBoxHeader states1">ESTADOS</div>
			<div style={{fontSize: 'x-large', display: "flex", justifyContent: 'center', alignItems: 'center'}} className="loginBoxOutside">
				<div style={{textShadow: ' 0.1em 0.1em #FA005E'}} className="statesValues" >
					<span style={{color: "orange"}}>
						<AnimatedText duration={1} className="name" animationType="bounce">
							Win Rate
						</AnimatedText>
					</span>
					<span style={{color: "orange"}}>
						<AnimatedText duration={1} className="name" animationType="bounce">
							{props.winRate}
						</AnimatedText>
					</span>
				</div>
				<div style={{textShadow: ' 0.1em 0.1em #1f596b'}} className="statesValues">
					<span style={{color: "#009e73"}}>
						<AnimatedText duration={2} className="name" animationType="bounce">
							Gana
						</AnimatedText>
					</span>
					<span style={{color: "#009e73"}}>
						<AnimatedText duration={2} className="name" animationType="bounce">
							{props.wins}
						</AnimatedText>
					</span>
				</div>
				<div style={{textShadow: ' 0.1em 0.1em #FA005E'}} className="statesValues">
					<span style={{color: "#ff7670"}}>
						<AnimatedText duration={3} className="name" animationType="bounce">
							Pierde
						</AnimatedText>
					</span>
					<span style={{color: "#ff7670"}}>
						<AnimatedText duration={3} className="name" animationType="bounce">
							{props.loses}
						</AnimatedText>
					</span>
				</div>
			</div>
		</div>
  );
}

const BottomLeft = () => {
	const [achivements, setAchivements] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/users/achievements` , {withCredentials: true})
		.then((response) => {
			setAchivements(response.data.achievementType);
		})
		.catch((error) => {
			console.log("Error Achievements -> ", error);
		})
    },[])

	return (
		<div className="loginBox achievements">
			<div className="loginBoxHeader achievements1">LOGROS</div>
			<div className="loginBoxOutside achievements2">
				{/* <HorizontalScroll> */}
					{
						achivements &&
							achivements.map((item, idx) => {
								if (item == "WELCOME")
									return (<img style={{width: '150px', height: '150px'}} src={handshake} key={idx}/>)
								if (item == "FIRSTWIN")
									return (<img style={{width: '150px', height: '150px'}} src={medal} key={idx}/>)
								if (item == "FIRSTLOSE")
									return (<img style={{width: '150px', height: '150px'}} src={bomb} key={idx}/>)
								if (item == "WINSTRIKE")
									return (<img style={{width: '150px', height: '150px'}} src={savage} key={idx}/>)
								if (item == "WIN5")
									return (<img style={{width: '150px', height: '150px'}} src={key} key={idx}/>)	
								if (item == "WIN10")
									return (<img style={{width: '150px', height: '150px'}} src={joystick} key={idx}/>)
							})
					}
				{/* </HorizontalScroll> */}
			</div>
		</div>
	);
}


const MatchResult = (props: {player1 : string,  player1Avatar : string, player2Avatar : string, player2 : string, color : string, rslt : string}) => {
  return (
	<div className="match1" style={{background: props.color, border: '1px solid black'}}>
		<div className="left">
		<img style={{width: '50px', height: '50px', borderRadius: '50%', margin: '10px'}} src={props.player1Avatar} className="player1"></img>

		<span>{props.player1}</span>
		</div>
	<div className="result">
		<span>{props.rslt}</span>
	</div>
	<div className="right">
		<span>{props.player2}</span>
			<img style={{width: '50px', height: '50px', borderRadius: '50%', margin: '10px'}} src={props.player2Avatar} className="player2"></img>
		</div>
	</div>
  );
}


const BottomRight= () => {
	const [matchHistory, setMatchHistory] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/users/history` , {withCredentials: true})
		.then((response) => {
			setMatchHistory(response.data);
		})
		.catch((error) => {
			console.log("Error -> ", error);
		})
    },[])


	const userData = GetUserData();
	const lose = "#ff7670";
	const win = "#009e73";
	return (
	<div className="loginBox latest-matches">
		<div className="loginBoxHeader latest-matches1">ULTIMOS PARTIDOS</div>
			<div className="loginBoxOutside latest-matches2">	
			<div className="matcheHistory">
				{
					matchHistory.length == 0 ? (
						<p style={{ textAlign: 'center', margin: '20px' }}>
						No matches played yet. They'll be shown here soon
					  </p>

					) : (
						Object.keys(matchHistory).map((idx) => (
							matchHistory[idx].message == "WIN" ?
							(<MatchResult key={idx} player1={userData.username} player1Avatar={`http://localhost:3000/auth/avatar/${userData.id}`} player2={matchHistory[idx].other} player2Avatar={`http://localhost:3000/auth/avatar/${matchHistory[idx].otherid}`} rslt={matchHistory[idx].message} color={win}/>)
								:
							(<MatchResult key={idx} player1={userData.username} player1Avatar={`http://localhost:3000/auth/avatar/${userData.id}`} player2={matchHistory[idx].other} player2Avatar={`http://localhost:3000/auth/avatar/${matchHistory[idx].otherid}`} rslt={matchHistory[idx].message} color={lose}/>)
						))
					)
				}
			</div>
			</div>
	</div>
  );
}

function Notification () {
	const [isFriend, setIsFriend] = useState(true);
	const [friendStatus, setFriendStatus] = useState(false);
	useEffect(() => {
	socket.on('notification', (data) => {
	console.log('Received notification:', data);
	
	const AcceptFriend = async () =>  {
		try {
			await axios.patch("http://localhost:3000/users/acceptFriendRequest", data, {withCredentials : true})
			.then((rese) => {
				console.log("Notifcation Accept ", rese);
				setFriendStatus(friendStatus)
			})
		}
		catch (error) {
			console.log("Error Catched ", error);
		}
		toast.remove();
	}
	const RefuseFriend = async () => {
		try {
			await axios.patch("http://localhost:3000/users/refuseFriendRequest", data, {withCredentials : true})
			.then((rese) => {
				console.log("Notifcation Refuse ", rese);
				setFriendStatus(friendStatus)
			})
		} catch (error) {
			console.log("Error Catched ", error);
		}
		toast.remove();

	}
	const audio = new Audio(notification);
	audio.play();
	toast.custom(
		<div style={{ display: 'flex', alignItems: 'center', background: "#F2ECFF", color: 'black', borderRadius: '10px', zIndex: '-1'}}>
			<div className="nes-container with-title">
				<p style={{ background: '#ffc7b2', transform: 'translateY(-5px)', border: '2px solid black' }}  className="title">Invitation Request</p>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<img src={`http://localhost:3000/auth/avatar/${data.userId}`} style={{ borderRadius: '30px', width: '50px', height: '50px' }} alt="avatar"/>
				<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{data.from}</span>	
				{isFriend ?
						(
							<div>
								<button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small' }} className="nes-btn is-success" onClick={AcceptFriend}>Accept</button>
								<button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small' }} className="nes-btn is-error" onClick={RefuseFriend}>Deny</button>
							</div>
						) : 
						(
							<button style={{ marginLeft: '10px' }} onClick={() => setIsFriend(true)}>Accepted</button>
						)				
					}
			</div>
			</div>
		</div>,
		{ duration: 5000, position: 'top-right' });
	});
	return() => {
		socket.off('notification')
	}
}, []);

}

export default function Home() {
	Notification();	
	const [states, setStates] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/users/stats` , {withCredentials: true})
		.then((response) => {
			setStates(response.data);
		})
		.catch((error) => {
			console.log("Error -> ", error);
		})
    },[])


	return (
		<div style={{ height: '100vh'}}>
			<title>Home</title>
			<Toaster/>
				<TopContainer/>
				<div className="top-containers">
					<TopLeft/>
					{
						states.length == 0 ?
						(
							<TopRight winRate={0.0} wins={0} loses={0}/>
						)
						:
						(
							<TopRight winRate={((states.wins / states.numberOfMatches) * 100).toFixed(2)} wins={states.wins} loses={states.loses}/>
						)
					}
				</div>
				<div className="bottom-containers">
					<BottomLeft/>
					<BottomRight/>
				</div>
			</div>
	);
}