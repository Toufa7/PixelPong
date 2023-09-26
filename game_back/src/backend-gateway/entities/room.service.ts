import { Injectable } from "@nestjs/common";
import { PlayerDto } from "../dto/player_ft.dto";
import { Socket } from "socket.io";
import { RoomDto } from "../dto/room.dto";
import { Players_Management } from "../players-management.service";

@Injectable()
export class Rooms{

    public rooms = {};

    generate_Random_id(lenght : number) : string{
        let result = "";
        let charachters : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
        let count  = 0;
        while (count <= lenght){
            result += charachters[Math.floor(Math.random() * charachters.length)];
            count++;
        }
        return (result);
    }


    AddPlayertoRoom(Player : Socket){
        let room_id = this.generate_Random_id(5);
        console.log(room_id);
    }

    create_room_for_player(){
        // return new RoomDto(0,this.generate_Random_id(5));
        console.log("Room created");
        this.rooms[this.generate_Random_id(5)] = new RoomDto(0,this.generate_Random_id(5));
    }

    SetupRooms(Player : Socket , Players : Players_Management){
        if (this.is_Rooms_Available() == false){
            console.log("there is no room available or there are no rooms");
            this.create_room_for_player();
            for(const id in this.rooms){
                const Room = this.rooms[id];
                if (Room.client_count == 0){
                    Room.Player1 = Players.players[Player.id];
                    Room.Player1.room_id = Room.room_id;
                    Room.client_count++;
                    Player.join(Room.room_id);
                }
            }
        }
        else{
            console.log("Room Founded");
            for(const id in this.rooms){
                const Room = this.rooms[id];
                if (Room.client_count == 1){
                    console.log("found 1 client");
                    Room.Player2 = Players.players[Player.id];
                    Room.Player2.room_id = Room.room_id;
                    Room.client_count++;
                    Player.join(Room.room_id);
                }else if (Room.client_count == 0){
                    console.log("found 0 client");
                    Room.Player1 = Players.players[Player.id];
                    Room.Player1.room_id = Room.room_id;
                    Room.client_count++;
                    Player.join(Room.room_id);
                }
            }
            
        }
        console.log(this.rooms);
    }

    CleanRoom(Player : Socket , Players : Players_Management){

    }

    is_Rooms_Available() : boolean{
        for(const id in this.rooms){
            if (this.rooms[id].client_count == 0 
                || this.rooms[id].client_count == 1)
                return true;
        }
        return false;
    }
}