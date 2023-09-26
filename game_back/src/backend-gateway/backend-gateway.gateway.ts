import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Controller, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Players_Management } from './players-management.service';
import { Rooms } from './entities/room.service';


@WebSocketGateway(8001 ,{cors : { origin : 'http://localhost:5173' , credentials: true},pingInterval: 1000,
pingTimeout: 1000, path : '/online'})
export class BackendGatewayGateway  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly Players: Players_Management,
      private readonly Rooms : Rooms) {}

  @WebSocketServer()
  public server : Server;

  afterInit(server: Server) {
    this.server = server;
    console.log("Server listening on port 8001");
  }

  handleConnection(Player: Socket) {
        console.log("---------------CONNECTION SECTION ------------------")
        console.log("new Player connected " + Player.id);
        this.Players.AddPlayer(Player.id,0,200);
        this.Rooms.SetupRooms(Player,this.Players);
        console.log("---------------------CCCoooCCC--------------------------------\n")
        // this.server.emit("UpdatePlayerPos",this.Players.players);
  }

  handleDisconnect(Player: Socket) {
    console.log("\n--------------DISCONECTION------------------")
    console.log("Player disconnected " + Player.id);
    for(const id in this.Rooms.rooms){
      const Room = this.Rooms.rooms[id];
      if (Player.id == Room.Player1.id){
          delete Room.Player1;
      }
      else if (Player.id == Room.Player2.id){
      delete Room.Player2;
      }
      Room.client_count--;
    }
    delete this.Players.players[Player.id];
    console.log("---------------------DDiiiDD-------------------------");
    // this.server.emit("UpdatePlayerPos",this.Players.players);
  }


  // @SubscribeMessage("joinRoom")
  // handleroomconnection(@MessageBody() player_data: any , @ConnectedSocket() Player : Socket ) {
  //   this.Rooms.AddPlayertoRoom(Player);
  // }
    
}











































































// onModuleInit() {
//     this.server.on("connection",(socket) => {
//       // let room_id  = new Number(Math.random() * 1000);
//       // socket.join(room_id.toString());

//       console.log("new Player connected " + socket.id);
//       this.Players.AddPlayer(socket.id,0,200);
//       this.server.emit("UpdatePlayerPos",this.Players.players);



//       //Disconnecting Player from server
//       //Removing it form the players object in Backend
//       //Remiting the Event

//       socket.on("disconnect",(reason) => {
//         console.log(reason);
//         delete this.Players.players[socket.id];
//         this.server.emit("UpdatePlayerPos",this.Players.players);
//       })
//     })
// }