import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import LoginPage from './LoginPage.tsx'
import '../node_modules/nes.css/css/nes.min.css';
import UserSettings from './UserSettings.tsx';
import LoginPage from './LoginPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginPage/>
  </React.StrictMode>,
)
