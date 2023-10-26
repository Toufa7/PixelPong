import {
  ConnectedSocket,
  MessageBody,
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
import { io } from 'socket.io-client';
import { GateWayService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: ['localhost:5173', 'localhost:3000'],
    credentials: true,
  },
  namespace: 'user',
})
@UseGuards(JwtGuard)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
    // private readonly authservice: AuthService,
    private readonly userservice: UsersService,
    private readonly gatewayservice: GateWayService,
  ) {}
  connectedUsers: Map<string, string[]> = new Map();

  //handle connection and deconnection

  async handleConnection(client: Socket) {
    // const jwt = await this.getUser(client);
    // //console.log('client connected -->' + client.id, '  ', jwt);
    // this.server.emit('checkout', { msg: 'hello' });
    // if (jwt) {
    //   const user = decode(jwt); 
    //   // console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrr : ', user['id']);
    //   // console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrr : ', client.id);

    //   if(this.connectedUsers.has(user['id'] ))
    //     this.connectedUsers.get(user['id']).push(client.id);
    //   else
    //     this.connectedUsers.set(user['id'], [client.id]);
        
    //   const status = UserStatus.ONLINE;
    //   // //console.log(
    //   //   'ooooooooooooooooooooooooooooooooooooooookkkkkkkkkkkkkkkkkkkkkkkkkk',
    //   // );
    //   this.userservice.updatestatus(user, status);
    // }
  }

  async handleDisconnect(client: Socket) {
    // const jwt = await this.getUser(client);

    // if(jwt)
    // {
    //   const user = decode(jwt);
    //   console.log('A client disconnected');
    //   const index = this.connectedUsers.get(user['id']).indexOf(client.id);
    //   if(index != -1)
    //   this.connectedUsers.get(user['id']).splice(index, 1);
    // if (this.connectedUsers.get(user['id']).length === 0) {
    //     this.connectedUsers.delete(user['id'])
    //     console.log("i dont know ! ===============================> ",this.connectedUsers.get(user['id']))
    //     this.userservice.updatestatus(user,UserStatus.OFFLINE);
    //   }
    // }
  }

  // handle friend request
  handleFriendRequest(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    // Handle the friend request and send notifications as needed
    const { receiverId, type } = data;
    // this.sendNotification(receiverId, type);
  } 

  // Send a notification to a specific user

  async hanldleSendNotification(clientId: string, senderId: string, data) {
    try {
      // await this.gatewayservice.createnotification(data);
      const sockets = this.connectedUsers.get(clientId);
      console.log("wtffff",sockets)
      console.log("wtffff",clientId)

      if (sockets) {
        console.log('sending');
        this.server.to(sockets).emit('notification', data);
      }
    } catch (error) {
      //console.log(error);
    }
  }
  getUser(client: Socket) {
    const session = client.handshake.headers.cookie;
    if (session) {
      const jwt = session.split('=')[1];
      // //console.log('session ,', jwt);
      if (session && jwt) {
        return jwt;
      }
    }
    return null;
  }
}