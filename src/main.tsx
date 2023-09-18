import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/nes.css/css/nes.min.css';
import LoginPage from './LoginPage.tsx';
import Dashboard from './Dashboard.tsx';
import WelcomPage from './welcomPage.tsx';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<WelcomPage/>}/>
      </Routes> 
    </Router>
  </React.StrictMode>,
)
