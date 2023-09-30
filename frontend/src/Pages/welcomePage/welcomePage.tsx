import './welcomePage.css';
import sun from './assets/pixelPongSun.svg';
import bigCloud from './assets/bigCloud.svg';
import smallCloud from './assets/smallCloud.svg'
import floor from './assets/floor.svg';
import three from './assets/three.svg';
import chair from './assets/chair.svg';
import light from './assets/light.svg';
import clickImg from './assets/clickMe.gif';
import sprinkle from './assets/sprinkle.svg';
import sparkles from './assets/sparkles.gif';
import 'nes.css/css/nes.min.css';
import { useNavigate } from 'react-router-dom';



function welcomePage() {
  const navigate = useNavigate('');
  return (
    <div>
      <div id="pageContainer">
        <div id="header">
          <div>
            <img id='leftCloud' alt="leftCloud" src={bigCloud} width={316} height={110}></img>
          </div>
          <div>
            <img id='sunLeftCloud' alt="sunLeftCloud" src={bigCloud} width={316} height={110}></img>
            <img id="neonSun" alt="neonSun" src={sun} width={316} height={316}></img>
            <img id='sunRightCloud' alt="sunRightLeftCloud" src={smallCloud} width={315} height={110}></img>
          </div>
          <div>
            <img id='rightCloud' alt="RightCloud" src={bigCloud} width={315} height={110}></img>
          </div>
        </div>

        <div id="body">
          <div id="threeContainer">
            <img id="threeimg" src={three} alt="three" width={348} height={369}></img>
          </div>
          <div id='textContainer'>
            <div id="pixelPongTxt">
              <img id='bigsprinkle'src={sprinkle} alt="sprinkle" width={61} height={73.2}></img>
              <img id='upperLeftSprinkle'src={sprinkle} alt="sprinkle" width={45.96} height={55.4}></img>
              <img id='upperRightSprinkle'src={sprinkle} alt="sprinkle" width={39} height={46.8}></img>
              <h1 id="pixelpong">PIXELPONG</h1>
              <img id='lowerLeftSprinkle'src={sprinkle} alt="sprinkle" width={24.17} height={29}></img>
              <img id='lowerMiddleSprinkle'src={sprinkle} alt="sprinkle" width={39.19} height={46}></img>
              <img id='lowerMovingSparkle' src={sparkles} alt="movingparkle" width={86} height={76}></img>
              <img id='lowerRightSprinkle'src={sprinkle} alt="sprinkle" width={39} height={46.8}></img>
            </div>

            <div id="playButton">
              <button id="letsPlayButton" type="button" className="nes-btn is-warning" onClick={() => {navigate('/login');}}>LET'S PLAY</button>
              <img id='ClickMe' alt="clickImgGif" src={clickImg} width={94} height={90}></img>
            </div>

          </div>
          <div id='chairContainer'>
            <img src={chair} id="chairimg" alt='chair' width={215} height={102}></img>
            <img src={light} id="lightimg" alt='light' width={156} height={315}></img>
          </div>
        </div>

        <div id="footer">
            <img id="floorimg" src={floor} alt="floor img"></img>
        </div>

      </div>
      </div>
  );
}

export default welcomePage;