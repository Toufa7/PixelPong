// const starsPositions:number[] = [];
// for (let index = 0; index < 10; index++) {
//     starsPositions.push(Math.random()); 
// }


import star from './assets/star.svg';
import './Stars.css';

function Stars() {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 120; i++)
        {
            const x = Math.random() * 960;
            const y = Math.random() * 1920;
            const style = { 
                top: x,
                left: y,
                opacity: Math.random() * 10,
            };
            stars.push(
                <div className="stars {index}" style={style} key={i}>
                    <img src={star} alt="Star" />
                </div>
            );
        }
        return stars;
    };
    return (
        <div className="container">
            {renderStars()}
        </div>
    );
}

export default Stars;