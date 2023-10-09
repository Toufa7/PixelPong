import { io , Socket } from "socket.io-client";
// import {  } from "socket.io"
import { createContext } from "react";


export const socket = io("ws://localhost:3000/game" , { path : '/online' ,  withCredentials: true , transports: ["websocket"] });
export const ContextSocket = createContext<Socket>(socket);