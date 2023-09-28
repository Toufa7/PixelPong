import "./Home.scss";

/******************* Includes  *******************/
import logo from '../addons/assets/ping-pong-ball.svg';
import medaille from './assets/medaille.svg';
import savage from './assets/savage.svg';
import siif from './assets/siif.svg';
import endpoint from './assets/endpoint.svg';
import key from './assets/key.svg';
import jwt_decode from 'jwt-decode';
import { Cookies } from "react-cookie";
import axios from "axios";


// type UserInfo = {
// 	username: string,
// 	image: string 
// }

// const extractInfo = () : UserInfo => {
// 	const cookies = new Cookies();
// 	const token = jwt_decode(cookies.get('jwt'));
// 	const endpoint = "http://localhost:3000/users/" + token.sub;
// 	axios.get(endpoint, {withCredentials: true})
// 	.then((response) => {
// 		console.log("My Response => " ,response.data)
// 		console.log("My Response Username => " ,response.data.username)
// 		return {
// 			username : response.data.username,
// 			image: token.image
// 		}
// 	})
// 	.catch((errror) => 
// 		console.log(errror)
// 	)

// }

const TText = () => {

	let objectii = {};
	const cookies = new Cookies();
	const token = jwt_decode(cookies.get('jwt'));
	const endpoint = "http://localhost:3000/users/" + token.sub;
	axios.get(endpoint, {withCredentials: true})
	.then((response) => {
		objectii = response;
		
	});
	return (objectii);
	
}


const TopContainer = () => {
	const a = TText();
	
	console.log("first ", a);
	return (
		<div className="headerBox">
		<div className="topLoginBox">
			<div className="loginBoxHeader">Welcome {username}</div>
			<div className="loginBoxOutside">
			<div className="playRaw">
				<div className="playWith Friend">
				<p>{text[0]}</p>
				<a className="nes-btn" href="#">Let's go</a>
				</div>
				<div className="playWith Practice">
				<p>{text[1]}</p>
				<a className="nes-btn" href="#">Let's go</a>
				</div>
				</div>
			</div>
			</div>
		</div>
  );
}

const TopLeft = () => {
	return (
	<div className="loginBox on-going-matches">
		<div className="loginBoxHeader on-going-matches1">LEADERBOARD</div>
		<div className="loginBoxOutside"></div>
	</div>
	);
}

const TopRight = () => {
	return (
		<div className="loginBox states">
			<div className="loginBoxHeader states1">STATES</div>
			<div style={{display: "flex", justifyContent: 'center'}} className="loginBoxOutside">
				<div className="statesValues">
					<span>Win Rate</span>
					<span>72.2%</span>
				</div>
				<div className="statesValues">
					<span>Wins</span>
					<span>75</span>
				</div>
				<div className="statesValues">
					<span>Wins</span>
					<span>75</span>
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
			<img src={medaille}/>
				<img src={savage}/>
				<img src={siif}/>
				<img src={medaille}/>
				<img src={endpoint}/>
				<img src={key}/>
			</div>
		</div>
	);
}


const MatchResult = (props: {player1 : string, player2 : string, result : string}) => {
	// const {image} = extractInfo();
	const image = "A";

  return (
	<div className="match1" style={{background: props.result, border: '1px solid black'}}>
	  <div className="left">
		<img src={image} style={{width: '40px', height: '40px', marginRight: '10px', marginLeft: '10px'}} className="player1"/>
		<span>{props.player1}</span>
	  </div>
	  <div className="result">
		<span>6 : 0</span>
	  </div>
	  <div className="right">
		<span>{props.player2}</span>
		<img src={logo} style={{width: '40px', height: '40px', marginLeft: '10px'}} className="player2"/>
	  </div>
	</div>
  );
}


const BottomRight= () => {
	let username = "test"
	// const {username} = extractInfo();

  return (
	<div className="loginBox latest-matches">
		<div className="loginBoxHeader latest-matches1">LATEST MATCHES</div>
		  <div className="loginBoxOutside latest-matches2">
			<div className="matcheHistory">
			  <MatchResult player1={username} player2="Oppenent" result="#ff7670"/>
			  <MatchResult player1={username} player2="Oppenent" result="#ff7670"/>
			  <MatchResult player1={username} player2="Oppenent" result="#009e73"/>
			  <MatchResult player1={username} player2="Oppenent" result="#178ee1"/>
			  <MatchResult player1={username} player2="Oppenent" result="#178ee1"/>
			  <MatchResult player1={username} player2="Oppenent" result="#009e73"/>
			  <MatchResult player1={username} player2="Oppenent" result="#009e73"/>
			  <MatchResult player1={username} player2="Oppenent" result="#009e73"/>
			  <MatchResult player1={username} player2="Oppenent" result="#009e73"/>
			</div>
		  </div>
	</div>
  );
}

function Home() {
  return (
	<div>
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
