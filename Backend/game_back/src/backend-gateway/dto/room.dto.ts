import { BallDto } from "./ball.dto";
import { PlayerDto } from "./player_ft.dto";

export class RoomDto{
    client_count : number;
    id : string;
    Player1? : {};
    Player2? : {};
    GameBall;

    constructor(client_count : number, room_id : string , Player1? : PlayerDto, Player2? : PlayerDto,GameBall? : BallDto){
        this.client_count = client_count;
        this.id = room_id;
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.GameBall = GameBall;
    }
}