import { useState, useEffect } from 'react'
import axios from 'axios'
import MessageInput from './GrpmessageInput'
import exit from '../assets/exit.svg'
import info from '../assets/info.svg'
import jwtDecode from 'jwt-decode'
import dogo from '../assets/dogo.gif'
import crown from '../assets/crown.svg'


const ChatUser = (props : any) => {
    //Fetching current user (Receiver) data each time the prop gets new value
    const [groupRoom, setgroupRoom] = useState({});
    useEffect(() => {
        const fetchCurrentUserInfo = (id: any) => {
            if (id)
            {
                axios.get(`http://localhost:3000/groupchat/${id}/groupinfo`, { withCredentials: true })
                .then((response) => {
                    setgroupRoom(response.data);
                    console.log("rese -> ", response.data);
                })
                .catch((erro) => {
                    console.log("erro -> ", erro);
                })
                }
        }
        fetchCurrentUserInfo(props.pcurrentUserId);
    }, [props.pcurrentUserId]); //props.pcurrentUserId could be null or undefined

    // const [showing, setShowing] = useState(false);
    //Identifying local user (Sender)
    const cookieJwt = document.cookie;
    const jwtArr:string[] =  cookieJwt.split("=");
    let localUser: any = jwtDecode(jwtArr[1]);

    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    // if (props.pcurrentUserId) 
    // {
        useEffect(() => {
            axios.get(`http://localhost:3000/groupchat/${props.pcurrentUserId}/users`, { withCredentials: true })
            .then((response) => {
                console.log("Admins -> ", response.data)

                setUsers(response.data);
            })
            .catch((error) => {
                console.log("Error fetching users:", error);
            });
        }, []);
        
        useEffect(() => {
            axios.get(`http://localhost:3000/groupchat/${props.pcurrentUserId}/admins`, { withCredentials: true })
            .then((response) => {
                console.log("Admins -> ", response.data)
                setAdmins(response.data);
            })
            .catch((error) => {
                console.log("Error fetching admins:", error);

            });
        }, []);
    // }


    const openDialogUsers = () => {
        console.log("Clicked On Info")
        const dialog = document.getElementById('dialogMembers');
		dialog?.showModal();
    }
    return (
        <div className='GrpusrProfileConversation'>
                <div className="GrpchatUserDiv">
                    <div className="GrpplayerPicProfile">
                        <div className="GrpchatUser">
                            {
                                //Conditional rendring to display the profile image or not based on the presence of groupRoom.profileImage
                                groupRoom.image ?   <img src={`http://localhost:3000/groupchat/getimage/${groupRoom.id}`} alt="user-photo"/>
                                                        :   <img src={info} alt="user-photo" />
                            }
                            <div className="GrpchatUserName">
                                <span>
                                    {
                                        //Conditional rendring to display the profile username or not based on the presence of groupRoom.username
                                        groupRoom.namegb ?   groupRoom.namegb
                                                            :   'Start a conversation   '
                                    }
                                </span>
                            </div>
                        </div>
                    <div className='GrpchatUserControls'>
                    {
                        //Conditional rendring to display the control buttons or not based on the presence of groupRoom.profileImage
                        groupRoom.namegb ?  (<div className="GrpchatControlButtons">
                                                        <button className='GrpuserControlButtons'>
                                                            <img src={info} onClick={openDialogUsers} width={50} height={50} title='Group Info'></img>
                                                        </button>
                                                        <button className='GrpuserControlButtons'>

                                                            {/* //exit a groupchat
                                                            @Delete(":id/exit") */}

                                                            <img src={exit} onClick={() => {
                                                                axios.delete(`http://localhost:3000/groupchat/${id}/exit`, { withCredentials: true })
                                                                .then((reseponse) => {
                                                                    console.log("Reseponse Exiting Group -> ", reseponse );
                                                                })
                                                                .catch((error) => {
                                                                    console.log("Reseponse Exiting Group -> ", error)
                                                                })
                                                            }
                                                            }   width={50} height={50} title='Leave Group' ></img>
                                                        </button>

                                            </div>)
                                :   (<></>)
                    }
                    </div>
                </div>
            </div>

            <section>
		<dialog style={{height: "600px", width: "800px", background: "#e4f0ff"}} className="nes-dialog" id="dialogMembers">

            <form method="dialog">
        <button>X</button>
				<menu className="dialog-menu">
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<label style={{fontSize: 'large'}}>
						Admins
						<img style={{ height: '30px',   position: "relative", marginLeft: "5px" , top: '-3px',width: '30px'}}src={crown}></img>
					</label>
				</div>
				<div style={{ height: 'fit-content'}}>
				<div style={{borderBottom: "1px solid" }}></div>
				{
					// Listing Admins and Owner
					Object.keys(admins).map((idx) => {
						return (
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}} key={idx}>
							<div>
								<img src={admins[idx].profileImage} style={{ borderRadius: '30px', width: '50px', height: '50px', marginTop: '10px' }} alt="avatar" />
							</div>
							<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{admins[idx].username}</span>

						</div>
						)
					;})
				}
					</div>
					<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<label style={{fontSize: 'large'}}>Members</label>
				</div>
					<div style={{borderBottom: "1px solid" }}></div>

					<div style={{ height: 'fit-content', overflow: 'auto' }}>
					{
						// Listing Members
						Object.keys(users).map((idx) => {
							return (
								<div style={{ display: 'flex', alignItems: 'center' ,overflow: "auto" }} key={idx}>
									<img src={users[idx].profileImage} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
									<span style={{ marginLeft: '10px', marginRight: 'auto' }}>{users[idx].username}</span>

									<div className="nes-select" style={{ width: '120px', height: 'auto'}}>
								<select style={{ margin: '10px', width: '100px'}} required id="muteSelect">	
									<option disabled selected hidden>Mute</option>
									<option value="0">5min</option>
									<option value="1">15min</option>
								</select>
							</div>
							<button  className="nes-btn is-warning" style={{ margin: '10px', width: '100px'}}>Kick</button>
							<button className="nes-btn is-error" style={{ margin: '10px', width: '80px' }}>Ban</button>
								</div>
							)
							;})
					}
					</div>
				</menu>
			</form>
		</dialog>
		</section>

            {/* Sending LocalUser (Sender) and groupRoom (Receiver) objects to Messaging Body component */}
            <MessagingBody localUser={localUser} groupInfo={groupRoom}/>
            <div className='GrpchatBodyLowerRibbon'></div>
        </div>
    );
}

const MessagingBody = (props: any) => {

    return (
        <div className="GrpMessagingBodyDiv">
        {/* Passing Parent props to the child (localUser and remoteUser) */}
        {
            props.groupInfo.id   ? (<MessageInput Sender={props.localUser} groupInfo={props.groupInfo}/>)
                                            : <img style={{alignSelf: 'center', justifySelf: 'center', position: 'relative', bottom: '-20%'}} src={dogo} width={500} height={500} alt="user-photo" />
        }
    </div>
    )
}

export default ChatUser