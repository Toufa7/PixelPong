import React from 'react'
import ReactDOM from 'react-dom/client'


/******************* Packages  *******************/
// import {BrowserRouter as Router, Route, Routes } from "react-router-dom";



/******************* Includes  *******************/
import NavBar from './Pages/addons/NavBar';
import LoginPage from './Pages/loginPage/LoginPage';
import Stars from './Pages/addons/Stars';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginPage/>
    <Stars/>
    <NavBar/>
  </React.StrictMode>,
)
