import { useContext } from 'react'
import './GrpChatPage.scss'
import MainNavBar from './components/GrpmainNavBar'
import GrpchatNavBar from './components/GrpchatNavBar'
import { chatSocketContext } from './components/GrpsocketContext'
import React from 'react'

// import { createContext } from "react";
// import { Socket, io } from "socket.io-client";

// export const socket : Socket = io("ws://localhost:3000/chat", { withCredentials: true });
// export const chatSocketContext = createContext<Socket>(socket);

const GrpChatPage = () => {

    const socket = useContext(chatSocketContext);

    return (
        <div className="GrpchatPage">
        <MainNavBar/>
        <GrpchatNavBar/>
        {/* <chatSocketContext.Provider value={socket}>
        </chatSocketContext.Provider>  */}
        </div>
    )
}

export default GrpChatPage