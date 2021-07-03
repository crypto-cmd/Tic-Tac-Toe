import {createContext} from "../../_snowpack/pkg/react.js";
import {io} from "../../_snowpack/pkg/socket.io-client.js";
const serverURL = "https://Tic-Tac-Toe-Server.orvilledaley.repl.co";
export const globalState = {
  socket: io(serverURL),
  isPlayerOne: false,
  setIsPlayerOne: (value) => {
  },
  getPlayerNumber: () => 0
};
const GlobalStateContext = createContext(globalState);
export default GlobalStateContext;
