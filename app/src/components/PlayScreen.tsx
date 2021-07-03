import React, { useContext, useEffect, useState } from 'react';
import Board from './Board';
import Button from './Button';
import GlobalStateContext from './GlobalStateContext';

const PlayScreen = () => {
	const [ restart, setRestart ] = useState(false);
	// const { socket } = useContext(GlobalStateContext);
  const [isGameOver, setIsGameOver] = useState(false);
	return (
		<div className="PlayScreen screen">
			<Board setGameOver={setIsGameOver} shouldRestart={restart} />
			{isGameOver && <Button
				text="Restart"
        onClick={() => {
          // Toggle 'restart'.
          // Reagrdless of if 'restart' is false or true the board will re-render with empty tiles
					setRestart(!restart);
				}}
			/>}
			{/* <p>connection Id: {socket.id}</p> */}
		</div>
	);
};
export default PlayScreen;
