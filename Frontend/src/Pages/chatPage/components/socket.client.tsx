import { createContext } from "react";
import { Socket, io } from "socket.io-client";

export const socket : Socket = io("ws://localhost:3000/chat");
export const socketContext = createContext<Socket>(socket);
