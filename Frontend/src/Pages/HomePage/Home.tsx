import "./Home.scss";
/******************* Packages  *******************/
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import HorizontalScroll from 'react-scroll-horizontal'
import AnimatedText from 'react-animated-text-content';
import { Fade } from "react-awesome-reveal";
import Anime from 'react-anime';
import notification from './assets/notification.mp3';

/******************* Includes  *******************/
import medaille from './assets/medaille.svg';
import savage from './assets/savage.svg';
import siif from './assets/siif.svg';
import endpoint from './assets/endpoint.svg';
import key from './assets/key.svg';
import image from './assets/medaille.svg'
import toast, { Toaster } from "react-hot-toast";
import avatar from '../otoufah.jpg'
import { socket } from "../socket-client";
/*************************************************/

const TopContainer = () => {
	const textInfos = [
		"Perfect your ping pong skills in our dedicated practice area",
		"Challenge your friends to exciting ping pong matches."
	];
	
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
				const endpoint = "http://localhost:3000/users/" + token.id;
				const response = await axios.get(endpoint, { withCredentials: true });
				setUserData(response.data);
			}
		}
		fetchData();
	}, []);
	

	return (
		<div className="headerBox">
		<div className="topLoginBox">
			<div className="loginBoxHeader">
			<Fade>
				<>Welcome {userData.username}</>
			</Fade>
			</div>
		<div className="loginBoxOutside">
			<div className="playRaw">
				<div style={{justifyContent: 'center',alignItems:'center', display: 'flex', margin: '10px', flexDirection: 'column'}} className="playWith Friend">
					<AnimatedText duration={2} animationType="bounce">
						{textInfos[0]}
					</AnimatedText>
					<a style={{width: '100px', marginTop: '30px'}} className="nes-btn" href="/game">Vamos</a>
				</div>
				<div style={{justifyContent: 'center',alignItems:'center', display: 'flex', margin: '10px', flexDirection: 'column'}} className="playWith Practice">
					<AnimatedText duration={2} animationType="bounce">
						{textInfos[1]}
					</AnimatedText>
					<a style={{width: '100px', marginTop: '30px'}} className="nes-btn" href="#">Vamos</a>
				</div>
			</div>
		</div>
		</div>
		</div>
	);
};

// const testing = () => {
// 	const socket = useContext(socketContext);
// 	useEffect(()=>{
// 		socket?.on("connect",()=>{
// 			console.log("im connected");
// 	})
// 	},[]);
// }

// testing();

