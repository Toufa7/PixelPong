import "./NavBar.scss";
/******************* Packages  *******************/
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
/******************* Images  *******************/
import msgLogo from './assets/msgLogo.svg';
import settingsLogo from './assets/settingsLogo.svg'
import notificationLogo from './assets/notificationLogo.svg'
import logoutLogo from './assets/logoutLogo.svg'
import groups from './assets/groups.svg'
import randomLogo from './assets/logo.svg'
/******************************************/  

const NavBarBody = () => {
	return (
		<div className="nav-content">
		<div className="nav-item">
			<Link to="/notifications" title="Notifications">
					<img src={notificationLogo}/>
			</Link>
		</div>
		<div className="nav-item">
			<Link to="/chat" title="Chat">
				<img src={msgLogo}/>
			</Link>
		</div>	

		<div className="nav-item">
			<Link to="/groups" title="Groups">
				<img src={groups}/>
			</Link>
		</div>

		<div className="nav-item">
			<Link to="/settings" title="Settings">
				<img src={settingsLogo}/>
			</Link>
		</div>
	</div>
	);
};

const NavBarHeader = () => {
	return (
		<div className="nav-header">
			<div className="nav-item">
				<Link to="/home" title="Home">
					<img src={randomLogo}/>
				</Link>
			</div>
		</div>
  );
}

const NavBarFooter = () => {
	const navigate = useNavigate();
	return (
		<div className="nav-footer">
		<div className="nav-item">
			<Link to="/profil" title="Profil">
				<img src={`http://localhost:3000/auth/avatar/id`} style={{ height: '50px', width: '50px', borderRadius: '50%' }} alt="Profile"/>
			</Link>
		</div>
		<div className="nav-item">
			<Link to="/welcome" title="Logout">
				<img onClick={() => {
						axios.post("http://localhost:3000/auth/logout",{}, {withCredentials: true})
						.then((res) => {
							console.log("Response Logout -> ", res.data);
							window.location.href = '/welcome';
							navigate("/welcome");
						})
						.catch((err) => {
							console.error("Cannot Logout -> ", err);
						});
				}} src={logoutLogo} alt="Logout" />
			</Link>
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