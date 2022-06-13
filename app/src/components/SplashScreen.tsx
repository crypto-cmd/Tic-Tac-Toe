import React, { useContext, useEffect, useState } from "react";
import GlobalStateContext from "./GlobalStateContext";
import Loader from "./Loader";
type Props = {
  joinRoom: (event: any) => void;
};
const SplashScreen = ({ joinRoom }: Props) => {
  const { socket } = useContext(GlobalStateContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    socket.on("connect", () => {
      setIsLoading(false);
    });
  });

  return (
    <div className="SplashScreen screen">
      <div className="intro">
        <h3 className="title">Tic Tac Toe!</h3>
        <p className="subtitle"> This is a two player game!</p>
      </div>
      <div className="instructions">
        <p>
          Paste this code {socket.id ? <code>{socket.id}</code> : <Loader />}{" "}
          into another game room.
        </p>
        <p>OR</p>
        <p>
          Enter room key here: <input onChange={joinRoom} type="text" />
        </p>
      </div>
    </div>
  );
};
export default SplashScreen;
