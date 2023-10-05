import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server , Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  },
  namespace: 'chat',
})
export class ChatGateway  {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any,@ConnectedSocket()client:Socket) {
    console.log(body);
    this.server.to(client.id).emit('onMessage', {
      msg: 'new Message',
      content: body,
    });
  }
}
