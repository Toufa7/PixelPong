import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
// import { ContextSocket, socket } from './socket_setup/client-connect';
// import { id_player } from './components/render_game_sketch_components';
import f from "./assets/cubecavern_memesbruh03.ttf";
import { Player1_HealthPoints, Player1_username, Player2_HealthPoints, Player2_username, Update_screen } from './game_flow_sketch';
import Player1_icon from "./assets/ralph.png";
import Player2_icon from "./assets/k'.png";
import Health_Board from "./assets/health_bar_border.png";
import HL_00 from "./assets/health_0.png";
import HL_01 from "./assets/health_1.png";
import HL_02 from "./assets/health_2.png";
import HL_03 from "./assets/health_3.png";
import HL_04 from "./assets/health_4.png";
import HL_05 from "./assets/health_5.png";
import HL_06 from "./assets/health_6.png";

let Scaled_width : number;
let Scaled_height : number;
let canvas : p5Types.Renderer;

export const InfoBorad = () =>{
    const sketch : Sketch = (p5_ob : P5CanvasInstance) => {
    let font : p5Types.Font;
    let Player1 : p5Types.Image;
    let Player2 : p5Types.Image;
    let H_board : p5Types.Image;

    let Health_system_array : p5Types.Image[] = [];
    // = [HL_00,HL_01,HL_02,HL_03,HL_04,HL_05,HL_06];

    let Player1_coord_x : number;
    let Player2_coord_x : number;


p5_ob.preload = () =>{
    font = p5_ob.loadFont(f);
    Player1 = p5_ob.loadImage(Player1_icon);
    Player2 = p5_ob.loadImage(Player2_icon);
    H_board = p5_ob.loadImage(Health_Board);
    Health_system_array.push(p5_ob.loadImage(HL_00));
    Health_system_array.push(p5_ob.loadImage(HL_01));
    Health_system_array.push(p5_ob.loadImage(HL_02));
    Health_system_array.push(p5_ob.loadImage(HL_03));
    Health_system_array.push(p5_ob.loadImage(HL_04));
    Health_system_array.push(p5_ob.loadImage(HL_05));
    Health_system_array.push(p5_ob.loadImage(HL_06));
        
}
        

p5_ob.setup = () => {
        Scaled_width = ((60 / 100) * window.innerWidth);
        Scaled_height = ((22 / 100) * Scaled_width);
        p5_ob.frameRate(120);
        // canvasDiv = document.getElementById('child');
        // width = document.getElementById('child')?.offsetWidth;
        // height = document.getElementById('child')?.offsetHeight;

        // console.log(window.innerWidth);
        // console.log(window.innerHeight);
          // console.log("Player Database Id -->" + JSON.stringify(Infos.id) +"\n" 
          // + "Player Database username -->" + JSON.stringify(Infos.username));
        
        canvas = p5_ob.createCanvas(Scaled_width,Scaled_height);

        // canvas = p5_ob.createCanvas(screen_width,screen_height);
        const canvas_x = (window.innerWidth - p5_ob.width) / 2;
        const canvas_y = (window.innerHeight - p5_ob.height) / 2;
        canvas.position(canvas_x,canvas_y - (250 / 100) * Scaled_height);
        p5_ob.textFont(font);
        p5_ob.textSize(5 / 100 * p5_ob.width);
        p5_ob.textAlign(p5_ob.CENTER, p5_ob.CENTER);
        }


p5_ob.draw = () =>{
    if (Update_screen){
        if (Player1_username && Player2_username){
            Player1_coord_x = 0 + (2 / 100) * Scaled_width;
            Player2_coord_x = Scaled_width - (10 / 100) * Scaled_width;

            // p5_ob.background("#fcba03");
            p5_ob.fill("#ededed");
            p5_ob.textSize((4 / 100) * Scaled_width);

            //Details of Player 1
            // p5_ob.text(Player1_HealthPoints,Player1_coord_x + (26 / 100) * Scaled_width ,Scaled_height - (9 / 100) * Scaled_height);
            p5_ob.image(Health_system_array[Player1_HealthPoints / 100],Player1_coord_x + (16 / 100) * Scaled_width ,Scaled_height - (13 / 100) * Scaled_height,(14 / 100) * Scaled_width,(8 / 100) * Scaled_height);
            p5_ob.image(H_board,Player1_coord_x + (16 / 100) * Scaled_width ,Scaled_height - (13 / 100) * Scaled_height,(14 / 100) * Scaled_width,(10 / 100) * Scaled_height);
            p5_ob.text(Player1_username, Player1_coord_x + (26 / 100) * Scaled_width, Scaled_height - (22 / 100) * Scaled_height);
            p5_ob.image(Player1,0 + (2 / 100) * Scaled_width, Scaled_height - (33 / 100) * Scaled_height,(10 / 100) * Scaled_width,(30 / 100) * Scaled_height);

            //Details of Player 2
            // p5_ob.text(Player2_HealthPoints,Player2_coord_x - (20 / 100) * Scaled_width ,Scaled_height - (9 / 100) * Scaled_height);
            p5_ob.image(Health_system_array[Player2_HealthPoints / 100],Scaled_width - (35 / 100) * Scaled_width ,Scaled_height - (13 / 100) * Scaled_height,(14 / 100) * Scaled_width,(8 / 100) * Scaled_height);
            p5_ob.image(H_board,Scaled_width - (35 / 100) * Scaled_width ,Scaled_height - (13 / 100) * Scaled_height,(14 / 100) * Scaled_width,(10 / 100) * Scaled_height);
            p5_ob.text(Player2_username, Player2_coord_x - (20 / 100) * Scaled_width, Scaled_height - (22 / 100) * Scaled_height);
            p5_ob.image(Player2,Scaled_width - (10 / 100) * Scaled_width, Scaled_height - (33 / 100) * Scaled_height, (10 / 100) * Scaled_width, (30 / 100) * Scaled_height);
        }
        }else{
            Scaled_width = ((60 / 100) * window.innerWidth);
            Scaled_height = ((22 / 100) * Scaled_width);
        if (p5_ob){
            p5_ob.resizeCanvas(Scaled_width,Scaled_height);
            canvas = p5_ob.createCanvas(Scaled_width,Scaled_height);
            const canvas_x = (window.innerWidth - p5_ob.width) / 2;
            const canvas_y = (window.innerHeight - p5_ob.height) / 2;
            if (canvas_y < 0){
                canvas_y - (250 / 100) * Scaled_height
            }
              canvas.position(canvas_x,canvas_y - (200 / 100) * Scaled_height);
            }
        }
    }



p5_ob.windowResized = () =>{
            Scaled_width = ((60 / 100) * window.innerWidth);
            Scaled_height = ((22 / 100) * Scaled_width);
        if (p5_ob){
            p5_ob.resizeCanvas(Scaled_width,Scaled_height);
            canvas = p5_ob.createCanvas(Scaled_width,Scaled_height);
            const canvas_x = (window.innerWidth - p5_ob.width) / 2;
            const canvas_y = (window.innerHeight - p5_ob.height) / 2;
            if (canvas_y < 0){
                canvas_y - (250 / 100) * Scaled_height
            }
              canvas.position(canvas_x,canvas_y - (200 / 100) * Scaled_height);
            }
    }
}

    return (
        <ReactP5Wrapper sketch={sketch}/>
    )
}



