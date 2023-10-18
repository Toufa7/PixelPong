import ReactDOM from 'react-dom/client'
import 'nes.css/css/nes.min.css';
/******************* Packages  *******************/
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import { socket, socketContext } from './Pages/socket-client';
import React, { Suspense, lazy, useEffect, useState } from 'react'
import axios from 'axios';
/******************* Includes  *******************/
const NavBar = lazy(() => import('./Pages/addons/NavBar'));
const Stars = lazy(() => import('./Pages/addons/Stars'));
const LoginSettings = lazy(() => import('./Pages/loginSettings/LoginSettings'));
const LoginPage = lazy(() => import('./Pages/loginPage/LoginPage'));
const WelcomePage = lazy(() => import('./Pages/welcomePage/welcomePage'));
const TwoFa = lazy(() => import('./Pages/2FA/twoFA'));
const Home = lazy(() => import('./Pages/HomePage/Home'));
const ProfilPage = lazy(() => import('./Pages/profilPage/profilPage'));
const ChatPage = lazy(() => import('./Pages/chatPage/chatPage'));
import GroupPage from './Pages/newGroupChat/GrpChatPage';
const OtherProfilPage = lazy(() => import('./Pages/userProfilPage/userProfilPage'));
const Setup = lazy(() => import('./Pages/GamePage/Setup_Game_Front'));
const Error = lazy(() => import('./Pages/errorPage/errorPage'));
const Notification = lazy(() => import('./Pages/Notifications/Notifications'));
import Dogo from "./Pages/dogo.gif";

export const OtherUser = () => {
	return (
		<>
			<Stars/>
			{/* <NavBar/> */}
			<OtherProfilPage/>
		</>
	);
}
export const NotificationComponents = () => {
	return (
		<>
        <NavBar/>
        <Stars/>
		<Notification/>
		</>
	);
}

// export const ChatComponents = () => {
// 	return (
// 		<>
// 			<ChatPage/>
// 		</>
// 	);
// }


// export const ChatGroupsComponents = () => {
// 	return (
// 		<>
// 			{/* <Stars/> */}
// 			<ChatPageGroup/>
// 		</>
// 	);
// }

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

const GameComponents = () => {
	return (
		<>
			<Stars/>
			<Setup/>
		</>
	);
}

const ErrorTextPage = () => {
	return (
		<h1 style={{alignContent: 'center', justifyContent: 'center', display: 'flex', fontSize: '200px'}}>404</h1>
	);
}

const AlreadyInGame = () => {
	return (
		<div>
			<img style={{display:'flex', alignItems: 'center', width: '600px', height: '600px', borderRadius: '50%' , padding:'50px'}} src={Dogo} alt='Already In Game'/>
			{/* <img style={{width: '600px', height: '600px', borderRadius: '50%'}} src="" alt='Already In Game'/> */}
			<h1 style={{alignContent: 'center', justifyContent: 'center', display: 'flex', fontSize: '50px', color: 'white'}}>Already In Game</h1>
		</div>
	);
}

const Routing = () => {
	const cookies = new Cookies();
	const logged = cookies.get('jwt');
	const [userData, setUserData] = useState({
		twofaStatus: false,
		isAuthenticated : false,
		ingame: false
	});
	const [twoFAStatuss, setTwoFAStatus] = useState(false);
	if (logged){
		useEffect(() => {
			axios.get(`http://localhost:3000/users/profil`, {withCredentials: true})
			.then((response) => {
				setUserData({
					twofaStatus: response.data.twofa,
					isAuthenticated: response.data.authenticated,
					ingame: response.data.ingame
			})})
			.catch((error) => {
				console.log(error)
			})
		}, [])

		useEffect(() => {
			const fetchTwoFAVerification = async () => {
			try {
				const response = await axios.get('http://localhost:3000/auth/2fa/get2FAstatus', { withCredentials: true });
				setTwoFAStatus(response.data);
			}
			catch (error) {
				console.log(error);
			}
		};
		fetchTwoFAVerification();
		}, []);
	}
	// console.log("User Logged and 2FA Disabled -> ", logged && !userData.twofaStatus)
	// console.log("User Logged and 2FA Enabled -> ", logged && userData.twofaStatus)
	// console.log("User Logged and 2FA Enabled And Code Valid -> ", logged && userData.twofaStatus && twoFAStatuss)
	// console.log("User is not Logged in -> ", !logged )
	return (
		<BrowserRouter>
		<Suspense fallback={<div>Loading...</div>}>
		<Routes>
			{/* User Logged and 2FA Disabled || User Logged and 2FA Enabled and Valid Code */}
			{logged && !userData.twofaStatus && (
				<>
					<Route path="/settings" 		element={<LoginSettingsComponents/>}/>
					<Route path="/home" 			element={<HomeComponents/>}/>
					<Route path="/" 				element={<HomeComponents/>}/>
					<Route path="/profil/:userId"	element={<OtherUser/>}/>
					{!userData.ingame ?
						(<Route path="/game" 		element={<GameComponents/>}/>)
							:
						(<Route path="/*" 			element={<AlreadyInGame/>}/>)}
					<Route path="/chat" 			element={<ChatPage/>}/>
					<Route path="/notifications" 	element={<NotificationComponents/>}/>
					<Route path="/groups" 			element={<GroupPage/>}/>
					<Route path="/profil" 			element={<ProfilComponents/>}/>
					<Route path="/login" 			element={<Navigate to="/" replace/>}/>
					<Route path="/welcome" 			element={<Navigate to="/" replace/>}/>
					<Route path="/*" 				element={<Error/>}/>
					<Route path="/two-factor-authentication"	element={<TwoFAComponents/>}/>


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
					<Route path="/"			element={<WelcomePage/>}/>
					<Route path="/welcome"	element={<WelcomePage/>}/>
					<Route path="/login"	element={<LoginPage/>}/>
					<Route path="*"		element={<Navigate to="/login" replace/>}/>
				</>
			)}
			</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

	
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense>
			<Routing/>
		</Suspense>
	</React.StrictMode>
)
