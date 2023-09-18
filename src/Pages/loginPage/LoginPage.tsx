import "./LoginPage.css";
import "../../../node_modules/nes.css/css/nes.min.css";

/******************* Packages  *******************/

// import jwt_decode from "jwt-decode";
// import { getCookie } from 'typescript-cookie'

/******************* Images  *******************/

import cloud from './assets/cloud.svg';
import purpleDiamond from './assets/purpleDiamond.svg';
import pinkDiamond from './assets/pinkDiamond.svg';
import pingPongGif from './assets/pingPongGif.gif';

/**************************************/

// const userInfo = () => {
//   const cookie: string = getCookie('jwt');
//   if (cookie)
//   {
//     const decoded = jwt_decode(cookie);
//     console.log(decoded);
//   }
//   else
//     console.log("Cannot extract cookie");  
// }

// userInfo();


export default function LoginPage() {
  return (
    <div className="container">
      <div className="retroImage">
        <img className="pingPongGif" src={pingPongGif} alt="pingPongGif" />
      </div>

      <div className="loginBox">
        <div className="loginBoxInside">
            Sign in
          <div className="cloudImg">
            <img src={cloud} alt="cloudImg" />
          </div>
          <div className="pinkDiamond">
            <img src={pinkDiamond} alt="pinkDiamond" />
          </div>
        </div>
        <div className="loginBoxOutside">
          <a className="nes-btn google" href="http://localhost:3000/auth/google/" target='_blank'>
            Google
          </a>
          <a className="nes-btn intra" href="http://localhost:3000/auth/42/" target='_blank'>
            Intra 42
          </a>
          <div className="text-OR">-- OR --</div>
          <div className="purpleDiamond">
            <img src={purpleDiamond} alt="purpleDiamond" />
          </div>
        </div>
      </div>
    </div>
  );
}