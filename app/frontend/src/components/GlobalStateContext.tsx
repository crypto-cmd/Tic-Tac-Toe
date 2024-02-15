import { createContext } from "react";
import { io } from "socket.io-client";
const websocketUrl = `${process.env.REACT_APP_SERVER_URL}`;
export const globalState = {
  socket: io(websocketUrl, {
    path: "/ws/",
  }),
  isPlayerOne: false,
  setIsPlayerOne: (value: boolean) => {}, //Override later
  getPlayerNumber: () => 0, //Override later
};
const GlobalStateContext = createContext(globalState);
export default GlobalStateContext;
