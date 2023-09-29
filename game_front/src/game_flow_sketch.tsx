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
    console.log(Backroom);
    // if(id_player == Backroom.Player1?.id || id_player == Backroom.Player2?.id){
    //   const room_id = Backroom.Player1?.room_id;
    //   if (!Frontroom[room_id]){
    //     Frontroom[room_id] = {Player1:{Paddle:""},Player2:{Paddle:""}};
    //     if(Backroom.Player2){
    //       console.log("Player2 not connected yet!!!");
    //     }
    //     if (Backroom.Player1){
    //       Frontroom[room_id].Player1 = Backroom.Player1;
    //       Frontroom[room_id].Player1.Paddle = new Paddle(Frontroom[room_id].Player1.x,Frontroom[room_id].Player1.y,Frontroom[room_id].Player1.s_w,Frontroom[room_id].Player1.s_h,p5_ob,"#FFFA37");
    //     }
    //     if(Backroom.Player2)
    //       Frontroom[room_id].Player2 = Backroom.Player2;
    //       Frontroom[room_id].Player2.Paddle = new Paddle(Frontroom[room_id].Player2.x,Frontroom[room_id].Player2.y,Frontroom[room_id].Player2.s_w,Frontroom[room_id].Player2.s_h,p5_ob,"#FFFA37");
    //   }
    // }
    // for(const id in Frontroom){
    //   console.log(Frontroom);
    // }
  });
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
  
  // socket?.on("UpdatePlayerPos",(backend_players)=>{
    //   console.log("this is you message" + backend_players.msg);
    //   for(const id in backend_players.Players){
      //     const backendPlayer = backend_players.Players[id];
      //     if (socket.id == backendPlayer.id){
        //       socket?.emit("Player2", {room_id : backendPlayer.room_id});
        //       console.log("im that player --->" + backendPlayer.id + " in Room [" + backendPlayer.room_id + "]");
        //       break;
        //     }
        //   }
        //   // for (const id in players){
          //   //   if (!backend_players[id]){
            //   //     delete players[id];
            //   //   }
            //   // }
            //   // console.log(players);
            // })
            // socket?.on("event-toplayer",(data)=>{
              //   console.log(data.hello);
              //   socket?.emit("populate-toserver",{hello:"hello"});
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
      // console.log("ID of Player --->" + id_player);
      //   frontendPlayers[id_player]?.update_Player_pos(canvas);
    // for(const id in Frontroom){
    //   // const Player = Frontroom[id].Player1;
    //   console.log(Frontroom[id]);
    //   // break;
    // }
  }
}