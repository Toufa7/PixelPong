import "./LoginPage.scss";
import "nes.css/css/nes.min.css";

/******************* Packages  *******************/

// import jwt_decode from "jwt-decode";
// import { getCookie } from 'typescript-cookie'
import { motion, useMotionValue, useTransform } from "framer-motion";
import Anime, { anime } from 'react-anime';
import AudioPlayer from 'react-h5-audio-player';
import song from './assets/ringtone.mp3';
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
    <Anime delay={anime.stagger(1000)} scale={[ 0.1, 0.9 ]}>
    <div className="loginBoxContainer">
      <div className="loginBox">
        <div className="loginBoxInside">
          <AnimatedText animationType="wave" type="chars">Sign In</AnimatedText>
            <div className="cloudImg">
              <Anime  delay={anime.stagger(1000)} scale={[ 0.1, 0.9 ]}>
                <img src={cloud} alt="cloudImg" />
              </Anime>
            </div>
            <div className="pinkDiamond">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <img src={pinkDiamond} alt="pinkDiamond" />
            </motion.div>
            </div>
            <div className="purpleDiamond">
              <motion.div whileHover={{ scale: 2 }} whileTap={{ scale: 0.8 }}>
                <img src={purpleDiamond} alt="purpleDiamond" />
              </motion.div>
            </div>
          </div>
            <div className="loginBoxOutside">
              <Buttons/>
          </div>
      </div>
      </div>
      </Anime>

  );
};

const Images = () => {

  return (
      <div className="retroImage">
      <motion.img src={pingPongGif} className="pingPongGif"
        drag
        dragTransition={{ min: 0, max: 100 }}
        dragConstraints={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }}
        dragElastic={0.5}
      />
    </div>
  );
};


export default function LoginPage() {

  const PlayingSong = () => {
    useEffect(() => {
      const audio = new Audio(song);
      audio.loop = true;
      audio.play();
      return () => {
        audio.pause();
      };
    }, []);
    return <></>;
  };



  const socket = useContext(socketContext);
  useEffect(()=>{
    socket?.on("connect",()=>{
        console.log("im connected");
    })
  },[]);

  return (
    <div className="loginPage">
        <PlayingSong />
        <div className="lb">
          <LoginBox/>
        </div>
        <div className="ig">
          <Images/>
        </div>
      </div>
  );
}
