import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

/******************* Packages  *******************/

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
/******************* Includes  *******************/
import NavBar from './Pages/addons/NavBar';
import Stars from './Pages/addons/Stars';
import LoginSettings from './Pages/loginSettings/LoginSettings';
import LoginPage from './Pages/loginPage/LoginPage';
import welcomePage from './Pages/welcomePage/welcomePage';
import TwoFa from './Pages/2FA/twoFA';
import Home from './Pages/HomePage/Home';
import ProfilPage from './Pages/profilPage/profilPage';
import axios from 'axios';
import ChatPage from './Pages/chatPage/chatPage'
import { socket, socketContext } from './Pages/socket-client';
import ChatPageGroup from './Pages/chatPageGroups/chatPageGroup';
import OtherProfilPage from './Pages/userProfilPage/userProfilPage'
import ErrorPage from './Pages/errorPage/errorPage';
import { Setup } from './Pages/GamePage/Setup_Game_Front';
import { Socket } from 'socket.io-client';
import { socket_gm }from './Pages/GamePage/game_flow_sketch';

let InGame : boolean;
let user_id : string;


export const OtherUser = () => {
	return (
		<>
			<Stars/>
			<NavBar/>
			<OtherProfilPage/>
		</>
	);
}


export const LogingPageComponents = () => {
	return (
		<>
			
			<Stars/>
			<LoginPage/>
		</>
	);
}

export const ChatComponents = () => {
	return (
		<>
			<ChatPage/>
		</>
	);
}




export const ChatGroupsComponents = () => {
	return (
		<>
			{/* <Stars/> */}
			<ChatPageGroup/>
		</>
	);
}

const ProfilComponents = () => {
	return (
		<>
		{/* <socketContext.Provider value={socket}> */}
			<Stars/>
			<NavBar/>
			<ProfilPage/>
		{/* </socketContext.Provider> */}
		</>
	);
}

const LoginSettingsComponents = () => {
	return (
		<>
			<NavBar/>
			<LoginSettings/>
			<Stars/>
		</>
	);
}

const twoFAComponents = () => {
	return (
		<>
			<Stars/>
			<TwoFa/>
		</>
	);
}
const HomeComponents = () => {
	// const socket = useContext(socketContext);


	
	return (
		<>
		<socketContext.Provider value={socket}>
			<Stars/>
			<NavBar/>
			<Home/>
		</socketContext.Provider>
		</>
	);
}

const GameComponents = () => {
	return (
		<>
		<Stars/>
		<Setup/>
		</>
	);
}


const RedirectToSettings = () => {
	const cookies = new Cookies();
	const jwt = cookies.get('jwt');
	const token : any = jwt_decode(jwt);
	console.log("A")
	const [data, setData] = useState(false);
	useEffect(() => {
		const fetchTwoFAStatus = async () => {
			try {
				const endpoint1 = `http://localhost:3000/users/${token.id}`;
				const response1 = await axios.get(endpoint1, { withCredentials: true });
				setData(response1.data);
				console.log("DATA -> ", response1.data);
			}
		catch (error) {
			console.log(error);
		}
	};
	// fetchTwoFAVerificatoin();
	}, []);

	const [twoFAStatus, setTwoFAStatus] = useState(false);
  
	useEffect(() => {
		const fetchTwoFAVerificatoin = async () => {
		try {
			const endpoint = 'http://localhost:3000/auth/2fa/get2FAstatus';
			const response = await axios.get(endpoint, { withCredentials: true });
			setTwoFAStatus(response.data);
		}
		catch (error) {
			//console.log(error);
		}
	};
	fetchTwoFAVerificatoin();
	}, []);
  

	console.log("2FA Status => ", twoFAStatus);
	console.log("2FA Code => ", data);
	console.log("JWT => ", jwt);
	
	if (jwt) {
		return (
		<BrowserRouter>
			<Routes>
				<Route path="settings"	Component={ LoginSettingsComponents} />
				<Route path="home"		Component={HomeComponents}/>
				<Route path="profil/"	Component={ProfilComponents}/>
				<Route path="game"		Component={GameComponents}/>
				<Route path="profil/*"	Component={OtherUser}/>
				<Route path="chat"		Component={ChatPage}/>
				<Route path="/groups"	Component={ChatGroupsComponents}/>
				<Route path="*"			element={<p>404</p>}/>

			</Routes>
		</BrowserRouter>
		);
		
	}
	// else if (jwt && twoFAStatus && !data ){
	// 	return (
	// 		<BrowserRouter>
	// 			<Routes>
	// 				<Route path="*"	 element={<Navigate to="/two-factor-authentication"/>}/>
	// 			</Routes>
	// 		</BrowserRouter>
	// 	);	
	// }
	// else
	// {
	// 	return (
	// 		<BrowserRouter>
	// 			<Routes>
	// 				<Route path="/"			element={<Navigate to="welcome"/>}/>
	// 				<Route path="welcome"	element={<Navigate to="welcome"/>}/>
	// 				<Route path="*"			element={<Navigate to="/login"/>}/>
	// 			</Routes>
	// 		</BrowserRouter>
	// 	);
	// }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
	{/* <RedirectToSettings/> */}
	<BrowserRouter>
		<Routes>
			{["welcome", "/"].map((idx) => 
			<Route path={idx}	Component={welcomePage} key={""}/>
			)}  
			<Route path="login"	Component={LogingPageComponents}/>
			<Route path="settings"	Component={ LoginSettingsComponents} />
			<Route path="home"		Component={HomeComponents}/>
			<Route path="profil/"	Component={ProfilComponents}/>
			<Route path="game"		Component={GameComponents}/>
			<Route path="profil/*"	Component={OtherUser}/>
			<Route path="chat"		Component={ChatPage}/>
			<Route path="/groups"	Component={ChatGroupsComponents}/>
		</Routes>
	</BrowserRouter>
  </React.StrictMode>
)