import { createContext } from 'react';
import { io } from 'socket.io-client';
const serverURL= 'https://Tic-Tac-Toe-Server.orvilledaley.repl.co'
export const globalState = {
	socket: io(serverURL),
	isPlayerOne: false, //1==> true, 2==>false
	setIsPlayerOne: (value: boolean) => {}, //Override later
  getPlayerNumber: () => 0, //Override later
};
const GlobalStateContext = createContext(globalState);
export default GlobalStateContext;
