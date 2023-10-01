import star from './assets/star.svg';
import './Stars.scss';
import {useRef} from "react";

function Stars() {
  console.log("Width -> ", window.innerWidth)
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const delay = Math.random() * 10;
      const style = {
        top: x,
        left: y,
        opacity: Math.random() * 10,
        animationDelay: `${delay}s`,
      };
      stars.push(
        <div className="stars" style={style} key={i}>
          <img src={star} alt="Star" />
        </div>
      );
    }
    return stars;
  };

  return <div className="container">{renderStars()}</div>;
}

export default Stars;