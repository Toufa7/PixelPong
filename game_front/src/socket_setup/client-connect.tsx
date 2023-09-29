import { io , Socket } from "socket.io-client";
// import {  } from "socket.io"
import { createContext } from "react";


export const socket = io("ws://localhost:5000" , { path : '/online'});
export const ContextSocket = createContext<Socket>(socket);