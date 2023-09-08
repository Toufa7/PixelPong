import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      <div className="head-box">
        <div className="login-box play">
          <div className="top-login play1">PLAY</div>
          <div className="margins"></div>
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
            <div className="margins"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
