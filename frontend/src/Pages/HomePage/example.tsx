const Leaderboard = () => {
    return (
      <div className="leaderboard">
        <div className="leaderboard-header">LEADERBOARD</div>
        <div className="leaderboard-list">
          <div className="leaderboard-item">
            <span className="position">1</span>
            <span className="name">Full Name</span>
            <span className="wins">0</span>
            <span className="loses">0</span>
            <span className="draw">0</span>
          </div>
          <div className="leaderboard-item">
            <span className="position">2</span>
            <span className="name">Full Name</span>
            <span className="wins">0</span>
            <span className="loses">0</span>
            <span className="draw">0</span>
          </div>
          <div className="leaderboard-item">
            <span className="position">3</span>
            <span className="name">Full Name</span>
            <span className="wins">0</span>
            <span className="loses">0</span>
            <span className="draw">0</span>
          </div>
        </div>
      </div>
    );
  }



  .leaderboard {
    width: 300px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
  }
  
  .leaderboard-header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .leaderboard-list {
    margin-top: 10px;
  }
  
  .leaderboard-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  
  .position {
    margin-right: 10px;
  }
  
  .name {
    flex: 1;
    margin-right: 10px;
  }
  
  .wins,
  .loses,
  .draw {
    margin-right: 5px;
  }