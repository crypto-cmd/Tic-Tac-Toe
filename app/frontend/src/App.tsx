import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import GlobalStateContext, {
  globalState,
} from "./components/GlobalStateContext";
import PlayScreen from "./components/PlayScreen";
import SplashScreen from "./components/SplashScreen";

function App() {
  const { socket } = useContext(GlobalStateContext);
  const [isPlayerOne, setIsPlayerOne] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connection, setConnection] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [playerNumberFn, setPlayerNumberFn] = useState(() => () => 0);
  const joinRoom = (data: any) => {
    const connection = data.target.value;
    console.log("Check connection: ", connection);
    socket.emit("check-connection", connection);
  };
  useEffect(() => {
    function checkForConnection(connectionId: string) {
      console.log("Connection exist " + connectionId);
      if (!connectionId || connectionId === connection) {
        return;
      }
      setConnection(connectionId);
      setIsInRoom(true);
      console.log("Adding player to room", {
        nextPlayerId: connection,
        roomId,
      });
      socket.emit("add-player-to-room", { nextPlayerId: connectionId, roomId });
    }
    socket.on("connection-status", checkForConnection);
  }, [connection]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected socket with id", socket.id);
      setConnected(true);
      socket.on("added-to-room", (roomId, playerNumber) => {
        console.log("Added to room");
        setIsInRoom(true);
        setRoomId(roomId);
        setPlayerNumberFn(() => () => playerNumber);
      });
      socket.on("removed-from-room", () => {
        setIsInRoom(false);
      });
    });
  }, [connected]);
  return (
    <GlobalStateContext.Provider
      value={{
        ...globalState,
        isPlayerOne,
        setIsPlayerOne,
        getPlayerNumber: playerNumberFn,
      }}
    >
      <div id="app">
        {!isInRoom && <SplashScreen joinRoom={joinRoom} />}
        {isInRoom && <PlayScreen />}
      </div>
    </GlobalStateContext.Provider>
  );
}

export default App;
