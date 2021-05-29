import React, { useState } from "react";
import "./Square.scss";
interface SquareProps {
    value?: string;
    nextValue?: string;
    onClick: () => void;
    isWinner: boolean;
}
const Square = ({ nextValue, value, onClick, isWinner }: SquareProps) => {
    const [hovered, setHovered] = useState(false);
    return (
        <>
            <a
                className={`square ${value || nextValue} ${
                    value ? "solid" : hovered ? "ghost" : ""
                } ${isWinner ? "winner" : ""}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onClick}
            />
        </>
    );
};
export default Square;
