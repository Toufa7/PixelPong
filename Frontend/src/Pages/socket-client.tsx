import { createContext } from "react";
import { Socket, io } from "socket.io-client";



// export const socket : Socket = io("localhost:3000/user", {withCredentials: true});

export const socket : Socket = io("localhost:3000/groupchat", {withCredentials: true});

export const socketContext = createContext<Socket>(socket);