import "./Notifications.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import {socket} from '../../Pages/socket-client'
import NavBar from "../addons/NavBar";



interface myDataTypes {
	userId: string,
	from: string,
	to: string
}

const FriendRequest = ({ myData } : {myData: myDataTypes }) => {
	const [friendStatus, setFriendStatus] = useState(false);
	const [showInvitation, setShowInvitation] = useState(true);
	
	if (!showInvitation) {
		return null;
	}
	console.log("FriendRequest Data ", myData);
	let object = {};
	if (myData) {
		object = {
			userId: myData.userId,
			to: myData.to,
		}
	}
	
	const acceptFriend = async () => {
		setShowInvitation(false);
		console.log("Accepted Sent Object -> ", object);
		try {
		await axios.patch("http://localhost:3000/users/acceptFriendRequest", object, { withCredentials: true })
		.then((rese) => {
			console.log("Notification Acceptted ", rese);
			setFriendStatus(friendStatus);
		});
	  	} 
		catch (error) {
			console.log("Error Caught ", error);
	  	}
	};
  
	const refuseFriend = async () => {
		setShowInvitation(false);
		try {
		await axios.patch("http://localhost:3000/users/refuseFriendRequest", object, { withCredentials: true })
		.then((rese) => {
			console.log("Accepted Sent Object -> ", object);
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
					<img src={`http://localhost:3000/auth/avatar/${myData.userId}`} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
					<span style={{ marginLeft: '20px' }}>{myData.from}</span>
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
	const [friendRequests, setFriendRequests] = useState([]);
	const [flag, setFlag] = useState(false);
  
	useEffect(() => {
		socket.on('notification', (data) => {
			if (data) {
				document.title = 'Friend Request';
		}
		console.log('Received notification:', data);
		setFriendRequests(data);
		setFlag(true);
		});
		return () => {
			socket.off();
			document.title = 'PixelPong';
		};
	}, []);
  
	useEffect(() => {
		const fetchNotifications = () => {
		axios.get('http://localhost:3000/users/notifications', {withCredentials: true})
		.then((response) => {
			console.log('Response fetching notifications:', response.data);
			setFriendRequests(response.data);
		})
		.catch((error) => {
			console.error('Error fetching notifications:', error);
		});
	};
	fetchNotifications();
	}, []);
  
	return (
	  <div className="notification">
		<div className="notificationBox">
		  <div className="loginBoxHeader">Notifications</div>
		  <div className="loginBoxOutside">
			{friendRequests.length == 0 ? (
			  	<p style={{ textAlign: 'center', marginTop: '20px' }}>
					When you get notifications, they'll show up here
			  	</p>
			) : flag ? (
			  <FriendRequest myData={friendRequests} />
			) : (
			  <>
				{friendRequests.map((request, idx) => (
				  <FriendRequest key={idx} myData={request} />
				))}
			  </>
			)}
		  </div>
		</div>
	  </div>
	);
}

export default Notifications;