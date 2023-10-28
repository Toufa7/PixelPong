import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
// import { ContextSocket, socket } from './socket_setup/client-connect';
import { Paddle } from './game-classes/paddle.class';
// import { id_player } from './components/render_game_sketch_components';
import { Ball } from './game-classes/Ball.class';
import jwt_decode from 'jwt-decode';


//h-             WORKING IMPORTS
//y------------------------------------------

import gifMatch from './assets/rescaled_tv.gif';
import akumaloading from "./assets/sc.gif";
import f from "./assets/cubecavern_memesbruh03.ttf";
// import jwt_decode from "jwt-decode";
// import loading from "./assets/loading.gif";
import over_g from "./assets/wdS.gif";
import Win from "./assets/Win.png";
import Lose from "./assets/Lose.jpeg";
import Dimension from "./assets/Dim.gif";
import { Socket, io } from 'socket.io-client';
import BackgroundGame from "./assets/bc_mini.png";
import BackgroundGame2 from "./assets/bckg2.png";
import pd from "./assets/blue_paddle.png";
import yellow_pd from "./assets/fr_yellow_paddle.png";
import red_pd from "./assets/red_paddle.png";
import ball from "./assets/yellow_ball.png";
import red_ball from "./assets/red_bl.png";
import blue_ball from "./assets/blue_ball.png";
import { socket } from '../socket-client';

// import axios from 'axios';
// import { Cookies } from 'react-cookie';
// import { socket } from './socket_setup/client-connect';
// import { id_player } from './components/render_game_sketch_components';

//y------------------------------------------
//h-   -------------------------------------



let canvas : p5Types.Renderer;
// export let screen_width = 1050;
// export let screen_height = 500;
let id_player : any;
export let socket_gm : Socket;
// let canvasDiv : any;
export let width : any;
export let height : any;


let scaled_width : number;
let scaled_height : number;

export let Player1_username : string;
export let Player2_username : string;
export let Player1_HealthPoints : number;
export let Player2_HealthPoints : number;


export let Update_screen : boolean;

export let GameBackgrund : p5Types.Image;
export let pd_asset : p5Types.Image;
export let ball_asset : p5Types.Image;




