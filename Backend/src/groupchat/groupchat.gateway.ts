import { Body, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer , WsResponse } from '@nestjs/websockets';
import { decode } from 'jsonwebtoken';
import {Server , Socket } from 'socket.io'
import { JwtGuard } from 'src/guards/jwt.guards';
import { PrismaService } from 'src/auth/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { emit } from 'process';

let map = new Map <any , any>();

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
  namespace: 'groupchat',
})

export class GroupchatGateway implements OnGatewayInit , OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly prisma: PrismaService,private readonly Jwt:JwtService) {}
  @WebSocketServer() server : Server;
  private logger : Logger = new  Logger('gorupChatGateway');

  ////////////////////////////////// -----dis-- ////////////////////////////////
  async handleDisconnect(client: Socket, ...args: any[]) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const user = await this.getUser(client);
    if(user)
    {
      map.delete( user.id);
    }
  }
  async handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    const user = await this.getUser(client);
    if(user)
    {
      map.set(user.id,client.id);
    }
  }
  afterInit(server: any) {
    this.logger.log("initialized");
  }



  async getUser(client: Socket)  {
    const session = client.handshake.headers.cookie;
    if (session) {
      const jwt = session.split('=')[1];
      const t = decode(jwt);
      if (session && jwt) {
        try{
          const user = await this.Jwt.verifyAsync(jwt,{secret:'THISISMYJWTSECRET'});
          return user;
        }catch(err){
          return null; 
        }
      }
    }
    return null;
  }




  ////////////////////////////////// -----ROMM-- ////////////////////////////////

  @SubscribeMessage('joinRoom')
  async handlenJoinRoom(client : Socket , data : any)
  {
      const user = await this.getUser(client);

      const inroom = await this.prisma.groupchat.findMany({
        where: {
          AND: [
            { id : data.room },
            { usersgb : {some : {id : user.id}}}
          ],
        },
      });
      if(inroom.length != 0){
        client.join(data.room);
      }
  }

  @SubscribeMessage('msgToRoom')
  async handleMessageRoom(client : Socket, body : any) {
    const user = await this.getUser(client);
    const inroom = await this.prisma.groupchat.findMany({
      where: {
        AND: [
          { id : body.room },
          { usersgb : {some : {id : user.id}}}
        ],
      },
    });

    if(inroom.length != 0){
      this.server.to(body.room).emit('msgToclient', {'idsender': user.id, 'message': body.message});
      this.prisma.messagegb.create({
        data: {
          sender: {connect: {id: user.id}},
          groupchat: {connect: {id: body.room}},
          message : body.message
        },
      });
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client : Socket, data : any)
  {
    const user = await this.getUser(client);
    const inroom = await this.prisma.groupchat.findMany({
      where: {
        AND: [
          { id : data.room },
          { usersgb : {some : {id : user.id}}}
        ],
      },
    });
    if(inroom.length != 0){
      client.leave(data.room);
    }
  }


  async sendrequest(id : string , idsender : string){
    
    
    //get superadmin of a groupchat
    const superadmin = await this.prisma.groupchat.findUnique({
      where: { id: id },
      select: {
        superadmin: true,
      },
    });
    //check if notification already exist
    const notification = await this.prisma.requestjoingroup.findMany({
      where: {
        AND: [
          { senderId : idsender },
          { receiverId : superadmin.superadmin.id }
        ],
      },
    });
    if(notification.length != 0){
      return;
    }
    //create notification in database
    await this.prisma.requestjoingroup.create({
      data: {
        sender: {connect: {id: idsender}},
        receiver: {connect: {id: superadmin.superadmin.id}},
      },
    });

    //get user 
    const user = await this.prisma.user.findUnique({
      where: { id: idsender },
    });
    this.server.to(map.get(superadmin.superadmin.id)).emit('notification', {
      userId: idsender,
      type: 'join groupchat',
      photo: user.profileImage,
      message: `${user.username} sent you a friend request`,
      from: superadmin.superadmin.id,
      username: user.username,
    });
  }
}
