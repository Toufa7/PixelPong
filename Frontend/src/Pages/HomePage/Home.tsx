import "./Home.scss";
/******************* Packages  *******************/
import jwt_decode from 'jwt-decode';
import {useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import HorizontalScroll from 'react-scroll-horizontal'
import AnimatedText from 'react-animated-text-content';
import toast, { Toaster } from "react-hot-toast";
import { socket } from "../socket-client";
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

const TopContainer = () => {
	const userData = GetUserData();
	const textInfos = [
		"Perfecciona tus habilidades en nuestra área de práctica exclusiva",
		"Desafía a tus amigos a emocionantes partidos de ping pong"
	];
	return (
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
	const win = "#ff7670";
	const lose = "#009e73";
	const draw = "#178ee1";
	return (
	<div className="loginBox latest-matches">
		<div className="loginBoxHeader latest-matches1">ULTIMOS PARTIDOS</div>
			<div className="loginBoxOutside latest-matches2">	
			<div className="matcheHistory">
				<MatchResult player1={userData.username}  player1Avatar={userData.avatar} player2="Oppenent" rslt={"win"} color={win}/>
				<MatchResult player1={userData.username}  player1Avatar={userData.avatar} player2="Oppenent" rslt={"lose"} color={lose}/>
				<MatchResult player1={userData.username}  player1Avatar={userData.avatar} player2="Oppenent" rslt={"draw"} color={draw}/>
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
			await axios.patch("http://localhost:3000/users/acceptFriendRequest", data,{withCredentials : true})
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
			await axios.patch("http://localhost:3000/users/refuseFriendRequest", data,{withCredentials : true})
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
		<div style={{ display: 'flex', alignItems: 'center', color: 'black', borderRadius: '10px', zIndex: '-1',}}>
			<div style={{ width: '400px', height: '120px' }} className="nes-container with-title is-centered">
				<p style={{ background: '#ffeeca', border: '2px solid black'}} className="title">Invitation Request</p>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img src={data.photo} style={{ borderRadius: '30px', width: '50px', height: '50px' }} alt="avatar"/>
				<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{data.username}</span>	
				{ isFriend ?
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
	}, []);
}

export default function Home() {	
	Notification();
	return (
		<div style={{ height: '100vh' }}>
			<Toaster/>
			<TopContainer />
			<div className="top-containers">
				<TopLeft />
				<TopRight winRate={0.01} wins={0} loses={0}/>
			</div>
			<div className="bottom-containers">
			<BottomLeft />
			<BottomRight />
			</div>
		</div>
	);
}
