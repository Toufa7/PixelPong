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
// import { } from 'socket.io-client';



let map = new Map <any , any>();


@WebSocketGateway({
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:5173'],
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

    async handleConnection(client: Socket, ...args: any[]) {
      console.log("Im hererererererere");
      this.logger.log(`connected : ${client.id}`  );
      const user = await this.getUser(client);
      console.log(user);
      if(user){
        map.set(user.id, client.id);
        console.log(map);
      }
    }



    handleDisconnect(client: Socket, ...args: any[]) {
        this.logger.log(`Disconnect : ${client.id}`  );
        
    }




    ////////////////////////////////// -----DM-- ////////////////////////////////

    ///////////////get old convetation ///////////////////////
    @SubscribeMessage('getOldCnv')
    async getConv(client : Socket) {
      const user = await this.getUser(client);
      const dMSChat1 =  await this.prisma.dmschat.findMany({
        where: {
          senderId: user.id,
        },
        orderBy: {
          createdAt: 'desc'
        },
      });
      let tab : string[] = [];
      dMSChat1.forEach(element => {
        if(tab.filter(e => e == element.receiverId).length == 0)
          tab.push(element.receiverId);
      });
      // console.log("dmschat :: ", tab);
      this.server.to(map.get(user.id)).emit('postOldCnv'  , tab );
    }
    // how to use this in front end
    // emit using this event ('getOldCnv')
    // receive on ('postOldCnv')



    //////////////////get old messages ///////////////////////
    // @SubscribeMessage('getOldMsg')
    // async getMsg(client : Socket, id : any) {
    //   const user = await this.getUser(client);
    //   const dMSChat =  await this.prisma.dmschat.findMany({
    //             where: {
    //               OR: [
    //                 {
    //                   senderId: user.id,
    //                   receiverId: id
    //                 },
    //                 {
    //                   senderId: id,
    //                   receiverId: user.id
    //                 } 
    //               ]
    //             },
    //         });
    //         // console.log("dmschat :: ", dMSChat);
    //         // if (!dMSChat){
    //         //     const dMSChat1 =  await this.prisma.dmschat.create({
    //         //         data: {
        
    //         //           sender: {connect: {id: user.id}},
    //         //           receiver: {connect: {id:id}},
    //         //           messageDMs : ""
    //         //         },
    //         //     });
    //         //     this.server.emit('msgToClient'  , dMSChat1 );
    //         // }
    //         // else{
    //           this.server.to(map.get(user.id)).emit('postOldMsg'  , dMSChat);
    //         // }
    // }


    
    //////////////////send messages ///////////////////////
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
          console.log("msgToClient");
            this.server.to(idUs).emit('msgToClient', 
            { id :body.id,
            username: body.username,
            pic: body.pic,
            side: body.side,
            message: body.message,
            timestamp: body.timestamp});
        // }
    }


    ///frontend send body{idre , msg}

    ////////////////////////////////// -----ROMM-- ////////////////////////////////

    @SubscribeMessage('joinRoom')
    handlenJoinRoom(client : Socket , room :string)
    {
        client.join(room);
        client.emit('joinedRoom', room);

    }


    @SubscribeMessage('leaveRoom')
    handlenLeaveRoom(client : Socket , room :string)
    {
        client.leave(room);
        client.emit('leftRoom', room);

    }


    

    // @WebSocketServer()

    // server : Server;
    // // this.server.handlshake.cookiee;
    // onModuleInit(){
    //     this.server.on('connection', (socket) =>{
    //         console.log(socket.id);
    //         console.log("connected");
    //     });

    // }

    // @SubscribeMessage('newMessage')
    // onNewMessage( client: Socket, @MessageBody() body : any){
    //     console.log(client);

    //     this.server.emit('onMessage', body)

    // }

    // const co = this.server.handlshake.cookiee;
}