import React, { useContext } from 'react';
import GlobalStateContext from './GlobalStateContext';
type Props = {
  joinRoom: (event: any) => void;
};
const SplashScreen = ({ joinRoom, }: Props) => {
  const { socket } = useContext(GlobalStateContext  );
	return (
		<div className="SplashScreen screen">
			<div className="intro">
        <h3 className="title">Tic Tac Toe!</h3>
        <p> This is a two player game!</p>
      </div>
			<p>
				Paste this code <code>{socket.id}</code> into another game room.
			</p>
			<p>OR</p>
			<p>
        Enter room key here: <input onChange={joinRoom}type="text" />
			</p>
		</div>
	);
};
export default SplashScreen;
