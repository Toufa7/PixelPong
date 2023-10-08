import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

/******************* Packages  *******************/

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Cookies from 'universal-cookie';

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
	// console.log("yaaaaaaaaaaaaaaaaaaaaaaaaaaa wld nas ")
	// useEffect(()=>{
	// 	socket?.on("connect",()=>{
	// 		console.log("im connected");
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


const Redirect2FA = () => {
	const [twoFAStatus, setTwoFAStatus] = useState(false);
  
	useEffect(() => {
		const fetchTwoFAStatus = async () => {
		try {
			const endpoint = 'http://localhost:3000/auth/2fa/get2FAstatus';
			const response = await axios.get(endpoint, { withCredentials: true });
			setTwoFAStatus(response.data);
		}
		catch (error) {
			console.log(error);
		}
	};
	fetchTwoFAStatus();
	}, []);
  
	if (twoFAStatus) {
		return (
		<BrowserRouter>
			<Routes>
			<Route path="two-factor-authentication" Component={twoFAComponents} />
			</Routes>
		</BrowserRouter>
		);
	}
	else {
		return <></>;
	}
  };
  

const RedirectToSettings = () => {
	const cookies = new Cookies();
	const jwt = cookies.get('jwt');	

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
				<Route path="*" 		element={<ErrorPage/>} />			
			</Routes>
		</BrowserRouter>
		);
		
	}
	else
	{
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/"			element={<Navigate to="welcome"/>}/>
					<Route path="welcome"	element={<Navigate to="welcome"/>}/>
					<Route path="*"			element={<Navigate to="/login"/>}/>
				</Routes>
			</BrowserRouter>
		);
	}
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
	<RedirectToSettings/>
	<Redirect2FA/>
	<BrowserRouter>
		<Routes>
			{["welcome", "/"].map((idx) => 
			<Route path={idx}	Component={welcomePage} key={""}/>
			)}  
			<Route path="login"	Component={LogingPageComponents}/>
		</Routes>
	</BrowserRouter>
  </React.StrictMode>
)
