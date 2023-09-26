// @ts-nocheck
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
import axios from 'axios';
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";


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

export const Imagess = () => {
  const cookies = new Cookies();
  const deco = jwt_decode(cookies.get('jwt'));
  console.log("Deco.image ", deco.sub)
  axios.get('http://localhost:3000/auth/avatar/' + deco.sub, {withCredentials: true})
  .then((response) => {
    console.log("Response " , response);
  })
  .catch((err) => {
    console.log(err);
  })

  return(
    <div>
      <img src={'http://localhost:3000/auth/avatar/' + deco.sub} ></img>
    </div>
  );
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
        <Route path="nothing" Component={Imagess}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
