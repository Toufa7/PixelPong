import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { ContextSocket, socket } from './socket_setup/client-connect';
import { Paddle } from './game-classes/paddle.class';
import { id_player } from './components/render_game_sketch_components';
import { Ball } from './game-classes/Ball.class';


//h-             WORKING IMPORTS
//y------------------------------------------

import gifMatch from './assets/tv.gif';
import f from "./assets/thirteen_pixel_fonts.ttf";
// import loading from "./assets/loading.gif";
import over_g from "./assets/wdS.gif";

//y------------------------------------------
//h-   -------------------------------------



let canvas : p5Types.Renderer;
export let screen_width = 1050;
export let screen_height = 500;



function SettingUpBackWithFront(Frontroom : any , p5_ob : any){
  socket?.on("PlayersOfRoom",(Backroom : any)=>{
    //console.log("Im -->" + socket.id);
    //console.log(Backroom);
    
    if (!Frontroom[Backroom.id]){
      //console.log("creating room ...!!");
      Frontroom[Backroom.id] = {client_count : "",Player1:{Paddle:"",Ball:""},Player2:{Paddle:"",Ball:""},GameBall:""};
      Frontroom[Backroom.id].GameBall = Backroom.GameBall;
      Frontroom[Backroom.id].client_count = Backroom.client_count;

      if (Backroom.Player1){
      Frontroom[Backroom.id].Player1 = Backroom.Player1;
      Frontroom[Backroom.id].Player1.Paddle = new Paddle(Frontroom[Backroom.id].Player1.x,Frontroom[Backroom.id].Player1.y,
        Frontroom[Backroom.id].Player1.width,Frontroom[Backroom.id].Player1.height,p5_ob,"#FFFA37");
      
      Frontroom[Backroom.id].Player1.Ball = new Ball(Backroom.GameBall?.x,Backroom.GameBall?.y,
          Backroom.GameBall?.diameter,p5_ob,Backroom.GameBall?.ball_speed_x,Backroom.GameBall?.ball_speed_y);
      }
      if (Backroom.Player2){
        Frontroom[Backroom.id].Player2 = Backroom.Player2;
        Frontroom[Backroom.id].Player2.Paddle = new Paddle(Frontroom[Backroom.id].Player2.x,Frontroom[Backroom.id].Player2.y,
          Frontroom[Backroom.id].Player2.width,Frontroom[Backroom.id].Player2.height,p5_ob,"#FFFA37");

        Frontroom[Backroom.id].Player2.Ball = new Ball(Backroom.GameBall?.x,Backroom.GameBall?.y,
            Backroom.GameBall?.diameter,p5_ob,Backroom.GameBall?.ball_speed_x,Backroom.GameBall?.ball_speed_y);
      }
    }
    else{
      Frontroom[Backroom.id].client_count = Backroom.client_count;
      if (!Frontroom[Backroom.id].Player1 && Backroom.Player1){
        Frontroom[Backroom.id].Player1 = Backroom.Player1;
        Frontroom[Backroom.id].Player1.Paddle = new Paddle(Frontroom[Backroom.id].Player1.x,Frontroom[Backroom.id].Player1.y,
          Frontroom[Backroom.id].Player1.width,Frontroom[Backroom.id].Player1.height,p5_ob,"#FFFA37");

          Frontroom[Backroom.id].Player1.Ball = new Ball(Backroom.GameBall?.x,Backroom.GameBall?.y,
              Backroom.GameBall?.diameter,p5_ob,Backroom.GameBall?.ball_speed_x,Backroom.GameBall.ball_speed_y);
        }
        if (!Frontroom[Backroom.id].Player2 && Backroom.Player2){
          Frontroom[Backroom.id].Player2 = Backroom.Player2;
          Frontroom[Backroom.id].Player2.Paddle = new Paddle(Frontroom[Backroom.id].Player2.x,Frontroom[Backroom.id].Player2.y,
            Frontroom[Backroom.id].Player2.width,Frontroom[Backroom.id].Player2.height,p5_ob,"#FFFA37");

          Frontroom[Backroom.id].Player2.Ball = new Ball(Backroom.GameBall?.x,Backroom.GameBall?.y,
              Backroom.GameBall?.diameter,p5_ob,Backroom.GameBall?.ball_speed_x,Backroom.GameBall.ball_speed_y);
        }
    }


    //y- Handling disconnect of Player in frontend

    for(const id in Frontroom){
      if (!Backroom?.Player1){
          //console.log("Player 1 disconnected or doesn't exist in room ->" + Backroom?.id);
          delete Frontroom[id].Player1;
      }
      if (!Backroom?.Player2){
        //console.log("Player 2 disconnected or doesn't exist in room ->" + Backroom?.id);
        delete Frontroom[id].Player2;
      }
    }
  //y---------------------------------------------
  

  //console.log("client_count--->"+Frontroom[Backroom.id].client_count);
  //console.log(Frontroom);

  });
}


