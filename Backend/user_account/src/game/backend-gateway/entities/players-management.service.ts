import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../dto/player_ft.dto';
import { isEmpty, retry } from 'rxjs';
import { RoomDto } from '../dto/room.dto';
import { Rooms } from './room.service';
import { Socket } from 'socket.io';

@Injectable()
export class Players_Management {
  
  public players  = {};

  public Player_Game_Info  = {inGame:false,userId:""};

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

  public AddPlayer(Player : Socket , player_id : string ,x : number , y : number , width : number , height : number, room_id? : string , user_id? : string, username? : string){
    // this.players.push(new PlayerDto(id,x,y));
    console.log("User Id --->" + user_id);
    console.log("Player User Name -->" + username);
    // console.log("Before -->" + Object.keys(this.players).length);
    if (!this.SearchForExsitentUserID(user_id)){
    this.players[player_id] = new PlayerDto(player_id,x,y,width , height , room_id,user_id,username);
    }
    else{
      Player.disconnect();
      this.Player_Game_Info.inGame = true;
      this.Player_Game_Info.userId = user_id;
      console.log("------- Data of In Game Player  !! ------");
      console.log(" " + this.Player_Game_Info.inGame + " " + this.Player_Game_Info.userId);
    }
    console.log("Printing Players ....");
    for(const id in this.players){
      console.log(this.players[id]);
    }
    // console.log("After -->" + Object.keys(this.players).length);
    // this.SearchForExsitentUserID(user_id);
    // console.log("Player added to players object");
  }
  
  public GetPlayers(){
    return this.players;
  }
}
