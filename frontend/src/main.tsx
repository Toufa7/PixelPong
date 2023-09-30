import React, { useState } from 'react'
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



export const LogingPageComponents = () => {
	return (
		<>
			<Stars/>
			<LoginPage/>
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
			<Stars/>
			<NavBar/>
			<Home/>
		</>
	);
}


const Redirect2FA = () => {
	const enablingEndpoint  = "http://localhost:3000/auth/2fa/get2FAstatus";
	let resp = true;
	axios.get(enablingEndpoint, { withCredentials: true })
	.then ((response) => {
		console.log("2fa Status -> " ,response.data)
		resp = response.data;
	})
	.catch((error) => {
		console.log(error);
	});
	if (resp)
	{
		console.log("I Enter Because it's true")
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
					<Route path="/" element={<Navigate to="welcome"/>}/>
					<Route path="welcome" element={<Navigate to="welcome"/>}/>
					<Route path="*" element={<Navigate to="/login"/>}/>
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
			<Route path={idx} Component={welcomePage} key={""}/>
			)}  
			<Route path="login" Component={LogingPageComponents}/>
		</Routes>
	</BrowserRouter>
  </React.StrictMode>
)
