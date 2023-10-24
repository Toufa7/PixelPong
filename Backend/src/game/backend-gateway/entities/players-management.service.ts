import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../dto/player_ft.dto';
import { isEmpty, retry } from 'rxjs';
import { RoomDto } from '../dto/room.dto';
import { Rooms } from './room.service';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class Players_Management {


  constructor(private readonly userService : UsersService){}
  
  public players  = {};

  public Player_Game_Info  = {inGame:false,userId:""};

  public SetRoom : boolean = true;
  

  public SearchForExsitentUserID(user_id : string) : boolean{
      for(const id in this.players){
        const Player = this.players[id];
        if (Player.user_id == user_id){
          console.log("------------------You Are The Same Player !!--------------");
          return (true);
        }
      }
      return (false);
  }

  public async AddPlayer(Player : Socket ,player_id : string ,
    x : number , y : number , width : number , height : number, screen_width : number, screen_height : number , room_id? : string , user_id? : string, username? : string,Token_matching? : string){
        
    // this.players.push(new PlayerDto(id,x,y));
    console.log("User Id --->" + user_id);
    console.log("Player User Name -->" + username);
    // console.log("Before -->" + Object.keys(this.players).length);
    if (!this.SearchForExsitentUserID(user_id)){
      this.SetRoom = true;
      this.players[player_id] = new PlayerDto(player_id,x,y,width , height , screen_width , screen_height, 100, room_id,user_id,username,Token_matching);
      console.log("Player In game Setting up stats ...");
      await this.userService.ChangeStateInGame(user_id,true); // Updating Database Field in Game state
      console.log(" " + this.Player_Game_Info.inGame + " " + this.Player_Game_Info.userId);
    }
    else{
      this.SetRoom = false;
      console.log("------- Player in Game Disconecting the Lazy socket  !! ------");
      Player.disconnect();
    }
  }
  
  public GetPlayers(){
    return this.players;
  }

}




 // console.log("Printing Players ....");
    // for(const id in this.players){
    //   console.log(this.players[id]);
    // }
    // console.log("After -->" + Object.keys(this.players).length);
    // this.SearchForExsitentUserID(user_id);
    // console.log("Player added to players object");
