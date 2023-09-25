import "./NavBar.scss";
/******************* Includes  *******************/
/******************* Packages  *******************/
/******************* Images  *******************/

import msgLogo from './assets/msgLogo.svg';
import settingsLogo from './assets/settingsLogo.svg'
import notificationLogo from './assets/notificationLogo.svg'
import homeLogo from './assets/homeLogo.svg'
import logoutLogo from './assets/logoutLogo.svg'
import profilLogo from './assets/profilLogo.svg'
import randomLogo from './assets/ping-pong-ball.svg'
import { Cookies } from "react-cookie";

/******************************************/  
  
const logoutPlease = () => {
  Cookies.get('jwt');
}

const NavBarBody = () => {
  return (
    <div className="nav-content">
        <div className="nav-item">
          <a href="#" title="Home">
            <img src={homeLogo}/>
          </a>
        </div>

        <div className="nav-item">
          <a href="#" title="Notifications">
            <img src={notificationLogo}/>
          </a>
        </div>
        <div className="nav-item">
          <a href="#" title="Chat">
            <img src={msgLogo}/>
          </a>
        </div>
        <div className="nav-item">
          <a href="#" title="Settings">
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
        <a href="#" title="Home">
          <img src={randomLogo}/>
        </a>
      </div>
    </div>
  );
}

const NavBarFooter = () => {
  return (
    <div className="nav-footer">
    <div className="nav-item">
      <a href="#" title="Profil">
        <img src={profilLogo}></img>
      </a>
    </div>
    <div className="nav-item">
    <a href="#" title="Logout">
      <img onClick={logoutPlease} src={logoutLogo}></img>
    </a>
      </div>
  </div>
  );
}

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