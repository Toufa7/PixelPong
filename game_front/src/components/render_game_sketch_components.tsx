// import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
// import ReactDOM from 'react-dom/client';
// import p5Types from "p5";
// import { isConstructorDeclaration } from 'typescript';
// import { P5CanvasInstance, ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import { ContextSocket} from '../socket_setup/client-connect';
// // import { socket } from '../socket_setup/client-connect';
import { sketch } from '../game_flow_sketch';
import { screen_height, screen_width } from '../game_flow_sketch';
// import { Socket, io } from 'socket.io-client';

import { useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { ReactP5Wrapper } from "react-p5-wrapper";


export let id_player : string;
export let ContextConnection : any;


export const Websocket_render = () =>{

    // const [isConnected,setConnected] = useState(false);

    // ContextConnection = createContext<boolean>(isConnected);

    const socket = useRef<Socket>(useContext(ContextSocket));

    useEffect(() =>{
        socket.current?.on("connect",() =>{
            id_player = socket.current?.id;
            socket.current?.emit("screen_metrics",{s_w : screen_width , s_h : screen_height});
            // setConnected(true);
        });

    return () => {
        socket.current?.off("connect");
        socket.current?.off("UpdatePlayerPos");
        socket.current?.off("PlayerLeave");
        socket.current?.off("PlayersOfRoom");
        socket.current?.off("UpdateBallPos");
    }

    },[])

    return (
    <>
        {/* <ReactP5Wrapper sketch={sketch_ot}/> */}
        <ReactP5Wrapper sketch={sketch}/>
    </>
    )
}