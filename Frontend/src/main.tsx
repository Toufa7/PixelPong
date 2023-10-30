import ReactDOM from 'react-dom/client'
import 'nes.css/css/nes.min.css';
/******************* Packages  *******************/
import {BrowserRouter, Routes, Route, Navigate, useLocation, Router} from "react-router-dom";
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
import randomLogo from './Pages/addons/assets/logo.svg'
import handshake from '../src/Pages/HomePage/assets/handshake.png';
import toast from 'react-hot-toast';

const BackgroudGame = () => {

  return (
    <div>
      	{/* <a href="/home" title="Home">
  		<style>{animationStyle}</style>
        	<img src={randomLogo} title={"Back To Home"} style={{ margin: '20px',width: '50px',height: '50px',animation: 'rotate 10s infinite'}}/>
      	</a> */}
		{/* <a style={{width:'fitContent', marginTop: '30px'}} className="nes-btn" onClick={() => {document.getElementById('howtoplay').showModal();}} >How To Play</a>
		<section>
			<dialog className = 'example' style={{height: '700px', width: '700px', background: 'white' , borderRadius:"20px"}} id="howtoplay">

			<button style={{display: 'flex', alignItems:'left'}} className="nes-btn is-error"  onClick={() => {
				document.getElementById('howtoplay')?.close();
			}} >X</button>
				<h1>Pixel Pong</h1>
				<div style = {{backgroundColor : "#e0a43d"}} className="nes-container is-dark with-title">
				Pixel Pong was originally founded in September 2023, it was the idea of Omar Toufah and was encouraged later by other members of our team who were Ayoub Bensguia, Mohamed Amella,
				Ibrahim Nada, and Mohamed Khalil Naqqad.
				Our design was heavily inspired by Pixel art which is a form of digital art, our website is structured on the idea of foolishness that paid tribute to this
				kind of art as it is based on pixels and playing with colors to create a childish yet very artsy design,
				everything in this web site that you will experience and hope you'll enjoy was made from scratch using frameworks that facilitates the use of pixel art style in CSS and Html.
				Hadouken!!!
				</div>
				<h2 style={{marginTop : '50px'}}>How To Play</h2>
				<i className="snes-logo"></i>
				<div className="nes-container with-title is-centered">
					<img src= {handshake}></img>
					To move Your Paddle you can use eaither the up and down arrows , Or use your mouse.
				</div> 
			</dialog>
		</section> */}


    </div>
  );
};


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
			<BackgroudGame/>
			<Setup/>
		</>
	);
}

const AlreadyInGame = () => {
	return (
		<>
		<div style={{background: '#333C54' ,display:'flex', alignItems: 'center', justifyContent: 'center'}}>
			<div>
				<BackgroudGame/>
			</div>
			<div>
				<div>
					<img style={{width: '600px', height: '600px', borderRadius: '50%'}} src={Dogo} alt='Already In Game'/>
				</div>
			<div>
				<h1 style={{fontSize: '50px', color: 'Black', marginTop: '50px'}}>Already In Game</h1>
			</div>
			</div>
		</div>
		</>
	);
}

const ErrorPageConfig = () => {
	const {state} = useLocation()
	const {title, type ,msg} = state;
	return (
		<Error title={title} errorType={type} msg={msg} />
	)
}


const Routing = () => {
	const [userData, setUserInfo] = useState();
	const [unlogged, setUnlogged] = useState(false);
    useEffect(() => {
        const fetchData = () => {
            axios.get("http://localhost:3000/users/profil", { withCredentials: true })
            .then((response) => {
                setUserInfo(response.data)
            })
            .catch(() => {
				// console.log(`MyError -> ${error.response.data.message}, ${error.response.data.error}, ${error.response.data.statusCode}`);
				setUnlogged(true);
        	})
    	} 
		fetchData();
	}, [])

	const logged = userData != undefined && !userData?.twofa;
	const logged2fa = userData != undefined && userData?.twofa && userData?.authenticated;
	// console.log("logged -> ", logged)
	// console.log("logged2fa -> ", logged2fa)
	return (
		<BrowserRouter>
		<Suspense fallback={
			<>
				<div style={{height: '100vh', background: '#333C54',display: 'flex', justifyContent: 'flex-start',alignItems: 'flex-start'}}>
					<img style={{transform: 'translate(30vw, 30vh)'}}  src={'https://64.media.tumblr.com/02f1e684630962dfde601535ca66c7ec/4f559fadb3dc32b2-db/s1280x1920/b30ed1f7179224fc6c882fc432975dea793cf25a.gifv'}/>
				</div>
			</>
		}>
			<Routes> 
			{/* User Logged and 2FA Disabled || User Logged and 2FA Enabled and Valid Code */}
			{logged && (
				<>
					<Route path="/" 				element={<HomeComponents/>}/>
					<Route path="/home" 			element={<HomeComponents/>}/>
					<Route path="/settings" 		element={<LoginSettingsComponents/>}/>
					<Route path="/profil/:userId"	element={<OtherUser/>}/>
					{!userData.ingame ?
						(<Route path="/game" 		element={<GameComponents/>}/>)
						:
						(<Route path="/*" 			element={<AlreadyInGame/>}/>)}
					<Route path="/chat" 			element={<ChatPage/>}/>
					<Route path="/notifications" 	element={<NotificationComponents/>}/>
					<Route path="/groups" 			element={<GroupPage/>}/>
					<Route path="/profil" 			element={<ProfilComponents/>}/>
					<Route path="/error" 			element={<ErrorPageConfig/>}/>
					<Route path="/login" 			element={<Navigate to="/" replace/>}/>
					<Route path="/welcome" 			element={<Navigate to="/" replace/>}/>
					<Route path="*" 				element={<Error title={"Page Not Found"} errorType={'it\'s looking like you may have taken a wrong turn. Don\'t worry ... it happens to the most of us'} msg={"Feel free to explore other features of our website or consider signing up if you haven't already"} />}/>
				</>
			)}
			{/* User Logged and 2FA Enabled */}
			{userData != undefined && userData.twofa && (
				<>
					<Route path="/two-factor-authentication"	element={<TwoFAComponents/>}/>
					<Route path="/*" 							element={<Navigate to="/two-factor-authentication" replace/>}/>
				</>
				
			)}
			{/* User is not logged in */}
			{unlogged == true && (
				<>
					<Route path="/"			element={<WelcomePage/>}/>
					<Route path="/welcome"	element={<WelcomePage/>}/>
					<Route path="/login"	element={<LoginPage/>}/>
					<Route path="*"			element={<Navigate to="/login" replace/>}/>
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
