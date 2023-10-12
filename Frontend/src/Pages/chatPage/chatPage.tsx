import { useContext } from 'react'
import './chatPage.scss'
import MainNavBar from './components/mainNavBar'
import ChatNavBar from './components/chatNavBar'
import { chatSocketContext } from './components/socketContext'

// import { createContext } from "react";
// import { Socket, io } from "socket.io-client";

// export const socket : Socket = io("ws://localhost:3000/chat", { withCredentials: true });
// export const chatSocketContext = createContext<Socket>(socket);

const chatPage = () => {

    const socket = useContext(chatSocketContext);

    return (
        <div className="chatPage">
        <MainNavBar/>
        <chatSocketContext.Provider value={socket}>
            <ChatNavBar/>
        </chatSocketContext.Provider>
        </div>
    )
}

export default chatPage