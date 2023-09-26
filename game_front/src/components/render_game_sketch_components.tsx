import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { ContextSocket } from '../socket_setup/client-connect';
import { socket } from '../socket_setup/client-connect';
import { sketch } from '../game_flow_sketch';
import { screen_height, screen_width } from '../game_flow_sketch';


export const Websocket_render = () =>{

    const socket = useContext(ContextSocket);

    useEffect(() =>{
        socket?.on("connect",() =>{
            socket?.emit("joinRoom" , {hello : "hello"});
        });

    return () => {
        socket?.off("connect");
        socket?.off("UpdatePlayerPos");
    }

    },[])

    return (
    <div>
        {/* <ReactP5Wrapper sketch={sketch_ot}/> */}
        <div><ReactP5Wrapper sketch={sketch}/></div>
    </div>
    )
}