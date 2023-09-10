import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import LoginPage from './LoginPage.tsx'
// import WelcomPage from './welcomPage.tsx';
import '../node_modules/nes.css/css/nes.min.css';
// import HttpRequest from './ReactRequest.tsx';
import LoginPage from './LoginPage.tsx';
import Stars from './Stars.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Stars/>
    {/* <HttpRequest/> */}
    <LoginPage/>
  </React.StrictMode>,
)
