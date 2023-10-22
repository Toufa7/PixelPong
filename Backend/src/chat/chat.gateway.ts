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
      origin: 'http://localhost:5173',
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
    // how to use this in front end
    // emit using this event ('getOldCnv')
    // receive on ('postOldCnv')


    
    //////////////////     -------send messages------  ///////////////////////
    @SubscribeMessage('msgToServer')
    async handleMessage(client : Socket, body : any) {

      console.log("msgToServer");
        const user = await this.getUser(client);
        const usermuted = await this.prisma.groupchat.findUnique({
          where: { id: body.roomid },
          select: {
            usersmute: true,
          },
        });
        //check if user is muted
        if(usermuted.usersmute.some((usermute) => usermute.id == user.id)){
          console.log("user is muted");
          return ;
        }
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
              pic: user.pic,
              side: body.side,
              message: body.message,
              idsender : user.id,
              timestamp: body.timestamp
            });
            this.getConv(client);
            this.server.to(idUs).emit('postOldCnv'  , await this.oldcnv(body.id));
        // }
    }


    
}