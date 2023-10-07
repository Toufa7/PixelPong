import MainNavBar from './components/mainNavBar'
import ChatNavBar from './components/chatNavBar'
import MessagesBox from './components/messagesBox'
import arseanl from './assets/saka.jpeg'
import './chatPageGroups.scss'

const chatPageGroup = () => {
	return (
		<div className="chatGroupPage">
			<MainNavBar/>
			<ChatNavBar/>
			<MessagesBox name="Arsenal Supporters" avatar={arseanl}/>
		</div>
	)
}

export default chatPageGroup 