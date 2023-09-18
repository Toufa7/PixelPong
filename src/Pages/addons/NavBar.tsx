import "./NavBar.css";
import msgLogo from './assets/msgLogo.svg';
import settingsLogo from './assets/settingsLogo.svg'
import notificationLogo from './assets/notificationLogo.svg'
import homeLogo from './assets/homeLogo.svg'
import logoutLogo from './assets/logoutLogo.svg'
import profilLogo from './assets/profilLogo.png'

function NavBar() {
  return (
    <nav className="navMenu">
      <ul>
        <li>
          <a href="/" className="navLink"><img src={homeLogo} alt="Home" />Home</a>
        </li>
        <li>
          <a href="/" className="navLink"><img src={notificationLogo} alt="Notification" />Notification</a>
        </li>
        <li>
          <a href="/" className="navLink"><img src={msgLogo} alt="Messages" />Messages</a>
        </li>
        <li>
          <a href="/" className="navLink"><img src={settingsLogo} alt="Settings" />Settings</a>
        </li>
        <li>
          <a id="profile" href="/" className="navLink"><img src={profilLogo} alt="Profil" />Profil</a>
        </li>
          <div className="logout">
            <a href="/" className="navLink"><img src={logoutLogo} alt="Logout" />Logout</a>
          </div>
      </ul>
    </nav>
);
}

export default NavBar;
