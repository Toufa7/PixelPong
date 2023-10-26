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
const OtherProfilPage = lazy(() => import('./Pages/userProfilPage/userProfilPage'));
const Setup = lazy(() => import('./Pages/GamePage/Setup_Game_Front'));
const Error = lazy(() => import('./Pages/errorPage/errorPage'));
const Notification = lazy(() => import('./Pages/Notifications/Notifications'));
import GroupPage from './Pages/newGroupChat/GrpChatPage';
import Dogo from "./Pages/dogo.gif";

export const OtherUser = () => {
	return (
		<>
			<OtherProfilPage/>
		</>
	);
}
export const NotificationComponents = () => {
	return (
		<>
			<Stars/>
			<NavBar/>
			<Notification/>
		</>
	);
}


const ProfilComponents = () => {
	return (
		<>
			<Stars/>
			<NavBar/>
			<ProfilPage/>
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
			{/* <Stars/> */}
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
	const [userData, setUserData] = useState({
		logged: false,
		twofaStatus: false,
		isAuthenticated : false,
		ingame: false
	});
	const [twoFAStatuss, setTwoFAStatus] = useState(false);
		useEffect(() => {
			axios.get(`http://localhost:3000/users/profil`, {withCredentials: true})
			.then((response) => {
				setUserData({
					logged: true,
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
	
	// console.log("User Logged and 2FA Disabled -> ", logged && !userData.twofaStatus)
	// console.log("User Logged and 2FA Enabled -> ", logged && userData.twofaStatus)
	// console.log("User Logged and 2FA Enabled And Code Valid -> ", logged && userData.twofaStatus && twoFAStatuss)
	// console.log("User is not Logged in -> ", !logged )
	return (
		<BrowserRouter>
		<Suspense fallback={<div><img src={'https://64.media.tumblr.com/02f1e684630962dfde601535ca66c7ec/4f559fadb3dc32b2-db/s1280x1920/b30ed1f7179224fc6c882fc432975dea793cf25a.gifv'}/> </div>}>
		<Routes>
			{/* User Logged and 2FA Disabled || User Logged and 2FA Enabled and Valid Code */}
			{userData.logged && !userData.twofaStatus && (
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
					<Route path="/*" 				element={<Error title={"Page Not Found"} errorType={'it\'s looking like you may have taken a wrong turn. Don\'t worry ... it happens to the most of us'} msg={"Feel free to explore other features of our website or consider signing up if you haven't already"} />}/>
					<Route path="/two-factor-authentication"	element={<TwoFAComponents/>}/>


				</>
			)}
			{/* User Logged and 2FA Enabled */}
			{userData.logged  && userData.twofaStatus && (
				<>
					<Route path="/two-factor-authentication"	element={<TwoFAComponents/>}/>
				</>
			)}
			{/* User is not logged in */}
			{!userData.logged  && (
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
