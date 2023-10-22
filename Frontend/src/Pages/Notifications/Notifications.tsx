import "./Notifications.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import {socket} from '../../Pages/socket-client'
import NavBar from "../addons/NavBar";



const FriendRequest = ({ myData }) => {
	const [friendStatus, setFriendStatus] = useState(false);
	const [showInvitation, setShowInvitation] = useState(true);
	
	if (!showInvitation) {
		return null;
	}

	
	console.log("My Data ", myData);
	const acceptFriend = async () => {
		setShowInvitation(false);
		
		try {
		await axios.patch("http://localhost:3000/users/acceptFriendRequest", myData, { withCredentials: true })
		.then((rese) => {
			console.log("Notification Accept ", rese);
			setFriendStatus(friendStatus);
		});
	  	} 
		catch (error) {
			console.log("Error Caught ", error);
	  	}
	};
  
	const refuseFriend = async () => {
		setShowInvitation
		try {
		await axios.patch("http://localhost:3000/users/refuseFriendRequest", myData, { withCredentials: true })
		.then((rese) => {
			console.log("Notification Refuse ", rese);
			setFriendStatus(friendStatus);
		});
		}
		catch (error) {
			console.log("Error Caught ", error);
		}
	};
  
	return (
		<div style={{ padding: '5px' }}>
					<div className="nes-container with-title">
					  <p style={{ background: '#ffc7b2', transform: 'translateY(-5px)', border: '2px solid black' }} className="title">Invitation Request</p>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div>
						  <img src={`http://localhost:3000/auth/avatar/${myData.senderId}`} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
						  <span style={{ marginLeft: '20px' }}>{"UNKNOWN"}</span>
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
	const [myData, setmyData] = useState(null);
	const [friendRequests, setFriendRequests] = useState([]);
	useEffect(() => {
		socket.on("notification", (data) => {
		if (data) {
		  document.title = `Friend Request`;
		}
		console.log("Received notification:", data);
		setmyData(data);
	});

	  return () => {
		socket.off();
		document.title = `PixelPong`;
	 }
	}, []);
  
  

	useEffect(() => {
		const fetchNotifications = () => {
			axios.get('http://localhost:3000/users/notifications', { withCredentials: true })
			.then((response) => {
				console.error('Response fetching notifications:', response.data);
				setFriendRequests(response.data);
			})
			.catch((error) => {
				console.error('Error fetching notifications:', error);
			});
		};
		fetchNotifications();
	}, []);



	if (friendRequests.length == 0) {

		return (
			<div className="notification">
				<div className="notificationBox" >
					<div className="loginBoxHeader">Notifications</div>
					<div className="loginBoxOutside">
						<div>
							<p style={{textAlign: "center", marginTop: '20px'}}>
								When you get notifications, they'll show up here 
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
	else {
		return (
			<div className="notification">
			<div className="notificationBox" >
				<div className="loginBoxHeader">Notifications</div>
				<div className="loginBoxOutside">
					{friendRequests.map((request, idx) => (
						<FriendRequest key={idx} myData={request} />
						))}
				</div>
			</div>
			</div>
		);
	}
}
export default Notifications