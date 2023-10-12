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
import WelcomePage from './Pages/welcomePage/welcomePage';
import TwoFa from './Pages/2FA/twoFA';
import Home from './Pages/HomePage/Home';
import ProfilPage from './Pages/profilPage/profilPage';
import axios from 'axios';
import ChatPage from './Pages/chatPage/chatPage'
import { socket, socketContext } from './Pages/socket-client';
import ChatPageGroup from './Pages/chatPageGroups/chatPageGroup';
import OtherProfilPage from './Pages/userProfilPage/userProfilPage'

export const OtherUser = () => {
	return (
		<>
			<Stars/>
			<NavBar/>
			<OtherProfilPage/>
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
			<Stars/>
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
			<Stars/>
			<NavBar/>
			<LoginSettings/>
		</>
	);
}

const TwoFAComponents = () => {
	return (
		<>
			<Stars/>
			<TwoFa/>
		</>
	);
}
const HomeComponents = () => {
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

// const GameComponents = () => {
// 	return (
// 		<>
// 			<Stars/>
// 			<Setup/>
// 		</>
// 	);
// }

const ErrorTextPage = () => {
	return (
		<h1 style={{alignContent: 'center', justifyContent: 'center', display: 'flex', fontSize: '200px'}}>404</h1>
	);
}


const Routing = () => {
	const cookies = new Cookies();
	const logged = cookies.get('jwt');
	const [userData, setUserData] = useState({
		twofaStatus: false,
		isAuthenticated : false
	});
	const [twoFAStatuss, setTwoFAStatus] = useState(false);
	if (logged){
		const token = jwt_decode(logged);
		useEffect(() => {
			const endpoint = `http://localhost:3000/users/${token.id}`;
			axios.get(endpoint, {withCredentials: true})
			.then((response) => {
				setUserData({
					twofaStatus: response.data.twofa,
					isAuthenticated: response.data.authenticated
			})})
			.catch((error) => {
				console.log(error)
			})
		}, [token.id])

  
		useEffect(() => {
			const fetchTwoFAVerificatoin = async () => {
			try {
				const endpoint = 'http://localhost:3000/auth/2fa/get2FAstatus';
				const response = await axios.get(endpoint, { withCredentials: true });
				setTwoFAStatus(response.data);
			}
			catch (error) {
				console.log(error);
			}
		};
		fetchTwoFAVerificatoin();
		}, []);

	}
	console.log("User Logged and 2FA Disabled -> ", logged && !userData.twofaStatus)
	console.log("User Logged and 2FA Enabled -> ", logged && userData.twofaStatus)
	console.log("User is not Logged in -> ", !logged )
	return (
		<BrowserRouter>
		<Routes>
			{/* User Logged and 2FA Disabled */}
			{logged && !userData.twofaStatus && (
				<>
					<Route path="/settings" element={<LoginSettingsComponents/>}/>
					<Route path="/home" 	element={<HomeComponents/>}/>
					<Route path="/profil/*"	element={<OtherUser/>}/>
					{/* <Route path="/game" 	element={<GameComponents/>}/> */}
					<Route path="/chat" 	element={<ChatPage/>}/>
					<Route path="/groups" 	element={<ChatGroupsComponents/>}/>
					<Route path="/profil" 	element={<ProfilComponents/>}/>
					<Route path="/*" 		element={<ErrorTextPage/>}/>
				</>
			)}
			{/* User Logged and 2FA Enabled */}
			{logged && userData.twofaStatus && (
				<>
					<Route path="/two-factor-authentication"	element={<TwoFAComponents/>}/>
				</>
			)}
			{/* User is not logged in */}
			{!logged && (
				<>
					<Route path="/welcome"	element={<WelcomePage/>}/>
					<Route path="/login"	element={<LoginPage/>}/>
					<Route path="/*"		element={<Navigate to="/login"/>}/>
				</>
			)}
			</Routes>
		</BrowserRouter>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
	<Routing/>
	<BrowserRouter>
		<Routes>
			{["/welcome", "/"].map((idx) => 
			<Route path={idx}	Component={WelcomePage} key={""}/>
			)}  
			<Route path="/login"	Component={LoginPage}/>
		</Routes>
	</BrowserRouter>
  </React.StrictMode>
)