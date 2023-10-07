import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Controller, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Players_Management } from './entities/players-management.service';
import { Rooms } from './entities/room.service';
import { Interval, Timeout } from '@nestjs/schedule';


@WebSocketGateway({
namespace :"/Game",
cors : {
origin : ['http://localhost:5173' , 'http://10.14.8.4:5173'] , 
methods: ["GET", "POST"],
credentials: true , transports : 'websocket'
},
pingInterval: 1000,
pingTimeout: 1000,
path : '/online'
})
export class BackendGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly Players: Players_Management,
      private readonly Rooms : Rooms) {}

  @WebSocketServer()
  public server : Server;

  public screen_metrics : {screen_width : number , screen_height : number} = {screen_width : 0, screen_height : 0};

  public Room_dl;

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
          this.Players.AddPlayer(Player.id,0,(this.screen_metrics.screen_height / 2) - (90 / 2),20,95);
          this.Rooms.SetupRooms(Player,this.Players,this.screen_metrics.screen_width,this.screen_metrics.screen_height);
          console.log("---------------------CCCoooCCC--------------------------------\n")
          // this.server.to(Player.id).emit("UpdatePlayerPos",this.Players.players);
          // console.log(this.Rooms);
          this.SendToPlayersinRoom(Player,this.Rooms);
          console.log("--->Players" + JSON.stringify(this.Players.players));
        })
  }

  handleDisconnect(Player: Socket) {
    let Player_deleted = Player.id;
    for(const id in this.Rooms.rooms){
      const Room = this.Rooms.rooms[id];
      if (Room.Player1?.id == Player_deleted  || Room.Player2?.id == Player_deleted){
        this.Room_dl = this.Rooms.rooms[id];
        // console.log("Player disconnected in Room [" + this.Room_dl + "]");
        // console.log(this.Room_dl);
        // console.log("-----------------SEP-------------");
        break;
      }
    }
    // if (Player.id == this.Room_dl.Player1?.id){
      //   console.log("-------------------SEP-----------------\n");
      //   console.log("Player one who disconnected");
      //   console.log(this.Room_dl.Player2?.id + " have to disconnect");
      //   this.Rooms.CleanRoom(this.Room_dl.Player2?.id,Player,this.Players,this.server,this.screen_metrics.screen_width,this.screen_metrics.screen_height);
      //   console.log("\n-------------------------------------------");
      // }
      // else if (Player.id == this.Room_dl.Player2?.id){
        //   console.log("-------------------SEP-----------------\n");
        //   console.log("Player two who disconnected");
        //   console.log(this.Room_dl.Player1?.id + " have to disconnect");
        //   this.Rooms.CleanRoom(this.Room_dl.Player1?.id,Player,this.Players,this.server,this.screen_metrics.screen_width,this.screen_metrics.screen_height);
        //   console.log("\n-------------------------------------------");
        // }
        this.Rooms.CleanRoom(Player.id,Player,this.Players,this.server,this.screen_metrics.screen_width,this.screen_metrics.screen_height);
        if (this.Room_dl?.client_count > 0){
          console.log("-------------There still another Player in the room!!-------------");
          this.server.to(this.Room_dl.id).emit("PlayerLeave");
        }

    // console.log("this room + [" + JSON.stringify(this.Room_dl) + "] is affected ---> Player " + Player.id);
    if (!this.Room_dl?.Player1 || !this.Room_dl?.Player2){
      console.log("ENTERED !!");
      console.log(this.Room_dl?.id);
      this.server.to(this.Room_dl?.id).emit("PlayersOfRoom",this.Room_dl);
      // if (this.Room_dl.client_count > 0)
      //   this.server.to(this.Room_dl.id).emit("Dis",this.Room_dl);
    }
    console.log(this.Players.players);
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
    HandleMovement(@MessageBody() Player_data , @ConnectedSocket() Player : Socket){
      let dy : number = 10;
      if (this.Players.players[Player.id]){
        if ((Player_data.sig === "DOWN") && (Player_data.Key == Player_data.key_check)){
          // console.log("Player will Move Down from id --->" + this.Players.players[Player.id].id);
          this.Players.players[Player.id].y += dy;

          if (this.Players.players[Player.id]?.y < 0){
            this.Players.players[Player.id].y = 0;
          }

          if (this.Players.players[Player.id]?.y > this.screen_metrics.screen_height - this.Players.players[Player.id].height){
            this.Players.players[Player.id].y =  this.screen_metrics.screen_height - this.Players.players[Player.id].height;
            // console.log(this.screen_metrics.screen_width);

          }
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
    }

    @SubscribeMessage("Ball_movement")
      HandleBallMovement(@MessageBody() Ball_data, @ConnectedSocket() Player : Socket){
        this.check_collision_Ball_with_env(Ball_data,Player);
    }

    check_collision_Ball_with_env(Ball_data,Player : Socket){
      let top = 0;
      let left = 0;
      let bottom = 0;
      let right = 0;

      for(const id in this.Rooms.rooms){
          const Room = this.Rooms.rooms[id];
          if (Room.Player1?.id == Player.id || Room.Player2?.id == Player.id){
              top = (Room.GameBall.y - Room.GameBall.diameter / 2);
              bottom = (Room.GameBall.y + Room.GameBall.diameter / 2);
              left = (Room.GameBall.x - Room.GameBall.diameter / 2);
              right = (Room.GameBall.x + Room.GameBall.diameter / 2);

            if (this.check_collision_Ball_with_players(Ball_data,Player)){
              Room.GameBall.x = Room.GameBall.x + Room.GameBall.ball_speed_x;
              Room.GameBall.y = Room.GameBall.y + Room.GameBall.ball_speed_y;
              break;
            }
            else{
              if(top < 0){
                Room.GameBall.x = Room.GameBall.x + 8;
                Room.GameBall.ball_speed_y = -Room.GameBall.ball_speed_y;
              }
            if (bottom > this.screen_metrics.screen_height){
              Room.GameBall.x = Room.GameBall.x - 8;
              Room.GameBall.ball_speed_y = -Room.GameBall.ball_speed_y;
            }
            // if (right > this.screen_metrics.screen_width){
            //   // Room.GameBall.y = Room.GameBall.y - 8;
            //   Room.GameBall.ball_speed_x = -Room.GameBall.ball_speed_x;
            // }
            // if (left < 0){
            //   // Room.GameBall.y = Room.GameBall.y - 8;
            //   Room.GameBall.ball_speed_x = -Room.GameBall.ball_speed_x;
            // }
            Room.GameBall.x = Room.GameBall.x + Room.GameBall.ball_speed_x;
            Room.GameBall.y = Room.GameBall.y + Room.GameBall.ball_speed_y;
            break;
          }
        }
      }
    }

    check_collision_Ball_with_players(Ball_data,Player : Socket) : boolean{
      for(const id in this.Rooms.rooms){
        const Room = this.Rooms.rooms[id];
          let radius = Room.GameBall.diameter / 2;
          let Ball_x = Room.GameBall.x;
          let Ball_reverse_x = this.screen_metrics.screen_width - Room.GameBall.x;
          if (Room.Player1.id == Player.id){
              return (this.Ball_points_check(radius,Room,Room.Player1,this.screen_metrics.screen_width,Ball_x));
          }else if (Room.Player2.id == Player.id){
            return (this.Ball_points_check(radius,Room,Room.Player2,this.screen_metrics.screen_width,Ball_reverse_x));
          }
        }
    }

    Ball_points_check(radius : number,Room,Player,screen_width,Ball_x) : boolean{
      let r : number  = 0;
        for(let i = 0; i < 16 ; i++){
          let degree = (i * 22.5) * (Math.PI / 180);
    
          let x_ball = radius * (Math.cos(Ball_x + degree)) + Ball_x;
          let y_ball = radius * (Math.sin(Room.GameBall.y + degree)) + Room.GameBall.y;
  
          if (((x_ball > Player.x && x_ball < Player.x + Player.width && y_ball > Player.y && y_ball < Player.y + Player.height))){
              // if (x_ball < screen_width / 2){
                  // console.log("hit left half")
                  if(y_ball > (Player.y + 20 && x_ball < Player.x + Player.width) && y_ball < (Player.y + Player.height - 20)){
                      console.log("hit mid !!");
                      Ball_x = Ball_x + 20;
                      Room.GameBall.ball_speed_x = -Room.GameBall.ball_speed_x;
                      
                      // Room.GameBall.y = Room.GameBall.y + 5;
                      // if (r){
                      //   console.log(Math.floor(r));
                      //   // Room.GameBall.ball_speed_y = -Room.GameBall.ball_speed_y;
                      // }
                      // this.collision_front = true;
                      return(true);
                  }
                  else{
                      console.log("hit corner !!");
                      // console.log(Player.y);
                      Ball_x = Ball_x + 20;
                      Room.GameBall.ball_speed_x = -Room.GameBall.ball_speed_x;
                      // Room.GameBall.ball_speed_y = -Room.GameBall.ball_speed_y;
                      r = Math.random() * 2;
                      if (r){
                        console.log(Math.floor(r));
                        // Room.GameBall.y += 8;
                        Room.GameBall.ball_speed_y = -Room.GameBall.ball_speed_y;
                      }
                      // this.collision_front = true;
                      return(true);
                  }
              // }
            }
        }
        return (false);
    }


    @Interval(15)
    handleevent(){
      for(const id in this.Rooms.rooms){
        const Room = this.Rooms.rooms[id];
        this.server.to(Room.id).emit("UpdatePlayerPos",Room);
        this.server.to(Room.id).emit("UpdateBallPos",Room);
      }
        // this.server.emit("UpdatePlayerPos",this.Players.players);
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