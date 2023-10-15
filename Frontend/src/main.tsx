import ReactDOM from 'react-dom/client'
import 'nes.css/css/nes.min.css';
/******************* Packages  *******************/
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
const ChatPageGroup = lazy(() => import('./Pages/chatPageGroups/chatPageGroup'));
const OtherProfilPage = lazy(() => import('./Pages/userProfilPage/userProfilPage'));
const Setup = lazy(() => import('./Pages/GamePage/Setup_Game_Front'));
// import Setup from './Pages/GamePage/Setup_Game_Front';
import Dogo from "./Pages/dogo.gif";

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
			<img style={{width: '600px', height: '600px', borderRadius: '50%'}} src={Dogo} alt='Already In Game'/>
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
		// const token = jwt_decode(logged);
		useEffect(() => {
			const endpoint = `http://localhost:3000/users/profil`;
			axios.get(endpoint, {withCredentials: true})
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

		console.log("The InGame Status -> ", userData.ingame);	
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
		<Suspense fallback={<div>Loading...</div>}>

		<Routes>
			{/* User Logged and 2FA Disabled */}
			{logged && !userData.twofaStatus && (
				<>
					<Route path="/settings" element={<LoginSettingsComponents/>}/>
					<Route path="/home" 	element={<HomeComponents/>}/>
					<Route path="/profil/*"	element={<OtherUser/>}/>
					{!userData.ingame ? (<Route path="/game" 	element={<GameComponents/>}/>) : (<Route path="/*" 		element={<AlreadyInGame/>}/>)}
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
				</>
			)}
			</Routes>
			</Suspense>
		</BrowserRouter>
	);
};


// const router = createBrowserRouter([
// 	{path: "settings",element: <LoginSettingsComponents/>},
// 	{path: "profil/:",element: <HomeComponents/>},
// 	{path: "chat",element: <LoginSettingsComponents/>},
// 	{path: "groups",element: <HomeComponents/>},
// 	{path: "profil",element: <LoginSettingsComponents/>},
// 	{path: "home",element: <HomeComponents/>},
// 	{path: "settings",element: <LoginSettingsComponents/>},
// ])

// <RouterProvider router={router} />


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Routing/>
	</React.StrictMode>
)
