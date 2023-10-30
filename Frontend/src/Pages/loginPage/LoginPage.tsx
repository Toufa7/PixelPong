import "./LoginPage.scss";
/******************* Packages  *******************/
import { motion } from "framer-motion";
import Anime, { anime } from 'react-anime';
import song from './assets/ringtone.mp3';
import AnimatedText from "react-animated-text-content";
/******************* Images  *******************/
import cloud from './assets/cloud.svg';
import purpleDiamond from './assets/purpleDiamond.svg';
import pinkDiamond from './assets/pinkDiamond.svg';
import pingPongGif from './assets/pingPongGif.gif';
import { useEffect } from "react";
import Stars from "../addons/Stars";
/**************************************/

const Buttons = () => {
    return (
        <>
            <div className="a">
                <a className="nes-btn google" href="http://localhost:3000/api/auth/google/">Google</a>
            </div>
                <div className="text-OR">
                    <AnimatedText type="chars">-- OR --</AnimatedText>
                </div>
            <div className="b">
                <a className="nes-btn intra" href="http://localhost:3000/api/auth/42/">Intra 42</a>
            </div>
        </>
    );
};

const LoginBox = () => {
    return (
        <Anime delay={anime.stagger(1000)} scale={[0.1, 0.9]}>
        <div className="loginBoxContainer">
            <div className="loginBox">
            <div className="loginBoxInside">
                <AnimatedText animationType="wave" type="chars">Sign In</AnimatedText>
                <div className="cloudImg">
                    <Anime delay={anime.stagger(1000)} scale={[ 0.1, 0.9 ]}>
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
            dragElastic={0.5}
            />
    </div>

  );
};


export default function LoginPage() {

  const PlayingSong = () => {
    useEffect(() => {
        const anthem = new Audio(song);
        anthem.loop = true;
        const playPromise = anthem.play();
        if (playPromise !== null){
            playPromise.catch(() => { anthem.play(); })
        }
        return () => {
        anthem.pause();
    };
    }, []);
    return <></>;
};



  return (
    <div style={{height: '100vh'}}>
        <Stars/>
        <div className="loginPage">
            <PlayingSong />
            <div className="lb">
                <LoginBox/>
            </div>
            <div className="ig">
                <Images/>
            </div>
        </div>
    </div>
  );
}
