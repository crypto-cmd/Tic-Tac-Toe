import React, { useState } from 'react';
import Board from './Board';
import Button from './Button';

const PlayScreen = () => {
	const [ restart, setRestart ] = useState(false);
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
		</div>
	);
};
export default PlayScreen;
