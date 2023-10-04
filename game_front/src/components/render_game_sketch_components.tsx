import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { ContextSocket} from '../socket_setup/client-connect';
import { socket } from '../socket_setup/client-connect';
import { sketch } from '../game_flow_sketch';
import { screen_height, screen_width } from '../game_flow_sketch';
import { Socket, io } from 'socket.io-client';


export let id_player : string;

export const Websocket_render = () =>{

    const socket = useContext(ContextSocket);

    useEffect(() =>{
        socket?.on("connect",() =>{
            id_player = socket.id;
            socket.emit("screen_metrics",{s_w : screen_width , s_h : screen_height});
            // socket?.emit("Want-coords");
        });

    return () => {
        socket?.off("connect");
        socket?.off("UpdatePlayerPos");
        socket?.off("PlayerLeave");
        socket?.off("PlayersOfRoom");
        socket?.off("UpdateBallPos");
    }

    },[])

    return (
    <div>
        {/* <ReactP5Wrapper sketch={sketch_ot}/> */}
        <ReactP5Wrapper sketch={sketch}/>
    </div>
    )
}