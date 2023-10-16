import "./Notifications.scss"
import otoufah from '../otoufah.jpg';
import { useState } from "react";
import NavBar from "../addons/NavBar";
import Stars from "../addons/Stars";

const GroupRequest =  (props: {name: string, userAvatar: string, groupName : string}) =>{
    return (
        <div style={{padding: '5px'}}>
            <div className="nes-container with-title is-centered">
                <p style={{ background: '#ffeeca', transform: 'translateY(-5px)'}} className="title">Group Request</p>
                <div style={{display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                <div>

                    <img src={props.userAvatar} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
                    <span style={{marginLeft: '20px'}}>{props.name} want to join</span>
                </div>
                <div>
                <div>

                <span style={{marginLeft: '20px', fontWeight: '900'}}>{props.groupName}</span>
                </div>
                </div>
                <div>

                <div>
              <button style={{ marginLeft: '20px', width: '120px' }} className="nes-btn is-success">Accept</button>
              <button style={{ marginLeft: '20px',  width: '120px' }} className="nes-btn is-error">Deny</button>
            </div>
                </div>
                </div>
            </div>
        </div>
    )
}

const GameRequest =  (props: {name: string, userAvatar: string}) =>{
    return (
        <div style={{padding: '5px'}}>
            <div className="nes-container with-title is-centered">
            <p style={{ background: '#ffeeca', transform: 'translateY(-5px)', border: '2px solid black'}} className="title">Game Request</p>
                <div style={{display: 'flex', alignItems: 'center',  justifyContent: 'space-between'}}>
                <div>
                
                    <img src={props.userAvatar} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
                    <span style={{marginLeft: '20px'}}>{props.name} wanna play</span>
                </div>
                
                <div>
                <button style={{ marginLeft: '20px', width: '120px' }} className="nes-btn is-success">Accept</button>
                <button style={{ marginLeft: '20px',  width: '120px' }} className="nes-btn is-error">Deny</button>
            </div>
                </div>
            </div>
        </div>
    )
}


const FriendRequest = (props: { name: string, userAvatar: string }) => {

    const acceptFriend = () => {};
    const denyFriend = () => {};

    return (
      <div style={{ padding: '5px' }}>
        <div className="nes-container with-title">
          <p style={{ background: '#ffc7b2', transform: 'translateY(-5px)', border: '2px solid black'}} className="title">Invitation Request</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <img src={props.userAvatar} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
              <span style={{ marginLeft: '20px' }}>{props.name}</span>
            </div>
            <div>
              <button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small'}} className="nes-btn is-success" onClick={acceptFriend}>Accept</button>
              <button style={{ marginLeft: '20px',height: '40px',  width: '100px', fontSize: 'small' }} className="nes-btn is-error" onClick={denyFriend}>Deny</button>
            </div>
          </div>
        </div>
      </div>
    );
}


  
function Notifications() {
	return (
      <div style={{height: '100vh', justifyContent: 'center'}}>
		<div className="notification">
		    <div className="notificationBox">
			<div className="loginBoxHeader">Notifications</div>
			<div className="loginBoxOutside">
                <FriendRequest name="Toufa7" userAvatar={otoufah}/>
                <FriendRequest name="Toufa7" userAvatar={otoufah}/>
                <FriendRequest name="Toufa7" userAvatar={otoufah}/>
                <FriendRequest name="Toufa7" userAvatar={otoufah}/>
                <FriendRequest name="Toufa7" userAvatar={otoufah}/>
                <FriendRequest name="Toufa7" userAvatar={otoufah}/>
                {/* <FriendRequest name="Santi" userAvatar={otoufah}/>
                <FriendRequest name="SamiNassir" userAvatar={otoufah}/> */}
                {/* <GameRequest name="Toufa7" userAvatar={otoufah}/> */}
                {/* <GroupRequest name="Toufa7" groupName="Suporteer dsasdasd" userAvatar={otoufah}/> */}
            </div>
			</div>
		</div>
        </div>
	);
}

export default Notifications