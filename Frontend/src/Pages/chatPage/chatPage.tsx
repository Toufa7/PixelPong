import { useContext } from 'react'
import './chatPage.scss'
import MainNavBar from './components/mainNavBar'
import ChatNavBar from './components/chatNavBar'
import { chatSocketContext } from './components/socketContext'

const chatPage = () => {

    const socket = useContext(chatSocketContext);

    return  (
                <div className="chatPage">
                    <MainNavBar/>
                    <chatSocketContext.Provider value={socket}>
                        <ChatNavBar/>
                    </chatSocketContext.Provider>
                </div>
            )
}

export default chatPage