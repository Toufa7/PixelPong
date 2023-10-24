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
// import { } from 'socket.io-client';



let map = new Map <any , any>();


@WebSocketGateway({
    cors: {
      origin: '*',
      credentials: true,
    },
    namespace: 'chat',
  })

  // @UseGuards(JwtGuard)
  export class ChatGateway implements OnGatewayInit , OnGatewayConnection, OnGatewayDisconnect{
    constructor(private readonly prisma: PrismaService,private readonly Jwt:JwtService) {}
    @WebSocketServer() server : Server;
      
    private logger : Logger = new  Logger('ChatGateway');
    afterInit(server: Server) {
      
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


    async oldcnv(iduser : string){
      const dMSChat1 =  await this.prisma.dmschat.findMany({
        where: {
          OR: [
            {senderId: iduser},
            {receiverId: iduser}
          ],
        },
        orderBy: {
          createdAt: 'desc'
        },
      });
      let tab : string[] = [];
      //filter id of the other user
      dMSChat1.forEach(element => {
          if(!tab.includes(element.senderId) && element.senderId != iduser)
          {
            tab.push(element.senderId);
          }
          else if(!tab.includes(element.receiverId)&& element.receiverId != iduser)
          {
            tab.push(element.receiverId);
          }
      });
      return tab;
    }
    ///////////////////////////////// connection ////////////////////////////////
    async handleConnection(client: Socket, ...args: any[]) {
      // console.log("Im hererererererere");
      this.logger.log(`connected : ${client.id}`  );
      const user = await this.getUser(client);
      // console.log(user);
      if(user){
        map.set(user.id, client.id);
        // console.log(map);
      }
    }

    ///////////////////////////////// disconnection ////////////////////////////////
    async handleDisconnect(client: Socket, ...args: any[]) {
        this.logger.log(`Disconnect : ${client.id}`  );
        const user = await this.getUser(client);
        console.log(user);
        if(user){
          map.delete(user.id);
          console.log(map);
        } 
    }

    ////////////////////////////////// -----DM-- ////////////////////////////////
    ///////////////   -----get old convetation----- ///////////////////////
    @SubscribeMessage('getOldCnv')
    async getConv(client : Socket) {
      console.log("getoldcnv");
      const user = await this.getUser(client);
      
      this.server.to(map.get(user.id)).emit('postOldCnv'  , await this.oldcnv(user.id));
    }

    //////////////////     -------send messages------  ///////////////////////
    @SubscribeMessage('msgToServer')
    async handleMessage(client : Socket, body : any) {

      console.log("msgToServer");
        const user = await this.getUser(client);
        const idUs = map.get(body.id);
            const dMSChat1 =  await this.prisma.dmschat.create({
              data: {

                sender: {connect: {id: user.id}},
                receiver: {connect: {id: body.id}},
                messageDMs : body.message
              },
          });

            this.server.to(idUs).emit('msgToClient', {
              id :body.id,
              username: user.username,
              pic: user.image,
              side: body.side,
              message: body.message,
              idsender : user.id,
              timestamp: body.timestamp
            });
            this.getConv(client);
            this.server.to(idUs).emit('postOldCnv'  , await this.oldcnv(body.id));
        // }
    }
    //////////////////////request to join game //////////////////////////
    async requestjoingame(namesender: string, idsender: string, idrecever: string) {
      console.log("requestjoingame");
      const idUs = await map.get(idrecever);
      const token = this.generate_Random_id(10);

      await this.prisma.user.update({
        where: { id: idsender },
        data: {
          tokenjoingame : token,
        },
      });
      this.server.to(idUs).emit('requestjoingame', {
        from : namesender,
        token : token,
        idsender : idsender
      });
    }


    //genarate token for game
    generate_Random_id(lenght : number) : string{
      let result = "";
      let charachters : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456759_";
      let count  = 0;
      while (count <= lenght){
          result += charachters[Math.floor(Math.random() * charachters.length)];
          count++;
      }
      return (result);
  }

    
}