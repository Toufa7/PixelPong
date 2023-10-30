import { Body, Get, HttpException, HttpStatus, Logger, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { decode } from 'jsonwebtoken';
import { Server, Socket } from 'socket.io'
import { JwtGuard } from 'src/guards/jwt.guards';
import { PrismaService } from 'src/auth/prisma.service';
import { Dmschat, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { emit } from 'process';



let map = new Map<any, any>();


@WebSocketGateway({
  cors: {
    origin: `${process.env.FRONT_URL}`,
    credentials: true,
  },
  namespace: 'chat',
})

@UseGuards(JwtGuard)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly prisma: PrismaService, private readonly Jwt: JwtService) { }
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');
  afterInit(server: Server) {

    this.logger.log("initialized");
  }
  async getUser(client: Socket) {
    const session = client.handshake.headers.cookie;
    if (session) {
      const jwt = session.split('=')[1];
      const t = decode(jwt);
      if (session && jwt) {
        try {
          const user = await this.Jwt.verifyAsync(jwt, { secret: `${process.env.JWT_SECRET}`});
          return user;
        } catch (err) {
          return null;
        }
      }
    }
    return null;
  }


  async oldcnv(iduser: string): Promise<string[]> {
    try {
      const dMSChat1 = await this.prisma.dmschat.findMany({
        where: {
          OR: [
            { senderId: iduser },
            { receiverId: iduser }
          ],
        },
        orderBy: {
          createdAt: 'desc'
        },
      });
      let tab: string[] = [];
      //filter id of the other user
      dMSChat1.forEach(element => {
        if (!tab.includes(element.senderId) && element.senderId != iduser) {
          tab.push(element.senderId);
        }
        else if (!tab.includes(element.receiverId) && element.receiverId != iduser) {
          tab.push(element.receiverId);
        }
      });
      return tab;
    }
    catch (err) { return [] }
  }
  ///////////////////////////////// connection ////////////////////////////////
  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`connected : ${client.id}`);
    const user = await this.getUser(client);
    if (user) {
      map.set(user.id, client.id);
    }
  }

  ///////////////////////////////// disconnection ////////////////////////////////
  async handleDisconnect(client: Socket, ...args: any[]) {
    this.logger.log(`Disconnect : ${client.id}`);
    const user = await this.getUser(client);
    if (user) {
      map.delete(user.id);
    }
  }

  ////////////////////////////////// -----DM-- ////////////////////////////////
  ///////////////   -----get old convetation----- ///////////////////////
  @SubscribeMessage('getOldCnv')
  async getConv(client: Socket) {
    const user = await this.getUser(client);
    this.server.to(map.get(user.id)).emit('postOldCnv', await this.oldcnv(user.id));
  }

  //////////////////     -------send messages------  ///////////////////////
  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, body: any) {
    try {
      console.log("msgToServer");
      const user = await this.getUser(client);
      const idUs = map.get(body.id);
      const blocked = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          blocked: true,
          blockedby: true,
        },
      });
      //check if user is blocked
      if (blocked.blocked.some((user1) => user1.id == body.id) || blocked.blockedby.some((user1) => user1.id == body.id)) {
        console.log("user is blocked");
        return;
      }

      const dMSChat1 = await this.prisma.dmschat.create({
        data: {

          sender: { connect: { id: user.id } },
          receiver: { connect: { id: body.id } },
          messageDMs: body.message
        },
      });
      this.server.to(idUs).emit('msgToClient', {
        id: body.id,
        username: user.username,
        pic: user.image,
        side: body.side,
        message: body.message,
        idsender: user.id,
        timestamp: new Date()
      });
      this.getConv(client);
      this.server.to(idUs).emit('postOldCnv', await this.oldcnv(body.id));
    }
    catch (err) { }
  }



  //////////////////////request to join game //////////////////////////
  async requestjoingame(namesender: string, idsender: string, idrecever: string) {
    try {
      //get token of user
      const tokenofuser = await this.prisma.user.findUnique({
        where: { id: idsender },
        select: {
          tokenjoingame: true,
        },
      });
      if (tokenofuser.tokenjoingame == null) {
        const idUs = await map.get(idrecever);
        const token = this.generate_Random_id(10);
        await this.prisma.user.update({
          where: { id: idsender },
          data: {
            tokenjoingame: token,
          },
        });
        return this.server.to(idUs).emit('requestjoingame', {
          from: namesender,
          token: token,
          idsender: idsender
        });
      }
    }
    catch (err) {
      return;
    }

  }
  //accept request to join game
  async acceptrequestjoingame(idrequest: string, token: string, idrecever: string) {
    try {
      await this.prisma.user.update({
        where: { id: idrequest },
        data: {
          tokenjoingame: token,
        },
      });
      const idUs = await map.get(idrecever);
      this.server.to(idUs).emit('acceptrequestjoingame', {
        message: "accept",
      });
    }
    catch (err) {
      return;
    }
  }

  //refuse request to join game
  async refuserequestjoingame(user: any, idrecever: string) {
    try {
      await this.prisma.user.update({
        where: { id: idrecever },
        data: {
          tokenjoingame: null,
        },
      });
      const idUs = await map.get(idrecever);
      this.server.to(idUs).emit('msgToClient', {
        id: idrecever,
        username: user.username,
        pic: user.image,
        side: 1,
        message: "refuse request to join game",
        idsender: user.id,
        timestamp: new Date()
      });
    }
    catch (err) {
      return;
    }
  }


  //genarate token for game
  generate_Random_id(lenght: number): string {
    let result = "";
    let charachters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456759_";
    let count = 0;
    while (count <= lenght) {
      result += charachters[Math.floor(Math.random() * charachters.length)];
      count++;
    }
    return (result);
  }


}