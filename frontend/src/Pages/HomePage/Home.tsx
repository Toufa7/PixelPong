import "./Home.scss";

/******************* Packages  *******************/
import jwt_decode from 'jwt-decode';
import { Cookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
/******************* Includes  *******************/
import medaille from './assets/medaille.svg';
import savage from './assets/savage.svg';
import siif from './assets/siif.svg';
import endpoint from './assets/endpoint.svg';
import key from './assets/key.svg';
import image from './assets/medaille.svg'
/*************************************************/


const TopContainer = () => {
	const textInfos = [
		"Perfect your ping pong skills in our dedicated practice area",
		"Challenge your friends to exciting ping pong matches."
	];
	
	const [userData, setUserData] = useState('my friend');
	useEffect(() => {
		async function fetchData () {
			const cookie = new Cookies();
			const token = jwt_decode(cookie.get('jwt'));
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
		  <div className="loginBoxHeader">Welcome {userData.username}</div>
		  <div className="loginBoxOutside">
			<div className="playRaw">
			  <div className="playWith Friend">
					<p>{textInfos[0]}</p>
					<a style={{width: '100px'}} className="nes-btn" href="#">Vamos</a>
			  </div>
			  <div className="playWith Practice">
					<p>{textInfos[1]}</p>
					<a style={{width: '100px'}} className="nes-btn" href="#">Vamos</a>
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
		<div className="loginBoxHeader on-going-matches1">LEADERBOARD</div>
		<div className="loginBoxOutside on-going-matches2">
			<div style={{background: "#FDD43B"}}className="match1">
				<span className="position">1</span>
				<span className="name">Martin Ødegaard</span>
				<span className="wins">95</span>
				<span className="loses">10</span>
				<span className="draw">12</span>
			</div>
			<div style={{background: "#BFBFBF"}} className="match1">
				<span className="position">2</span>
				<span className="name">Bukayo Saka</span>
				<span className="wins">12</span>
				<span className="loses">76</span>
				<span className="draw">1</span>
			</div>
			<div  style={{background: "#CA7E40"}} className="match1">
				<span className="position">3</span>
				<span className="name">William Saliba</span>
				<span className="wins">4</span>
				<span className="loses">0</span>
				<span className="draw">1</span>
			</div>
			<div className="match1">
				<span className="position">4</span>
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
					<span style={{color: "orange"}}>Win Rate</span>
					<span style={{color: "orange"}}>72.2%</span>
				</div>
				<div style={{textShadow: ' 0.1em 0.1em #1f596b'}} className="statesValues">
					<span style={{color: "#009e73"}}>Wins</span>
					<span style={{color: "#009e73"}}>75</span>
				</div>
				<div style={{textShadow: ' 0.1em 0.1em #FA005E'}} className="statesValues">
					<span style={{color: "#ff7670"}}>Loses</span>
					<span style={{color: "#ff7670"}}>21</span>
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


const BottomRight= () => {
	const [userData, setUserData] = useState('my friend');
	useEffect(() => {
		async function fetchData () {
			const cookie = new Cookies();
			const token = jwt_decode(cookie.get('jwt'));
			if (token) {
				const endpoint = 'http://localhost:3000/users/' + token.id;
				const response = await axios.get(endpoint, { withCredentials: true });
				setUserData(response.data);
			}
		}
		fetchData();
	}, []);
	console.log("Image ", userData);
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

function Home() {
	return (
		<div style={{height: '100vh'}}>
			<TopContainer/>
			<div className="top-containers">
			<TopLeft/>
			<TopRight/>
			</div>
			<div className="bottom-containers">
			<BottomLeft/>
			<BottomRight/>
			</div>
		</div>
  );
}

export default Home;