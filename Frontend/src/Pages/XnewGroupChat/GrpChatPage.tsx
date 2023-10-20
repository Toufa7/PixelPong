import React from 'react'
import { useContext } from 'react'
import './GrpChatPage.scss'
import MainNavBar from './components/GrpmainNavBar'
import GrpchatNavBar from './components/GrpchatNavBar'
import { grpSocketContext } from './components/GrpsocketContext'

const GrpChatPage = () => {

    const socket = useContext(grpSocketContext);

    return (
        <div className="GrpchatPage">
            <MainNavBar/>
            <grpSocketContext.Provider value={socket}>
                <GrpchatNavBar/>
            </grpSocketContext.Provider> 
        </div>
    )
}

export default GrpChatPage