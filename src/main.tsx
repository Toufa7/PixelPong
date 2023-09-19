import React from 'react'
import ReactDOM from 'react-dom/client'


/******************* Packages  *******************/
// import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

/******************* Includes  *******************/
import NavBar from './Pages/addons/NavBar';
import Stars from './Pages/addons/Stars';
// import LoginPage from './Pages/loginPage/LoginPage';
import Dashboard from './Pages/dashboardPage/Dashboard';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard/>
    {/* <NavBar/> */}
    {/* <Stars/> */}
  </React.StrictMode>,
)
