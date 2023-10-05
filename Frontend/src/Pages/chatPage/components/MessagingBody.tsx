import { useContext, useState } from 'react';
import Conversation from './conversation'
import MessageInput from './messageInput'
import { socketContext } from './socket.client';

const MessagingBody = (props: any) => {
	const [messaging, setMessaging] = useState<string[]>([]);
	
	props.psocket.on('onMessage', (payload: any) => {
		receiveMessage(payload);
	});
	
	const handleNewMessage = (newMessage: string) => {
		props.psocket.emit('newMessage', newMessage)
		console.log('How manytimes this have been called');
	};
	
	const receiveMessage = (newMessage: string) => {
		setMessaging(prevMessaging => [...prevMessaging, newMessage]);
	}
	

	return (
	<div className="MessagingBodyDiv">
		<Conversation MessageArr={messaging}/>
		<MessageInput onMessageInput={handleNewMessage}/>
	</div>
	)
}

export default MessagingBody