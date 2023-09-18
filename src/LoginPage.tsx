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
  console.log("My Cookie" , cookie)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzBiMzBhNy05ZDE1LTQ2NDYtOTNjZi0wMTg5NDM5ZDQ5OWEiLCJ1c2VybmFtZSI6Im90b3VmYWgiLCJlbWFpbCI6Im90b3VmYWhAc3R1ZGVudC4xMzM3Lm1hIiwiaW1hZ2UiOiJodHRwczovL2Nkbi5pbnRyYS40Mi5mci91c2Vycy80NDJiN2NmODcxMDJkNjNiNzBiODA0NTZmMmRlYzA0NC9vdG91ZmFoLmpwZyIsImlhdCI6MTY5NDk3NDU2OSwiZXhwIjoxNjk1MDYwOTY5fQ.jTkt9H1mrewC_9cJwQ1ltqMock4mhYFQwUtdSOOSK3I";
  const decoded = jwt_decode(token);
  console.log(decoded);
}

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