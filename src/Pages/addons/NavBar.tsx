import "./NavBar.scss";
/******************* Includes  *******************/
import jwt_decode from "jwt-decode";

/******************* Packages  *******************/
/******************* Images  *******************/

import msgLogo from './assets/msgLogo.svg';
import settingsLogo from './assets/settingsLogo.svg'
import notificationLogo from './assets/notificationLogo.svg'
import homeLogo from './assets/homeLogo.svg'
import logoutLogo from './assets/logoutLogo.svg'
import profilLogo from './assets/profilLogo.svg'
import randomLogo from './assets/logo.svg'
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
/******************************************/  


const NavBarBody = () => {
	const [isNotificationClicked, setIsNotificationClicked] = useState(false);

	const handleNotificationClicked = () => {
		setIsNotificationClicked(!isNotificationClicked);
		console.log("Clicked")
	}

	return (
	<div className="nav-content">
		<div className="nav-item">
			<a href="/home" title="Home">
				<img src={homeLogo}/>
			</a>
		</div>
		<div className="nav-item" >
			<a className="noti" href="#" title="Notifications">
				<img src={notificationLogo} onClick={handleNotificationClicked}/>
			</a>
			{isNotificationClicked && (
			<div className="notification-container">
				<div className="nes-container with-title is-centered">
				<p className="title">Notifications</p>
				<div className="time">
					<span>12:40</span>
				</div>
				<div className="message">
					<span>Salam khouya bikhir</span>
				</div>
				</div>
			</div>
        )}
		</div>
		<div className="nav-item">
			<a href="#" title="Chat">
				<img src={msgLogo}/>
			</a>
		</div>
		<div className="nav-item">
			<a href="settings" title="Settings">
				<img src={settingsLogo}/>
			</a>
		</div>

	</div>

	);
};

const NavBarHeader = () => {
	return (
		<div className="nav-header">
			<div className="nav-item">
				<a href="/home" title="Home">
					<img src={randomLogo}/>
				</a>
			</div>
		</div>
  );
}

const NavBarFooter = () => {
	const coo = new Cookies();
	let userAvatar = profilLogo;
	const navigate = useNavigate();
  
	const logout = () => {
		coo.remove('jwt');
		navigate('/login');
		axios.post("http://localhost:3000/auth/logout", {withCredentials: true})
		.then((response) => {
			console.log(response);
			}
		)
		.catch((error) => {
			console.log(error)
		});
	};
  
	if (coo.get('jwt') != null) {
		const token = jwt_decode(coo.get('jwt')) as { image: string };
		const initialToken = coo.get('jwt');
		if (coo.get('jwt') !== initialToken) {
			userAvatar = "../../../backend/uploads/" + token.image;
		}
		else
			userAvatar = token.image;
	}
  
	return (
		<div className="nav-footer">
		<div className="nav-item">
			<a href="/profil" title="Profile">
			<img
				src={userAvatar}
				style={{ height: '70px', width: '70px', borderRadius: '50%' }}
				alt="Profile"
			/>
			</a>
		</div>
		<div className="nav-item">
			<a href="#" title="Logout">
				<img onClick={logout} src={logoutLogo} alt="Logout" />
			</a>
		</div>
		</div>
	);
};

function  NavBar() {
	return (
		<div className="navbar-container">
			<NavBarHeader/>
			<NavBarBody/>
			<NavBarFooter/>
		</div>
  )
}

export default NavBar;