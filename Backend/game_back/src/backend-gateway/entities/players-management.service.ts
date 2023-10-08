import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../dto/player_ft.dto';
import { isEmpty, retry } from 'rxjs';
import { RoomDto } from '../dto/room.dto';
import { Rooms } from './room.service';

@Injectable()
export class Players_Management {
  
  public players  = {};

  public AddPlayer(player_id : string ,x : number , y : number , width : number , height : number, room_id? : string){
    // this.players.push(new PlayerDto(id,x,y));
    this.players[player_id] = new PlayerDto(player_id,x,y,width , height , room_id);
    // //console.log("Player added to players object");
  }
  
  public GetPlayers(){
    return this.players;
  }
}
