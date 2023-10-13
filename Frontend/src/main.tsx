import ReactDOM from 'react-dom/client'
import 'nes.css/css/nes.min.css';
/******************* Packages  *******************/
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
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
// import { Setup } from './Pages/GamePage/Setup_ comp';

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
		<Suspense fallback={<div>Loading...</div>}>

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
