import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { WSGuard } from 'src/guards/jwt.guards';

@WebSocketGateway({
  cors: {
    origin: 'ws://localhost:5731',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
  },
  path: '/online',
})
@UseGuards(WSGuard)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private readonly authservice: AuthService) {}

  connectedUsers: Map<string, Socket>;
  @SubscribeMessage('connected')
  async handleConnection(client: Socket) {
    console.log('im here if you see this');
    const user = await this.getUser(client);
    if (user) this.connectedUsers.set(user.id, client);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket) {
    this.connectedUsers.forEach((value, key) => {
      if (value === client) {
        this.connectedUsers.delete(key);
      }
    });
  }
  getUser(client: Socket) {
    const session = client.handshake.auth.session;

    if (session && session.user) {
      // If the user is stored in the session, return it
      return session.user;
    }
  }
}