function SettingUpBackWithFront(socket : Socket , Frontroom : any , p5_ob : any,Screen_display : string){
  socket?.on("PlayersOfRoom",(Backroom : any)=>{
    console.log("Im -->" + socket.id);
    console.log(Backroom);
    
    if (!Frontroom){
      console.log("creating room ...!!");
      Frontroom = {client_count : "",Player1:{Paddle:"",Ball:"",Health_points:0,username:""},Player2:{Paddle:"",Ball:"",Health_points:0,username:""},GameBall:""};
      Frontroom.GameBall = Backroom.GameBall;
      Frontroom.client_count = Backroom.client_count;

      if (Backroom.Player1){
      Frontroom.Player1 = Backroom.Player1;
      Frontroom.Player1.Health_points = Backroom.Player1.Health_points;
      Frontroom.Player1.username = Backroom.Player1.username;
      Frontroom.Player1.Paddle = new Paddle(Frontroom.Player1.x,Frontroom.Player1.y,
        Frontroom.Player1.width,Frontroom.Player1.height,p5_ob,"#FFFA37");
      
      Frontroom.Player1.Ball = new Ball(Backroom.GameBall?.x,Backroom.GameBall?.y,
          Backroom.GameBall?.diameter,p5_ob,Backroom.GameBall?.ball_speed_x,Backroom.GameBall?.ball_speed_y);
      }
      if (Backroom.Player2){
        Frontroom.Player2 = Backroom.Player2;
        Frontroom.Player2.Health_points = Backroom.Player2.Health_points;
        Frontroom.Player2.username = Backroom.Player2.username;
        Frontroom.Player2.Paddle = new Paddle(Frontroom.Player2.x,Frontroom.Player2.y,
          Frontroom.Player2.width,Frontroom.Player2.height,p5_ob,"#FFFA37");

        Frontroom.Player2.Ball = new Ball(Backroom.GameBall?.x,Backroom.GameBall?.y,
            Backroom.GameBall?.diameter,p5_ob,Backroom.GameBall?.ball_speed_x,Backroom.GameBall?.ball_speed_y);
      }
      // Screen_display = "on_going";
    }
    else{
      Frontroom.client_count = Backroom.client_count;
      if (!Frontroom.Player1 && Backroom.Player1){
        Frontroom.Player1 = Backroom.Player1;
        Frontroom.Player1.Health_points = Backroom.Player1.Health_points;
        Frontroom.Player1.username = Backroom.Player1.username;
        Frontroom.Player1.Paddle = new Paddle(Frontroom.Player1.x,Frontroom.Player1.y,
          Frontroom.Player1.width,Frontroom.Player1.height,p5_ob,"#FFFA37");

          Frontroom.Player1.Ball = new Ball(Backroom.GameBall?.x,Backroom.GameBall?.y,
              Backroom.GameBall?.diameter,p5_ob,Backroom.GameBall?.ball_speed_x,Backroom.GameBall.ball_speed_y);
        }
        if (!Frontroom.Player2 && Backroom.Player2){
          Frontroom.Player2 = Backroom.Player2;
          Frontroom.Player2.Health_points = Backroom.Player2.Health_points;
          Frontroom.Player2.username = Backroom.Player2.username;
          Frontroom.Player2.Paddle = new Paddle(Frontroom.Player2.x,Frontroom.Player2.y,
            Frontroom.Player2.width,Frontroom.Player2.height,p5_ob,"#FFFA37");

          Frontroom.Player2.Ball = new Ball(Backroom.GameBall?.x,Backroom.GameBall?.y,
              Backroom.GameBall?.diameter,p5_ob,Backroom.GameBall?.ball_speed_x,Backroom.GameBall.ball_speed_y);
        }
    }


    //y- Handling disconnect of Player in frontend


    // for(const id in Frontroom){
      if (!Backroom?.Player1){
          console.log("Player 1 disconnected or doesn't exist in room ->" + Backroom?.id);
          delete Frontroom.Player1;
      }
      if (!Backroom?.Player2){
        console.log("Player 2 disconnected or doesn't exist in room ->" + Backroom?.id);
        delete Frontroom.Player2;
      }
    // }
  //y---------------------------------------------
  

  console.log("client_count--->"+Frontroom.client_count);
  console.log(Frontroom);

  });
}

