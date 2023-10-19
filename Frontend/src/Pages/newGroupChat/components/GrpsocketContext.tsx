import { createContext } from "react";
import { Socket, io } from "socket.io-client";

export const grpSocket : Socket = io("ws://localhost:3000/groupchat", { withCredentials: true });
export const grpSocketContext = createContext<Socket>(grpSocket);