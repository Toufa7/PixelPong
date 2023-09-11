import './chatPage.css'
import Send from './assets/images/send.svg'
import star from './assets/images/star.svg';
import diamond from './assets/diamond.svg';
import sparkles from './assets/images/sparkles.gif';
import './Stars.css';



function Stars() {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 120; i++)
        {
            const x = Math.random() * window.innerHeight;
            const y = Math.random() * window.innerWidth;
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

function Chat () {
    return (
        <>
        {/* <Stars/> */}
        <div className="pageContainer">
            <div className='NavBar'></div>

            <div className='chatNavBar'>
                <div className="searchBar">
                    <div className="serachBarTxt">
                        <h1>CHAT</h1>
                    </div>
                    <div className="searchBarBox">
                        <input type="text" id="inline_field" className="chatSearchBox" placeholder="Search"></input>
                    </div>
                </div>
                <div className="onlineMemebersBar">
                    <div className='chatSection'>
                        <h2 id='chatText'>CHAT</h2>
                        <div className='dms'>
                            <ul>
                                <li>lol</li>
                                <li>lol2</li>
                            </ul>
                        </div>
                    </div>
                    <div className='groupeSection'>
                        <h2 id='groupesText'>GROUPES</h2>
                    </div>
                </div>
                <div className="lowerBar"></div>
            </div>

            <div className='chatBody'>
                <div className="playerProfileSec">
                    <div className="playerProfilesRec">
                        <div className="playerProfileRecDiv">
                            Player Profile
                        </div>
                    </div>
                    <div className="playerProfile">
                        <div className="playerNamePic">
                            <div className="playerPic"></div>
                            <div className="playerNamediv">
                                <div className="playerName">
                                Mikel Arteta
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="playerProfileBar">
                    <div className='conversationBody'>
                        <section className="message-list">
                            <section className="message -left">
                            <i className="nes-bcrikko"></i>
                            <div className="nes-balloon from-left">
                                <p>Bro, don't buy online, go nichan</p>
                            </div>
                            </section>

                            <section className="message -right">
                            <div className="nes-balloon from-right">
                                <p>mhtaj 700dh cih vs cash</p>
                            </div>
                            <i className="nes-bcrikko">
                            </i>
                            </section>
                        </section>
                    </div>
                    <div className='sendMessage'>
                        <input className='messageInputBox' ></input>
                        <button className='sendButton'><img src={Send}></img></button>
                    </div>

                </div>

                <div className="emptyspace">
                    <img id='esLeftDimond' alt='Left diamond' src={diamond} width={80.55} height={50.19}></img>
                    <img id='saprkleRight' alt='Right sparkle' src={sparkles} width={50} height={40}></img>
                </div>

            </div>
        </div>
        </>
    );
}

export default Chat
