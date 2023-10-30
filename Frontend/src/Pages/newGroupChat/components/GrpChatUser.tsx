import { useState, useEffect } from 'react'
import axios from 'axios'
import MessageInput from './GrpmessageInput'
import exit from '../assets/exit.svg'
import info from '../assets/info.svg'
import dogo from '../assets/dogo.gif'
import crown from '../assets/crown.svg'
import toast from 'react-hot-toast'
import manage from '../assets/manage.svg'
import ManageGroup from './mangeGroup'
import CreateGroup from './createGroup'
interface localUserClass
{
    id: string,
    email: string,
    profileImage: string,
    status: string,
    username: string,
}

interface grpInfoClass
{
    id: string,
    namegb: string,
    idsuperadmin: string,
    grouptype: string,
    password: string,
    image: string,
}

const ChatUser = (props : any) => {
    
    //Fetching current user (Receiver) data each time the prop gets new value
    const [groupRoom, setgroupRoom] = useState<grpInfoClass>({id: '', namegb: '', idsuperadmin: '', grouptype: '', image: '', password: ''});
    const [localUser, setLocalUser] = useState<localUserClass>({ id: '', email: '', profileImage: '', status: '', username: '' });


    //Fetching selcted group info
    useEffect(() => {
        if (props.pcurrentUserId != '')
        {
            axios.get(`http://localhost:3000/groupchat/${props.pcurrentUserId}/groupinfo`, { withCredentials: true })
            .then((response) => {
                console.log("Just dance --->", response.data)
                setgroupRoom(response.data);
            })
			.catch(Error)
        }
    }, [props.pcurrentUserId]);
    
    //Identifying local user
    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/profil`, { withCredentials: true })
            .then((res:any) =>  {
                setLocalUser(res.data);
            })
            .catch(Error)
    }, [])

    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [data, setLabel] = useState({
		label : false,
		createOrmanage : false
	})

    const [isCreated, setIsCreated] = useState<boolean>(false)
    
    useEffect(() => {
        if (props.pcurrentUserId != '') 
        {
            axios.get(`http://localhost:3000/groupchat/${props.pcurrentUserId}/users`, { withCredentials: true })
            .then((response) => {
                setUsers(response.data);
            })
			.catch(Error)
        }
    }, [props.pcurrentUserId]);
    
    useEffect(() => {
        if (props.pcurrentUserId != '') 
        {
            axios.get(`http://localhost:3000/groupchat/${props.pcurrentUserId}/admins`, { withCredentials: true })
            .then((response) => {
                console.log("Admins -> ", response.data)
                setAdmins(response.data);
            })
			.catch(Error)
        }
    }, [props.pcurrentUserId]);


    const openDialogUsers = () => {
        console.log("Clicked On Info")
        const dialog = document.getElementById('manageGroup');
		dialog?.showModal();
    }

    const manageGroup = () => {
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
                                groupRoom.image ?   <img style={{border: '3px solid'}} src={`http://localhost:3000/groupchat/getimage/${groupRoom.id}`} alt="Group-photo"/>
                                                        :   <img src={info} alt="Group-photo" />
                            }
                            <div className="GrpchatUserName">
                                <span>
                                    {
                                        //Conditional rendring to display the profile username or not based on the presence of groupRoom.username
                                        groupRoom.namegb ?   groupRoom.namegb
                                                            :   'Start a conversation'
                                    }
                                </span>
                            </div>
                        </div>
                    <div className='GrpchatUserControls'>
                    {
                        //Conditional rendring to display the control buttons or not based on the presence of groupRoom.profileImage
                        groupRoom.namegb ?  (<div className="GrpchatControlButtons">
                                                        <button className='mobileManageGrp'>
                                                            <img src={manage} onClick={openDialogUsers} width={50} height={50} title='Group Info'></img>
                                                        </button>
                                                        <button className='GrpuserControlButtons'>
                                                            <img src={info} onClick={manageGroup} width={50} height={50} title='Manage Groups'></img>
                                                        </button> 
                                                        <button className='GrpuserControlButtons'>
                                                            <img src={exit} onClick={() => {
                                                                axios.delete(`http://localhost:3000/groupchat/${props.pcurrentUserId}/exit`, { withCredentials: true })
                                                                .then(() => {
                                                                    toast.success(`Leaving ${groupRoom.namegb}`, {style: {textAlign: "center", width: '300px', color: 'black'}, position: "top-right"  , duration: 5000});
                                                                })
                                                                .catch((error) => {
                                                                    toast.error(`Leaving ${groupRoom.namegb} Failed`, {style: {textAlign: "center", width: '300px', color: 'black'}, position: "top-right"  , duration: 5000});
                                                                });
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
            <dialog style={{height: "600px", width: "800px", background: "#e4f0ff"}} className="nes-dialog" id="manageGroup">
                <button onClick={() => {document.getElementById('manageGroup')?.close()}} >X</button>
                <form method="dialog">
                    <menu className="dialog-menu">
                        <div>
                            <button className={data.createOrmanage ? 'selected' : ''} onClick={() => setLabel({label: true, createOrmanage: true})}>Group Settings</button>
                            <button className={!data.createOrmanage ? 'selected' : ''}  onClick={() => setLabel({label: true, createOrmanage: false})}>Create Group</button>
                            {
                                data.label ?
                                (
                                    data.createOrmanage ?
                                    (<ManageGroup setIsCreated={setIsCreated}/>)
                                        :
                                    (<CreateGroup setIsCreated={setIsCreated} />)
                                )
                                    :
                                (<></>)
                            }
                        </div>
                    </menu>
                </form>
            </dialog>
        </section>
 
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
                                    <img src={`http://localhost:3000/auth/avatar/${admins[idx].id}`} style={{ borderRadius: '30px', width: '50px', height: '50px', marginTop: '10px' }} alt="avatar" />
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

                        <div style={{ height: 'fit-content', overflow: 'auto', marginTop: '10px' }}>
                        {
                            // Listing Members
                            Object.keys(users).map((idx) => {
                                return (
                                    <div style={{ display: 'flex', alignItems: 'center' ,overflow: "auto" }} key={idx}>
                                        <img src={`http://localhost:3000/auth/avatar/${users[idx].id}`} style={{ borderRadius: '20px', width: '40px', height: '40px' }} alt="avatar" />
                                        <span style={{ marginLeft: '10px', marginRight: 'auto' }}>{users[idx].username}</span>
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
                                            : <img style={{alignSelf: 'center', justifySelf: 'center', position: 'relative', bottom: '-20%'}} src={dogo} width={500} height={500} alt="Group-photo" />
        }
    </div>
    )
}

export default ChatUser