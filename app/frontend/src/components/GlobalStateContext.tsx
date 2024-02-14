import { createContext } from "react";
import { io } from "socket.io-client";
const serverURL = "http://localhost:8000";
export const globalState = {
  socket: io(serverURL),
  isPlayerOne: false,
  setIsPlayerOne: (value: boolean) => {}, //Override later
  getPlayerNumber: () => 0, //Override later
};
const GlobalStateContext = createContext(globalState);
export default GlobalStateContext;
