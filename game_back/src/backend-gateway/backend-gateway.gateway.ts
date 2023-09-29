import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Controller, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Players_Management } from './entities/players-management.service';
import { Rooms } from './entities/room.service';
import { Interval, Timeout } from '@nestjs/schedule';


@WebSocketGateway({cors : { origin : 'http://localhost:5173' , credentials: true},pingInterval: 1000,
pingTimeout: 1000, path : '/online'})
export class BackendGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly Players: Players_Management,
      private readonly Rooms : Rooms) {}

  @WebSocketServer()
  public server : Server;

  public screen_metrics : {screen_width : number , screen_height : number} = {screen_width : 0, screen_height : 0};

  public Room_dl = "";

  afterInit(server: Server) {
    this.server = server;
    console.log("Server listening on port 8001");
  }

  handleConnection(Player: Socket) {
        Player.on("screen_metrics",(screen)=> {
          this.screen_metrics.screen_width = screen.s_w;
          this.screen_metrics.screen_height = screen.s_h;
          console.log("---------------CONNECTION SECTION ------------------")
          console.log("new Player connected " + Player.id);
          this.Players.AddPlayer(Player.id,0,(this.screen_metrics.screen_height / 2) - (90 / 2),20,90);
          this.Rooms.SetupRooms(Player,this.Players);
          console.log("---------------------CCCoooCCC--------------------------------\n")
          // this.server.to(Player.id).emit("UpdatePlayerPos",this.Players.players);
          // console.log(this.Rooms);
          this.SendToPlayersinRoom(Player,this.Rooms);
        })
  }

  handleDisconnect(Player: Socket) {
    // console.log(Player.id);
    let Player_deleted = Player.id;
    // let Room_that_effected : any  = "";
    for(const id in this.Rooms.rooms){
      const Room = this.Rooms.rooms[id];
      if (Room.Player1?.id == Player_deleted  || Room.Player2?.id == Player_deleted){
        this.Room_dl = Room.id;
        break;
      }
    }
    this.Rooms.CleanRoom(Player,this.Players,this.server);
    if (!this.Rooms.rooms[this.Room_dl]?.Player1 || !this.Rooms.rooms[this.Room_dl]?.Player2)
      console.log("this room + [" + this.Room_dl + "] is affected ---> Player " + Player.id);
    // this.server.to(Room_that_effected).emit("PlayersOfRoom",this.Rooms.rooms[Room_that_effected]);
  }

  SendToPlayersinRoom(Player : Socket , Rooms){
    for(const id in Rooms.rooms){
      const Room = Rooms.rooms[id];
      if (Room.Player1?.id == Player.id || Room.Player2?.id == Player.id)
      this.server.to(Room.Player1?.room_id || Room.Player2?.room_id).emit("PlayersOfRoom",Room);
    }
  }

  // @SubscribeMessage("screen_metrics")
  // FillScreenMetrics(@MessageBody() screen , @ConnectedSocket() Player : Socket){
  //   this.screen_metrics.screen_width = screen.s_w;
  //   this.screen_metrics.screen_height = screen.s_h;
  //   console.log("--->screen width" + this.screen_metrics.screen_width);
  //   console.log("--->screen height" + this.screen_metrics.screen_height);
  // }

  @SubscribeMessage("Player_movement")
    HadnleMovement(@MessageBody() Player_data , @ConnectedSocket() Player : Socket){
      let dy : number = 10;
        if ((Player_data.sig === "DOWN") && (Player_data.Key == Player_data.key_check)){
          // console.log("Player will Move Down from id --->" + this.Players.players[Player.id].id);
          this.Players.players[Player.id].y += dy;
          // return;
        }
        else if ((Player_data.sig === "UP") && (Player_data.Key == Player_data.key_check)){
          // console.log("Player will Move UP from id --->" + this.Players.players[Player.id].id);
          this.Players.players[Player.id].y -= dy;
          // return;
        }

        else if (Player_data.sig === "MOUSE"){
          // console.log("Mouse event " + Player_data.mouse_coord);
          this.Players.players[Player.id].y = Player_data.mouse_coord;
        }
        
    }
    @Interval(15)
    handleevent(){
        this.server.emit("UpdatePlayerPos",this.Players.players);
    }
}
































































Timeout








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
// }Timeout