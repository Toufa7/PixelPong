import "./Home.scss";

import logo from '../addons/assets/ping-pong-ball.svg';

const TopContainer = () => {
  return (
      <div className="headerBox">
        <div className="topLoginBox">
          <div className="loginBoxHeader">PLAY</div>
          <div className="loginBoxOutside">
            <div className="playRaw">
              <div className="playWith Friend">Friend</div>
              <div className="playWith Practice">Practice</div>
            </div>
          </div>
        </div>
      </div>
  );
}

const TopLeft = () => {
  return (
    <div className="loginBox on-going-matches">
      <div className="loginBoxHeader on-going-matches1">LEADERBOARD</div>
      <div className="loginBoxOutside"></div>
    </div>
  );
}

const TopRight = () => {
  return (
    <div className="loginBox states">
    <div className="loginBoxHeader states1">STATES</div>
    <div className="loginBoxOutside"></div>
    </div>
  );
}

const BottomLeft = () => {
  return (
    <div className="loginBox achievements">
      <div className="loginBoxHeader achievements1">ACHIEVEMENTS</div>
      <div className="loginBoxOutside"></div>
    </div>
  );
}


const MatchResult = () => {
  return (
    <div className="match1" style={{background: '#C6716A', border: '1px solid black'}}>
      <div className="left">
        <img src={logo} style={{width: '40px', height: '40px', marginRight: '10px', marginLeft: '10px'}} className="player1"/>
        <span>otoufah</span>
      </div>
      <div className="result">
        <span>6 : 0</span>
      </div>
      <div className="right">
        <span>ibnada</span>
        <img src={logo} style={{width: '40px', height: '40px', marginLeft: '10px'}} className="player2"/>
      </div>
    </div>
  );
}

const State = () => {

}

const BottomRight= () => {
  return (
    <div className="loginBox latest-matches">
        <div className="loginBoxHeader latest-matches1">LATEST MATCHES</div>
          <div className="loginBoxOutside">
            <div className="matcheHistory">
              <MatchResult/>
              <MatchResult/>
              <MatchResult/>
            </div>
          </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <TopContainer/>
        <div className="top-containers">
          <TopLeft/>
          <TopRight/>
        </div>
        <div className="bottom-containers">
          <BottomLeft/>
          <BottomRight/>
        </div>
      </div>
  );
}

export default Home;