export const Game_instance = () =>{


  // const [newsocket, setScoket] = useState<Socket>();
  // const [isConnected , setConnected] = useState<boolean>(false);
  // const [Infos, SetInfo] = useState<any>({});

  // socket = io("ws://localhost:3000/game" , {withCredentials: true , transports: ["websocket"] });

  const socketRef = useRef<Socket | null >(null);

  useEffect(()=>{
    if (socketRef.current == null){
      socketRef.current = io("ws://localhost:3000/game", {withCredentials: true, transports: ["websocket"] });
      socket_gm = socketRef.current;
    }
    
    socket_gm?.on("connect",() =>{
      id_player = socket_gm.id;
      scaled_width = ((80 / 100) * window.innerWidth);
      scaled_height = ((50 / 100) * scaled_width);
      socket_gm?.emit("PlayerEntered",{s_w : scaled_width , s_h : scaled_height,pd_width : (2 / 10 ) * scaled_width , pd_height : (20 / 10 ) * scaled_height});
    });
    return () => {
      socket_gm?.off("connect");
      socket_gm?.off("UpdatePlayerPos");
      socket_gm?.off("PlayerLeave");
      socket_gm?.off("PlayersOfRoom");
      socket_gm?.off("UpdateBallPos");
      // setConnected(false);
    }
    
  },[]);
  
const sketch : Sketch = (p5_ob : P5CanvasInstance) => {

    const Frontroom : any = {};
    let MatchmakingPage : p5Types.Image;
    let font : p5Types.Font;
    let ovp : p5Types.Image;
    let win : p5Types.Image;
    let lose : p5Types.Image;
    let Screen_display :string = "on_going";
    let FrontCountDown : number = 6;
    let Dim : p5Types.Image;

    let P1_scaled_y : number;
    let P2_scaled_y : number;

    let button : any;



    // console.log(token.username);
    // let user_image : p5Types.Image;
    
    // console.log(Infos);
    
    //o- Getting Room Full of Players 1 and 2 and setting up the frontend Player

        SettingUpBackWithFront(socket_gm, Frontroom, p5_ob,Screen_display);

    //o--------------------------------------------------------------------------


        //r--------------------------------------------
  
        //r- Loading Images
p5_ob.preload =  () =>{
          let Rnd_background = Math.floor(Math.random() * 2);
          let Rnd_paddle_asset = Math.floor(Math.random() * 4);
          let Rnd_ball_asset = Math.floor(Math.random() * 4);
          // let Random_loading_page = Math.floor(Math.random() * 2);

          MatchmakingPage = p5_ob.loadImage(gifMatch);
          font  =  p5_ob.loadFont(f);
          ovp =  p5_ob.loadImage(over_g);
          win =  p5_ob.loadImage(Win);
          lose =  p5_ob.loadImage(Lose);
          Dim =  p5_ob.loadImage(Dimension);
          if (Rnd_background)
            GameBackgrund = p5_ob.loadImage(BackgroundGame);
          else
            GameBackgrund = p5_ob.loadImage(BackgroundGame2);

          if(Rnd_paddle_asset == 0){
            pd_asset = p5_ob.loadImage(pd);
          }else if (Rnd_paddle_asset == 1){
            pd_asset = p5_ob.loadImage(yellow_pd);
          }else if (Rnd_paddle_asset == 2){
            pd_asset = p5_ob.loadImage(red_pd);
          }

          if (Rnd_ball_asset == 0){
            ball_asset = p5_ob.loadImage(ball);
          }else if (Rnd_ball_asset == 1){
            ball_asset = p5_ob.loadImage(blue_ball);
          }else if (Rnd_ball_asset == 2){
            ball_asset = p5_ob.loadImage(red_ball);
          }

          // user_image = p5_ob.loadImage(Get_user_image);

}
        //r------------------
  
  
        socket_gm?.on("PlayerLeave",(Result)=>{
          console.log("You won by Forfait --->" + socket_gm?.id);
          socket_gm?.disconnect();
          Screen_display = Result.Result;
          // p5_ob.background("#000000");
          // p5_ob.image(ovp,170,0,750,550);
        });

        socket_gm?.on("MatchEnded",(Result)=>{
          console.log("Match Ended By --->" + Result.Result);
          socket_gm?.disconnect();
          Screen_display = Result.Result;
          // p5_ob.background("#000000");
          // p5_ob.image(ovp,170,0,750,550);
        });
  
p5_ob.setup = () => {

        // socket_gm?.on("IminGame",(Player_Info) => {
        //     inGame = Player_Info?.inGame;
        //     user_id = Player_Info?.user_id;
        // });
        scaled_width = ((80 / 100) * window.innerWidth);
        scaled_height = ((50 / 100) * scaled_width);
        p5_ob.frameRate(120);
        p5_ob.setAttributes("willReadFrequently",true);
        // canvasDiv = document.getElementById('child');
        // width = document.getElementById('child')?.offsetWidth;
        // height = document.getElementById('child')?.offsetHeight;

          console.log(window.innerWidth);
          console.log(window.innerHeight);
          // console.log("Player Database Id -->" + JSON.stringify(Infos.id) +"\n" 
          // + "Player Database username -->" + JSON.stringify(Infos.username));
        
        canvas = p5_ob.createCanvas(scaled_width,scaled_height);
        let ctx = p5_ob.drawingContext;
        ctx.willReadFrequently = true;

        // canvas = p5_ob.createCanvas(screen_width,screen_height);
        const canvas_x = (window.innerWidth - p5_ob.width) / 2;
        const canvas_y = (window.innerHeight - p5_ob.height) / 2;
        canvas.position(canvas_x,canvas_y);
        p5_ob.textFont(font);
        p5_ob.textSize(5 / 100 * p5_ob.width);
        p5_ob.textAlign(p5_ob.CENTER, p5_ob.CENTER);
}


      socket_gm?.on("CountDown",(C_T)=>{
      
      FrontCountDown = C_T.CountDown;
      console.log("Counting From Frontend -->" + C_T.CountDown);
      })
      
p5_ob.draw = () =>{
    socket_gm?.on("CountDown",(C_T)=>{
      
    FrontCountDown = C_T.CountDown;
    console.log("Counting From Frontend -->" + C_T.CountDown);
    })

           //r- Getting Position of player form Backend
  
          socket_gm?.on("UpdatePlayerPos",(Backroom : any)=>{

            if (Backroom.who == "P1" && Frontroom.Player1 && Frontroom.Player2){
                  Frontroom.Player1.Paddle.pos.x = Backroom.P1_x;
                  Frontroom.Player1.Paddle.pos.y = Backroom.P1_y;
                  Frontroom.Player1.Paddle.paddle_width = (2 / 100) * scaled_width;
                  Frontroom.Player1.Paddle.paddle_height = (20 / 100) * scaled_height;
                  Frontroom.Player1.Health_points = Backroom.Health_points_P1;


                  
                if (Frontroom.Player2){
                Frontroom.Player2.Paddle.pos.x = Backroom.P2_x_scaled;
                Frontroom.Player2.Paddle.pos.y = Backroom.P2_y_scaled;
                Frontroom.Player2.Paddle.paddle_width = (2 / 100) * scaled_width;
                Frontroom.Player2.Paddle.paddle_height = (20 / 100) * scaled_height;
                Frontroom.Player2.Health_points = Backroom.Health_points_P2;
                }

                // Frontroom.Player2.Health_points = Backroom.Player2?.Health_points;
                // Frontroom.Player2.username = Backroom.Player2.username;
            }

            else if (Backroom.who == "P2" && Frontroom.Player1 && Frontroom.Player2){
              Frontroom.Player2.Paddle.pos.x = Backroom.P2_x;
              Frontroom.Player2.Paddle.pos.y = Backroom.P2_y;
              Frontroom.Player2.Paddle.paddle_width = (2 / 100) * scaled_width;
              Frontroom.Player2.Paddle.paddle_height = (20 / 100) * scaled_height;
              Frontroom.Player2.Health_points = Backroom.Health_points_P2;
              // Frontroom.Player1.Health_points = Backroom.Player1?.Health_points;
              // Frontroom.Player1.username = Backroom.Player1.username;

              // P2_scaled_y = Backroom.P2_y_scaled;
            
            if (Frontroom.Player1){
            Frontroom.Player1.Paddle.pos.x = Backroom.P1_x_scaled;
            Frontroom.Player1.Paddle.pos.y = Backroom.P1_y_scaled;
            Frontroom.Player1.Paddle.paddle_width = (2 / 100) * scaled_width;
            Frontroom.Player1.Paddle.paddle_height = (20 / 100) * scaled_height;
            Frontroom.Player1.Health_points = Backroom.Health_points_P1;
            }
            
            // Frontroom.Player2.Health_points = Backroom.Player2?.Health_points;
            // Frontroom.Player2.username = Backroom.Player2.username;
        }
        });
        //r-------------------------------------------
  
        //r- Getting Position of Ball from Backend
  
        socket_gm?.on("UpdateBallPos",(Backroom : any)=> {

          
          // for(const id in Frontroom){
            // if (Frontroom.Player1 && socket_gm.id == Frontroom.Player1?.id){
              
            //   Frontroom.Player1.Ball.pos.x = Backroom.GameBall?.x;
            //   Frontroom.Player1.Ball.pos.y = Backroom.GameBall?.y;
            // }else if (Frontroom.Player2 && socket_gm.id == Frontroom.Player2?.id){
            //   let reverse_ball_x = scaled_width - Backroom.GameBall_x;
            //   Frontroom.Player2.Ball.pos.x = (reverse_ball_x * Backroom.P2_width) / Backroom.P1_width;
            //   Frontroom.Player2.Ball.pos.y = (Backroom.GameBall_y * Backroom.P2_height) / Backroom.P2_height;
            // }
          // }

          if (Backroom.who == "P1" && Frontroom.Player1){
              Frontroom.Player1.Ball.pos.x = Backroom.Ball1_x;
              Frontroom.Player1.Ball.pos.y = Backroom.Ball1_y;
              Frontroom.Player1.Ball.diameter = (2.4 / 100) * scaled_width;
          }
          else if (Backroom.who == "P2" && Frontroom.Player2){
            let reverse_ball_x = scaled_width - Backroom.Ball2_x;
            Frontroom.Player2.Ball.pos.x = reverse_ball_x;
            Frontroom.Player2.Ball.pos.y = Backroom.Ball2_y;
            Frontroom.Player2.Ball.diameter = (2.4 / 100) * scaled_width;
          }


        });

        // console.log("FrontCountDown -->" + FrontCountDown);

        if (Screen_display == "Win"){
          Update_screen = false;
          p5_ob.background(Dim);
          p5_ob.fill("#ffffff");
          p5_ob.textSize((5.4 / 100) * scaled_width);
          p5_ob.text("You Win !!", scaled_width / 2, scaled_height / 2);
          console.log("You Won");
        }
        else if (Screen_display == "Lose"){
          Update_screen = false;
          p5_ob.background(Dim);
          p5_ob.fill("#ffffff");
          p5_ob.textSize((5.4 / 100) * scaled_width);
          p5_ob.text("You Lose !!", scaled_width / 2, scaled_height / 2);
          console.log("You Lost");
        }
        else{
        if (Screen_display === "on_going"){

          // for(const id in Frontroom){
            
            if (Frontroom.Player1 && Frontroom.Player2){
              p5_ob.background(GameBackgrund);
            Update_screen = true;
            const id_of_player1 = Frontroom.Player1?.id;
            const id_of_player2 = Frontroom.Player2?.id;
            const Player1 = Frontroom.Player1?.Paddle;
            const Player2 = Frontroom.Player2?.Paddle;
            if (FrontCountDown > 0){
              p5_ob.fill("#e0e3ba");
              p5_ob.textSize(150);
              p5_ob.text(FrontCountDown, scaled_width / 2, scaled_height / 2);
            }
            else{
                    if (id_of_player1 == id_player){
                      Player1_username = Frontroom.Player1?.username;

                      Player1_HealthPoints = Frontroom.Player1?.Health_points;
                      
                      Player1?.update_Player_pos(canvas,scaled_width,scaled_height);
                      if (Player2 && id_of_player2 != id_player){
                        Player2_HealthPoints = Frontroom.Player2?.Health_points;
                        Player2_username = Frontroom.Player2?.username;
                        Player2.pos.x = scaled_width - Player2.paddle_width;
                        Player2?.update_Player_pos(canvas,scaled_width,scaled_height);
                      }
                    }
                    else if (id_of_player2 == id_player){
                      Player1_username = Frontroom.Player2?.username;

                      Player1_HealthPoints = Frontroom.Player2?.Health_points;
                      
                      Player2?.update_Player_pos(canvas,scaled_width,scaled_height);
                      if (Player1 && id_of_player1 != id_player){
                        Player2_HealthPoints = Frontroom.Player1?.Health_points;
                        Player2_username = Frontroom.Player1?.username;
                        Player1.pos.x = scaled_width - Player1.paddle_width;
                        Player1?.update_Player_pos(canvas,scaled_width,scaled_height);
                      }
                    }
                    if (id_of_player1 == id_player)
                      Frontroom.Player1?.Ball.update_pos(id_of_player1,Frontroom.Player1,
                          Frontroom.Player2,scaled_width,scaled_height,Frontroom.Player1.Ball.diameter,Frontroom.Player2.Ball.diameter,Frontroom.Player1?.Paddle,Frontroom.Player2?.Paddle);
                    else if (id_of_player2 == id_player)
                      Frontroom.Player2?.Ball.update_pos(id_of_player2,Frontroom.Player1,
                          Frontroom.Player2,scaled_width,scaled_height,Frontroom.Player1.Ball.diameter,Frontroom.Player2.Ball.diameter,Frontroom.Player1?.Paddle,Frontroom.Player2?.Paddle);
    
              }
      }
        else{
              if (id_player == Frontroom.Player1?.id || id_player == Frontroom.Player2?.id){
                p5_ob.background(MatchmakingPage);
                Update_screen = false;
                // p5_ob.image(MatchmakingPage,170,0,750,550);
                p5_ob.fill("#e0e3ba");
              // p5_ob.text("MatchMaking ...",p5_ob.width / 2 -  25 ,p5_ob.height/2);
              }
          }
          // p5_ob.fill("#ffffff");
          // p5_ob.textSize((2.4 / 100) * window.innerWidth);
          // p5_ob.text(Frontroom.Player1?.username, window.innerWidth - 300, window.innerHeight - 300);
        // }
      }
      else if (Screen_display == "Forfait"){
          Update_screen = false;
          console.log("Game  Over someone forfaited");
          p5_ob.background(ovp);
          // p5_ob.image(ovp,250,0,600,550);
      }
    }
}
  
    p5_ob.windowResized = () =>{
      // canvasDiv = document.getElementById('child');
      scaled_width = ((80 / 100) * window.innerWidth);
      scaled_height = ((50 / 100) * scaled_width);
      // console.log("resize--> " + window.innerWidth);
      // console.log("resize--> " + window.innerHeight);
      if (p5_ob){
        socket_gm?.emit("UpdateScreenmetrics",{s_w : scaled_width , s_h : scaled_height});
        p5_ob.resizeCanvas(scaled_width,scaled_height);
        canvas = p5_ob.createCanvas(scaled_width,scaled_height);
        const canvas_x = (window.innerWidth - p5_ob.width) / 2;
        const canvas_y = (window.innerHeight - p5_ob.height) / 2;
        canvas.position(canvas_x,canvas_y);
        p5_ob.textSize(5 / 100 * p5_ob.width);
        }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch}/>
  )
}


















        // canvasDiv = document.querySelector('#child_canvas');
      // width = canvasDiv?.offsetWidth;
      //- height = canvasDiv?.offsetHeight;












        //       console.log("A player is missing");
        //       // image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER);
        //       // p5_ob.image(load,0,0);
              // p5_ob.strokeWeight(4);
              // p5_ob.stroke(51);
              // p5_ob.background("#fcba03");








        //       // p5_ob.text("...",190,100);
        //       // if (id_of_player1 == id_player){
        //       //   // Frontroom[id].Player1.Ball.pos.x = screen_width / 2;
        //       //   // Frontroom[id].Player1.Ball.pos.y = screen_height / 2;
        //       //   // Frontroom[id].Player1.Ball.draw_the_ball("#e9ed09");
        //       }
              
        //     //   //b- ----------------------
      
        //     //   // else if (id_of_player2 == id_player)
        //     //   //   Frontroom[id].Player1.Ball.pos.x = screen_width / 2;
        //     //   //   Frontroom[id].Player1.Ball.pos.y = screen_height / 2;
        //     //   //   Frontroom[id].Player2.Ball.draw_the_ball("#e9ed09");
        //     // }
      
        //     //y----------------------------------








          // console.log("I got Coords");
          // console.log(Backroom.Player1?.y);




   // console.log("My Player ID --> "+ id_player);
      // console.log("ID of Player --->" + id_player);
      //   frontendPlayers[id_player]?.update_Player_pos(canvas);





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




  // try{
      //   axios.get(`http://localhost:3000/users/${token.id}`,{ withCredentials: true })
      //       .then(Resp => SetInfo(Resp.data))
      //       .catch(error => console.error(error));
      //   }catch(error){
      //     console.error(error);
      //   }
        
      // try{
      //   axios.patch(`http://localhost:3000/users/statingame`,{ingame : true},{ withCredentials: true })
      //   .then(Resp => console.log("Patched"))
      //   .catch(error => console.error(error));
      // }catch(error){
      //   console.log(error);
      // }


      // const GetUserInfo = async (token : any) =>{
//   try{
//     const Resp = await axios.get(`http://localhost:3000/users/${token.id}`,{ withCredentials: true });
//     console.log(Resp);
//   }catch (error){
//     console.error(error);
//   }
// }


  // const cookies = new Cookies();
  // const jwt = cookies.get('jwt');
  // const token : any = jwt_decode(jwt);


      // console.log(Infos);
    // console.log("token Game--->" + JSON.stringify(token));
    // axios.get(`http://localhost:3000/users/${token.id}`,{ withCredentials: true })
    // .then(response => console.log(response));


              // try{
          //   axios.patch(`http://localhost:3000/users/statingame`,{ingame : false},{ withCredentials: true })
          //   .then(Resp => console.log("Patched"))
          //   .catch(error => console.error(error));
          // }catch(error){
          //   console.log(error);
          // }