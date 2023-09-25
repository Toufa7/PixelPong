import { Injectable } from '@nestjs/common';
import { PlayerDto } from './dto/player_ft.dto';
import { retry } from 'rxjs';

@Injectable()
export class Players_Management {
  
  public players  = {

  };

  public AddPlayer(player_id : string ,x : number , y : number , room_id? : Number){
    // this.players.push(new PlayerDto(id,x,y));
    this.players[player_id] = new PlayerDto(player_id,x,y,room_id);
  }
  
  public GetPlayers(){
    return this.players;
  }
}