const TopLeft = () => {
	return (
	<div className="loginBox on-going-matches">
		<div className="loginBoxHeader on-going-matches1">LEADERBOARD</div>
		<div className="loginBoxOutside on-going-matches2">
			<div style={{background: "#FDD43B"}} className="match1">
				<span className="position">1</span>
				<AnimatedText duration={3} className="name" animationType="float" threshold={0.9} rootMargin="20%" >Martin Ødegaard</AnimatedText>
				<span className="wins">95</span>
				<span className="loses">10</span>
				<span className="draw">12</span>
			</div>
			<div style={{background: "#BFBFBF"}} className="match1">
				<span className="position">2</span>
				<AnimatedText duration={2} className="name" animationType="float">Bukayo Saka</AnimatedText>
				<span className="wins">12</span>
				<span className="loses">76</span>
				<span className="draw">1</span>
			</div>
			<div  style={{background: "#CA7E40"}} className="match1">
				<span className="position">3</span>
				<AnimatedText duration={1} className="name" animationType="float">William Saliba</AnimatedText>
				<span className="wins">4</span>
				<span className="loses">0</span>
				<span className="draw">1</span>
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

const TopRight = () => {
	return (
		<div className="loginBox states">
			<div className="loginBoxHeader states1">STATES</div>
			<div style={{fontSize: 'x-large', display: "flex", justifyContent: 'center', alignItems: 'center'}} className="loginBoxOutside">
				<div style={{textShadow: ' 0.1em 0.1em #FA005E'}} className="statesValues" >
					<span style={{color: "orange"}}>
						<AnimatedText duration={1} className="name" animationType="bounce">
							Win Rate
						</AnimatedText>
					</span>
					<span style={{color: "orange"}}>
					<AnimatedText duration={1} className="name" animationType="bounce">
						72.2%
						</AnimatedText>
						</span>
				</div>
				<div style={{textShadow: ' 0.1em 0.1em #1f596b'}} className="statesValues">
					<span style={{color: "#009e73"}}>
					<AnimatedText duration={2} className="name" animationType="bounce">
						Wins
					</AnimatedText>
						</span>
					<span style={{color: "#009e73"}}>
					<AnimatedText duration={2} className="name" animationType="bounce">
						75
					</AnimatedText>
						</span>
				</div>
				<div style={{textShadow: ' 0.1em 0.1em #FA005E'}} className="statesValues">
					<span style={{color: "#ff7670"}}>
					<AnimatedText duration={3} className="name" animationType="bounce">
						Loses
					</AnimatedText>
						</span>
					<span style={{color: "#ff7670"}}>
					<AnimatedText duration={3} className="name" animationType="bounce">
						21
					</AnimatedText>
						</span>
				</div>
			</div>
		</div>
  );
}

const BottomLeft = () => {
	return (
		<div className="loginBox achievements">
			<div className="loginBoxHeader achievements1">ACHIEVEMENTS</div>
			<div className="loginBoxOutside achievements2">
			<HorizontalScroll>
				<img src={medaille}/>
				<img src={savage}/>
				<img src={endpoint}/>
				<img src={key}/>
				<img src={siif}/>
				<img src={medaille}/>
			</HorizontalScroll>
			</div>
		</div>
	);
}


const MatchResult = (props: {player1 : string,  player2 : string, color : string, rslt1 : number, rslt2 : number }) => {
  return (
	<div className="match1" style={{background: props.color, border: '1px solid black'}}>
		<div className="left">
		<img src={image} style={{width: '40px', height: '40px', marginRight: '10px', marginLeft: '10px'}} className="player1"/>
		<span>{props.player1}</span>
		</div>
	<div className="result">
		<span>{props.rslt1} : {props.rslt2}</span>
	</div>
	<div className="right">
		<span>{props.player2}</span>
		<img src={endpoint} style={{width: '40px', height: '40px', marginLeft: '10px'}} className="player2"/>
		</div>
	</div>
  );
}

interface Token {
	id : string
}
const BottomRight= () => {
	const [userData, setUserData] = useState({
		username : ""
	});
	useEffect(() => {
		async function fetchData () {
			const cookie = new Cookies();
			const token : Token = jwt_decode(cookie.get('jwt'));
			if (token) {
				const endpoint = 'http://localhost:3000/users/' + token.id;
				const response = await axios.get(endpoint, { withCredentials: true });
				setUserData(response.data);
			}
		}
		fetchData();
	}, []);

	console.log("userData ", userData)

	const win = "#ff7670";
	const lose = "#009e73";
	const draw = "#178ee1";
	return (
	<div className="loginBox latest-matches">
		<div className="loginBoxHeader latest-matches1">LATEST MATCHES</div>
			<div className="loginBoxOutside latest-matches2">	
			<div className="matcheHistory">
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={win}/>
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={lose}/>
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={draw}/>
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={win}/>
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={lose}/>
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={draw}/>
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={lose}/>
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={lose}/>
				<MatchResult player1={userData.username} player2="Oppenent" rslt1={1} rslt2={1} color={lose}/>
			</div>
			</div>
	</div>
  );
}




export default function Home() {

	const AcceptFriend = async () =>  {
		await axios.patch("http://localhost:3000/users/acceptFriendRequest", {withCredentials : true})
		.then((rese) => {
			console.log("Notifcation Accept ", rese);
		})

	}

	const RefuseFriend = async () => {
		await axios.patch("http://localhost:3000/users/refuseFriendRequest", {withCredentials : true})
		.then((rese) => {
			console.log("Notifcation Accept ", rese);
		})
	}


  useEffect(() => {
	socket.on('notification', (data) => {
		console.log('Received notification:', data);
		const audio = new Audio(notification);
		audio.play();
		toast.custom(
			<div style={{ display: 'flex', alignItems: 'center', color: 'black', borderRadius: '10px', zIndex: '-1',}}>
				<div style={{ width: '400px', height: '120px' }} className="nes-container with-title is-centered">
					<p style={{ background: '#ffeeca', border: '2px solid black' }} className="title">Invitation Request</p>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<img src={avatar} style={{ borderRadius: '30px', width: '50px', height: '50px' }} alt="avatar"/>
				<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{data.username}</span>
				<button style={{ marginLeft: '10px' }} onClick={AcceptFriend}>Accept</button>
				<button style={{ marginLeft: '10px' }} onClick={RefuseFriend}>Deny</button>
				</div>
				</div>
			</div>,
			{ duration: 5000, position: 'top-right' });
		});
	}, []);

  return (
    <div style={{ height: '100vh' }}>
		<Toaster/>
        <TopContainer />
      <div className="top-containers">
          <TopLeft />
          <TopRight />
      </div>
      <div className="bottom-containers">
		<BottomLeft />
		<BottomRight />
		</div>
    </div>
  );
}
