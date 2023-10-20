import "./Home.scss";
/******************* Packages  *******************/
import jwt_decode from 'jwt-decode';
import {useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import HorizontalScroll from 'react-scroll-horizontal'
import AnimatedText from 'react-animated-text-content';
import toast, { Toaster } from "react-hot-toast";
import { socket } from "../socket-client";
import Anime, { anime } from 'react-anime';
import { Search } from "./search";
/******************* Includes  *******************/
import notification from './assets/notification.mp3';
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
import box from './assets/box.svg';
import shield from './assets/shield.svg';
import mail from './assets/mail.svg';
import caution from './assets/caution.svg';
import folder from './assets/folder.svg';
import { Link } from "react-router-dom";

import publicGroup from './assets/public.svg'
import protectedGroup from './assets/protected.svg'
import privateGroup from './assets/private.svg'
import NavBar from "../addons/NavBar";

/*************************************************/

const GetUserData = () => {
	interface Token {
		id : string
	}
	const [userData, setUserData] = useState({
		username: "",
		avatar: ""
	});
	useEffect(() => {
		async function fetchData () {
			const cookie = new Cookies();
			const token : Token = jwt_decode(cookie.get('jwt'));
			if (token) {
				const endpoint = "http://localhost:3000/users/profil"
				const response = await axios.get(endpoint, { withCredentials: true });
				setUserData(response.data);
			}
		}
		fetchData();
	}, []);
	return (userData);
}

// const TopContainer = () => {
// 	const userData = GetUserData();
// 	const textInfos = [
// 	  "Perfecciona tus habilidades en nuestra área de práctica exclusiva",
// 	  "Desafía a tus amigos a emocionantes partidos de ping pong"
// 	];
	
// 	const [friends, setFriends] = useState({}); // Move the useState hook outside of the event handler
  
// 	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// 	  e.preventDefault();
// 	  const searchValue = document.querySelector('.nes-input')?.value;
// 	  console.log(searchValue);
  
// 	  axios.get(`http://localhost:3000/users/Friends/`, { withCredentials: true })
// 		.then((rese) => {
// 		  setFriends(rese.data);
// 		})
// 		.catch((error) => {
// 		  console.log(error);
// 		});
// 	};
  
// 	return (
// 	  <div className="search">
// 		<form onSubmit={handleSubmit}>
// 		  <input type="text" id="name_field" placeholder='Search for a group or user' className="nes-input"/>
// 		</form>
// 	  </div>
// 	);
//   };




const TopContainer = () => {

	interface groupInfo {

	}

	const userData = GetUserData();
	const textInfos = [
		"Perfecciona tus habilidades en nuestra área de práctica exclusiva",
		"Desafía a tus amigos a emocionantes partidos de ping pong"
	];

	const [friends, setFriends] = useState([]);
	const [users, setUsers] = useState([]);
	const [theOne, setTheOne] = useState([]);
	const [privacy, setPrivacy] = useState();
	const [isFound, setIsFound] = useState<boolean>(false);
	const [friendGroup, setFriendGroup] = useState("");
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
			const response = await axios.get("http://localhost:3000/users/Friends/", {withCredentials: true});
			const friends = response.data;
			const foundFriend = friends.find(friend => friend.username === query);
			if (foundFriend) {
			console.log("Friend Found");
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
	

	  console.log("theOne theOne theOne theOne --" ,theOne );

	const removeElement = () => {
	  setVisibility(true);
	  setIsFound(false);
	};
	return (
		<>
		<div className="search">
		<form onSubmit={handleSubmit}>

			<input ref={firstRef} type="text" id="name_field" placeholder='Search for a group or user' className="nes-input" />
			{!visibility && (
			<div onClick={removeElement} className="nes-container" style={{height: 'fitContent', padding: '5px', background: "#EDF2FA"}}>
				{isFound ? 
				(
					(friendGroup == "friend") ?
						(<Link to={`/profil/${theOne.username}`}>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
								<div>
									<img src={theOne.profileImage} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
									<span style={{ marginLeft: '20px' }}>{theOne.username}</span>

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
			<button>Close</button>

			<h1 className="groupName">{theOne.namegb}</h1>
				<h4 className="grouptype">{theOne.grouptype}</h4>



				<img style={{borderRadius: '50%',width: '20%',height: '100px', marginBottom: '20px'}} className="groupAvatar" src={avatar} />
				<p className="group-members">Total Members: {users}</p>
				{
					privacy == "PUBLIC" ? (
						<button onClick={() => {
							axios.patch(`http://localhost:3000/groupchat/${theOne.id}/userpublic`, {}, { withCredentials: true })
							.then((res) => {
								console.log("Reseoinse Join -> ", res.data);
							})
							.catch(() => {})
						}} className="nes-btn" style={{width: 'fitContent', height: 'fitContent'}}>Join Immediately</button>
					) : privacy == "PRIVATE" ? (
						<button onClick={() => {
							axios.patch(`http://localhost:3000/groupchat/${theOne.id}/userpublic`, {}, { withCredentials: true })
							.then((res) => {
								console.log("Private Join -> ", res.data);
							})
							.catch(() => {})
						}} className="nes-btn" style={{width: 'fitContent', height: 'fitContent'}} >Request To Join</button>
						) : (
						<>

						<input style={{ background: '#E9E9ED', marginBottom: '10px' }} type="password" placeholder="P@55w0rd" maxLength={18} id="password_join" className="nes-input" />
						<button onClick={() => {
							const password = document.getElementById("password_join")?.value;
							console.log("Password Entered Is => ", password);
							axios.patch(`http://localhost:3000/groupchat/${theOne.id}/userprotected`, {pass :password} , { withCredentials: true })
							.then((res) => {
								if (res.data == 'no')
									toast.error("Invalid Password", {style: {textAlign: "center", width: '300px' ,background: '#B00020', color: 'black'}, position: "top-right"});
								else
									toast.success("Joined Successfully", {style: {textAlign: "center", width: '300px', color: 'white'}, position: "top-right"});
							})
							.catch(() => {

							})
						}} className="nes-btn" style={{width: 'fitContent', height: 'fitContent'}} >Join Group</button>
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
						{textInfos[0]}
					</AnimatedText>
					<a style={{width:'fitContent', marginTop: '30px'}} className="nes-btn" href="/game">Vamos</a>
				</div>
				<div style={{justifyContent: 'center',alignItems:'center', display: 'flex', margin: '10px', flexDirection: 'column'}} className="playWith Practice">
					<AnimatedText duration={2} animationType="bounce">
						{textInfos[1]}
					</AnimatedText>
					<a style={{width:'fitContent', marginTop: '30px'}} className="nes-btn" href="#">Arriba</a>
				</div>
			</div>
		</div>
		</div>
		</div>
		</>
	);
};

const TopLeft = () => {
	return (
	<div className="loginBox on-going-matches">
		<div className="loginBoxHeader on-going-matches1">TABLA DE LIDERES</div>
		<div className="loginBoxOutside on-going-matches2">
			<div style={{background: "#FDD43B"}} className="match1">
				<span className="position">1</span>
				<AnimatedText duration={5} className="name" animationType="float" threshold={0.9} rootMargin="20%" >XX</AnimatedText>
				<span className="wins">0</span>
				<span className="loses">0</span>
				<span className="draw">0</span>
			</div>
			<div style={{background: "#BFBFBF"}} className="match1">
				<span className="position">2</span>
				<AnimatedText duration={2.5} className="name" animationType="float">XX</AnimatedText>
				<span className="wins">0</span>
				<span className="loses">0</span>
				<span className="draw">0</span>
			</div>
			<div  style={{background: "#CA7E40"}} className="match1">
				<span className="position">3</span>
				<AnimatedText duration={1} className="name" animationType="float">XX</AnimatedText>
				<span className="wins">0</span>
				<span className="loses">0</span>
				<span className="draw">0</span>
			</div>
			<div className="match1">
				<span className="position">X</span>
				<span className="name">You</span>
				<span className="wins">0</span>
				<span className="loses">0</span>
				<span className="draw">0</span>
			</div>
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
	const achivements = [bomb,joystick,dpad,handshake,box,shield,mail,caution,medal,savage,knife,flag,key,fire,folder];
	return (
		<div className="loginBox achievements">
			<div className="loginBoxHeader achievements1">LOGROS</div>
			<div className="loginBoxOutside achievements2">
			<HorizontalScroll>
				{
					achivements.map((key, idx) => {
						return (
							<img src={key} key={idx}/>
					)})
				}
			</HorizontalScroll>
			</div>
		</div>
	);
}


const MatchResult = (props: {player1 : string,  player1Avatar : string, player2 : string, color : string, rslt : string}) => {
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
			<img style={{width: '50px', height: '50px', borderRadius: '50%', margin: '10px'}} src={props.player1Avatar} className="player2"></img>
		</div>
	</div>
  );
}



const BottomRight= () => {
	const userData = GetUserData();

    const [check, setUserData] = useState(false);
	const cookie = new Cookies();
	const token = jwt_decode(cookie.get('jwt'));
    useEffect(() => {
        async function fetchData() {
            const cookie = new Cookies();
            const token = jwt_decode(cookie.get('jwt'));
            if (token) {
				try {
					await axios.get(`http://localhost:3000/auth/avatar/${token.id}`, {withCredentials: true})
					.then(() => 
					{
						setUserData(true)
					})
					.catch(((error) => {
						console.log("Error in NavBar " ,error);
					}))
					
				} catch (error) {
					console.log("Error in NavBar " ,error);
				}
            }
        }
		fetchData();
    }, [])

	const avatarIs = /*check ?*/ `http://localhost:3000/auth/avatar/${token.id}` /*: token.image;*/;


	const win = "#ff7670";
	const lose = "#009e73";
	const draw = "#178ee1";
	return (
	<div className="loginBox latest-matches">
		<div className="loginBoxHeader latest-matches1">ULTIMOS PARTIDOS</div>
			<div className="loginBoxOutside latest-matches2">	
			<div className="matcheHistory">
				<MatchResult player1={userData.username}  player1Avatar={avatarIs ? avatarIs : '/public/profile-default.png'} player2="Oppenent" rslt={"win"} color={win}/>
				<MatchResult player1={userData.username}  player1Avatar={avatarIs ? avatarIs : '/public/profile-default.png'} player2="Oppenent" rslt={"lose"} color={lose}/>
				<MatchResult player1={userData.username}  player1Avatar={avatarIs ? avatarIs : '/public/profile-default.png'} player2="Oppenent" rslt={"draw"} color={draw}/>
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
	}
	const audio = new Audio(notification);
	audio.play();
	toast.custom(
		<div style={{ display: 'flex', alignItems: 'center', background: "#F2ECFF", color: 'black', borderRadius: '10px', zIndex: '-1'}}>
			<div style={{ width: '400px', height: '120px' }} className="nes-container with-title is-centered">
				<p style={{ background: '#ffeeca', border: '2px solid black'}} className="title">Invitation Request</p>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img src={`http://localhost:3000/auth/avatar/${data.photo}`} style={{ borderRadius: '30px', width: '50px', height: '50px' }} alt="avatar"/>
				<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{data.username}</span>	
				{isFriend ?
						(
							<>
								<button style={{ marginLeft: '10px' }} onClick={AcceptFriend}>Accept</button>
								<button style={{ marginLeft: '10px' }} onClick={RefuseFriend}>Deny</button>
							</>
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
	return (
		<div style={{ height: '100vh'}}>
			<title>Home</title>
			<Toaster/>
				<TopContainer/>
				<div className="top-containers">
					<TopLeft/>
					<TopRight winRate={0.01} wins={0} loses={0}/>
				</div>
				<div className="bottom-containers">
					<BottomLeft/>
					<BottomRight/>
				</div>
			</div>
	);
}