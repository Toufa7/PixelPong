import "./Notifications.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import {socket, socketgp} from '../../Pages/socket-client'
import toast, { Toaster } from "react-hot-toast";

const GroupRequest = ({ myData }: {myData: myDataTypes }) => {
	const acceptFriend = async () => {
		try {
			await axios.patch(`http://localhost:3000/api/groupchat/${myData.groupchatId}/${myData.senderId}/accept`, {}, { withCredentials: true })
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
			await axios.patch(`http://localhost:3000/api/groupchat/${myData.groupchatId}/${myData.senderId}/refuse`, {}, { withCredentials: true })
			.then((rese) => {
				console.log("Notification Refuse ", rese);
			})
			.catch((error) => {
				console.log(`MyError -> ${error.response.data.message}, ${error.response.data.error}, ${error.response.data.statusCode}`);
			});
			}
			catch (error) {
				console.log("Error Caught ", error);
			}
			toast.remove();
		};
	// <img src={`http://localhost:3000/api/groupchat/getimage/${myData.groupchatId}`} style={{ borderRadius: '50%', width: '40px', height: '40px'}} alt="avatar" />

	return (
		<div style={{ padding: '5px' }}>
			<div className="nes-container with-title">
				<p style={{ background: '#ffc7b2', transform: 'translateY(-5px)', border: '2px solid black' }} className="title">Group Request to 	</p>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>
						<img src={`http://localhost:3000/api/auth/avatar/${myData.userId}`} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
						{/* <img src={`http://localhost:3000/api/groupchat/getimage/${myData.groupchatId}`} style={{ borderRadius: '50%', width: '40px', height: '40px', position: "absolute", left: '85px', bottom: '25px'}} alt="avatar" /> */}
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
	
	console.log("Object Sent -> ", object);
	const acceptFriend = async () => {
		console.log("Accepted Sent Object -> ", object);
		try {
			await axios.patch("http://localhost:3000/api/users/acceptFriendRequest", object, { withCredentials: true })
			.then((rese) => {
				console.log("Notification Acceptted ", rese);
				setFriendStatus(friendStatus);
			})
			.catch((error) => {
				console.log(`MyError -> ${error.response.data.message}, ${error.response.data.error}, ${error.response.data.statusCode}`);
			});
	  	} 
		catch (error) {
			console.log("Error Caught ", error);
	  	}
		toast.remove();
	};
  
	const refuseFriend = async () => {
	console.log("Object o Sent -> ", object);


		try {
			await axios.patch("http://localhost:3000/api/users/refuseFriendRequest", object, { withCredentials: true })
			.then((rese) => {
				console.log("Accepted Sent Object -> ", object);
				console.log("Notification Refuse ", rese);
				setFriendStatus(friendStatus);
			})
			.catch((error) => {
				console.log(`MyError -> ${error.response.data.message}, ${error.response.data.error}, ${error.response.data.statusCode}`);
			});
			toast.dismiss();toast.remove()
		}
		catch (error) {
			console.log("Error Caught ", error);
		}
		toast.remove();
	};
  
	return (
		<div style={{ padding: '5px' }}>
			<Toaster/>
			<div className="nes-container with-title">
				<p style={{ background: '#ffc7b2', transform: 'translateY(-5px)', border: '2px solid black' }} className="title">Invitation Request</p>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div>
					<img src={`http://localhost:3000/api/auth/avatar/${myData.userId}`} style={{ borderRadius: '50%', width: '80px', height: '80px' }} alt="avatar" />
					<span style={{ marginLeft: '20px' }}>{myData.from}</span>
				</div>
				<div>
					<button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small' }} className="nes-btn is-success" onClick={acceptFriend}>Accept</button>
					<button style={{ marginLeft: '20px', height: '40px', width: '100px', fontSize: 'small' }} className="nes-btn is-error" onClick={() => {refuseFriend; toast.dismiss();toast.remove(); console.log("I Clicked On Refuse")}}>Deny</button>
				</div>
			  	</div>
			</div>
		</div>
	  );
};

function Notifications() {
	const [flag, setFlag] = useState<string>("");
	const [friendRequests, setFriendRequests] = useState([]);
	const [groupRequests, setGroupRequests] = useState([]);
  
	useEffect(() => {
	  const fetchFriendRequests = () => {
		axios
		  .get('http://localhost:3000/api/users/notifications', { withCredentials: true })
		  .then((response) => {
			setFriendRequests(response.data);
		  })
		  .catch((error) => {
			console.error('Error fetching friend requests:', error);
		  });
	  };
  
	  const fetchGroupRequests = () => {
		axios
		  .get('http://localhost:3000/api/groupchat/requestjoingroup', { withCredentials: true })
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
			setFlag("group");
		})
		socket.on('notification', (data) => {
			setFriendRequests(data);
			setFlag("friend");
		});
		return () => {
			socket.off();
			socketgp.off();
		};
	}, []);
  
	return (
		<div className="notification">
			<Toaster/>
		  <div className="notificationBox">
			<div className="loginBoxHeader">Notifications</div>
			<div className="loginBoxOutside">
			{
				friendRequests.length == 0 && groupRequests.length == 0 ?
				(
					<p style={{ textAlign: 'center', marginTop: '20px' }}>
						When you get notifications, they'll show up here
					</p>
				)
				:
				<>
				{
					flag == "group" ?
						(<GroupRequest myData={groupRequests}/>)
					:
					flag == "friend"?
 						(<FriendRequest myData={friendRequests} />)
					:
					(
						<>
							{
								Object.keys(friendRequests).map((idx : any) => (
									<FriendRequest key={idx} myData={friendRequests[idx]}/>
								))
							}
							{
								Object.keys(groupRequests).map((idx : any) => (
									<GroupRequest key={idx} myData={groupRequests[idx]}/>
								))
							}
						</>
		  			)
				}
				</>
		  	}
			</div>
		  </div>
		</div>
	  );
}

export default Notifications;