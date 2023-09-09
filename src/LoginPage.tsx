import "./LoginPage.css";
import cloud from './assets/cloud.svg';
import diamond from './assets/diamond.svg';
import diamond1 from './assets/diamond1.svg';
import pingPongGif from './assets/pingPongGif.gif';
import '../node_modules/nes.css/css/nes.min.css';

function LoginPage() {
  return (
    <div className="global">
      <div className="hor-line"></div>
      <div className="retroImage">
        <img className="pingPongGif" src={pingPongGif} alt="pingPongGif" />
      </div>
      <div className="loginBox">
        <div className="line"></div>
        <div className="loginBoxInside">SIGN IN</div>
        <div className="loginBoxOutside">
          <a className="nes-btn google" href="/">Google</a>
          <a className="nes-btn intra" href="/">Intra 42</a>
        <div className="text-OR">-- OR --</div>
        <div className="cloudImg">
          <img src={cloud} alt="cloudImg" />
        </div>
        <div className="diamondImg">
          <img src={diamond} alt="diamondImg " />
        </div>
        <div className="diamondImg1">
          <img src={diamond1} alt="diamondImg1 " />
        </div>
      </div>
      </div>
    </div>
  );
}

export default LoginPage;