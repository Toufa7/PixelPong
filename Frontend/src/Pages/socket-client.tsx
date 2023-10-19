import { createContext } from "react";
import { Socket, io } from "socket.io-client";



export const socket : Socket = io("localhost:3000/user", {withCredentials: true});
<<<<<<< HEAD

// export const socket : Socket = io("localhost:3000/groupchat", {withCredentials: true});

=======
>>>>>>> 8f4a82e03b1174372b76e778576abe336312fdfc
export const socketContext = createContext<Socket>(socket);