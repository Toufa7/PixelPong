import "./Notifications.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import {socket, socketgp} from '../../Pages/socket-client'
import NavBar from "../addons/NavBar";
import toast from "react-hot-toast";


const GroupRequest = ({ myData }: {myData: myDataTypes }) => {
	const acceptFriend = async () => {
		try {
		await axios.patch(`http://localhost:3000/groupchat/${myData.groupchatId}/${myData.senderId}/accept`, {}, { withCredentials: true })
		.then((rese) => {
			console.log("Notification Acceptted ", rese);
		});
	  	} 
		catch (error) {
			console.log("Error Caught ", error);
	  	}
		toast.remove();
	};
  
	const refuseFriend = async () => {
		try {
		await axios.patch(`http://localhost:3000/groupchat/${myData.groupchatId}/${myData.senderId}/refuse`, {}, { withCredentials: true })
		.then((rese) => {
			console.log("Notification Refuse ", rese);
		});
		}
		catch (error) {
			console.log("Error Caught ", error);
		}
		toast.remove();
	};
  
	return (
		<div style={{ padding: '5px' }}>
			<div className="nes-container with-title">
				<p style={{ background: '#ffc7b2', transform: 'translateY(-5px)', border: '2px solid black' }} className="title">Group Request : {myData.namegp}</p>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div>
					<img src={`http://localhost:3000/auth/avatar/${myData.userId}`} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
					<span style={{ marginLeft: '20px' }}>{myData.from}</span>
					<img src={`http://localhost:3000/groupchat/getimage/${myData.groupchatId}`} style={{ borderRadius: '50%', width: '40px', height: '40px'}} alt="avatar" />
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







interface myDataTypes {
	userId: string,
	from: string,
	to: string
}

const FriendRequest = ({ myData }: {myData: myDataTypes }) => {
	const [friendStatus, setFriendStatus] = useState(false);
	
	console.log("FriendRequest Data ", myData);
	let object = {};
	if (myData) {
		object = {
			userId: myData.userId,
			to: myData.to,
		}
	}
	
	const acceptFriend = async () => {
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
		toast.remove();
	};
  
	const refuseFriend = async () => {
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
		toast.remove();
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
	const [flag, setFlag] = useState(false);
	const [friendRequests, setFriendRequests] = useState([]);
	const [groupRequests, setGroupRequests] = useState([]);
  
	useEffect(() => {
	  const fetchFriendRequests = () => {
		axios
		  .get('http://localhost:3000/users/notifications', { withCredentials: true })
		  .then((response) => {
			setFriendRequests(response.data);
		  })
		  .catch((error) => {
			console.error('Error fetching friend requests:', error);
		  });
	  };
  
	  const fetchGroupRequests = () => {
		axios
		  .get('http://localhost:3000/groupchat/requestjoingroup', { withCredentials: true })
		  .then((response) => {
			setGroupRequests(response.data);
		  })
		  .catch((error) => {
			console.error('Error fetching group requests:', error);
		  });
	  };
  
	  fetchFriendRequests();
	  fetchGroupRequests();
	}, []);
  


	useEffect(() => {
		socketgp.on('notificationgp', (datagrp) => {
			setGroupRequests(datagrp);
			setFlag(true);
		})
		socket.on('notification', (data) => {
			setFriendRequests(data);
			setFlag(true);
		});
		return () => {
			socket.off();
			socketgp.off();
		};
	}, []);
  
	

	console.log("groupRequests.length -> ", groupRequests.length);
  
	return (
	  <div className="notification">
		<div className="notificationBox">
		  <div className="loginBoxHeader">Notifications</div>
		  <div className="loginBoxOutside">
		  {
		  friendRequests.length == 0 && groupRequests.length == 0 ? (
			  	<p style={{ textAlign: 'center', marginTop: '20px' }}>
					When you get notifications, they'll show up here
			  	</p>
			) : flag ? (
				<>
			 		<FriendRequest myData={friendRequests} />
					<GroupRequest myData={groupRequests}/>
				</>

			) : (
			  <>
				{
					friendRequests.map((request, idx) => (
					  <FriendRequest key={idx} myData={request}/>
					))
				}
				{
					Object.keys(groupRequests).map((idx) => (
						<GroupRequest key={idx} myData={groupRequests[idx]}/>
					))
				}
			  </>
		)}
		  </div>
		</div>
	  </div>
	);
}

export default Notifications;