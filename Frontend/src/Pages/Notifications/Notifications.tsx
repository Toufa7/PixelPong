import "./Notifications.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import {socket} from '../../Pages/socket-client'



const FriendRequest = ({ myData }) => {
    const [friendStatus, setFriendStatus] = useState(false);
    const [showInvitation, setShowInvitation] = useState(true);
    
    if (!showInvitation) {
    return null;
    }

    const acceptFriend = async () => {
        setShowInvitation(false);

      try {
        await axios
          .patch("http://localhost:3000/users/acceptFriendRequest", myData, { withCredentials: true })
          .then((rese) => {
            console.log("Notification Accept ", rese);
            setFriendStatus(friendStatus);
          });
      } catch (error) {
        console.log("Error Caught ", error);
      }
    };
  
    const refuseFriend = async () => {
        setShowInvitation
      try {
        await axios
          .patch("http://localhost:3000/users/refuseFriendRequest", myData, { withCredentials: true })
          .then((rese) => {
            console.log("Notification Refuse ", rese);
            setFriendStatus(friendStatus);
          });
      } catch (error) {
        console.log("Error Caught ", error);
      }
    };
  
    return (
        <div style={{ padding: '5px' }}>
          <div className="nes-container with-title">
            <p style={{ background: '#ffc7b2', transform: 'translateY(-5px)', border: '2px solid black' }} className="title">Invitation Request</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <img src={myData.photo} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
                <span style={{ marginLeft: '20px' }}>{myData.username}</span>
              </div>
              <div>
                <button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small' }} className="nes-btn is-success" onClick={acceptFriend}>Accept</button>
                <button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small' }} className="nes-btn is-error" onClick={refuseFriend}>Deny</button>
              </div>
            </div>
          </div>
        </div>
      );
};

function Notifications() {
    // let map = useMap();


    const [myData, setmyData] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    useEffect(() => {
      socket.on("notification", (data) => {
        console.log("Received notification:", data);
        // map.set(data.id, data);
        setFriendRequests((prevRequests) => [...prevRequests, data]);
        setmyData(data);
      });
    }, []);
  
    console.log("My Data", myData);
  
    return (
      <div style={{ height: '100vh', justifyContent: 'center' }}>
        <div className="notification">
          <div className="notificationBox">
            <div className="loginBoxHeader">Notifications</div>
            <div className="loginBoxOutside">
            {friendRequests.map(() => (
                <FriendRequest myData={myData}/>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
}
export default Notifications
