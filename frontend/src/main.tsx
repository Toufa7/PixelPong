import React from 'react'
import ReactDOM from 'react-dom/client'


/******************* Packages  *******************/
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
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


export const LogingPageComponents = () => {
	return (
		<>
			<socketContext.Provider value={socket}>
			<Stars/>
			<LoginPage/>
			</socketContext.Provider>
		</>
	);
}

export const ChatComponents = () => {
	return (
		<>
			{/* <Stars/> */}
			<ChatPage/>
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
			<NavBar/>
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


const Redirect2FA = () => {
	const endpoint  = "http://localhost:3000/auth/2fa/get2FAstatus";
	let resp;
	axios.get(endpoint, {withCredentials: true })
	.then ((response) => {
		console.log("2fa Status -> " ,response.data)
		resp = response.data;
	})
	.catch((error) => {
		console.log(error);
	});
	if (resp)
	{
		return (
			<BrowserRouter>
			<Routes>
				<Route path="two-factor-autentication" Component={twoFAComponents} />
			</Routes>
			</BrowserRouter>
		);
	}
	else
	{
		console.log("I Enter Because it's FALSE")
		return (
			<></>
		);
	}
};


const RedirectToSettings = () => {
	const cookies = new Cookies();
	const jwt = cookies.get('jwt');	
	if (jwt != null) {
		return (
		<BrowserRouter>
			<Routes>
				<Route path="settings"	Component={LoginSettingsComponents} />
				<Route path="home"		Component={HomeComponents}/> 
				<Route path="profil"	Component={ProfilComponents}/>
				<Route path="chat"		Component={ChatComponents}/>
			</Routes>
		</BrowserRouter>
		);
		
	}
	else
	{
		console.log("Acces Denied")
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
