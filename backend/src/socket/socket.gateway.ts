// import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @WebSocketGateway()
// export class SocketGateway {
//     @WebSocketServer() server: Server;

//     @SubscribeMessage('connect')
//     handleConnection(client: any, data: any) {
//       console.log(`Client connected: ${client.id}`);
//     }
//     @SubscribeMessage('disconnect')
//     handleDisconnect(client: any) {
//       console.log(`Client disconnected: ${client.id}`);
//     }


// }
