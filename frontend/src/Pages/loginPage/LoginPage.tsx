import "./LoginPage.scss";
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

// const userInfo = () => {loginBoxInside
// userInfo();


const Buttons = () => {
 return (
  <>
    <div className="a">
      <a className="nes-btn google" href="http://localhost:3000/auth/google/">Google</a>
    </div>
    <div className="text-OR">-- OR --</div>
    <div className="b">
        <a className="nes-btn intra" target="_blank" href="http://localhost:3000/auth/42/">Intra 42</a>
    </div>
    </>
 );
};

const LoginBox = () => {
  return (
    <div className="loginBoxContainer">
      <div className="loginBox">
        <div className="loginBoxInside">Sign in
            <div className="cloudImg">
              <img src={cloud} alt="cloudImg" />
            </div>
            <div className="pinkDiamond">
              <img src={pinkDiamond} alt="pinkDiamond" />
            </div>
            <div className="purpleDiamond">
              <img src={purpleDiamond} alt="purpleDiamond" />
            </div>
          </div>
            <div className="loginBoxOutside">
              <Buttons/>
          </div>
      </div>
      </div>
  );
};

const Images = () => {
  return (
    <div className="retroImage">
      <img className="pingPongGif" src={pingPongGif} alt="pingPongGif" />
    </div>
  );
};




export default function LoginPage() {
  return (
      <div className="loginPage">
        <div className="lb">
          <LoginBox/>
        </div>
        <div className="ig">
          <Images/>
        </div>
      </div>
  );
}
