import { io , Socket } from "socket.io-client";
// import {  } from "socket.io"
import { createContext } from "react";


export const socket = io("ws://localhost:8001" , { path : '/online'});
export const ContextSocket = createContext<Socket>(socket);