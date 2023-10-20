import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
// import { ContextSocket, socket } from './socket_setup/client-connect';
// import { id_player } from './components/render_game_sketch_components';
import f from "./assets/cubecavern_memesbruh03.ttf";
import { Player1_username, Player2_username, Update_screen } from './game_flow_sketch';

let Scaled_width : number;
let Scaled_height : number;
let canvas : p5Types.Renderer;

export const InfoBorad = () =>{
    const sketch : Sketch = (p5_ob : P5CanvasInstance) => {
        let font : p5Types.Font;


p5_ob.preload = () =>{
            font = p5_ob.loadFont(f);
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
            p5_ob.background("#fcba03");
            p5_ob.fill("#ededed");
            p5_ob.textSize((4 / 100) * Scaled_width);
            p5_ob.text(Player1_username, 0 + (20 / 100) * Scaled_width, Scaled_height - (20 / 100) * Scaled_height);
            p5_ob.text(Player2_username, Scaled_width - (20 / 100) * Scaled_width, Scaled_height - (20 / 100) * Scaled_height);
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



