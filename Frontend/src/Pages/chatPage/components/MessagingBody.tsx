import { useContext, useState } from 'react';
import Conversation from './conversation'
import MessageInput from './messageInput'
import { socketContext } from './socket.client';

// const socket = useContext(socketContext);
const MessagingBody = (props: any) => {
	const [messaging, setMessaging] = useState<string[]>([]);
	
	const handleNewMessage = (newMessage: string) => {
		// props.psocket.emit('newMessage', newMessage)
		// props.psocket.on('onMessage', (payload: any) =>
        // {
		// 	setMessaging(prevMessaging => [...prevMessaging, payload]);
        // });
		
		setMessaging(prevMessaging => [...prevMessaging, newMessage]);
		console.log(messaging);
	};

	return (
	<div className="MessagingBodyDiv">
		<Conversation MessageArr={messaging}/>
		<MessageInput onMessageInput={handleNewMessage}/>
	</div>
	)
}

export default MessagingBody