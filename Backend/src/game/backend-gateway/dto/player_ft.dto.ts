import { BallDto } from "./ball.dto";

export class PlayerDto{
    id : string;
    x : number;
    y : number;
    user_id? : string;
    username? : string;
    width : number;
    height : number;
    room_id?: string;
    token_for_matching? : string;
    Health_points : number;
    special_power : number;

    constructor(id : string , x : number , y : number ,width : number , height : number , Hp : number , room_id? : string , user_id? : string, username? : string){
        this.id = id;
        this.x  = x;
        this.y  = y;
        this.width = width;
        this.height = height;
        this.room_id = room_id;
        this.user_id = user_id;
        this.username = username;
        this.Health_points = Hp;
    }
}