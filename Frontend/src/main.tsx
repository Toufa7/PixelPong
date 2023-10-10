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
	// //console.log("yaaaaaaaaaaaaaaaaaaaaaaaaaaa wld nas ")
	// useEffect(()=>{
	// 	socket?.on("connect",()=>{
	// 		//console.log("im connected");
	// 	socket.close()
	// })
	// },[]);
	
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
		{/* <Setup/> */}
		</>
	);
}


const Routing = () => {
	const cookies = new Cookies();
	const logged = cookies.get('jwt');
	const [data, setData] = useState(false);
	const [twoFAStatus, setTwoFAStatus] = useState(false);
	useEffect(() => {
		const cookies = new Cookies();
		const jwt = cookies.get('jwt');
		const token = jwt_decode(jwt);
		const fetchData = async () => {
			try {
				const endpoint = 'http://localhost:3000/auth/2fa/get2FAstatus';
				const endpoint1 = `http://localhost:3000/users/${token.id}`;
	
				const [response, response1] = await Promise.all([
					axios.get(endpoint1, { withCredentials: true }),
					axios.get(endpoint, { withCredentials: true })
				]);
				setData(response1.data);
				setTwoFAStatus(response.data);
			}
			catch (error) {
				console.log("Error" , error);
			}};
			fetchData();
	}, []);

	console.log("Status => ", twoFAStatus);

	if (logged) {
		console.log("2FA Enabled And Success")
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
				<Route path="/*"			element={<h1>404</h1>}/>
			</Routes>
		</BrowserRouter>
	);
	}
	else
	{
		console.log("Not Logged Yet")
		return (
			<BrowserRouter>
				<Routes>
					<Route path="welcome"	Component={welcomePage}/>
					<Route path="private"	Component={HomeComponents}/>
					<Route path="/"			Component={welcomePage}/>
					<Route path="*"			Component={LogingPageComponents}/>
				</Routes>
			</BrowserRouter>
		);
	}

	// if ((logged && twoFAStatus.twofa && twoFAStatus.authenticated) || (logged && !twoFAStatus.twofa)) {
	// 	console.log("2FA Enabled And Success")
	// 	return (
	// 	<BrowserRouter>
	// 		<Routes>
	// 			<Route path="settings"	Component={ LoginSettingsComponents} />
	// 			<Route path="home"		Component={HomeComponents}/>
	// 			<Route path="profil/"	Component={ProfilComponents}/>
	// 			<Route path="game"		Component={GameComponents}/>
	// 			<Route path="profil/*"	Component={OtherUser}/>
	// 			<Route path="chat"		Component={ChatPage}/>
	// 			<Route path="/groups"	Component={ChatGroupsComponents}/>
	// 			<Route path="*"			element={<h1>404</h1>}/>

	// 		</Routes>
	// 	</BrowserRouter>
	// 	);
	// }
	// else if (logged && twoFAStatus.twofa){
	// 	console.log("2FA Enabled")
	// 	return (
	// 		<BrowserRouter>
	// 			<Routes>
	// 				<Route path="*"	 Component={twoFAComponents}/>
	// 				<Route path="private"	 Component={HomeComponents}/>
	// 			</Routes>
	// 		</BrowserRouter>
	// 	);	
	// }
	// else if (!logged)
	// {
	// 	console.log("Not Logged Yet")
	// 	return (
	// 		<BrowserRouter>
	// 			<Routes>
	// 				<Route path="welcome"	Component={welcomePage}/>
	// 				<Route path="private"	Component={HomeComponents}/>
	// 				<Route path="/"			Component={welcomePage}/>
	// 				<Route path="*"			Component={LogingPageComponents}/>
	// 			</Routes>
	// 		</BrowserRouter>
	// 	);
	// }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
	{/* <Routing/> */}
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