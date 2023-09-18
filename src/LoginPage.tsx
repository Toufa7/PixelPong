import "./LoginPage.css";

/**************************************/

import cloud from './assets/cloud.svg';
import largeDiamond from './assets/largeDiamond.svg';
import diamond1 from './assets/diamond.svg';
import pingPongGif from './assets/pingPongGif.gif';
import '../node_modules/nes.css/css/nes.min.css';
import jwt_decode from "jwt-decode";
import { getCookie } from 'typescript-cookie'
/**************************************/

const userInfo = () => {
  const cookie = getCookie('jwt');
  const decoded = jwt_decode(cookie);
  console.log("user -> " ,decoded.username);
}


userInfo();

export default function LoginPage() {
  return (
    <div className="container">
      <div className="retroImage">
        <img className="pingPongGif" src={pingPongGif} alt="pingPongGif" />
      </div>

      <div className="loginBox">
        <div className="loginBoxInside">
          Hello
          <div className="cloudImg">
            <img src={cloud} alt="cloudImg" />
          </div>
          <div className="diamondImg1">
            <img src={diamond1} alt="diamondImg1" />
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
          <div className="largeDiamond">
            <img src={largeDiamond} alt="largeDiamond" />
          </div>
        </div>
      </div>
    </div>
  );
}