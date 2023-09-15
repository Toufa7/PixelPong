import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import LoginPage from './LoginPage.tsx'
import Stars from './Stars.tsx'
import LoginPage from './LoginPage.tsx'
import WelcomPage from './welcomPage.tsx';
import ChatPage from './chatPage.tsx'
import '../node_modules/nes.css/css/nes.min.css';
import Dashboard from './Dashboard.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Stars/> */}
    {/* <LoginPage/> */}
    {/* <WelcomPage/> */}
    {/* <Stars/> */}
    <Dashboard/>
  </React.StrictMode>,
)
