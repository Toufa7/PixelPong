import "./NavBar.scss";
/******************* Packages  *******************/
import jwt_decode from "jwt-decode";
import axios from "axios";
import Cookies from "universal-cookie";
import {Link, useNavigate} from "react-router-dom";
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
	const [showNotification, setShowNotification] = useState(false);

	const toggleNotification = () => {
	  setShowNotification(!showNotification);
	};

	return (
	<div className="nav-content">
		<div className="nav-item">
			<Link to="/groups" title="Groups">
				<img src={groups}/>
			</Link>
		</div>

		<div className="nav-item">
      <div className="noti" onClick={toggleNotification}>
        <img src={notificationLogo} alt="Notification Icon" />
      </div>

      {showNotification && (
        <div className="notification-container" style={{flexDirection: 'column'}}>
          <h3>New Notification</h3>
          <span>Hello World</span>
          <span>Hello World</span>
          <span>Hello World</span>
          <span>Hello World</span>
          <span>Hello World</span>
          <span>Hello World</span>
          <span>Hello World</span>
          
          <button onClick={toggleNotification}>Close</button>
        </div>
      )}
    </div>



		<div className="nav-item">
			<Link to="/chat" title="Chat">
				<img src={msgLogo}/>
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
	const coo = new Cookies();
	const navigate = useNavigate();
  
	const logout = () => {
		coo.remove('jwt');
		navigate('/login');
		axios.post("http://localhost:3000/auth/logout", {withCredentials: true})
		.then(() => {})
		.catch(() => {});
	};
  
    const cookie = new Cookies();
    const token = jwt_decode(cookie.get('jwt'));
    const [check, setUserData] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            const cookie = new Cookies();
            const token = jwt_decode(cookie.get('jwt'));
            if (token) {
				try {
					await axios.get(`http://localhost:3000/auth/avatar/${token.id}`, {withCredentials: true})
					.then(() => 
					{
						setUserData(true)
					})
					.catch(((error) => {
						console.log("Error in NavBar " ,error);
					}))
					
				} catch (error) {
					console.log("Error in NavBar " ,error);
				}
            }
        }
		fetchData();
    }, [])

	const avatarIs = /*check ? */`http://localhost:3000/auth/avatar/${token.id}`/* : token.image*/;
	return (
		<div className="nav-footer">
		<div className="nav-item">
			<Link to="/profil" title="Profil">
				<img src={avatarIs} style={{ height: '50px', width: '50px', borderRadius: '50%' }} alt="Profile"/>
			</Link>
		</div>
		<div className="nav-item">
			<Link to="/login" title="Logout">
				<img onClick={logout} src={logoutLogo} alt="Logout" />
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