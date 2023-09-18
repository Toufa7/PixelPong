import React from 'react'
import ReactDOM from 'react-dom/client'mport './index.css'i
// import LoginPage from './LoginPage.tsx'
import Stars from './Stars.tsx'
import LoginPage from './LoginPage.tsx'
import WelcomPage from './welcomPage.tsx';
import '../node_modules/nes.css/css/nes.min.css';
import LoginPage from './LoginPage.tsx';
import Dashboard from './Dashboard.tsx';
import WelcomPage from './welcomPage.tsx';
import ChatPage from './Pages/chatPage.tsx'

import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatPage/>
  </React.StrictMode>,
)
