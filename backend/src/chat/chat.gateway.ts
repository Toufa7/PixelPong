import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from 'socket.io'

@WebSocketGateway({
    cors : {
        origin: ['http://localhost:5173']
    }
})
export class ChatGateway{

    @WebSocketServer()

    server : Server;

    onModuleInit(){
        this.server.on('connection', (socket) =>{
            console.log(socket.id);
            console.log("connected");
        });

    }




    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body : any){
        console.log(body);
        this.server.emit('onMessage', body)

    }
}