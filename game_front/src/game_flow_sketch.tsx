import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { ContextSocket, socket } from './socket_setup/client-connect';
import { Paddle } from './game-classes/paddle.class';
import { id_player } from './components/render_game_sketch_components';




let canvas : p5Types.Renderer;
export let screen_width = 1050;
export let screen_height = 500;


export const sketch : Sketch = (p5_ob : P5CanvasInstance) => {
  const Frontroom : any = {};
  
  
  socket?.on("PlayersOfRoom",(Backroom : any)=>{
    console.log("Im -->" + socket.id);
    console.log(Backroom);
    
    if (!Frontroom[Backroom.id]){
      console.log("creating room ...!!");
      Frontroom[Backroom.id] = {Player1:{Paddle:""},Player2:""};
      if (Backroom.Player1){
      Frontroom[Backroom.id].Player1 = Backroom.Player1;
      Frontroom[Backroom.id].Player1.Paddle = new Paddle(Frontroom[Backroom.id].Player1.x,Frontroom[Backroom.id].Player1.y,
        Frontroom[Backroom.id].Player1.width,Frontroom[Backroom.id].Player1.height,p5_ob,"#FFFA37");
      }
      if (Backroom.Player2){
        Frontroom[Backroom.id].Player2 = Backroom.Player2;
        Frontroom[Backroom.id].Player2.Paddle = new Paddle(Frontroom[Backroom.id].Player2.x,Frontroom[Backroom.id].Player2.y,
          Frontroom[Backroom.id].Player2.width,Frontroom[Backroom.id].Player2.height,p5_ob,"#FFFA37");
      }
    }
    else{
      if (!Frontroom[Backroom.id].Player1 && Backroom.Player1){
        Frontroom[Backroom.id].Player1 = Backroom.Player1;
        Frontroom[Backroom.id].Player1.Paddle = new Paddle(Frontroom[Backroom.id].Player1.x,Frontroom[Backroom.id].Player1.y,
          Frontroom[Backroom.id].Player1.width,Frontroom[Backroom.id].Player1.height,p5_ob,"#FFFA37");
        }
        if (!Frontroom[Backroom.id].Player2 && Backroom.Player2){
          Frontroom[Backroom.id].Player2 = Backroom.Player2;
          Frontroom[Backroom.id].Player2.Paddle = new Paddle(Frontroom[Backroom.id].Player2.x,Frontroom[Backroom.id].Player2.y,
            Frontroom[Backroom.id].Player2.width,Frontroom[Backroom.id].Player2.height,p5_ob,"#FFFA37");
        }
    }

    for(const id in Frontroom){
      if (!Backroom?.Player1){
          console.log("Player 1 disconnected or doesn't exit in room ->" + Backroom?.id);
          delete Frontroom[id].Player1;
      }
      if (!Backroom?.Player2){
        console.log("Player 2 disconnected or doesn't exist in room ->" + Backroom?.id);
        delete Frontroom[id].Player2;
      }
    }
  
  console.log(Frontroom);

  });
      socket?.on("UpdatePlayerPos",(Backroom)=>{
          // console.log("I got Coords");
          // console.log(Backroom.Player1?.y);
          for(const id in Frontroom){
            if(Frontroom[id].Player1){
                Frontroom[id].Player1.Paddle.pos.x = Backroom.Player1?.x;
                Frontroom[id].Player1.Paddle.pos.y = Backroom.Player1?.y;
            }
            if (Frontroom[id].Player2){
              Frontroom[id].Player2.Paddle.pos.x = Backroom.Player2?.x;
              Frontroom[id].Player2.Paddle.pos.y = Backroom.Player2?.y;
            }
          }
      })
  // socket?.on("UpdatePlayerPos",)
  // for(const id in backendPlayers) {
  //   const backendplayer = backendPlayers[id];
  //   if(!frontendPlayers[id]){
        // frontendPlayers[BackroomPlayer.id] = new Paddle(BackroomPlayer.x,BackroomPlayer.y, BackroomPlayer.width , BackroomPlayer.height , p5_ob,"#FFFA37");
  //   }else{
  //     frontendPlayers[id].pos.x = backendplayer.x;
  //     frontendPlayers[id].pos.y = backendplayer.y;
  //   }
  // }


  // for(const id in frontendPlayers) {
  //   if(!backendPlayers[id]){
  //     delete frontendPlayers[id];
  //   }
  // }  

  // //     console.log(data.msg);
  // //     // players[data.Players.id] = new Paddle(data.Players.x,20,80,data.Players.y,p5_ob);
  // //     // players[data.Players] = new Paddle()
  // //     // socket?.emit("populate-toserver",{Player:data.Players});
  // //     // console.log(players);
  //   // console.log(frontendPlayers[socket.id]);
  //   // console.log(socket.id);
  //   // console.log(frontendPlayers[socket.id]);
  // })

      p5_ob.setup = () => {
      p5_ob.frameRate(60);
      canvas = p5_ob.createCanvas(screen_width , screen_height);
      const canvas_x = (p5_ob.windowWidth - p5_ob.width) / 2;
      const canvas_y = (p5_ob.windowHeight - p5_ob.height) / 2;
      canvas.position(canvas_x,canvas_y);
    }
    
    p5_ob.draw = () =>{
    p5_ob.background("#FA9200");
    // console.log("My Player ID --> "+ id_player);
      // console.log("ID of Player --->" + id_player);
      //   frontendPlayers[id_player]?.update_Player_pos(canvas);
    for(const id in Frontroom){
      const id_of_player1 = Frontroom[id].Player1?.id;
      const id_of_player2 = Frontroom[id].Player2?.id;
      const Player1 = Frontroom[id].Player1?.Paddle;
      const Player2 = Frontroom[id].Player2?.Paddle;
      if (id_of_player1 == id_player){
          Player1?.update_Player_pos(canvas);
          if (Player2 && id_of_player2 != id_player){
            Player2.pos.x = screen_width - Player2.paddle_width;
            Player2?.update_Player_pos(canvas);
          }
      }
      else if (id_of_player2 == id_player){
          Player2?.update_Player_pos(canvas);
          if (Player1 && id_of_player1 != id_player){
            Player1.pos.x = screen_width - Player1.paddle_width;
            Player1?.update_Player_pos(canvas);
          }
      }
    }
  }
}