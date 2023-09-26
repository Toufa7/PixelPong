import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { ContextSocket, socket } from './socket_setup/client-connect';
import { Paddle } from './game-classes/paddle.class';




let canvas : p5Types.Renderer;
export let screen_width = 1050;
export let screen_height = 500;


export const sketch : Sketch = (p5_ob : P5CanvasInstance) => {
  const players : any = {};
  
  socket?.on("UpdatePlayerPos",(backend_players)=>{
    for(const id in backend_players){
      const backendPlayer = backend_players[id];
      if (!players[id]){
          players[id] = new Paddle(backendPlayer.x,20,90,backendPlayer.y,p5_ob);
      }
    }
    for (const id in players){
      if (!backend_players[id]){
        delete players[id];
      }
    }
    console.log(players);
  })
  
  p5_ob.setup = () => {
    p5_ob.frameRate(60);
   
      canvas = p5_ob.createCanvas(screen_width , screen_height);
      const canvas_x = (p5_ob.windowWidth - p5_ob.width) / 2;
      const canvas_y = (p5_ob.windowHeight - p5_ob.height) / 2;
      canvas.position(canvas_x,canvas_y);

      
  }

  p5_ob.draw = () =>{
    p5_ob.background("#FA9200");
    for(const id in players){
      const player = players[id];
      player.draw_paddle("#FFFF00");
    }
  }
}