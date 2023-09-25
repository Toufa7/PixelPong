import React from 'react'
import ReactDOM from 'react-dom/client'


/******************* Packages  *******************/
import {BrowserRouter as Router, Route } from "react-router-dom";

/******************* Includes  *******************/
import NavBar from './Pages/addons/NavBar';
import Stars from './Pages/addons/Stars';
import LoginSettings from './Pages/loginSettings/LoginSettings';
import LoginPage from './Pages/loginPage/LoginPage';
import welcomPage from './Pages/welcomePage/welcomPage';
import TwoFa from './Pages/2FA/twoFA';

export const LogingPageComponents = () => {
  return (
  <>
      <Stars/>
      <NavBar/>
      <LoginPage/>
  </>);
}

export const LoginSettingsComponents = () => {
  return (
    <>
        <Stars/>
        <NavBar/>
        <LoginSettings/>
    </>);
}

export const twoFACompents = () => {
  return (
    <>
      <Stars/>
      <NavBar/>
      <TwoFa/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      {["welcome", "/"].map((idx) => 
      <Route path={idx} Component={welcomPage}/>)}
      <Route path="login" Component={LogingPageComponents}>
        <Route path="settings" Component={LoginSettingsComponents}/>
        <Route path="two-factor-autentication" Component={twoFACompents}/>
      </Route>
    </Router>
    LogingPage();
  </React.StrictMode>,
)
