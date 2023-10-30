import { Body, Get, HttpException, HttpStatus, Logger, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { decode } from 'jsonwebtoken';
import { Server, Socket } from 'socket.io'
import { JwtGuard } from 'src/guards/jwt.guards';
import { PrismaService } from 'src/auth/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { emit } from 'process';

let map = new Map<any, any>();
let mapclient = new Map<string, string[]>();


@WebSocketGateway({
  cors: {
    origin: `${process.env.FRONT_URL}`,
    credentials: true,
  },
  namespace: 'groupchat',
})

export class GroupchatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly prisma: PrismaService, private readonly Jwt: JwtService) { }
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('gorupChatGateway');

  ////////////////////////////////// -----init-- ////////////////////////////////
  afterInit(server: any) {
    this.logger.log("initialized");
  }

  ////////////////////////////////// -----disconnected-- ////////////////////////////////
  async handleDisconnect(client: Socket, ...args: any[]) {
    try {
      this.logger.log(`Client disconnected: ${client.id}`);
      const user = await this.getUser(client);
      if (user)
        mapclient.delete(user.id);
    }
    catch (err) { }
  }

  ////////////////////////////////// -----connected-- ////////////////////////////////
  async handleConnection(client: any, ...args: any[]) {
    try {
      this.logger.log(`Client connected: ${client.id}`);
      const user = await this.getUser(client);
      if (user) {
        if (mapclient.has(user.id))
          mapclient.get(user.id).push(client.id);
        else
          mapclient.set(user.id, [client.id]);
      }
    }
    catch (err) {
    }
  }


  async getUser(client: Socket) {
    const session = client.handshake.headers.cookie;
    if (session) {
      const jwt = session.split('=')[1];
      const t = decode(jwt);
      if (session && jwt) {
        try {
          const user = await this.Jwt.verifyAsync(jwt, { secret: 'THISISMYJWTSECRET' });
          return user;
        } catch (err) {
          return null;
        }
      }
    }
    return null;
  }



  ////////////////////////////////// -----join  ROOM-- ////////////////////////////////
  @SubscribeMessage('joinRoom')
  async handlenJoinRoom(client: Socket, data: any) {
    try {
      const user = await this.getUser(client);
      const inroom = await this.prisma.groupchat.findMany({
        where: {
          AND: [
            { id: data.roomid },
            { usersgb: { some: { id: user.id } } }
          ],
        },
      });
      if (inroom.length != 0) {
        if (map.get(`${data.roomid}${user.id}`) != client.id) {
          map.set(data.roomid + user.id, client.id)
          client.join(data.roomid);
        }
      }
    }
    catch (err) {
      return ;
    }
  }

  ////////////////////////////////// -----send message to groupchat-- ////////////////////////////////
  @SubscribeMessage('msgToRoom')
  async handleMessageRoom(client: Socket, body: any): Promise<void> {
    try {
      const user = await this.getUser(client);
      // get usermuted of a groupchat
      const usermuted = await this.prisma.groupchat.findUnique({
        where: { id: body.roomid },
        select: {
          usersmute: true,
        },
      });

      //check if user is muted
      if (usermuted.usersmute.some((user1) => user1.userId == user.id)) {
        console.log("user is muted");
        return;
      }
      const inroom = await this.prisma.groupchat.findMany({
        where: {
          AND: [
            { id: body.roomid },
            { usersgb: { some: { id: user.id } } }
          ],
        },
      });

      if (inroom.length != 0) {
        await this.prisma.messagegb.create({
          data: {
            sender: { connect: { id: user.id } },
            groupchat: { connect: { id: body.roomid } },
            message: body.message
          },
        });
        const blocked = await this.prisma.user.findUnique({
          where: { id: user.id },
          select: {
            blocked: true,
            blockedby: true,
          },
        });
        const userblockingp = await this.prisma.groupchat.findUnique({
          where: { id: body.roomid },
          select: {
            usersblock: true,
          },
        });
        //check if user is blocked
        if (userblockingp.usersblock.some((user1) => user1.id == user.id)) {
          console.log("user is blocked in groupchat");
          return;
        }
        const allsocket = await this.server.in(body.roomid).fetchSockets();
        allsocket.forEach((socket) => {
          blocked.blocked.forEach((block) => {
            if (socket.id == map.get(body.roomid + block.id)) {
              socket.leave(body.roomid);
            }
          });
          blocked.blockedby.forEach((block) => {
            if (socket.id == map.get(body.roomid + block.id)) {
              socket.leave(body.roomid);
            }
          });
        });

        this.server.to(body.roomid).emit(body.roomid, {
          roomid: body.roomid,
          timestamp: new Date(),
          side: body.side,
          messageid: body.messageId,
          message: body.message,
          idsender: user.id,
          username: user.username,
          pic: user.image,

        });

        allsocket.forEach((socket) => {
          blocked.blocked.forEach((block) => {
            if (socket.id == map.get(body.roomid + block.id)) {
              socket.join(body.roomid);
            }
          });
          blocked.blockedby.forEach((block) => {
            if (socket.id == map.get(body.roomid + block.id)) {
              socket.join(body.roomid);
            }
          });
        });

      }
    }
    catch (err) { 
      return; 
    }
  }

  ////////////////////////////////// -----leave room-- ////////////////////////////////
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket, data: any) {
    try {
      const user = await this.getUser(client);
      const inroom = await this.prisma.groupchat.findMany({
        where: {
          AND: [
            { id: data.roomid },
            { usersgb: { some: { id: user.id } } }
          ],
        },
      });
      if (inroom.length != 0) {
        client.leave(data.roomid);
      }
    }
    catch (err) {
      return ;
    }
  }


  ////////////////////////////////// -----request to join groupchat-- ////////////////////////////////
  async sendrequest(id: string, idsender: string) {
    try {
      console.log("map  :: ", mapclient);
      //check if user in groupchat
      const inroom = await this.prisma.groupchat.findMany({
        where: {
          AND: [
            { id: id },
            { usersgb: { some: { id: idsender } } }
          ],
        },
      });
      if (inroom.length != 0) {
        console.log("user in groupchat");
        return;
      }
      //get userban of a groupchat
      const userban = await this.prisma.groupchat.findUnique({
        where: { id: id },
        select: {
          usersblock: true,
        },
      });

      //check if user is ban
      if (userban.usersblock.some((user) => user.id == idsender)) {
        console.log("user is ban");
        return ("user is ban");
      }
      const datagp = await this.prisma.groupchat.findUnique({
        where: { id: id },
      });
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
            { senderId: idsender },
            { receiverId: superadmin.superadmin.id },
            // {groupchatId : id},
          ],
        },
      });
      if (notification.length != 0) {
        console.log("notification already exist");
        return ("notification already exist");
      }
      //get user 
      const user = await this.prisma.user.findUnique({
        where: { id: idsender },
      });
      //create notification in database
      await this.prisma.requestjoingroup.create({
        data: {
          sender: { connect: { id: idsender } },
          receiver: { connect: { id: superadmin.superadmin.id } },
          groupchat: { connect: { id: id } },
          namegp: datagp.namegb,
          from: user.username,
        },
      });
      //send notification to superadmin of groupchat
      this.server.to(mapclient.get(superadmin.superadmin.id)).emit('notificationgp', {
        senderId: idsender,
        receiverId: superadmin.superadmin.id,
        type: 'join groupchat',
        photo: user.profileImage,
        namegp: datagp.namegb,
        from: user.username,
        groupchatId: id,
        createdAt: new Date(),
      });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
