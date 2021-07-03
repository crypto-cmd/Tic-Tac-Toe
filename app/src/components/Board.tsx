import React, { useContext, useEffect, useState } from 'react';
import Square from './Square';
import './Board.scss';
import EventBlocker from './EventBlocker';
import GlobalStateContext from './GlobalStateContext';
interface WinnerType {
	indices: Set<number>;
	winner?: string;
}
interface BoardProps {
	shouldRestart: boolean;
	setGameOver: (val: boolean) => void;
}
const Board = ({ shouldRestart, setGameOver }: BoardProps) => {
	const { socket, isPlayerOne, setIsPlayerOne, getPlayerNumber } = useContext(GlobalStateContext);
	setIsPlayerOne(getPlayerNumber() === 1);
	const xPlayer = 'x';
	const oPlayer = 'o';
	const [ tiles, setTiles ] = useState([ '', '', '', '', '', '', '', '', '' ]);
	const [ player, setPlayer ] = useState(isPlayerOne ? xPlayer : oPlayer);
	const [ turn, setTurn ] = useState(isPlayerOne);
	const [ lastMove, setLastMove ] = useState({ index: -1, player: '' });
	const [ winner, setWinner ] = useState({ indices: new Set() } as WinnerType);

	const handleMove = (move: { index: number; player: string }, emit = true) => {
		const { index, player } = move;
		const tile = tiles[index];
		if (tile) return;
		setLastMove({ index, player });
		setTurn(!turn);
		if (emit) socket.emit('move', { lastMove: { index, player } });
	};
	const handleClick = (key: number) => {
		handleMove({ index: key, player });
	};
	const restart = () => {
		setTiles(tiles.map(() => ''));
		setWinner({ indices: new Set() });
		setLastMove({ index: -1, player: '' });
		setTurn(isPlayerOne);
		setPlayer(isPlayerOne ? xPlayer : oPlayer);
		setGameOver(false);
	};
	const getWinner = () => {
		const possibleWins = [
			//Vertical
			[ 0, 1, 2 ],
			[ 3, 4, 5 ],
			[ 6, 7, 8 ],
			//Horizontal
			[ 0, 3, 6 ],
			[ 1, 4, 7 ],
			[ 2, 5, 8 ],
			//Diagonal
			[ 0, 4, 8 ],
			[ 2, 4, 6 ]
		];
		const winCombination = possibleWins.find(combination => {
			const values = new Set(combination.map(index => tiles[index]));
			if (values.has('')) return false;
			return values.size === 1;
		});
		if (winCombination) {
			return {
				indices: new Set(winCombination),
				winner: tiles[winCombination[0]]
			};
		}
		const numEmptyTiles = tiles.filter(x => !!x).length;
		return numEmptyTiles === 0 ? { indices: new Set<number>() } : null;
	};
	useEffect(
		() => {
			setPlayer(isPlayerOne ? xPlayer : oPlayer);
			console.log(isPlayerOne);
			console.log(player);
		},
		[ isPlayerOne ]
	);
	useEffect(
		() => {
			setTiles(tiles.map((value, i) => (i === lastMove.index ? lastMove.player : value)));
		},
		[ player, lastMove ]
	);
	useEffect(
		() => {
			socket.on('update-lastmove', ({ lastMove }: { lastMove: any }) => handleMove(lastMove, false));
		},
		[ socket ]
	);
	useEffect(
		() => {
			const winnerData = getWinner();
			if (winnerData) {
				setWinner(winnerData);
				console.log('HERE: ' + winnerData);
			}
		},
		[ tiles ]
	);
	useEffect(
		() => {
			if (winner.winner) {
				setGameOver(true);
			}
		},
		[ winner ]
	);
	useEffect(restart, [ shouldRestart ]);

	return (
		<div className="board-container">
			{tiles.map((value, i) => {
				return (
					<Square
						key={i}
						value={value}
						nextValue={player}
						onClick={() => handleClick(i)}
						isWinner={winner.indices.has(i)}
					/>
				);
			})}
			{winner.indices.size > 0 && <EventBlocker />}
			<p>Player: {getPlayerNumber()}</p>
		</div>
	);
};
export default Board;
