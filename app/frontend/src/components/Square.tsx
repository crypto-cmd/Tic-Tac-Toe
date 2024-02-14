import React, { useState } from 'react';
import './Square.scss';
interface SquareProps {
	value?: string;
	nextValue?: string;
	onClick: () => void;
	isWinner: boolean;
}
const Square = ({ nextValue, value, onClick, isWinner }: SquareProps) => {
	const [ hovered, setHovered ] = useState(false);
	const solid = value ? 'solid' : '';
  const ghost = hovered ? 'ghost' : '';
  const solidOrGhost = solid || ghost;
	const winner = isWinner ? 'winner' : '';
	return (
		<a
			className={`square ${value || nextValue} ${solidOrGhost} ${winner}`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={onClick}
		/>
	);
};
export default Square;
