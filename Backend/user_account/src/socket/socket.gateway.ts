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
import { JwtGuard } from 'src/guards/jwt.guards';
import { Client } from 'socket.io/dist/client';
import { UsersService } from 'src/users/users.service';
import { UserStatus } from '@prisma/client';
// import { WSGuard } from 'src/guards/jwt.guards';
import { decode } from 'jsonwebtoken';


@WebSocketGateway({
  cors: {
    origin: ['localhost:517', 'localhost:3000'],
    credentials: true,
  },
  namespace: 'user',
})
@UseGuards(JwtGuard)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private readonly authservice: AuthService,
    private readonly userservice: UsersService) {}
  connectedUsers: Map<string, Socket> = new Map();

  // onModuleInit() {
  //   this.server.on('connection', (socket) => {
  //     console.log('id', socket.id);
  //     console.log('connected to socket');
  //   });
  // }
  async handleConnection(client: Socket) {
    const jwt = await this.getUser(client);
    console.log('client connected -->' + client.id, '  ', jwt);
    this.server.emit('chekcout', { msg: 'hello' });
    console.log('im here if you see this');
    if (jwt) {
      const user = decode(jwt);

      this.connectedUsers.set(client.id, client);
      const status = UserStatus.ONLINE
      this.userservice.updatestatus(user, status)
    }
  }

  async handleDisconnect(client: Socket) {
    console.log('A client disconnected');
    if (this.connectedUsers.has(client.id)) {
      const jwt = await this.getUser(client);
      if (!jwt) {
        this.connectedUsers.delete(client.id);
      }
    }
  }
  getUser(client: Socket) {
    const session = client.handshake.headers.cookie;
    if (session) {
      const jwt = session.split('=')[1];
      console.log('session ,', jwt);
      if (session && jwt) {
        return jwt;
      }
    }
    return null;
  }
}
