import "./Home.scss";

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
      <div className="loginBoxHeader on-going-matches1">ON GOING MATCHES</div>
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

const BottomRight= () => {
  return (
    <div className="loginBox latest-matches">
            <div className="loginBoxHeader latest-matches1">LATEST MATCHES</div>
            <div className="loginBoxOutside">
                <div className="matcheHistory">
                <div className="match1">
                  <a>S</a>
                  <a>0:0</a>
                  <a>L</a>
                </div>
                <div className="match2">
                  <span>S</span>
                  <span>0:0</span>
                  <span>L</span>
                </div>
                <div className="match3">
                  <span>S</span>
                  <span>0:0</span>
                  <span>L</span>
                </div>
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
