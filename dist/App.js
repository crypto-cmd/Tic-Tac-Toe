import React, {useContext, useEffect, useState} from "../_snowpack/pkg/react.js";
import "./App.css.proxy.js";
import GlobalStateContext, {globalState} from "./components/GlobalStateContext.js";
import PlayScreen from "./components/PlayScreen.js";
import SplashScreen from "./components/SplashScreen.js";
function App() {
  const {socket} = useContext(GlobalStateContext);
  const [isPlayerOne, setIsPlayerOne] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isInRoom, setisInRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [playerNumberFn, setPlayerNumberFn] = useState(() => () => 0);
  const joinRoom = (data) => {
    const connection = data.target.value;
    socket.emit("check-connection", connection);
    function checkForConnection(connectionExistence) {
      if (connectionExistence) {
        setisInRoom(true);
        socket.emit("add-player-to-room", {nextPlayerId: connection, roomId});
      }
    }
    socket.on("connection-status", checkForConnection);
  };
  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      socket.on("added-to-room", (roomId2, playerNumber) => {
        setisInRoom(true);
        setRoomId(roomId2);
        setPlayerNumberFn(() => () => playerNumber);
      });
      socket.on("removed-from-room", () => {
        setisInRoom(false);
      });
    });
  }, [connected]);
  return /* @__PURE__ */ React.createElement(GlobalStateContext.Provider, {
    value: {...globalState, isPlayerOne, setIsPlayerOne, getPlayerNumber: playerNumberFn}
  }, /* @__PURE__ */ React.createElement("div", {
    id: "app"
  }, !isInRoom && /* @__PURE__ */ React.createElement(SplashScreen, {
    joinRoom
  }), isInRoom && /* @__PURE__ */ React.createElement(PlayScreen, null)));
}
export default App;
