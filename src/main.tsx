import React from 'react'
import ReactDOM from 'react-dom/client'


/******************* Packages  *******************/
import {BrowserRouter, Routes, Route} from "react-router-dom";

/******************* Includes  *******************/
import NavBar from './Pages/addons/NavBar';
import Stars from './Pages/addons/Stars';
import LoginSettings from './Pages/loginSettings/LoginSettings';
import LoginPage from './Pages/loginPage/LoginPage';
import welcomePage from './Pages/welcomePage/welcomePage';
import TwoFa from './Pages/2FA/twoFA';
import Home from './Pages/HomePage/Home';

export const LogingPageComponents = () => {
  return (
  <>
      <Stars/>
      <NavBar/>
      <LoginPage/>
  </>);
}

const LoginSettingsComponents = () => {
  return (
    <>
        <Stars/>
        <NavBar/>
        <LoginSettings/>
    </>);
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

const testing = () => {
  
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {["welcome", "/"].map((idx) => 
          <Route path={idx} Component={welcomePage}/>
        )}  
        <Route path="login" Component={LogingPageComponents}/>
          <Route path="settings" Component={LoginSettingsComponents} />
          <Route path="two-factor-autentication" Component={twoFAComponents} />
        <Route path="/home" Component={HomeComponents}/> 
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
