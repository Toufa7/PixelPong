import React from 'react'
import ReactDOM from 'react-dom/client'


/******************* Packages  *******************/
// import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

/******************* Includes  *******************/
// import NavBar from './Pages/addons/NavBar';
// import Stars from './Pages/addons/Stars';
// import LoginPage from './Pages/loginPage/LoginPage';
// import ProfilPage from './Pages/profilPage/profilPage';
import LoginSettings from './Pages/loginSettings/LoginSettings';
import NavBar from './Pages/addons/NavBar';
import Stars from './Pages/addons/Stars';
import LoginPage from './Pages/loginPage/LoginPage';
import TwoFa from './Pages/2FA/twoFA';
// import LoginPage from './Pages/loginPage/LoginPage';

// import ProfilPage from './Pages/profilPage/profilPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Stars/>
    <TwoFa/>
  </React.StrictMode>,
)
