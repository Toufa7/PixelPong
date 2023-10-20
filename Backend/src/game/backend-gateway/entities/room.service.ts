import { Injectable } from "@nestjs/common";
import { PlayerDto } from "../dto/player_ft.dto";
import { Server, Socket } from "socket.io";
import { RoomDto } from "../dto/room.dto";
import { Players_Management } from "./players-management.service";
import { BallDto } from "../dto/ball.dto";

@Injectable()
export class Rooms{

    public rooms = {};

    generate_Random_id(lenght : number) : string{
        let result = "";
        let charachters : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456759_";
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
        this.rooms[this.generate_Random_id(5)] = new RoomDto(0,this.generate_Random_id(5),6);
    }

    SetupRooms(Player : Socket , Players : Players_Management,screen_width , screen_height){
        if (!this.is_Rooms_Available()){
            console.log("there is no room available or there are no rooms");
            this.create_room_for_player();
            for(const id in this.rooms){
                const Room = this.rooms[id];
                if ((Room.client_count == 0 && !Room.Player1) && Players.players[Player.id]){
                    console.log("Room enterd ["+Room.id+"]")
                    Room.Player1 = Players.players[Player.id];
                    Room.Player1.room_id = Room.id;
                    // let scale_ball = (2.4 / 100) * screen_width;
                    Room.GameBall = new BallDto(-4,2,(2.4  / 100) * Room.Player1?.Scaled_width, Room.Player1?.Scaled_width / 2 , Room.Player1?.Scaled_height / 2);
                    Room.client_count++;
                    Player.join(Room.id);
                    break;
                }
            }
        }
        else{
            console.log("Room Founded");
            for(const id in this.rooms){
                const Room = this.rooms[id];
                if (Room.client_count < 2){
                    if (this.CheckForRooms(Room,Player,Players)){
                        return;
                    }
                }
            }
            
        }
        console.log(this.rooms);
    }

    CheckForRooms(Room,Player : Socket , Players : Players_Management) : number{
        if (Room.client_count == 1){
            if (!Room.Player1 && Players.players[Player.id]){
                console.log("Player 1 spot is available in Room["+Room.id+"]");
                Room.Player1 = Players.players[Player.id];
                Room.Player1.room_id = Room.id;
                // Room.GameBall = new BallDto(-2,2,(2.4  / 100) * Room.Player1?.Scaled_width, Room.Player1?.Scaled_width / 2 , Room.Player1?.Scaled_height / 2);
                Room.GameBall.x = Room.Player1?.Scaled_width / 2;
                Room.GameBall.y = Room.Player1?.Scaled_height / 2;
                Room.GameBall.diameter = (2.4  / 100) * Room.Player1?.Scaled_width;

                Room.client_count++;
                Player.join(Room.id);
                console.log(this.rooms);
                return (1);
            }
            else if (!Room.Player2 && Players.players[Player.id]){
                console.log("Player 2 spot is available in Room["+Room.id+"]");
                Room.Player2 = Players.players[Player.id];
                Room.Player2.room_id = Room.id;
                // Room.GameBall = new BallDto(-2,2,(2.4  / 100) * Room.Player1?.Scaled_width, Room.Player1?.Scaled_width / 2 , Room.Player1?.Scaled_height / 2);

                Room.GameBall.x = Room.Player1?.Scaled_width / 2;
                Room.GameBall.y = Room.Player1?.Scaled_height / 2;
                Room.GameBall.diameter = (2.4  / 100) * Room.Player1?.Scaled_width;

                Room.client_count++;
                Player.join(Room.id);
                console.log(this.rooms);
                return (1);
            }
        }
        else if (Room.client_count == 0){
            if (!Room.Player1 && Players.players[Player.id]){
                console.log("Player 1 spot is available in Room["+Room.id+"]");
                Room.Player1 = Players.players[Player.id];
                Room.Player1.room_id = Room.id;

                Room.GameBall.x = Room.Player1?.Scaled_width / 2;
                Room.GameBall.y = Room.Player1?.Scaled_height / 2;
                Room.GameBall.diameter = (2.4  / 100) * Room.Player1?.Scaled_width;

                Room.client_count++;
                Player.join(Room.id);
                console.log(this.rooms);
                return (1);
            }
            else if (!Room.Player2 && Players.players[Player.id]){
                console.log("Player 2 spot is available in Room["+Room.id+"]");
                Room.Player2 = Players.players[Player.id];
                Room.Player2.room_id = Room.id;

                Room.GameBall.x = Room.Player1?.Scaled_width / 2;
                Room.GameBall.y = Room.Player1?.Scaled_height / 2;
                Room.GameBall.diameter = (2.4  / 100) * Room.Player1?.Scaled_width;

                Room.client_count++;
                Player.join(Room.id);
                console.log(this.rooms);
                return (1);
            }
        }
        console.log("From Many Rooms Condition --> ");
        console.log(this.rooms);
        return (0);
    }

    CleanRoom(Player_id : string, Player : Socket , Players : Players_Management , server : Server,screen_width,screen_height){
        let room_id;
        console.log("\n--------------DISCONECTION------------------")
        console.log("Player disconnected " + Player_id);
        for(const id in this.rooms){
        const Room = this.rooms[id];
        if (Player_id == Room.Player1?.id && Room.Player1){
            console.log("Found the Player (Player1) in room ["+Room.id+"]-->" + Room.Player1.id);
            room_id = Room.id;
            Room.client_count--;
            Room.GameBall = new BallDto(-4,2,(2.4  / 100) * Room.Player1?.Scaled_width, Room.Player1?.Scaled_width / 2 , Room.Player1?.Scaled_height / 2);
            Player.leave(Room.id);
            delete Room.Player1;
            // let scale_ball = (2.4 / 100) * screen_width;
            break;
        }
        else{
                if (Player_id == Room.Player2?.id && Room.Player2){
                console.log("Found the Player (Player2) in room ["+Room.id+"]-->" + Room.Player2.id);
                Room.client_count--;
                Room.GameBall = new BallDto(-4,2,(2.4  / 100) * Room.Player1?.Scaled_width, Room.Player1?.Scaled_width / 2 , Room.Player1?.Scaled_height / 2);
                Player.leave(Room.id);
                delete Room.Player2;
                // let scale_ball = (2.4 / 100) * screen_width;
                break;
            }
        }
        }
        delete Players.players[Player_id];
        console.log(this.rooms);
        console.log("---------------------DDiiiDD-------------------------");
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