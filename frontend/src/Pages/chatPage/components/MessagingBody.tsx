import { useState } from 'react';
import Conversation from './conversation'
import MessageInput from './messageInput'

const MessagingBody = () => {

	const [messaging, setMessaging] = useState<string[]>([]);

	const handleNewMessage = (newMessage: string) => {
	  setMessaging(prevMessaging => [...prevMessaging, newMessage]);
	};

	return (
	<div className="MessagingBodyDiv">
		<Conversation MessageArr={messaging}/>
		<MessageInput onMessageInput={handleNewMessage}/>
	</div>
	)
}

export default MessagingBody