export const sketch : Sketch = (p5_ob : P5CanvasInstance) => {
  const Frontroom : any = {};
  let MatchmakingPage : p5Types.Image;
  let font : p5Types.Font;
  let ovp : p5Types.Image;
  let change_screen :boolean = false;
  
  
  
  //o- Getting Room Full of Players 1 and 2 and setting up the frontend Player
      SettingUpBackWithFront(Frontroom, p5_ob);
  //o--------------------------------------------------------------------------

      //r- Getting Position of player form Backend

      socket?.on("UpdatePlayerPos",(Backroom)=>{
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
      });
      //r-------------------------------------------

      //r- Getting Position of player from Backend

      socket?.on("UpdateBallPos",(Backroom)=> {
        let reverse_ball_x = screen_width - Backroom.GameBall?.x;

        for(const id in Frontroom){
          if (socket.id == Frontroom[id].Player1?.id){
            Frontroom[id].Player1.Ball.pos.x = Backroom.GameBall?.x;
            Frontroom[id].Player1.Ball.pos.y = Backroom.GameBall?.y;
          }else if (socket.id == Frontroom[id].Player2?.id){
            Frontroom[id].Player2.Ball.pos.x = reverse_ball_x;
            Frontroom[id].Player2.Ball.pos.y = Backroom.GameBall?.y;
          }
        }
      });
      //r--------------------------------------------


      //r- Loading Images
      p5_ob.preload = () =>{
        MatchmakingPage = p5_ob.loadImage(gifMatch);
        font = p5_ob.loadFont(f);
        ovp = p5_ob.loadImage(over_g);
      }
      //r------------------


      socket?.on("PlayerLeave",()=>{
        //console.log("You won by Forfait --->" + socket?.id);
        socket.disconnect();
        change_screen = true;
        // p5_ob.background("#000000");
        // p5_ob.image(ovp,170,0,750,550);
      });

      p5_ob.setup = () => {
      p5_ob.frameRate(60);
      canvas = p5_ob.createCanvas(screen_width , screen_height);
      const canvas_x = (p5_ob.windowWidth - p5_ob.width) / 2;
      const canvas_y = (p5_ob.windowHeight - p5_ob.height) / 2;
      canvas.position(canvas_x,canvas_y);
      p5_ob.textFont(font);
      p5_ob.textSize(20);
      p5_ob.textAlign(p5_ob.CENTER, p5_ob.CENTER);
    }
    
    p5_ob.draw = () =>{
      if (!change_screen){
        for(const id in Frontroom){
          p5_ob.background("#FA9200");
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
    
          //y- LOADING PAGE FOR PLAYERS
    
          
          //   //r- CODE FOR DRAWING THE BALL
          if (Frontroom[id].Player1 && Frontroom[id].Player2){
              // //console.log(Player1.pos.x);
            if (id_of_player1 == id_player)
              Frontroom[id].Player1?.Ball.update_pos(Frontroom[id].Player1?.Paddle,Frontroom[id].Player2?.Paddle);
            else if (id_of_player2 == id_player)
            Frontroom[id].Player2?.Ball.update_pos(Frontroom[id].Player1?.Paddle,Frontroom[id].Player2?.Paddle);
          }
          //   //r----------------------------
    
          
          //   //b- LOADING PAGE CODE
            else{
            //console.log("A player is missing");
            // image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER);
            // p5_ob.image(load,0,0);
            p5_ob.background("#000000");
            p5_ob.image(MatchmakingPage,170,0,750,550);
            // p5_ob.fill("#000000");
            // p5_ob.text("Loading",100,200);
            // p5_ob.text("...",190,100);
            // if (id_of_player1 == id_player){
            //   // Frontroom[id].Player1.Ball.pos.x = screen_width / 2;
            //   // Frontroom[id].Player1.Ball.pos.y = screen_height / 2;
            //   // Frontroom[id].Player1.Ball.draw_the_ball("#e9ed09");
            }
            
          //   //b- ----------------------
    
          //   // else if (id_of_player2 == id_player)
          //   //   Frontroom[id].Player1.Ball.pos.x = screen_width / 2;
          //   //   Frontroom[id].Player1.Ball.pos.y = screen_height / 2;
          //   //   Frontroom[id].Player2.Ball.draw_the_ball("#e9ed09");
          // }
    
          //y----------------------------------
          
        }
      }else{
        //console.log("Game  Over someone forfaited");
        p5_ob.background("#000000");
        p5_ob.image(ovp,250,0,600,550);
      }
  }
}




















          // //console.log("I got Coords");
          // //console.log(Backroom.Player1?.y);




   // //console.log("My Player ID --> "+ id_player);
      // //console.log("ID of Player --->" + id_player);
      //   frontendPlayers[id_player]?.update_Player_pos(canvas);





 // socket?.on("UpdatePlaySetuperPos",)
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

  // //     //console.log(data.msg);
  // //     // players[data.Players.id] = new Paddle(data.Players.x,20,80,data.Players.y,p5_ob);
  // //     // players[data.Players] = new Paddle()
  // //     // socket?.emit("populate-toserver",{Player:data.Players});
  // //     // //console.log(players);
  //   // //console.log(frontendPlayers[socket.id]);
  //   // //console.log(socket.id);
  //   // //console.log(frontendPlayers[socket.id]);
  // })