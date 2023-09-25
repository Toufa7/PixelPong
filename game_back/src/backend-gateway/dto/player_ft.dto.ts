export class PlayerDto{
    id : string;
    x : number;
    y : number;
    room_id?: Number;

    constructor(id : string , x : number , y : number , room_id? : Number ){
        this.id = id;
        this.x  = x;
        this.y  = y;
        this.room_id = room_id;
    }
}