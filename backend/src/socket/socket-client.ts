// import { Injectable, OnModuleInit } from "@nestjs/common";
// import { Socket, io } from 'socket.io-client';

// @Injectable()
// export class SocketClient implements OnModuleInit{
//     public socketClient: Socket;
//     constructor () {
//         this.socketClient = io('http://localhost:3000');
//     }
//     onModuleInit() {
//         this.registerConsumerEvent();
//       }
  
//     private registerConsumerEvent(){
//         this.socketClient.emit('newMessage', {msg: 'hey ayoub!'})
//         this.socketClient.on('connect', ()=>{
//             console.log('conected to Gateway')
//         });
//         this.socketClient.on('onMessage', (payload: any) =>
//         {
//             console.log(payload);
//         });
//     }
// }