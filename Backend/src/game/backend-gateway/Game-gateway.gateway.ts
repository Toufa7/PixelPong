import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, ConnectedSocket, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Controller, OnModuleInit, Req } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Players_Management } from './entities/players-management.service';
import { Rooms } from './entities/room.service';
import { Interval, Timeout } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';
import { JwtGuard, WSGuard } from 'src/guards/jwt.guards';
import { JwtService } from '@nestjs/jwt';
import { decode } from 'jsonwebtoken';
import { HistoryService } from 'src/users/gamedata/history.service';
import { achievementService } from 'src/users/gamedata/acheievement.service';
import { PrismaService } from 'src/auth/prisma.service';


@WebSocketGateway({
namespace :"/game",
cors : {
origin : ['http://localhost:5173' , 'http://10.14.8.4:5173'] , 
methods: ["GET", "POST"],
credentials: true , transports : 'websocket'
},
pingInterval: 1000,
pingTimeout: 1000,
// path : '/online'
})
export class BackendGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly Players: Players_Management,
      private readonly Rooms : Rooms ,
      private readonly userService : UsersService,
      private readonly historyService : HistoryService,
      private readonly jwt : JwtService,
      private readonly achiev : achievementService,
      private readonly prisma : PrismaService) {}

  @WebSocketServer()
  public server : Server;

  // public screen_metrics : {screen_width : number , screen_height : number} = {screen_width : 0, screen_height : 0};

  public Room_dl;

  public User;


  
  public CountDown : number = 6; 

  public Check_forfait = true;

  afterInit(server: Server) {
    this.server = server;
    console.log("Server listening on port 3000");
  }

  // this.server.to(Player.id).emit("UpdatePlayerPos",this.Players.players);
  // console.log(this.Rooms);

handleConnection(Player: Socket) {
    Player.on("PlayerEntered",async (Data)=> {
          this.Check_forfait = true;
          this.User = await this.getUser(Player);
          console.log("i am a, : ", this.User);
          console.log("First----> " + JSON.stringify(this.Players.players));
          let t = await this.userService.findOne(this.User.id);
          let My_username : string = t?.username;
          let Token_for_matching = t?.tokenjoingame;
          console.log("My UserName ---> " + My_username);
          // console.log("Token For Matching ---> " + Token_for_matching);
          // this.screen_metrics.screen_width = Data.s_w;
          // this.screen_metrics.screen_height = Data.s_h;
          console.log("---------------CONNECTION SECTION ------------------")
          console.log("new Player connected " + Player.id);
          // let Player_width_scale = (2 / 100) * Data.s_w;
          // let Player_height_scale = (20 / 100) * Data.s_h;
          await this.Players.AddPlayer(Player , Player.id,0,(Data.s_h / 2) - (Data.pd_height / 2),Data.pd_width,Data.pd_height,Data.s_w,Data.s_h,"",this.User.id,My_username,Token_for_matching);
          console.log("Can i set Rooms --> " + this.Players.SetRoom);
          if (this.Players.SetRoom){
            this.historyService.addMatchHistory(this.Players.players[Player.id].user_id);
            this.Rooms.SetupRooms(Player,this.Players,Data.s_w,Data.s_h);
            this.SendToPlayersinRoom(Player,this.Rooms);
            console.log("--->Players" + JSON.stringify(this.Players.players));
            console.log("---------------------CCCoooCCC--------------------------------\n");  
          }

        })
  }

  async getUser(client: Socket)  {
    const session = client.handshake.headers.cookie;
    if (session) {
      const jwt = session.split('=')[1];
      const t = decode(jwt);
      console.log("************",t?.['id'],"************"); 
      if (session && jwt) {
        try{
          const user = await this.jwt.verifyAsync(jwt,{secret:'THISISMYJWTSECRET'});
          // console.log('=================================> ',user);
          return user;
        }catch(err){
          return null; 
        }
      }
    }
    return null;
  }


