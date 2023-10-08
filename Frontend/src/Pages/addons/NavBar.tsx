import "./NavBar.scss";
/******************* Includes  *******************/
import jwt_decode from "jwt-decode";
import axios from "axios";

/******************* Packages  *******************/
/******************* Images  *******************/

import msgLogo from './assets/msgLogo.svg';
import settingsLogo from './assets/settingsLogo.svg'
import notificationLogo from './assets/notificationLogo.svg'
import logoutLogo from './assets/logoutLogo.svg'
import groups from './assets/groups.svg'
import randomLogo from './assets/logo.svg'
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
/******************************************/  


const NavBarBody = () => {
	return (
	<div className="nav-content">
		<div className="nav-item">
			<a href="/groups" title="Groups">
				<img src={groups}/>
			</a>
		</div>
		<div className="nav-item" >
			<a className="noti" href="#" title="Notifications">
				<img src={notificationLogo}/>
			</a>
		</div>
		<div className="nav-item">
			<a href="chat" title="Chat">
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
	const navigate = useNavigate();
  
	const logout = () => {
		coo.remove('jwt');
		navigate('/login');
		axios.post("http://localhost:3000/auth/logout", {withCredentials: true})
		.then((response) => {
			//console.log(response);
		})
		.catch((error) => {
			//console.log(error)
		});
	};
  
    const cookie = new Cookies();
    const token = jwt_decode(cookie.get('jwt'));
    const [check, setUserData] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            const cookie = new Cookies();
            const token = jwt_decode(cookie.get('jwt'));
            if (token) {
                await axios.get(`http://localhost:3000/auth/avatar/${token.id}`, {withCredentials: true})
                .then(() => 
                {
                    setUserData(true)
                })
				.catch(((error) => {
                    //console.log("Error in NavBar " ,error);
				}))
            }
        }
		fetchData();
    }, [])


	return (
		<div className="nav-footer">
		<div className="nav-item">
			<a href="/profil" title="Profile">
			<img src={check ? `http://localhost:3000/auth/avatar/${token.id}` : token.image} style={{ height: '50px', width: '50px', borderRadius: '50%' }} alt="Profile"/>
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