import star from './assets/star.svg';
import './Stars.scss';

function Stars() {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * innerHeight;
      const y = Math.random() * innerWidth;
      const delay = Math.random() * 10;
      const style = {
        top: x,
        left: y,
        opacity: Math.random() * 10,
        animationDelay: `${delay}s`,
      };
      stars.push(
        <div className="stars" style={style}>
          <img src={star} alt="Star" />
        </div>
      );
    }
    return stars;
  };

  return <div className="container">{renderStars()}</div>;
}

export default Stars;