import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;

  connectedUsers: Map<string, Socket>;
  @SubscribeMessage('connected')
  handleConnection(client: Socket) {
    this.connectedUsers.set(client.id, client);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket) {
    this.connectedUsers.forEach((value, key) => {
      if (value === client) {
        this.connectedUsers.delete(key);
      }
    });
  }
}
