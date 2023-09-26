export class PlayerDto{
    id : string;
    x : number;
    y : number;
    room_id?: string;

    constructor(id : string , x : number , y : number , room_id? : string ){
        this.id = id;
        this.x  = x;
        this.y  = y;
        this.room_id = room_id;
    }
}