async handleDisconnect(Player: Socket) {
  this.User = await this.getUser(Player);


    let id_Player1 : string;
    let id_Player2 : string;

    let client_count_before : number;
    let Player_deleted = Player.id;
    for(const id in this.Rooms.rooms){
      const Room = this.Rooms.rooms[id];
      if (Room.Player1?.id == Player_deleted  || Room.Player2?.id == Player_deleted){
        this.Room_dl = this.Rooms.rooms[id];
        id_Player1 = Room.Player1?.user_id;
        id_Player2 = Room.Player2?.user_id;
        client_count_before = this.Room_dl.client_count;
        break;
      }
    }
    console.log("CLIENT COUNT BEFORE ----> " + client_count_before);
    if (this.Players.players[Player.id]?.user_id == this.User.id){
      console.log("Im Player with username --> " + this.User.username);
      console.log("Im in Room --> " + this.Players.players[Player.id]?.room_id);
      console.log("IDDDDDD ---> " + this.Players.players[Player.id]?.user_id);
      await this.userService.ChangeStateInGame(this.Players.players[Player.id]?.user_id,false);
    }else{
      // await this.userService.ChangeStateInGame(this.User.id ,false);
      console.log("Disconnection of Dangling Socket");
    }

    if(this.Players.players[Player.id])
      this.Rooms.CleanRoom(Player.id,Player,this.Players,this.server,this.Players.players[Player.id]?.Scaled_width,this.Players.players[Player.id]?.Scaled_height);
    if (this.Room_dl?.client_count > 0 && client_count_before > 1){
          console.log("-------------There still another Player in the room!!-------------");

          console.log("-------------FORFAIT SECTION--------------");

          console.log("Player that were in the Room P1--> " + id_Player1);
          console.log("Player that were in the Room P2--> " + id_Player2);

          if (this.Room_dl.Player1 && this.Check_forfait){
            console.log("The Player 1 Won by Forfait ---> " + this.Room_dl.Player1?.username);
            this.Reset_Token_to_null(id_Player1);
            this.Reset_Token_to_null(id_Player2);
            this.historyService.updateMatchHistory(id_Player1,id_Player2);
          }
          else if (this.Room_dl.Player2 && this.Check_forfait){
            console.log("The Player 2 Won by Forfait ---> " + this.Room_dl.Player2?.username);
            this.Reset_Token_to_null(id_Player1);
            this.Reset_Token_to_null(id_Player2);
            this.historyService.updateMatchHistory(id_Player2,id_Player1);
          }
          console.log("-------!!!!!!!!!!!!!!!!!!!!!!!!!!!------------");
          this.Room_dl.CountDown = 6;
          this.server.to(this.Room_dl.id).emit("PlayerLeave",{Result:"Forfait"});
    }
        
    if (!this.Room_dl?.Player1 || !this.Room_dl?.Player2){
          console.log("ENTERED !!");
          console.log(this.Room_dl?.id);
          this.server.to(this.Room_dl?.id).emit("PlayersOfRoom",this.Room_dl);
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


  @SubscribeMessage("Player_movement")
    HandleMovement(@MessageBody() Player_data , @ConnectedSocket() Player : Socket){
      let dy : number = 10;
      if (this.Players.players[Player.id]){
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

        if (this.Players.players[Player.id]?.y < 0){
          this.Players.players[Player.id].y = 0;
        }
        if (this.Players.players[Player.id]?.y > Player_data.scaled_height - Player_data.pd_height){
          this.Players.players[Player.id].y = Player_data.scaled_height - Player_data.pd_height;
        }
      }
    }

    @SubscribeMessage("Ball_movement")
      HandleBallMovement(@MessageBody() Game_Data, @ConnectedSocket() Player : Socket){
        this.check_collision_Ball_with_env(Game_Data,Player);
    }

    check_collision_Ball_with_env(Game_Data,Player : Socket){

      // console.log("Requesting for ball mobement From id --->" + Game_Data.Player_id);
      // let top = 0;
      // let left = 0;
      // let bottom = 0;
      // let right = 0;

      // let local_Ball = {x : 0 ,y : 0};

      for(const id in this.Rooms.rooms){
          const Room = this.Rooms.rooms[id];
          if (Room.Player1?.id == Player.id){
            let local_Ball_x = Room.GameBall?.x;
            let local_Ball_y = Room.GameBall?.y;
            let local_Ball_diameter = Game_Data.Ball_P1_diameter;


            let top = (local_Ball_y - local_Ball_diameter / 2);
            let bottom = (local_Ball_y + local_Ball_diameter / 2);
            let left = (local_Ball_x - local_Ball_diameter / 2);
            let right = (local_Ball_x + local_Ball_diameter / 2);

            if (this.check_collision_Ball_with_players(local_Ball_x,local_Ball_y,local_Ball_diameter,Room.Player1,Game_Data,Player)){
              Room.GameBall.x = Room.GameBall?.x + Room.GameBall?.ball_speed_x;
              Room.GameBall.y = Room.GameBall?.y + Room.GameBall?.ball_speed_y;
              break;
            }

            if (this.Catch_Win_Lost_Reset_Game(local_Ball_x,local_Ball_y,Game_Data,left,right,Room.Player1,Room.Player2,Room)){
              break;
            }


            if(top < 0){
              // Room.GameBall.x = Room.GameBall.x + 8;
              Room.GameBall.ball_speed_y = -Room.GameBall?.ball_speed_y;
            }
            if (bottom > Game_Data.Scaled_height - 10){
            // Room.GameBall.x = Room.GameBall.x - 8;
            Room.GameBall.ball_speed_y = -Room.GameBall?.ball_speed_y;
            }
            Room.GameBall.x = Room.GameBall?.x + Room.GameBall?.ball_speed_x;
            Room.GameBall.y = Room.GameBall?.y + Room.GameBall?.ball_speed_y;
            break;
          }
      }
    }

    Win_Lose_Management(Ball_x , Ball_y , Game_Data,Ball_left_point , Ball_right_point,Player1,Player2,Room) : boolean{
      if (Ball_left_point < -100){
        Room.Player1.Health_points -= 100;
        console.log("I got Hit --->" + Room.Player1?.username);
        
        return (true);
      }
      else if (Ball_right_point > Game_Data.Scaled_width + 100){
        Room.Player2.Health_points -= 100;
        console.log("I got Hit --->" + Room.Player2?.username);
        
        return (true);
      }
      return (false);
    }


Catch_Win_Lost_Reset_Game(Ball_x , Ball_y , Game_Data,Ball_left_point , Ball_right_point,Player1,Player2,Room){
        if (this.Win_Lose_Management(Ball_x , Ball_y , Game_Data,Ball_left_point , Ball_right_point,Player1,Player2,Room)){

          let RandHit : number = Math.floor(Math.random() * 2);
            if (Room.Player1.Health_points == 0){
              console.log("the Game Sould end Player 2 Wins!!");
              this.server.to(Room.Player1.id).emit("MatchEnded",{Result:"Lose"});
              this.server.to(Room.Player2.id).emit("MatchEnded",{Result:"Win"});
              this.Reset_Token_to_null(Room.Player1.user_id);
              this.Reset_Token_to_null(Room.Player2.user_id);
              this.historyService.updateMatchHistory(Room.Player2.user_id,Room.Player1.user_id);
              this.Check_forfait = false;
            }
            else if (Room.Player2.Health_points == 0){
              console.log("the Game Sould end Player 1 Wins!!");
              this.server.to(Room.Player1.id).emit("MatchEnded",{Result:"Win"});
              this.server.to(Room.Player2.id).emit("MatchEnded",{Result:"Lose"});
              this.Reset_Token_to_null(Room.Player1.user_id);
              this.Reset_Token_to_null(Room.Player2.user_id);
              this.historyService.updateMatchHistory(Room.Player1.user_id,Room.Player2.user_id);
              this.Check_forfait = false;
            }
          Room.GameBall.x = Game_Data.Scaled_width / 2;
          Room.GameBall.y = Game_Data.Scaled_height / 2;
          if (RandHit){
            Room.GameBall.ball_speed_x = -4;
            Room.GameBall.ball_speed_y = 2;
          }
          else{
            Room.GameBall.ball_speed_x = 4;
            Room.GameBall.ball_speed_y = -2;
          }
          
          Room.Player1.x = 0;
          Room.Player1.y = (Game_Data.Scaled_height / 2) - (Game_Data.P1_paddle_height / 2);

          Room.Player2.x = 0;
          Room.Player2.y = (Game_Data.Scaled_height / 2) - (Game_Data.P2_paddle_height / 2);
          return (true);
        }
        return (false);
    }


    check_collision_Ball_with_players(Ball_x : number , Ball_y : number , Ball_diameter : number , Player , Game_Data , Player_socket : Socket) : boolean{
      for(const id in this.Rooms.rooms){
        const Room = this.Rooms.rooms[id];
        if (Room.Player1?.id == Player_socket.id){
          // let Ball_x = Room.GameBall.x;
          // let Ball_y;
          let radius = Ball_diameter / 2;
          return (this.Ball_points_check(radius,Room,
            Game_Data.P1_paddle_x,Game_Data.P1_paddle_y,Game_Data.P1_paddle_width,Game_Data.P1_paddle_height,
            Game_Data.P2_paddle_x,Game_Data.P2_paddle_y,Game_Data.P2_paddle_width,Game_Data.P2_paddle_height
            ,Room.Player1.Scaled_width,Ball_x,Game_Data));
        }
      }
  }


    Ball_points_check(radius : number,Room,Player1_x,Player1_y,Player1_width,Player1_height,Player2_x,Player2_y,Player2_width,Player2_height,screen_width,Ball_x,Game_Data) : boolean{
      let RandomHit : number;
      let RandHit_speed_y : number;
      let speed_increase : number = 1.5;

      RandomHit = Math.floor(Math.random() * 2);
      RandHit_speed_y = Math.floor(Math.random() * 2);
      // console.log("Using Random in numbers ---> " + RandomHit);
      let r : number  = 0;
        for(let i = 0; i < 16 ; i++){
          let degree = (i * 22.5) * (Math.PI / 180);
    
          let x_ball = radius * (Math.cos(Ball_x + degree)) + Ball_x;
          let y_ball = radius * (Math.sin(Room.GameBall?.y + degree)) + Room.GameBall.y;


          if (((x_ball > Player1_x && x_ball < Player1_x + Player1_width - 10 && y_ball > Player1_y && y_ball < Player1_y + Player1_height) 
        || (x_ball > Player2_x && x_ball < Player2_x + Player2_width - 10 && y_ball > Player2_y && y_ball < Player2_y + Player2_height))){
            if (x_ball < Game_Data.Scaled_width / 2){
                console.log("hit left half");
                if(y_ball > (Player1_y + 15) && y_ball < (Player1_y + Player1_height - 11)){
                    console.log("P1---hit mid !!");
                    Room.GameBall.x = Room.GameBall?.x + 8;
                    Room.GameBall.ball_speed_x = -Room.GameBall?.ball_speed_x;
                    if (Room.GameBall.ball_speed_y == 0)
                    {
                      if (RandHit_speed_y)
                        Room.GameBall.ball_speed_y = 1;
                      else
                      Room.GameBall.ball_speed_y = 2;
                      Room.GameBall.ball_speed_y = -Room.GameBall?.ball_speed_y;
                    }
                    Room.GameBall.ball_speed_x *= speed_increase;

                    return(true);
                }
                else{
                    console.log("P1---hit corner !!");
                    Room.GameBall.x = Room.GameBall?.x + 4;
                    Room.GameBall.ball_speed_x = -Room.GameBall?.ball_speed_x;
                    Room.GameBall.ball_speed_y = -Room.GameBall?.ball_speed_y;
                    Room.GameBall.ball_speed_x *= speed_increase;

                    return(true);
                }
            }
            else{
                console.log("right half");
                if(y_ball > (Player2_y + 15) && y_ball < (Player2_y + Player2_height - 11)){
                  console.log("P2---hit mid !!");
                  Room.GameBall.x = Room.GameBall?.x - 8;
                  Room.GameBall.ball_speed_x = -Room.GameBall?.ball_speed_x;
                  if (Room.GameBall.ball_speed_y == 0)
                    {
                      if (RandHit_speed_y)
                        Room.GameBall.ball_speed_y = 1;
                      else
                      Room.GameBall.ball_speed_y = 2;
                      Room.GameBall.ball_speed_y = -Room.GameBall?.ball_speed_y;
                    }
                    Room.GameBall.ball_speed_x *= speed_increase;

                    return(true);
                }
                else{
                  console.log("P2---hit corner !!");
                    Room.GameBall.x = Room.GameBall?.x - 4;
                    Room.GameBall.ball_speed_x = -Room.GameBall?.ball_speed_x;
                    Room.GameBall.ball_speed_y = -Room.GameBall?.ball_speed_y;
                    Room.GameBall.ball_speed_x *= speed_increase;

                    return(true);
                }

            }
        }
      }
      return (false);
  }


    @SubscribeMessage("UpdateScreenmetrics")
        FillScreenMetrics(@MessageBody() screen , @ConnectedSocket() Player : Socket){
              this.Players.players[Player.id].Scaled_width = screen.s_w;
              this.Players.players[Player.id].Scaled_height = screen.s_h;
              // this.Players.players[Player.id].width = (2 / 100) * this.Players.players[Player.id].Scaled_width;
              // this.Players.players[Player.id].height = (20 / 100) * this.Players.players[Player.id].Scaled_height;
      }


    @Interval(15)
    handleevent(){
      for(const id in this.Rooms.rooms){
        const Room = this.Rooms.rooms[id];
        
        let P1_scaled_P2__y = (Room.Player1?.y * Room.Player2?.Scaled_height) / Room.Player1?.Scaled_height;   
        let P2_scaled_P1__y = (Room.Player2?.y * Room.Player1?.Scaled_height) / Room.Player2?.Scaled_height;


        let P1_scaled_P2__x = (Room.Player1?.x * Room.Player2?.Scaled_width) / Room.Player1?.Scaled_width;   
        let P2_scaled_P1__x = (Room.Player2?.x * Room.Player1?.Scaled_width) / Room.Player2?.Scaled_width;

        // console.log("-------------------SEPPPPP------------------");
        
        // console.log("P2-->" + Room.Player2?.Scaled_height);
        // console.log("P2 y before scaling for P1 --> " + Room.Player2?.y);
        // console.log("P2 Scaled for player 1 -->" + P2_scaled_P1__y);
        // console.log("---------------------------------------------");
        // console.log("P1-->" + Room.Player1?.Scaled_height);
        // console.log("P1 y before scaling for P2 --> " + Room.Player1?.y);
        // console.log("P1 Scaled for player 2 -->" + P1_scaled_P2__y);
        // P1_y_scaled : P1_scaled_P2__y ,
        // P1_x_scaled:P1_scaled_P2__x ,

        this.server.to(Room.Player1?.id).emit("UpdatePlayerPos",{who:"P1",P1_y:Room.Player1?.y, P2_y_scaled : P2_scaled_P1__y,
          P1_x:Room.Player1?.x ,P2_x_scaled:P2_scaled_P1__x , Health_points_P1 : Room.Player1?.Health_points, Health_points_P2 : Room.Player2?.Health_points});

        this.server.to(Room.Player2?.id).emit("UpdatePlayerPos",{who:"P2",P2_y:Room.Player2?.y, P1_y_scaled : P1_scaled_P2__y,
          P2_x:Room.Player2?.x ,P2_x_scaled : P1_scaled_P2__x , Health_points_P1 : Room.Player1?.Health_points, Health_points_P2 : Room.Player2?.Health_points });
          
          
          // console.log("--------------------------------------------------");
          // Room.GameBall.x = Room.GameBall.x + Room.GameBall.ball_speed_x;
          // Room.GameBall.y = Room.GameBall.y + Room.GameBall.ball_speed_y;

          let Ball_scaled_P2_x = (Room.GameBall?.x * Room.Player2?.Scaled_width) / Room.Player1?.Scaled_width;
          let Ball_scaled_P2_y = (Room.GameBall?.y * Room.Player2?.Scaled_height) / Room.Player1?.Scaled_height;

          
          this.server.to(Room.Player1?.id).emit("UpdateBallPos",{who:"P1", Ball1_x : Room.GameBall?.x , Ball1_y : Room.GameBall?.y});
          this.server.to(Room.Player2?.id).emit("UpdateBallPos",{who:"P2", Ball2_x : Ball_scaled_P2_x , Ball2_y : Ball_scaled_P2_y});
      
      }
    }

    @Interval(3000)
    SetCountDown(){
      // if (this.CountDown > 0)
      // console.log("Count Down ---> " +  this.CountDown--);
      // else
      // console.log("Fight !!");
      for(const id in this.Rooms.rooms){
        const Room = this.Rooms.rooms[id];
        if (Room.Player1 && Room.Player2){
          // console.log("There no Room or There No two Players in Room");
          if (Room.CountDown >= 0)   
            this.server.to(Room.id).emit("CountDown",{CountDown : Room.CountDown--});
        }
        else if (!Room.Player1 || !Room.Player2){
          Room.CountDown = 6;
          // this.server.to(Room.id).emit("CountDown",{CountDown : Room.CountDown});
        }
      }
    }

    @Interval(1000)
    Delete_Empty_Rooms(){
      this.Rooms.Delete_Empty_Rooms();
    }


async Reset_Token_to_null(Player_userid : string){

  console.log("im hererer");
    await this.prisma.user.update({
        where:{
          id : Player_userid,
        },
        data : {
          tokenjoingame : null,
        }
      })
    }
}






























































  // ManageWinLost(Player_CH , Player : Socket , Room : any) : boolean{
  //   let Ball_x = Room.GameBall.x;
  //   let Ball_reverse_x = Player_CH.Scaled_width - Room.GameBall.x;

  //   if (Room.Player1.id == Player.id){
  //     return (this.Check_point_lost_for_players(Ball_x,Room.GameBall.diameter / 2,Room.Player1));
  //   }
  //   else if (Room.Player2.id == Player.id){
  //     return (this.Check_point_lost_for_players(Ball_reverse_x,Room.GameBall.diameter / 2,Room.Player2));
  //   }
  // }

  // Check_point_lost_for_players(Ball_x,diameter,Player) : boolean{
  //   let left = Ball_x - diameter;
  //   if (left < -10){
  //     Player.Health_points--;
  //     console.log("I got Hit --->" + Player.username);
  //     return(true);
  //   }
  //   return (false);
  // }

  // Manage_Game_Hit_Or_Reset(Player_CH , Player : Socket , Room : any){
  //   if (this.ManageWinLost(Player_CH,Player,Room)){
  //     if (Room.Player1.Health_points == 0){
  //         this.server.to(Room.Player1.id).emit("MatchEnded",{Result:"Lose"});
  //         this.server.to(Room.Player2.id).emit("MatchEnded",{Result:"Win"});
  //         // this.historyService.addMatchHistory(Room.Player2.user_id,Room.Player1.user_id);
  //     }else if (Room.Player2.Health_points == 0){
  //         this.server.to(Room.Player1.id).emit("MatchEnded",{Result:"Win"});
  //         this.server.to(Room.Player2.id).emit("MatchEnded",{Result:"Lose"});
  //         // this.historyService.addMatchHistory(Room.Player1.user_id,Room.Player2.user_id);
  //     }
  //     Room.GameBall.x = Player_CH.Scaled_width / 2;
  //     Room.GameBall.y = Player_CH.Scaled_height / 2;
  //     Room.GameBall.ball_speed_x = -4;
  //     Room.GameBall.ball_speed_y = 2;
  //     Room.Player1.x = 0;
  //     Room.Player1.y = (Player_CH.Scaled_height / 2) - (95 / 2);

  //     Room.Player2.x = 0;
  //     Room.Player2.y = (Player_CH.Scaled_height / 2) - (95 / 2);

  //     return (true);
  //   }
  //   return(false);
  // }









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


      //     }
      //     if (Room.Player1?.id == Player.id || Room.Player2?.id == Player.id){
      //       local_Ball.x = Room.GameBall.x;
      //       local_Ball.y = Room.GameBall.y;
      //         top = (Room.GameBall.y - Room.GameBall.diameter / 2);
      //         bottom = (Room.GameBall.y + Room.GameBall.diameter / 2);
      //         left = (Room.GameBall.x - Room.GameBall.diameter / 2);
      //         right = (Room.GameBall.x + Room.GameBall.diameter / 2);


            // if (this.check_collision_Ball_with_players(Room,Game_Data,Player)){
            //   Room.GameBall.x = Room.GameBall.x + Room.GameBall.ball_speed_x;
            //   Room.GameBall.y = Room.GameBall.y + Room.GameBall.ball_speed_y;
            //   break;
            // }

            // else{
            //   if(top < 0){
            //     // Room.GameBall.x = Room.GameBall.x + 8;
            //     Room.GameBall.ball_speed_y = -Room.GameBall.ball_speed_y;
            // }
            // if (bottom > Room.Player1.Scaled_height){
            //   // Room.GameBall.x = Room.GameBall.x - 8;
            //   Room.GameBall.ball_speed_y = -Room.GameBall.ball_speed_y;
            // }
            // Room.GameBall.x = Room.GameBall.x + Room.GameBall.ball_speed_x;
            // Room.GameBall.y = Room.GameBall.y + Room.GameBall.ball_speed_y;
            // break;
          // }



