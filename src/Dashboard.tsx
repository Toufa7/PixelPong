import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      <div className="head-box">
        <div className="login-box play">
          <div className="top-login play1">PLAY</div>
          <div className="margins">
            <div className="playRaw">
              <div className="playWith Friend">Friend</div>
              <div className="playWith Bot">Bot</div>
              <div className="playWith Practice">Practice</div>
            </div>
          </div>
        </div>
      </div>

      <div className="four-container">
        <div className="section1">
          <div className="login-box on-going-matches">
            <div className="top-login on-going-matches1">ON GOING MATCHES</div>
            <div className="margins"></div>
          </div>
          <div className="login-box achievements">
            <div className="top-login achievements1">ACHIEVEMENTS</div>
            <div className="margins"></div>
          </div>
        </div>
        <div className="section2">
          <div className="login-box states">
            <div className="top-login states1">STATES</div>
            <div className="margins"></div>
          </div>
          <div className="login-box latest-matches">
            <div className="top-login latest-matches1">LATEST MATCHES</div>
            <div className="margins">
              <div className="matchesHistory">
                <div className="matcheHistory1">
                  <span className="leftName">Santi</span>
                  <span className="score">0 : 1</span>
                  <span className="rightName">Cazorla</span>
                </div>
                <div className="matcheHistory2">
                  <span className="leftName">William</span>
                  <span className="score">1 : 0</span>
                  <span className="rightName">Saliba</span>
                </div>
                <div className="matcheHistory3">
                  <span className="leftName">Mikel</span>
                  <span className="score">0 : 0</span>
                  <span className="rightName">Arteta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
