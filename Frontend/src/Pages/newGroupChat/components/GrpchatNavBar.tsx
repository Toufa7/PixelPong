import React from 'react';
import { useEffect, useState } from 'react'
import { useMap } from "@uidotdev/usehooks";
import axios from 'axios'
import ChatUser from './GrpChatUser'
import DmChatUser from './GrpdmChatUser'
import ChatSearch from './GrpchatSearch'
import CreateGroup from './createGroup'
import ManageGroup from './mangeGroup'
interface chatUser {
    userName: string;
    pic: string;
    id: string;
}

const GrpchatNavBar = () => {
    const [currentUserId, setCurrentUserId] = useState('');
    const getCurentUserDms = (data: any) => {
        setCurrentUserId(data);
    }
    const [data, setLabel] = useState({
		label : false,
		createOrmanage : false
	}
)

    const [isCreated, setIsCreated] = useState<boolean>(false)
    return (
        <div className="GrpchatMessage">
            <div className="GrpchatNavBarDiv">
                <ChatSearch/>
                <div className="chatNavBarDivGroup" style={{border: "3px solid", borderRadius: "5px", background:"#FFFFFF", flex: "5", display: "flex", flexDirection: "column" , overflow: "hidden", zIndex: "0", minWidth: '150px'}}>
		            <div className="chatsContainerGroup" style={{display: "flex",flexDirection: "column", zIndex: "0"}}>
			            <div className="choice" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				            <button className={data.createOrmanage ? 'selected' : ''} onClick={() => setLabel({label: true, createOrmanage: true})}>Group Settings</button>
				            <button className={!data.createOrmanage ? 'selected' : ''}  onClick={() => setLabel({label: true, createOrmanage: false})}>Create Group</button>
			                </div> {data.label ?
                                (
                                    data.createOrmanage ?
                                    (<ManageGroup/>)
                                    :
                                    (<CreateGroup setIsCreated={setIsCreated} />)
                                )
				                :
				                ""
			                    }
		                    </div>
                            <Dms cu={getCurentUserDms} isCreated={isCreated}/>
	                    </div>
                    <div className="GrpchatLowerRibbon"></div>
                    <style>
                        {`
                        @media (max-width: 768px) {
                            .choice {
                                display: none !important;
                            }
                        }
                        `}
                    </style>
                </div>
            <div className="GrpuserProfileAndMessages"><ChatUser pcurrentUserId={currentUserId}/></div>
        </div>
  )
}

const Dms = (props:any) => {    
    
    //Groups map
    let GroupsMap = useMap();

    useEffect(() => {
        axios.get(`http://localhost:3000/groupchat`, {withCredentials: true})
            .then((response:any) => {
                for (let index = 0; index < response.data.length; index++) {
                    GroupsMap.set(response.data[index].id, response.data[index])
                }
            });
    }, [props.isCreated]);

    const updateSharedString = (newString: string) =>
    {
        props.cu(newString);
    };

    return (
        <div className="GrpchatDmDiv">
        <p>GROUPS</p>
        <div className="GrpuserDms">
            {
                Array.from(GroupsMap.values()).map((group, index) => (
                    <DmChatUser
                        key={index}
                        userName={group.namegb}
                        pic={`http://localhost:3000/groupchat/getimage/${group.id}`}
                        userId={updateSharedString}
                        id={group.id}
                        privacy={group.grouptype}
                    />
                ))
            }
        </div>
      </div>
    );
}

export default GrpchatNavBar