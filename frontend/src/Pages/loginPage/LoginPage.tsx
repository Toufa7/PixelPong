import "./LoginPage.scss";
import "nes.css/css/nes.min.css";

/******************* Packages  *******************/

// import jwt_decode from "jwt-decode";
// import { getCookie } from 'typescript-cookie'
import { motion, useMotionValue, useTransform } from "framer-motion";
/******************* Images  *******************/

import cloud from './assets/cloud.svg';
import purpleDiamond from './assets/purpleDiamond.svg';
import pinkDiamond from './assets/pinkDiamond.svg';
import pingPongGif from './assets/pingPongGif.gif';
import { useContext, useEffect } from "react";
import { socketContext } from "../socket-client";
import AnimatedText from "react-animated-text-content";
/**************************************/

pinkDiamond
const Buttons = () => {
 return (
  <>
    <div className="a">
      <a className="nes-btn google" href="http://localhost:3000/auth/google/">Google</a>
    </div>
      <div className="text-OR">
        <AnimatedText type="chars">-- OR --</AnimatedText>
        </div>
    <div className="b">
        <a className="nes-btn intra" href="http://localhost:3000/auth/42/">Intra 42</a>
    </div>
    </>
 );
};

const LoginBox = () => {

  return (
    <div className="loginBoxContainer">
      <div className="loginBox">
        <div className="loginBoxInside">
          <AnimatedText animationType="wave" type="chars">Sign In</AnimatedText>
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
      <motion.img
        src={pingPongGif}
        className="pingPongGif"
        drag
        dragTransition={{ min: 0, max: 100 }}
        dragConstraints={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }}
      />
    </div>
  );
};




export default function LoginPage() {

  const socket = useContext(socketContext);

  useEffect(()=>{
    socket?.on("connect",()=>{
        console.log("im connected");
    })
  },[]);

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
